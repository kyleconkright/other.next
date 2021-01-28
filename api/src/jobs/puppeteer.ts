import * as puppeteer from 'puppeteer';

async function scrape(url, name) {
  const browser = await puppeteer.launch();
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

export default scrape;
