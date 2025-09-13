# Flat Packs & Fitout Implementation Plan

## Overview

This plan provides a minimal, non-destructive implementation approach to bring the existing codebase into full compliance with the Flat Packs & Fitout scope. All changes will be additive or small isolated edits, preserving existing functionality.

**Branch**: `feat/flatpacks-audit-and-scope`

---

## Phase 1: Foundation & Data (Priority 1)

### 1.1 Feature Flag System
**Effort**: 1 hour  
**Risk**: Low  
**Files**: Create new

```
CREATE src/lib/feature-flags.ts
UPDATE .env.example (add FEATURE_BIG_POST_SHIPPING=false)
```

**Purpose**: Enable safe rollout of new features, especially Big Post API integration.

### 1.2 Complete Flat Pack Product Data  
**Effort**: 3 hours  
**Risk**: Low  
**Files**: Create new, update existing

```
CREATE src/data/flatpacks.ts
UPDATE src/lib/products.ts (merge flat pack data)
```

**Scope**: Add all 15 flat pack products:
- Wander Kit: 6 variants (Plain hardwood, Eucalyptus Black Hex, Birch Black Hex × Chest/Upright)
- Roam Kit: 6 variants (Black Hex, White, Plain Birch × Chest/Upright)  
- Premium Kits: 2 variants (Chest/Upright)

**Data Fields**: id, name, kitType, fridgeType, finish, price, media[], upsells[], slug, badges, shipClass

### 1.3 Enhanced Product Data Model
**Effort**: 1 hour  
**Risk**: Low  
**Files**: Update existing

```
UPDATE src/lib/products.ts
- Add video field to Product interface
- Add upsells relationship field
- Add shipClass for Big Post integration
```

---

## Phase 2: Big Post Shipping Integration (Priority 1)

### 2.1 Big Post API Client
**Effort**: 4 hours  
**Risk**: Medium  
**Files**: Create new, replace existing

```
REPLACE src/lib/bigpost-api.ts → src/lib/bigpost-shipping.ts
CREATE src/app/api/shipping/quote/route.ts
UPDATE .env.example (correct BIG_POST_API_TOKEN)
```

**Purpose**: Real-time shipping quotes using token `otvk9SgyiU_LUB9npj9NrQ`

### 2.2 Shipping Integration in Cart/Checkout
**Effort**: 3 hours  
**Risk**: Medium  
**Files**: Update existing

```
UPDATE src/components/cart/CartPageContent.tsx
UPDATE src/components/checkout/CheckoutForm.tsx
UPDATE src/lib/cart-context.tsx (add shipping state)
```

**Features**: 
- Real-time shipping quotes on cart page
- Feature flag guard: `FEATURE_BIG_POST_SHIPPING`
- Fallback to existing shipping calculator

---

## Phase 3: Flat Pack Experience (Priority 2)

### 3.1 Dedicated Flat Pack Index Page
**Effort**: 2 hours  
**Risk**: Low  
**Files**: Create new, update existing

```
CREATE src/app/flat-packs/page.tsx
CREATE src/app/flat-packs/[slug]/page.tsx (individual flat pack pages)
UPDATE src/components/navigation.tsx (add Flat Packs route)
```

**Purpose**: Primary entry path for flat pack products as specified in scope.

### 3.2 Enhanced Product Detail Pages
**Effort**: 3 hours  
**Risk**: Low  
**Files**: Create new, update existing

```
CREATE src/components/products/VideoPlayer.tsx
UPDATE src/components/products/ProductDetail.tsx (add video slot)
UPDATE src/lib/products.ts (video field usage)
```

**Features**:
- Video player component with lazy loading
- Placeholder video slots for future content
- Maintains existing image functionality

### 3.3 Upsell System
**Effort**: 4 hours  
**Risk**: Medium  
**Files**: Create new, update existing

```
CREATE src/components/products/RecommendedItems.tsx
CREATE src/data/upsells.ts (cushions, insulation, plumbing, electrical)
UPDATE src/components/products/ProductDetail.tsx (add upsell section)
UPDATE src/components/cart/CartPageContent.tsx (cart upsells)
```

**Data-Driven**: Modular system based on product relationships defined in data files.

---

## Phase 4: Enhanced Fitout Experience (Priority 2)

### 4.1 Expanded "Fit Out Your Troopy" Section
**Effort**: 2 hours  
**Risk**: Low  
**Files**: Update existing

