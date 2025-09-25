import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ProductPage } from '@/components/products/ProductPage';
import { getProductBySlug, listAllProducts, getRelatedProducts } from '@/lib/product-utils';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = listAllProducts();
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  const title = `${product.name} | Unwind Designs`;
  const description = product.description || `Shop ${product.name} at Unwind Designs. ${product.features?.slice(0, 2).join(', ')}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.images.length > 0 ? [product.images[0]] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
    alternates: {
      canonical: `https://unwind-designs.vercel.app/products/${product.slug}`,
    },
  };
}

// JSON-LD structured data
function generateJsonLd(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Unwind Designs',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'AUD',
      availability: product.comingSoon 
        ? 'https://schema.org/PreOrder'
        : product.inventory && product.inventory > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Unwind Designs',
      },
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 0,
    } : undefined,
    ...(product.dimensions && {
      width: `${product.dimensions.width} cm`,
      height: `${product.dimensions.height} cm`,
      depth: `${product.dimensions.length} cm`,
    }),
    ...(product.weight && {
      weight: `${product.weight} kg`,
    }),
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  // Get related products
  const relatedProducts = getRelatedProducts(product, 4) || [];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd(product)),
        }}
      />
      
      <ProductPage 
        product={product} 
        relatedProducts={relatedProducts}
      />
    </>
  );
}
