-- ===== Enums (create only if missing) =====
do $$
begin
  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type order_status as enum ('pending','processing','shipped','delivered','cancelled');
  end if;

  if not exists (select 1 from pg_type where typname = 'payment_status') then
    create type payment_status as enum ('requires_payment','succeeded','refunded','failed');
  end if;

  if not exists (select 1 from pg_type where typname = 'fulfillment_status') then
    create type fulfillment_status as enum ('unfulfilled','partially_fulfilled','fulfilled');
  end if;
end$$;

-- ===== Tables (create if missing) =====
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz default now()
);

create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  address text not null,
  address_line_two text,
  suburb text not null,
  state text not null,
  postcode text not null,
  country text not null default 'AU',
  is_default boolean default false,
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  sku text unique not null,
  name text not null,
  price_cents int not null check (price_cents >= 0),
  weight_kg numeric(6,2) not null default 0,
  length_cm numeric(6,2) not null default 0,
  width_cm  numeric(6,2) not null default 0,
  height_cm numeric(6,2) not null default 0,
  active boolean default true
);

create table if not exists inventory (
  variant_id uuid primary key references product_variants(id) on delete cascade,
  stock int not null default 0,
  low_stock_threshold int not null default 2
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  subtotal_cents int not null,
  shipping_cents int not null default 0,
  total_cents int not null,
  currency text not null default 'AUD',
  order_status order_status not null default 'pending',
  payment_status payment_status not null default 'requires_payment',
  fulfillment_status fulfillment_status not null default 'unfulfilled',
  stripe_payment_intent_id text,
  shipping_address_id uuid references addresses(id),
  billing_address_id uuid references addresses(id),
  notes text,
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  variant_id uuid references product_variants(id),
  title text not null,
  sku text not null,
  quantity int not null check (quantity > 0),
  unit_price_cents int not null,
  weight_kg numeric(6,2) not null default 0,
  length_cm numeric(6,2) not null default 0,
  width_cm  numeric(6,2) not null default 0,
  height_cm numeric(6,2) not null default 0
);

create table if not exists shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  carrier text default 'Big Post',
  bigpost_job_id bigint,
  carrier_consignment_number text,
  tracking_number text,
  service_code text,
  status text default 'booked',
  label_url text,
  created_at timestamptz default now()
);

create table if not exists stripe_webhook_events (
  id bigserial primary key,
  event_id text unique not null,
  type text not null,
  payload jsonb not null,
  received_at timestamptz default now()
);

-- ===== RLS (enable; harmless if already enabled) =====
alter table profiles enable row level security;
alter table addresses enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table shipments enable row level security;

-- ===== Policies (create if missing) =====
do $pol$
begin
  if not exists (select 1 from pg_policies where policyname = 'profiles select by owner') then
    create policy "profiles select by owner" on profiles for select using (auth.uid() = id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'profiles upsert by owner') then
    create policy "profiles upsert by owner" on profiles for insert with check (auth.uid() = id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'profiles update by owner') then
    create policy "profiles update by owner" on profiles for update using (auth.uid() = id);
  end if;

  if not exists (select 1 from pg_policies where policyname = 'addresses by owner') then
    create policy "addresses by owner"
      on addresses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where policyname = 'orders select by owner') then
    create policy "orders select by owner" on orders for select using (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'orders insert by owner') then
    create policy "orders insert by owner" on orders for insert with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where policyname = 'order_items select by owner') then
    create policy "order_items select by owner" on order_items for select using (
      exists (select 1 from orders o where o.id = order_items.order_id and o.user_id = auth.uid())
    );
  end if;

  if not exists (select 1 from pg_policies where policyname = 'shipments select by owner') then
    create policy "shipments select by owner" on shipments for select using (
      exists (select 1 from orders o where o.id = shipments.order_id and o.user_id = auth.uid())
    );
  end if;
end
$pol$ language plpgsql;

-- ===== Indexes (idempotent) =====
create index if not exists idx_orders_user_created on orders (user_id, created_at desc);
create index if not exists idx_order_items_order on order_items (order_id);
create index if not exists idx_shipments_order on shipments (order_id);
create index if not exists idx_variants_product on product_variants (product_id);

-- ===== Inventory trigger (safe) =====
create or replace function dec_inventory_on_order_item()
returns trigger language plpgsql as $$
begin
  update inventory
     set stock = greatest(0, stock - NEW.quantity)
   where variant_id = NEW.variant_id;
  return NEW;
end$$;

