import * as puppeteer from 'puppeteer';

const executablePath = process.env.API_URL === 'http://localhost:5001' ? '/opt/homebrew/bin/chromium' : null;

async function scrape(url, name) {
  const browser = await puppeteer.launch(
    {
      executablePath,
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ]
    }
  );
  const page = await browser.newPage();
  try {
    await page.goto(url);
    await page.waitForSelector('span.converted_price');
    let element = await page.$('span.converted_price')
    let value = await page.evaluate(el => el.textContent, element);
    await browser.close();
    return parseFloat(value.match(/\$(\d+\d*\.?\d+)/)[1]);
  } catch(err) {
    // console.error(err);
    await browser.close();
    return undefined;
  }
};

export async function ttl() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
  ]
  });
  const page = await browser.newPage();
  try {
    await page.goto('https://www.turntablelab.com/products/run-the-jewels-run-the-jewels-2-vinyl-2lp-turntable-lab-exclusive');
    try {
      const element = await page.$('.out-of-stock');
      if(element) {
        await browser.close();
        return true
      } else {
        await browser.close();
        return null;
      }
    } catch(err) {
      await browser.close();
      return null;
    }
  } catch(err) {
    await browser.close();
    return null;
  }
};

export default scrape;
