// Browser Extension Popup Script
document.addEventListener('DOMContentLoaded', function() {
  const scrapeBtn = document.getElementById('scrapeBtn');
  const exportBtn = document.getElementById('exportBtn');
  const status = document.getElementById('status');
  const products = document.getElementById('products');
  
  let scrapedData = [];

  scrapeBtn.addEventListener('click', async function() {
    try {
      status.innerHTML = '<div class="status">Scraping products...</div>';
      scrapeBtn.disabled = true;

      // Get active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Execute scraping script
      const results = await chrome.tabs.executeScript(tab.id, {
        code: `
          // Enhanced product scraper
          function scrapeProducts() {
            const products = [];
            const selectors = {
              containers: ['.product', '.item', '.product-item', '.product-card', '[data-product]'],
              name: ['.product-name', '.product-title', 'h1', 'h2', 'h3', '.title'],
              price: ['.price', '.product-price', '[data-price]', '.cost'],
              image: ['img', '.product-image img', '.thumbnail img'],
              description: ['.description', '.product-description', '.summary']
            };

            // Find product containers
            let containers = [];
            for (const selector of selectors.containers) {
              const elements = document.querySelectorAll(selector);
              if (elements.length > 0) {
                containers = Array.from(elements);
                break;
              }
            }

            // Extract data
            containers.forEach((container, index) => {
              try {
                const product = {
                  name: extractText(container, selectors.name),
                  price: extractText(container, selectors.price),
                  image: extractImage(container, selectors.image),
                  description: extractText(container, selectors.description),
                  url: window.location.href
                };

                if (product.name) {
                  products.push(product);
                }
              } catch (error) {
                console.warn('Error extracting product:', error);
              }
            });

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

          scrapeProducts();
        `
      });

      scrapedData = results[0] || [];
      
      if (scrapedData.length > 0) {
        status.innerHTML = `<div class="status success">Found ${scrapedData.length} products!</div>`;
        exportBtn.disabled = false;
        displayProducts(scrapedData);
      } else {
        status.innerHTML = '<div class="status error">No products found. Try a different page.</div>';
      }

    } catch (error) {
      status.innerHTML = `<div class="status error">Error: ${error.message}</div>`;
    } finally {
      scrapeBtn.disabled = false;
    }
  });

  exportBtn.addEventListener('click', async function() {
    try {
      status.innerHTML = '<div class="status">Exporting to Unwind Designs...</div>';
      exportBtn.disabled = true;

      // Send to your API
      const response = await fetch('http://localhost:3001/api/admin/import-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: scrapedData,
          sourceUrl: (await chrome.tabs.query({ active: true, currentWindow: true }))[0].url,
          overwrite: false
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        status.innerHTML = `<div class="status success">Successfully imported ${result.products?.length || 0} products!</div>`;
      } else {
        status.innerHTML = `<div class="status error">Import failed: ${result.error}</div>`;
      }

    } catch (error) {
      status.innerHTML = `<div class="status error">Export failed: ${error.message}</div>`;
    } finally {
      exportBtn.disabled = false;
    }
  });

  function displayProducts(products) {
    products.style.display = 'block';
    products.innerHTML = products.map((product, index) => `
      <div class="product">
        <strong>${product.name}</strong><br>
        <span style="color: #666;">${product.price}</span>
        ${product.description ? `<br><small>${product.description.substring(0, 50)}...</small>` : ''}
      </div>
    `).join('');
  }
});