drop trigger if exists trg_dec_inventory on order_items;
create trigger trg_dec_inventory
after insert on order_items
for each row execute function dec_inventory_on_order_item();

-- ===== Seed data with all current products =====

-- Wander Kit Products (Budget Range)
insert into products (slug, title, description, active)
values 
  ('wander-kit-chest-fridge-plain-hardwood', 'Wander Kit - Chest Fridge (Plain Hardwood)', 'Budget-friendly flat pack with chest fridge configuration', true),
  ('wander-kit-chest-fridge-eucalyptus-black-hex', 'Wander Kit - Chest Fridge (Eucalyptus Black Hex)', 'Wander Kit with premium Eucalyptus Black Hex finish', true),
  ('wander-kit-chest-fridge-birch-black-hex', 'Wander Kit - Chest Fridge (Birch Black Hex)', 'Top-tier Wander Kit with beautiful Birch Black Hex finish', true),
  ('wander-kit-upright-fridge-plain-hardwood', 'Wander Kit - Upright Fridge (Plain Hardwood)', 'Budget-friendly upright fridge configuration in plain hardwood', true),
  ('wander-kit-upright-fridge-eucalyptus-black-hex', 'Wander Kit - Upright Fridge (Eucalyptus Black Hex)', 'Upright fridge Wander Kit with Eucalyptus Black Hex finish', true),
  ('wander-kit-upright-fridge-birch-black-hex', 'Wander Kit - Upright Fridge (Birch Black Hex)', 'Premium Birch Black Hex upright fridge Wander Kit', true)
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      active = true;

-- Roam Kit Products (Mid-Range)
insert into products (slug, title, description, active)
values 
  ('roam-kit-chest-fridge-black-hex', 'Roam Kit - Chest Fridge (Black Hex)', 'Mid-range flat pack with Black Hex finish and enhanced features', true),
  ('roam-kit-chest-fridge-white', 'Roam Kit - Chest Fridge (White)', 'Clean white finish Roam Kit with chest fridge configuration', true),
  ('roam-kit-chest-fridge-plain-birch', 'Roam Kit - Chest Fridge (Plain Birch)', 'Natural birch finish Roam Kit showcasing beautiful timber grain', true),
  ('roam-kit-upright-fridge-black-hex', 'Roam Kit - Upright Fridge (Black Hex)', 'Mid-range upright fridge configuration with bold Black Hex finish', true),
  ('roam-kit-upright-fridge-white', 'Roam Kit - Upright Fridge (White)', 'Bright white upright fridge Roam Kit for maximum accessibility', true),
  ('roam-kit-upright-fridge-plain-birch', 'Roam Kit - Upright Fridge (Plain Birch)', 'Natural birch upright fridge Roam Kit with enhanced features', true)
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      active = true;

-- Premium Kit Products (High-End)
insert into products (slug, title, description, active)
values 
  ('premium-kit-chest-fridge', 'Premium Kit - Chest Fridge', 'Ultimate luxury flat pack with premium materials and hardware', true),
  ('premium-kit-upright-fridge', 'Premium Kit - Upright Fridge', 'Ultimate luxury upright fridge configuration with premium features', true)
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      active = true;

-- Component Products
insert into products (slug, title, description, active)
values 
  ('troopy-side-panels', 'Troopy Side Panels', 'Basic side panels for interior finishing', true),
  ('troopy-side-panels-with-storage', 'Troopy Side Panels with Storage', 'Side panels with integrated storage compartments', true),
  ('troopy-floor', 'Troopy Floor', 'Professional flooring system for Troopcarriers', true),
  ('cushion-set-troopy-kits', 'Cushion Set for Troopy Kits', 'Premium cushions for all Troopy kit configurations', true),
  ('shower-outlet', 'Shower Outlet', 'External shower system for outdoor use', true),
  ('troopy-utility-vent', 'Troopy Utility Vent (Ark Earth)', 'Professional utility vent for Troopcarriers', true),
  ('arb-twin-compressor-bracket', 'ARB Twin Compressor Bracket (Ark Earth)', 'Heavy-duty ARB compressor mounting bracket', true),
  ('62l-stainless-water-tank', '62L Stainless Steel Water Tank', '62L stainless steel water tank', true),
  ('90l-troopy-water-tank', '90L Troopy Water Tank', '90L water tank for Troopcarriers', true),
  ('mass-noise-liner', 'Car Builders Mass Noise Liner', 'Professional mass noise liner', true),
  ('troopy-sound-pack', 'Carbuilders Troopy Sound Deadening Pack', 'Complete Troopcarrier sound deadening pack', true)
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      active = true;

