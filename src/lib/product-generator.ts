// Automated Product Page Generator
// Converts scraped product data into Unwind Designs product pages

interface ScrapedProduct {
  name: string;
  price: string;
  image: string;
  description?: string;
  url: string;
  category?: string;
  dimensions?: string;
  weight?: string;
  materials?: string[];
}

interface GeneratedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  tags: string[];
  specifications: {
    dimensions?: string;
    weight?: string;
    materials?: string[];
    finish?: string;
  };
  availability: 'in-stock' | 'out-of-stock' | 'pre-order';
  featured: boolean;
  slug: string;
}

export class ProductGenerator {
  private categories = [
    'flat-packs',
    'troopy-packs', 
    'premium-kits',
    'accessories',
    'hardware'
  ];

  private materials = [
    'aluminum',
    'steel',
    'wood',
    'composite',
    'carbon-fiber',
    'plastic'
  ];

  private finishes = [
    'black',
    'white',
    'silver',
    'bronze',
    'copper',
    'natural'
  ];

  generateProduct(scrapedProduct: ScrapedProduct): GeneratedProduct {
    const slug = this.generateSlug(scrapedProduct.name);
    const category = this.categorizeProduct(scrapedProduct);
    const price = this.parsePrice(scrapedProduct.price);
    
    return {
      id: this.generateId(scrapedProduct.name),
      name: this.cleanName(scrapedProduct.name),
      price: price,
      originalPrice: price > 100 ? Math.round(price * 1.2) : undefined,
      description: this.generateDescription(scrapedProduct),
      shortDescription: this.generateShortDescription(scrapedProduct),
      images: this.processImages(scrapedProduct.image),
      category,
      tags: this.generateTags(scrapedProduct),
      specifications: this.generateSpecifications(scrapedProduct),
      availability: 'in-stock',
      featured: this.isFeatured(scrapedProduct),
      slug
    };
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private generateId(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private cleanName(name: string): string {
    return name
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private parsePrice(priceStr: string): number {
    const cleaned = priceStr.replace(/[^\d.,]/g, '');
    const price = parseFloat(cleaned.replace(',', ''));
    return isNaN(price) ? 0 : price;
  }

  private categorizeProduct(product: ScrapedProduct): string {
    const name = product.name.toLowerCase();
    
    if (name.includes('flat') || name.includes('pack')) return 'flat-packs';
    if (name.includes('troopy') || name.includes('troop')) return 'troopy-packs';
    if (name.includes('premium') || name.includes('pro')) return 'premium-kits';
    if (name.includes('accessory') || name.includes('part')) return 'accessories';
    
    return 'hardware';
  }

  private generateDescription(product: ScrapedProduct): string {
    const baseDescription = product.description || 
      `High-quality ${this.categorizeProduct(product)} designed for durability and performance.`;
    
    return `${baseDescription} Perfect for outdoor enthusiasts and adventure seekers who demand the best in quality and functionality.`;
  }

  private generateShortDescription(product: ScrapedProduct): string {
    const category = this.categorizeProduct(product);
    return `Premium ${category.replace('-', ' ')} for your next adventure.`;
  }

  private processImages(imageUrl: string): string[] {
    if (!imageUrl) return ['/images/placeholder.svg'];
    
    // Convert relative URLs to absolute
    if (imageUrl.startsWith('/')) {
      return [imageUrl];
    }
    
    return [imageUrl];
  }

  private generateTags(product: ScrapedProduct): string[] {
    const tags = [];
    const name = product.name.toLowerCase();
    
    if (name.includes('outdoor')) tags.push('outdoor');
    if (name.includes('adventure')) tags.push('adventure');
    if (name.includes('camping')) tags.push('camping');
    if (name.includes('travel')) tags.push('travel');
    if (name.includes('premium')) tags.push('premium');
    if (name.includes('lightweight')) tags.push('lightweight');
    
    return [...tags, this.categorizeProduct(product)];
  }

  private generateSpecifications(product: ScrapedProduct) {
    return {
      dimensions: product.dimensions || 'Custom sizing available',
      weight: product.weight || 'Varies by configuration',
      materials: product.materials || [this.materials[Math.floor(Math.random() * this.materials.length)]],
      finish: this.finishes[Math.floor(Math.random() * this.finishes.length)]
    };
  }

  private isFeatured(product: ScrapedProduct): boolean {
    const name = product.name.toLowerCase();
    return name.includes('premium') || name.includes('pro') || name.includes('deluxe');
  }
}

// Usage example:
export function generateProductsFromScrapedData(scrapedProducts: ScrapedProduct[]): GeneratedProduct[] {
  const generator = new ProductGenerator();
  return scrapedProducts.map(product => generator.generateProduct(product));
}
