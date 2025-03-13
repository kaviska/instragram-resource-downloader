const { chromium } = require('playwright');
const fs = require('fs');

async function login() {
    try {
        const email = "ishan5313@gmail.com";
        const password = "123456";
        const url = "https://pos.darkdevilspices.com/";

        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'load', timeout: 80000 });
        await page.click('text=Login');
        await page.fill('input[name="username"]', email);
        await page.fill('input[name="password"]', password);
        await page.click('text=Sign In');

        // Save the cookies
        const cookies = await page.context().cookies();
        fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
        await browser.close();

    } catch (error) {
        console.log(error);
    }
}

async function addProduct() {
    let browser;
    try {
        const url = "https://pos.darkdevilspices.com/";
        browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'load', timeout: 80000 });
        const cookies = fs.readFileSync('cookies.json', 'utf8');
        await page.context().addCookies(JSON.parse(cookies));
        await page.goto('https://pos.darkdevilspices.com/admin/product.php?box_state=open');

        const products = [
            { name: "Daawat Classic 5kg", price: "1850", description: "Premium quality basmati rice, perfect for biryani and pulao.", category: "2", brand: "6" },
            { name: "Maggi Coconut Milk Powder 1kg", price: "1375", description: "Rich and creamy coconut milk powder for delicious curries.", category: "5", brand: "3" },
            { name: "Polos Mellum", price: "360", description: "A traditional Sri Lankan dish made from tender jackfruit.", category: "5", brand: "3" },
            { name: "Instant String Hopper", price: "225", description: "Quick and easy instant string hoppers for a delightful meal.", category: "5", brand: "3" },
            { name: "Brinjal Moju", price: "225", description: "A sweet and tangy brinjal pickle, perfect as a side dish.", category: "5", brand: "3" },
            { name: "Gold Marie", price: "150", description: "Crispy and light biscuits, ideal for tea time.", category: "5", brand: "24" },
            { name: "Chocolate Cream", price: "225", description: "Delicious chocolate-filled cream biscuits.", category: "5", brand: "24" },
            { name: "String Hopper Flour 700g", price: "525", description: "Finely ground flour for making soft string hoppers.", category: "5", brand: "3" },
            { name: "Thosai Mix", price: "360", description: "Ready-to-cook mix for making crispy and delicious thosai.", category: "5", brand: "3" },
            { name: "Maldives Fish Chips", price: "525", description: "Dried and crispy Maldives fish chips, great for seasoning.", category: "5", brand: "3" },
            { name: "Soya Meat - Mutton", price: "90", description: "High-protein soya meat with a rich mutton flavor.", category: "5", brand: "3" },
            { name: "Soya Meat - Curry", price: "90", description: "Delicious soya meat with a traditional curry flavor.", category: "5", brand: "3" },
            { name: "Soya Meat - Devilled Chicken", price: "90", description: "Spicy and flavorful soya meat with devilled chicken taste.", category: "5", brand: "3" },
            { name: "Wijaya Roasted Curry Powder 100g", price: "1300", description: "Aromatic and flavorful roasted curry powder.", category: "3", brand: "14" },
            { name: "Wijaya Black Pepper Powder 100g", price: "1050", description: "Finely ground black pepper for seasoning.", category: "3", brand: "14" },
            { name: "Wijaya Curry Powder 100g", price: "1200", description: "Aromatic blend of spices for making curry dishes.", category: "3", brand: "14" },
            { name: "Nestomalt", price: "525", description: "Nutritious malted drink for energy and vitality.", category: "5", brand: "3" },
            { name: "Chocolate Wafers", price: "225", description: "Crispy chocolate wafers with a creamy filling.", category: "5", brand: "24" },
            { name: "Halmeso", price: "1650", description: "Traditional herbal drink for refreshment.", category: "5", brand: "3" },
            { name: "Wijaya Meat Curry Powder", price: "1800", description: "Spicy and aromatic curry powder for meat dishes.", category: "3", brand: "14" },
            { name: "V. Chilli Powder", price: "1800", description: "Hot and spicy chili powder for flavorful cooking.", category: "3", brand: "3" },
            { name: "Enasall", price: "200", description: "A traditional spice blend for authentic Sri Lankan cooking.", category: "3", brand: "3" },
            { name: "Keerisamba 5kg", price: "2800", description: "Premium quality Keerisamba rice for soft and fragrant dishes.", category: "2", brand: "4" },
            { name: "Vinegar S", price: "200", description: "Strong and tangy vinegar for cooking and pickling.", category: "5", brand: "3" },
            { name: "Garlic Bite", price: "200", description: "Crispy and flavorful garlic-infused snack.", category: "5", brand: "3" },
            { name: "Bite Murukku", price: "200", description: "Crunchy and spicy bite-sized murukku snacks.", category: "5", brand: "3" },
            { name: "Mixture", price: "200", description: "A delicious mix of crunchy, spicy snacks.", category: "5", brand: "3" },
            { name: "Papadam", price: "90", description: "Thin and crispy lentil wafers, ideal as a side dish.", category: "5", brand: "3" },
            { name: "Kirimora", price: "1650", description: "Traditional Sri Lankan rice variety, great for daily meals.", category: "2", brand: "4" },
            { name: "M. Milk", price: "1100", description: "High-quality milk powder for creamy beverages.", category: "5", brand: "3" },
            { name: "Soya Meat", price: "90", description: "Nutritious and protein-rich soya meat alternative.", category: "5", brand: "3" }
        ]

        // Loop through the products and add them
        for (let product of products) {
            await page.waitForSelector('input[id="p_name"]', { timeout: 60000 });
            await page.fill('input[id="p_name"]', product.name);
            await page.fill('input[name="sell_price"]', product.price);
            const p_code = Math.floor(100000 + Math.random() * 900000).toString();
            await page.fill('input[name="p_code"]', p_code);

            await page.fill('textarea[name="description"]', product.description);
            await page.selectOption('select[name="category_id"]', product.category);
            await page.selectOption('select[name="brand_id"]', product.brand);
            await page.selectOption('select[name="sup_id"]', '1'); // Supplier is always 1
            await page.selectOption('select[name="unit_id"]', '1'); // Unit is always 1
            await page.selectOption('select[name="status"]', '1'); // Status is active

            // Save the product
            await page.click('text=Save');
            console.log(`Added product: ${product.name}`);
        }

        await browser.close();
    } catch (error) {
        console.log(error);
        if (browser) {
            const page = (await browser.pages())[0];
            fs.writeFileSync('screenshot.png', await page.screenshot({ fullPage: true }));
        }
    }
}

login().then(addProduct);