const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');

async function test(){
    const url = 'https://www.instagram.com/mrunalthakur/p/CWJNTsqtbGK/';

    console.log(`[URL Request Come:`, url);
       //console the cureent time with secon
       console.log('Current Time:', new Date().toLocaleTimeString());
   
       const browser = await chromium.launch({
           headless: true, args: [
               // Use with caution!
               '--no-sandbox',
               '--disable-setuid-sandbox',
           ]
       });
       const context = await browser.newContext(); // Create a new context
   
   
   
       // Preload a cookie to accept consent
       await context.addCookies([
           {
               name: 'cookie_consent',
               value: 'accepted', // The value depends on how the site stores consent
               domain: 'https://www.instagram.com', // Change this to your target domain
               path: '/'
           }
       ]);
       const page = await browser.newPage();
   
       // page.on('request', request => {
       //     console.log('Request:', request.url());
       // });
   
       // Intercept and block unnecessary requests
       await page.route('**/*', (route) => {
           const url = route.request().url();
           if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg') || url.includes('instagram.com')) {
               route.continue();
           } else {
               route.abort();
           }
       });
   
       console.log('Browser opended');
       console.log('Current Time:', new Date().toLocaleTimeString());
   
   
       try {
           // Set the viewport size to match your laptop screen
           await page.setViewportSize({ width: 1366, height: 768 }); // Adjust as per your screen resolution
           // Navigate to the page and wait for network to be idle
           await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
   
           //cosnole log the network request   
   
   
           console.log('Page loaded');
           console.log('Current Time:', new Date().toLocaleTimeString());
   
   
           // Wait for at least one <img> to appear
           // Get the HTML content
           const html = await page.content();
           const $ = cheerio.load(html);
   
           //screen shot
           await page.screenshot({ path: 'screenshot_006.png' });
   
           console.log("Html Content Loaded");
           console.log('Current Time:', new Date().toLocaleTimeString());
   
   
           // Capture the final URL after any redirection
           let finalUrl = page.url();
           console.log('Final URL:', finalUrl);
   
           const seenUrls = new Set(); // Track seen URLs to avoid duplicate logs
           const imageLinks = new Set()// Store unique image URLs
   
   
   
   
   
           // Check if the URL was redirected
           if (url !== finalUrl) {
               console.log('URL was redirected');
               console.log('Current Time:', new Date().toLocaleTimeString());
   
   
   
               // try {
   
               //     //check button with text content Allow All Cookies
               //     const allowButton = await page.$('button:has-text(" Allow all cookies")');
               //     if (allowButton) {
               //         await allowButton.click();
               //         console.log('Clicked the "Allow All Cookies" button');
               //         console.log('Current Time:', new Date().toLocaleTimeString());
   
               //         await page.waitForTimeout(1000); // Small delay for content to load
               //     }
   
               // } catch (error) {
               //     console.log('Error:', error);
   
               // }
   
   
   
   
   
   
               const closeButton = await page.$('svg[aria-label="Close"]');
               if (closeButton) {
                   //reload the page
                   await page.reload();
                   //wait two econds
                   await page.waitForTimeout(2000);
                   console.log('Reloaded the page');
                   console.log('Current Time:', new Date().toLocaleTimeString());
               }
               // if (closeButton) {
               //     console.log('Close Button Found');
               //     console.log('Current Time:', new Date().toLocaleTimeString());
               //     //get the close button parent div where the close button is located
   
               //     // Get the parent of the parent div where the close button is located
               //     const parentDivInfo = await closeButton.evaluate(node => {
               //         const parentDiv = node.closest('div').parentElement;
               //         return {
               //             outerHTML: parentDiv.outerHTML,
               //             tagName: parentDiv.tagName,
               //             className: parentDiv.className
               //         };
               //     });
               //     console.log('Parent of Parent Div:', parentDivInfo);
   
   
   
   
   
               //     parentDiv.click();
               //     console.log('Closed an overlay or popup');
               //     await page.waitForTimeout(1000); // Wait for closure animation
               // }
   
   
   
   
   
   
               //check url has a paramter call img_index
               if (finalUrl.includes('img_index')) {
                   console.log('URL has img_index parameter');
   
                   const initialIndex = parseInt(new URL(finalUrl).searchParams.get('img_index')) || 1;
                   let currentIndex = 1; // Start at 1 as per your requirement
                   let currentUrl = finalUrl.replace(`img_index=${initialIndex}`, `img_index=${currentIndex}`);
                   console.log('Current URL:', currentUrl);
                   console.log('Current Time:', new Date().toLocaleTimeString());
   
                   // await page.goto(currentUrl, { waitUntil: 'networkidle', timeout: 80000 });
                   // console.log('Navigated to the current URL');
                   // console.log('Current Time:', new Date().toLocaleTimeString());
   
                   let nextButton;
                   do {
   
   
   
   
   
   
                       nextButton = await page.$('button[aria-label="Next"]');
                       if (nextButton) {
                           await nextButton.click();
                           await page.waitForTimeout(500); // Small delay for content to load
   
   
   
                           console.log('Clicked the "Next" button');
                           console.log('Current Time:', new Date().toLocaleTimeString());
   
   
                           // Re-fetch the page content
                           const updatedHtml = await page.content();
                           const $$ = cheerio.load(updatedHtml);
   
                           console.log("Updated Html Content Loaded");
                           console.log('Current Time:', new Date().toLocaleTimeString());
   
                           // Extract image URLs only within <li tabindex="-1"> elements
                           $$('li[tabindex="-1"] img').each((index, img) => {
                               const src = $$(img).attr('src');
                               if (src && !seenUrls.has(src)) { // Check if URL is not already seen
                                   imageLinks.add(src);
                                   seenUrls.add(src); // Mark as seen
                                   console.log(`Image URL: ${src}`);
                               }
                           });
   
                           console.log(`Collected ${imageLinks.size} image(s) so far...`);
                       }
                   } while (nextButton);
   
   
                   // Console log the final unique image links
                   console.log('\nFinal list of image URLs:');
                   [...imageLinks].forEach((element, index) => {
                       console.log(`${index + 1}: ${element}\n`);
                   });
   
                   console.log('Data Send to Frontend');
                   console.log('Current Time:', new Date().toLocaleTimeString());
   
                   // Send the data to frontend
   
   
   
   
               }
               else {
                   console.log('URL does not have img_index parameter');
   
               }
   
   
           }
           else {
               console.log('URL was not redirected');
               console.log('Current Time:', new Date().toLocaleTimeString());
   
   
               const firstImage = $('div[tabindex="-1"] img').first().attr('src');
               //const secondImage = $('img').eq(1).attr('src');
               if (firstImage) {
   
                   console.log('First Image:', firstImage);
                   console.log('');
   
   
               }
   
           }
   
   
   
   
       } catch (error) {
           if (error.name === 'TimeoutError') {
               console.error('TimeoutError:', error);
               //get the cren shot of the page
               await page.screenshot({ path: 'screenshot.png' });
               console.log('Screenshot captured');
               //save the html content to a file
               const html = await page.content();
               fs.writeFileSync('pageContent.html', html, 'utf8');
               console.log('HTML content saved to pageContent.html');
           } else {
               console.error('Error:', error);
           }
       } finally {
           await browser.close();
       }
}


test();