```
UPDATE src/components/sections/TroopyPromo.tsx
- Add more detailed feature list
- Enhance configurator preview
- Add pricing preview component
```

**MVP Approach**: Guided overview with clear CTAs, preparing for future configurator.

### 4.2 Enhanced Gallery
**Effort**: 2 hours  
**Risk**: Low  
**Files**: Update existing

```
UPDATE src/components/sections/GalleryPreview.tsx (add more categories)
UPDATE src/app/our-fitouts/page.tsx (expand gallery)
CREATE src/data/gallery.ts (build examples data)
```

**Categories**: Storage solutions, kitchen setups, sleeping areas, electrical systems, water systems, exterior mods.

### 4.3 Motion Booking Integration
**Effort**: 2 hours  
**Risk**: Medium  
**Files**: Update existing

```
UPDATE src/app/start-your-build/page.tsx
- Add Motion booking form integration
- Keep existing form as fallback
- Feature flag guard
```

---

## Phase 5: Accessibility & Performance (Priority 3)

### 5.1 Image Optimization
**Effort**: 2 hours  
**Risk**: Low  
**Files**: Update existing

```
UPDATE all components using images
- Ensure next/image usage throughout
- Add proper alt text
- Implement lazy loading for gallery
```

### 5.2 Lighthouse Optimizations
**Effort**: 2 hours  
**Risk**: Low  
**Files**: Update existing

```
UPDATE src/components/sections/GalleryPreview.tsx (lazy loading)
UPDATE src/components/products/VideoPlayer.tsx (lazy loading)
UPDATE src/app/layout.tsx (performance optimizations)
```

---

## Implementation Sequence

### Day 1: Foundation
1. ✅ Complete audit (DONE)
2. Feature flag system (1h)
3. Flat pack product data (3h) 
4. Enhanced data model (1h)

### Day 2: Shipping Integration  
1. Big Post API client (4h)
2. Cart/checkout integration (3h)

### Day 3: Flat Pack Experience
1. Dedicated flat pack pages (2h)
2. Video component (3h)
3. Upsell system (4h)

### Day 4: Enhanced Experience & Polish
1. Expanded troopy section (2h)
2. Enhanced gallery (2h)
3. Motion booking (2h)
4. Accessibility & performance (4h)

---

## File Creation Summary

### New Files (12)
```
src/lib/feature-flags.ts
src/data/flatpacks.ts
src/data/upsells.ts
src/data/gallery.ts
src/lib/bigpost-shipping.ts
src/app/api/shipping/quote/route.ts
src/app/flat-packs/page.tsx
src/app/flat-packs/[slug]/page.tsx
src/components/products/VideoPlayer.tsx
src/components/products/RecommendedItems.tsx
```

### Modified Files (8)
```
.env.example
src/lib/products.ts
src/components/navigation.tsx
src/components/products/ProductDetail.tsx
src/components/cart/CartPageContent.tsx
src/components/checkout/CheckoutForm.tsx
src/lib/cart-context.tsx
src/components/sections/TroopyPromo.tsx
```

---

## Risk Mitigation

### Breaking Changes Prevention
- All new components are additive
- Existing interfaces extended, not replaced
- Feature flags guard new functionality
- Fallbacks for all external integrations

### Testing Strategy
- Test existing functionality after each phase
- Feature flag testing in development
- Gradual rollout of Big Post integration
- Lighthouse testing for performance

### Rollback Plan
- Feature flags allow instant disable
- Git branch for easy reversion
- Modular changes allow selective rollback
- No database schema changes

---

## Success Metrics

### Completion Criteria
- [ ] All 15 flat pack products in catalog
- [ ] Big Post API integration working with feature flag
- [ ] Upsell system functional on PDP and cart
- [ ] Video player component with placeholders
- [ ] Dedicated flat pack index page
- [ ] Enhanced troopy configurator section
- [ ] Motion booking integration
- [ ] Lighthouse score > 90

### Performance Targets
- [ ] Page load time < 3s
- [ ] First contentful paint < 1.5s
- [ ] All images optimized with next/image
- [ ] Lazy loading implemented for heavy components

### Scope Compliance
- [ ] 100% scope requirement coverage
- [ ] All value propositions clearly presented
- [ ] Australia-wide shipping prominently featured
- [ ] One-stop shop messaging throughout
- [ ] Flat packs as primary offering established