-- Additional Products
insert into products (slug, title, description, active)
values 
  ('70-series-utility-panel', '70 Series Utility Panel (Faceless)', '70 Series utility panel with storage', true),
  ('troopy-diy-starter-kit', 'Troopy DIY Build Starter Kit', 'Complete DIY build starter kit', true),
  ('bushman-roadie-15l', 'Bushman Roadie 15L', '15L portable Bushman fridge', true),
  ('bushman-dc50x', 'Bushman DC50-X', '50L Bushman DC50-X fridge', true),
  ('bushman-dc85x', 'Bushman DC85-X', '85L Bushman DC85-X large fridge', true),
  ('bushman-original-35-52l', 'Original Bushman 35–52L', 'Original Bushman 35-52L fridge', true),
  ('bushman-dc65x', 'Bushman DC65-X', '65L Bushman DC65-X fridge', true),
  ('bushman-original-35l', 'Original Bushman 35L', 'Original Bushman 35L compact fridge', true),
  ('john-guest-red-pipe', 'John Guest 12mm Red Pipe', '12mm red pipe for water systems', true),
  ('john-guest-blue-pipe', 'John Guest 12mm Blue Pipe', '12mm blue pipe for water systems', true),
  ('duoetto-mk2-10l', 'Duoetto MK2 10L Water Heater', '10L Duoetto dual power water heater', true),
  ('aqueous-mk2-10l-240v', 'Aqueous MK2 10L 240V Water Heater', '10L Aqueous 240V water heater', true),
  ('aqueous-6l-heater', 'Aqueous 6L Water Heater', '6L Aqueous compact water heater', true),
  ('duoetto-remote-control', 'Remote Control for Duoetto Water Heaters', 'Remote control for Duoetto heaters', true),
  ('stainless-shower-tray', 'Stainless Steel Campervan Shower Tray', 'Stainless steel campervan shower tray', true),
  ('seaflo-water-pump-40psi', 'Seaflo Water Pump 40PSI', '40PSI Seaflo water pump', true),
  ('tank-utility-vent-plumbing-kit', 'Tank to Utility Vent Plumbing Kit', 'Tank to utility vent plumbing kit', true),
  ('90l-plumbing-kit', '90L Water Tank Plumbing Kit', '90L water tank plumbing kit', true),
  ('everlock-latches', 'Everlock Latches', 'Professional Everlock latches', true)
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      active = true;

-- Upsell Products
insert into products (slug, title, description, active)
values 
  ('cushion-set-wander', 'Wander Kit Cushion Set', 'Custom cushions for Wander Kit', true),
  ('cushion-set-roam', 'Roam Kit Premium Cushion Set', 'Premium cushions for Roam Kit', true),
  ('cushion-set-premium', 'Premium Kit Luxury Cushion Set', 'Luxury cushions for Premium Kit', true),
  ('insulation-kit-basic', 'Basic Insulation Kit', 'Basic thermal insulation for all kits', true),
  ('insulation-kit-premium', 'Premium Insulation System', 'Advanced insulation with vapor barrier', true),
  ('led-strip-warm', 'Warm White LED Strip Kit', 'Warm white LED lighting kit', true),
  ('electrical-kit-advanced', 'Advanced Electrical System', 'Complete electrical upgrade system', true),
  ('water-tank-20l', '20L Fresh Water Tank System', '20L water system for basic needs', true),
  ('water-tank-30l', '30L Fresh Water Tank System', '30L water system with pressure pump', true),
  ('storage-organizers', 'Modular Storage Organizers', 'Modular organizers for efficient storage', true)
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      active = true;

-- Test product for $1 testing
insert into products (slug, title, description, active)
values ('test-1-dollar', 'Test Product ($1)', 'Temporary $1 test item — safe for end-to-end testing', true)
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      active = true;

-- ===== Create product variants for key products =====

-- Wander Kit variants
insert into product_variants (product_id, sku, name, price_cents, weight_kg, length_cm, width_cm, height_cm, active)
select p.id, 'WK-CF-PH-001', 'Plain Hardwood', 375000, 45.0, 180, 120, 85, true
from products p where p.slug = 'wander-kit-chest-fridge-plain-hardwood'
on conflict (sku) do update
  set product_id = excluded.product_id,
      name = excluded.name,
      price_cents = excluded.price_cents,
      active = true;

