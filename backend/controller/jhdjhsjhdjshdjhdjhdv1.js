const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const axios = require('axios');


const reelHandler = async (req, res) => {
    const url = req.body.data;
    console.log('URL:', url);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the page containing the Blob URL
    await page.goto(url, { waitUntil: 'load', timeout: 80000 });



    // Wait for the video tag to appear
    await page.waitForSelector("video");



    const videoDirectLink = $("video").attr("src");

    console.log('Blob URL:', videoDirectLink);
    await browser.close();
    console.log('URL Send to Frontend');
    res.json({ message: videoDirectLink });


    // // Fetch the Blob data within the browser context
    // const data = await page.evaluate(async (videoDirectLink) => {
    //     const response = await fetch(videoDirectLink);
    //     const blob = await response.blob();
    //     const arrayBuffer = await blob.arrayBuffer();
    //     return Array.from(new Uint8Array(arrayBuffer));
    // }, videoDirectLink);

    // // Convert the data to a Buffer and save it as a file
    // fs.writeFileSync('video.mp4', Buffer.from(data));

    // console.log('File downloaded as video.mp4');
    // await browser.close();

    // res.json({ message: 'File downloaded as video.mp4' });


}
const imageHandler = async (req, res) => {
    const url = req.body.data;
    console.log('URL:', url);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // Navigate to the page and wait for network to be idle
        await page.goto(url, { waitUntil: 'networkidle', timeout: 80000 });

        // Wait for at least one <img> to appear
        await page.waitForSelector("img", { timeout: 60000 }); // Increase timeout to 60 seconds

        // Get the HTML content
        const html = await page.content();
        const $ = cheerio.load(html);

        // Capture the final URL after any redirection
        let finalUrl = page.url();
        console.log('Final URL:', finalUrl);

        const seenUrls = new Set(); // Track seen URLs to avoid duplicate logs
        const imageLinks = new Set(); // Store unique image URLs

        // Check if the URL was redirected
        if (url !== finalUrl) {
            console.log('URL was redirected');
            //get the screen shot of the page

            //check url has a paramter call img_index
            if (finalUrl.includes('img_index')) {
                console.log('URL has img_index parameter');

                const initialIndex = parseInt(new URL(finalUrl).searchParams.get('img_index')) || 1;
                let currentIndex = 1; // Start at 1 as per your requirement
                let currentUrl = finalUrl.replace(`img_index=${initialIndex}`, `img_index=${currentIndex}`);
                console.log('Current URL:', currentUrl);
                await page.goto(currentUrl, { waitUntil: 'networkidle', timeout: 80000 });
                // console.log('New URL:', newUrl);
                // await page.screenshot({ path: 'screenshot.png' });
                // console.log('Screenshot captured');
                // return;

                let nextButton;
                do {
                    try {
                        // Close any cookie consent or pop-ups if they exist
                        const closeButton = await page.$('button[aria-label="Close"], .cookie-consent button, .close-button');
                        if (closeButton) {
                            await closeButton.click();
                            console.log('Closed an overlay or popup');
                            await page.waitForTimeout(1000); // Wait for closure animation
                        }
                    } catch (e) {
                        console.log('No pop-up to close or failed to close it.');
                    }

                    nextButton = await page.$('button[aria-label="Next"]');
                    if (nextButton) {
                        await nextButton.click();
                        await page.waitForTimeout(1000); // Small delay for content to load

                        console.log('Clicked the "Next" button');

                        // Re-fetch the page content
                        const updatedHtml = await page.content();
                        const $$ = cheerio.load(updatedHtml);

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

                // let redirected = false;
                // while (!redirected) {

                //     console.log('Current URL:', currentUrl);
                //     await page.goto(currentUrl, { waitUntil: 'networkidle', timeout: 80000 });
                //     if (page.url() !== currentUrl) {
                //         console.log('URL was redirected');
                //         break;
                //     }
                //     await page.waitForSelector("img", { timeout: 60000 });
                //     console.log('Wenst to the page')
                //     console.log('');


                //     const html = await page.content();
                //     const $ = cheerio.load(html);

                //     $('img').each((index, img) => {
                //         if ($(img).parents('[tabindex="-1"]').length > 0) {
                //             const src = $(img).attr('src');
                //             if (src) {
                //                 imageLinks.push(src);
                //                 console.log(`Image with tabindex parent: ${src}`);
                //             }
                //         }
                //     });

                //     // Increment index by 2
                //     currentIndex += 1;
                //     const nextUrl = finalUrl.replace(`img_index=${initialIndex}`, `img_index=${currentIndex}`);

                //     currentUrl = nextUrl;
                //     console.log('Next URL:', nextUrl);
                // }

                // imageLinks.forEach((element, index) => {
                //     console.log('Image URLs: ' + index + " " + element);
                //     console.log('');
                //     console.log('Finsih');
                //     return;

                // }
                //);

                // console.log('New URL:', newUrl);
                // await page.screenshot({ path: 'screenshot.png' });
                // console.log('Screenshot captured');
                // return;

                //     let nextButton;
                //     do {
                //         // Wait for the "Next" button and click it
                //         try {
                //             // Close any cookie consent or pop-ups if they exist
                //             const closeButton = await page.$('button[aria-label="Close"], .cookie-consent button, .close-button');
                //             if (closeButton) {
                //                 await closeButton.click();
                //                 console.log('Closed an overlay or popup');
                //                 await page.waitForTimeout(1000); // Wait for closure animation
                //             }
                //         } catch (e) {
                //             console.log('No pop-up to close or failed to close it.');
                //         }

                //         nextButton = await page.$('button[aria-label="Next"]');
                //         if (nextButton) {
                //             await nextButton.click();
                //             await page.waitForTimeout(1000); // Small delay for content to load

                //             console.log('Clicked the "Next" button');
                //             return;

                //             // Re-fetch the page content
                //             const updatedHtml = await page.content();
                //             const $$ = cheerio.load(updatedHtml);

                //             // Extract new image URLs
                //             $$('img').each((index, img) => {
                //                 const src = $$(img).attr('src');
                //                 if (src) imageLinks.add(src);
                //             });

                //             console.log(`Collected ${imageLinks.size} image(s) so far...`);
                //         }
                //     } while (nextButton);




            }
            else {
                console.log('URL does not have img_index parameter');

            }
            // $('img').each((index, img) => {
            //     const src = $(img).attr('src');
            //     imageLinks.push(src);
            // });
            // imageLinks.forEach((element, index) => {
            //     console.log('Image URLs: ' + index + " " + element);
            // });





            // Extract all image URLs using Cheerio

        }
        else {
            console.log('URL was not redirected');

            const firstImage = $('img').first().attr('src');
            const secondImage = $('img').eq(1).attr('src');
            if (firstImage) {
                imageLinks.push(firstImage);
                console.log('First Image:', firstImage);
                console.log('');


            }
            res.json({ message: firstImage });

        }

        // Write HTML content to a text document
        // fs.writeFileSync('pageContent.html', html, 'utf8');


        // // Extract all image URLs using Playwright (Recommended)
        // const imageLinks = await page.$$eval('img', imgs => 
        //     imgs.map(img => img.src || img.getAttribute('data-src') || img.getAttribute('data-original'))
        // );

        // console.log('Image URLs:', imageLinks);
        res.json({ message: "Image URLs" });
    } catch (error) {
        console.error('Error:', error)
        res.status(500).send('Error processing image URL');
    } finally {
        await browser.close();
    }
}



const downloadReelHandler = async (req, res) => {
    const videoUrl = req.query.url;
    try {
        const response = await axios.get(videoUrl, { responseType: 'stream' });
        res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send('Error downloading video');
    }

}


const downloadSingleImage =async (req,res)=>{
    const imageUrl = req.query.url;
    try {
        const response = await axios.get(imageUrl, { responseType: 'stream' });
        res.setHeader('Content-Disposition', 'attachment; filename="image.jpg"');
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send('Error downloading image');
    }
}





module.exports = { reelHandler, downloadReelHandler, imageHandler, downloadImageHandler,downloadSingleImage };