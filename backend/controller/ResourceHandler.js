const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const axios = require('axios');

const proxies = [
    { server: 'http://38.154.227.167:5868', username: 'guclrdex', password: 'kdtu4nfd8x7k' },
    { server: 'http://38.153.152.244:9594', username: 'guclrdex', password: 'kdtu4nfd8x7k' },
    { server: 'http://86.38.234.176:6630', username: 'guclrdex', password: 'kdtu4nfd8x7k' },
    { server: 'http://173.211.0.148:6641', username: 'guclrdex', password: 'kdtu4nfd8x7k' },
    { server: 'http://161.123.152.115:6360', username: 'guclrdex', password: 'kdtu4nfd8x7k' },
    { server: 'http://216.10.27.159:6837', username: 'guclrdex', password: 'kdtu4nfd8x7k' },
    { server: 'http://104.239.105.125:6655', username: 'guclrdex', password: 'kdtu4nfd8x7k' },
    { server: 'http://198.105.101.92:5721', username: 'guclrdex', password: 'kdtu4nfd8x7k' },
    { server: 'http://166.88.58.10:5735', username: 'guclrdex', password: 'kdtu4nfd8x7k' },
    { server: 'http://45.151.162.198:6600', username: 'guclrdex', password: 'kdtu4nfd8x7k' }
];

// Function to get a random proxy
function getRandomProxy() {
    const randomIndex = Math.floor(Math.random() * proxies.length);
    return proxies[randomIndex];
}


const reelHandler = async (req, res) => {
    const url = req.body.data;
    console.log('URL:', url);
    console.log('Current Time:', new Date().toLocaleTimeString());
    const proxy = getRandomProxy();
    const browser = await chromium.launch({ headless: true , proxy: {
        server: proxy.server,
        username: proxy.username,
        password: proxy.password
    } });
    const page = await browser.newPage();

    // Navigate to the page containing the Blob URL
    await page.goto(url, { waitUntil: 'commit', timeout: 80000 })

    console.log('Page loaded');
    console.log('Current Time:', new Date().toLocaleTimeString());

    // Wait for the video tag to appear
    await page.waitForSelector("video");
    console.log('Video Found');
    console.log('Current Time:', new Date().toLocaleTimeString());

    const $ = cheerio.load(await page.content());


    const videoDirectLink = $("video").attr("src");
    const thumbnail = $("meta[property='og:image']").attr("content");
    console.log('Thumbnail:', thumbnail);
    console.log('Current Time:', new Date().toLocaleTimeString());


    console.log('Blob URL:', videoDirectLink);
    await browser.close();
    console.log('URL Send to Frontend');
    console.log('Current Time:', new Date().toLocaleTimeString());
    res.json({ message: videoDirectLink, thumbnail: thumbnail });


}

