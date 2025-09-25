// Product Scraping Tool for Unwind Designs
// Run this in browser console on any e-commerce site

async function scrapeProducts() {
  const products = [];
  
  // Common selectors for product data
  const productSelectors = {
    // Product containers
    containers: [
      '.product-item',
      '.product-card', 
      '.product',
      '[data-product]',
      '.item',
      '.product-tile'
    ],
    
    // Product details
    name: [
      '.product-name',
      '.product-title', 
      'h1', 'h2', 'h3',
      '.title',
      '[data-name]'
    ],
    
    price: [
      '.price',
      '.product-price',
      '[data-price]',
      '.cost',
      '.amount'
    ],
    
    image: [
      'img',
      '.product-image img',
      '.thumbnail img',
      '[data-image]'
    ],
    
    description: [
      '.description',
      '.product-description',
      '.summary',
      '.details'
    ]
  };

  // Find product containers
  let productElements = [];
  for (const selector of productSelectors.containers) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      productElements = Array.from(elements);
      console.log(`Found ${elements.length} products using selector: ${selector}`);
      break;
    }
  }

  // Extract data from each product
  for (const element of productElements) {
    try {
      const product = {
        name: extractText(element, productSelectors.name),
        price: extractText(element, productSelectors.price),
        image: extractImage(element, productSelectors.image),
        description: extractText(element, productSelectors.description),
        url: window.location.href
      };

      if (product.name) {
        products.push(product);
      }
    } catch (error) {
      console.warn('Error extracting product:', error);
    }
  }

  return products;
}

function extractText(element, selectors) {
  for (const selector of selectors) {
    const found = element.querySelector(selector);
    if (found) {
      return found.textContent?.trim() || found.innerText?.trim();
    }
  }
  return null;
}

function extractImage(element, selectors) {
  for (const selector of selectors) {
    const found = element.querySelector(selector);
    if (found) {
      return found.src || found.getAttribute('data-src') || found.getAttribute('data-lazy');
    }
  }
  return null;
}

// Run the scraper
scrapeProducts().then(products => {
  console.log('Scraped products:', products);
  
  // Copy to clipboard
  navigator.clipboard.writeText(JSON.stringify(products, null, 2))
    .then(() => console.log('Products copied to clipboard!'))
    .catch(err => console.error('Failed to copy:', err));
});

// Export for use
window.scrapeProducts = scrapeProducts;