insert into product_variants (product_id, sku, name, price_cents, weight_kg, length_cm, width_cm, height_cm, active)
select p.id, 'WK-CF-EBH-001', 'Eucalyptus Black Hex', 440000, 45.0, 180, 120, 85, true
from products p where p.slug = 'wander-kit-chest-fridge-eucalyptus-black-hex'
on conflict (sku) do update
  set product_id = excluded.product_id,
      name = excluded.name,
      price_cents = excluded.price_cents,
      active = true;

insert into product_variants (product_id, sku, name, price_cents, weight_kg, length_cm, width_cm, height_cm, active)
select p.id, 'WK-CF-BBH-001', 'Birch Black Hex', 525000, 45.0, 180, 120, 85, true
from products p where p.slug = 'wander-kit-chest-fridge-birch-black-hex'
on conflict (sku) do update
  set product_id = excluded.product_id,
      name = excluded.name,
      price_cents = excluded.price_cents,
      active = true;

-- Roam Kit variants
insert into product_variants (product_id, sku, name, price_cents, weight_kg, length_cm, width_cm, height_cm, active)
select p.id, 'RK-CF-BH-001', 'Black Hex', 670000, 55.0, 200, 130, 90, true
from products p where p.slug = 'roam-kit-chest-fridge-black-hex'
on conflict (sku) do update
  set product_id = excluded.product_id,
      name = excluded.name,
      price_cents = excluded.price_cents,
      active = true;

insert into product_variants (product_id, sku, name, price_cents, weight_kg, length_cm, width_cm, height_cm, active)
select p.id, 'RK-CF-WH-001', 'White', 695000, 55.0, 200, 130, 90, true
from products p where p.slug = 'roam-kit-chest-fridge-white'
on conflict (sku) do update
  set product_id = excluded.product_id,
      name = excluded.name,
      price_cents = excluded.price_cents,
      active = true;

-- Premium Kit variants
insert into product_variants (product_id, sku, name, price_cents, weight_kg, length_cm, width_cm, height_cm, active)
select p.id, 'PK-CF-PREM-001', 'Premium Chest', 985000, 70.0, 220, 140, 95, true
from products p where p.slug = 'premium-kit-chest-fridge'
on conflict (sku) do update
  set product_id = excluded.product_id,
      name = excluded.name,
      price_cents = excluded.price_cents,
      active = true;

insert into product_variants (product_id, sku, name, price_cents, weight_kg, length_cm, width_cm, height_cm, active)
select p.id, 'PK-UF-PREM-001', 'Premium Upright', 1065000, 73.0, 220, 140, 120, true
from products p where p.slug = 'premium-kit-upright-fridge'
on conflict (sku) do update
  set product_id = excluded.product_id,
      name = excluded.name,
      price_cents = excluded.price_cents,
      active = true;

-- Component product variants
insert into product_variants (product_id, sku, name, price_cents, weight_kg, length_cm, width_cm, height_cm, active)
select p.id, 'SP-BASIC-001', 'Basic Side Panels', 85000, 25.0, 200, 120, 2, true
from products p where p.slug = 'troopy-side-panels'
on conflict (sku) do update
  set product_id = excluded.product_id,
      name = excluded.name,
      price_cents = excluded.price_cents,
      active = true;

insert into product_variants (product_id, sku, name, price_cents, weight_kg, length_cm, width_cm, height_cm, active)
select p.id, 'FLOOR-001', 'Troopy Floor', 95000, 45.0, 220, 140, 2, true
from products p where p.slug = 'troopy-floor'
on conflict (sku) do update
  set product_id = excluded.product_id,
      name = excluded.name,
      price_cents = excluded.price_cents,
      active = true;

-- Test product variant
insert into product_variants (product_id, sku, name, price_cents, weight_kg, length_cm, width_cm, height_cm, active)
select p.id, 'TEST-001', 'Test $1 Variant', 100, 1.0, 10, 10, 5, true
from products p where p.slug = 'test-1-dollar'
on conflict (sku) do update
  set product_id = excluded.product_id,
      name = excluded.name,
      price_cents = excluded.price_cents,
      active = true;

-- ===== Create inventory for all variants =====
insert into inventory (variant_id, stock, low_stock_threshold)
select v.id, 10, 2
from product_variants v
where not exists (select 1 from inventory i where i.variant_id = v.id)
on conflict (variant_id) do update
  set stock = excluded.stock,
      low_stock_threshold = excluded.low_stock_threshold;