const imageHandler = async (req, res) => {
    const url = req.body.data;

    console.log(`[URL Request Come:`, url);
    //console the cureent time with secon
    console.log('Current Time:', new Date().toLocaleTimeString());
    const proxy= getRandomProxy();

    const browser = await chromium.launch({
        headless: true, args: [
            // Use with caution!
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-extensions',
            '--disable-dev-shm-usage',   // Use RAM instead of disk cache
            '--disable-gpu',             // No GPU rendering
            '--no-first-run',            // Skip first run check
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--disable-gl-drawing-for-tests',
        ],
        proxy: {
            server: proxy.server,
            username: proxy.username,
            password: proxy.password
        },
        ignoreHTTPSErrors: true
    });
    //const context = await browser.newContext(); // Create a new context



    // Preload a cookie to accept consent
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        headers: {
            'Accept-Language': 'en-US,en;q=0.9',
            'DNT': '1',
            'Upgrade-Insecure-Requests': '1',
        }
    });
    const page = await context.newPage();



    // Intercept and block unnecessary requests
    await page.route('**/*', (route) => {
        const url = route.request().url();
        if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg') || url.includes('instagram.com')) {

            route.continue();
        } else {

            route.abort();
        }
    });

    await page.route('https://www.instagram.com/accounts/login', (route) => {
        route.abort();  // Blocks the request to the login page
    });


    console.log('Browser opended');
    console.log('Current Time:', new Date().toLocaleTimeString());


    try {
        // Set the viewport size to match your laptop screen
        await page.setViewportSize({ width: 1366, height: 768 }); // Adjust as per your screen resolution
        // Navigate to the page and wait for network to be idle
        await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

        //cosnole log the network request   

        console.log('Page loaded');
        console.log('Current Time:', new Date().toLocaleTimeString());
        console.log("Url:", page.url());


        //    await page.waitForSelector('svg[aria-label="Like"]', { timeout: 60000 });
        //     console.log('Image Found');
        //     console.log('Current Time:', new Date().toLocaleTimeString());










        // Wait for at least one <img> to appear
        // Get the HTML content
        const html = await page.content();
        const $ = cheerio.load(html);






        console.log("Html Content Loaded");
        console.log('Current Time:', new Date().toLocaleTimeString());


        // Capture the final URL after any redirection
        let finalUrl = page.url();
        console.log('Final URL:', finalUrl);

        const seenUrls = new Set(); // Track seen URLs to avoid duplicate logs
        const imageLinks = new Set()// Store unique image URLs





        // Check if the URL was redirected
        if (url !== finalUrl || finalUrl.includes('img_index')) {
            console.log('URL was redirected');
            console.log('Current Time:', new Date().toLocaleTimeString());

          



            const closeButton = await page.$('svg[aria-label="Close"]');
            if (closeButton) {
                // Reloading the page faster by using a different waitUntil option
                await page.reload({ waitUntil: 'domcontentloaded' });
                //wait two second
                await page.waitForSelector('button[aria-label="Next"]', { timeout: 60000 });
                //await page.click('div[role="button"]:has(svg[aria-label="Close"])');

                console.log('Reloaded the page');
                console.log('Current Time:', new Date().toLocaleTimeString());
            }







            //check url has a paramter call img_index
            if (finalUrl.includes('img_index')) {
                console.log('URL has img_index parameter')
                console.log('Current Time:', new Date().toLocaleTimeString());



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
                res.json({ message: [...imageLinks] });




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
            res.json({ message: firstImage });

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
            res.status(500).send('Timeout error while processing image URL');
        } else {
            console.error('Error:', error);
            res.status(500).send('Error processing image URL');
        }
    } finally {
        await browser.close();
    }
}



const downloadReelHandler = async (req, res) => {
    const videoUrl = req.query.url;
    try {
        const response = await axios.get(videoUrl, {
            responseType: 'stream',
         
        });
        res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send('Error downloading video');
    }

}


const downloadSingleImage = async (req, res) => {
    const imageUrl = req.query.url;
  
    try {
        const response = await axios.get(imageUrl, {
            responseType: 'stream'
        });
        res.setHeader('Content-Disposition', 'attachment; filename="image.jpg"');
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send('Error downloading image');
    }
}



const fetchRequesthandler=async (req,res)=>{
    const { type, id } = req.params;
  
    const url = type === 'reel'
      ? `https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/reel_by_shortcode?shortcode=${id}`
      : `https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/post_by_shortcode?shortcode=${id}`;
  
    const options = {
      headers: {
        'x-rapidapi-key': '3b718006b9msh2d5d11044458229p18a7aejsn27634b6c412a',
        'x-rapidapi-host': 'instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com',
      },
    };
  
    try {
      // Use axios to fetch the data
      const response = await axios.get(url, options);
      
      // Send the result back to the frontend
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching data from Instagram:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
}



module.exports = { reelHandler, downloadReelHandler, imageHandler, downloadSingleImage ,fetchRequesthandler};