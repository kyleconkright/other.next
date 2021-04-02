import * as puppeteer from 'puppeteer';

const executablePath = process.env.API_URL === 'http://localhost:5001' ? '/opt/homebrew/bin/chromium' : null;

const options = {
  executablePath,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]
}

export class PuppeteerClient {

  async scrape(url: string, selector: string) {
    let browser;
    try {
      browser = await puppeteer.launch(options);
      } catch(err) {
        console.error(err);
      }

    try {
      const page: puppeteer.Page = await browser.newPage();
      await page.goto(url);
      await page.waitForSelector(selector);
      const elements = await page.$$eval(selector, grid => grid.map(i => i.outerHTML));
      await browser.close();
      return elements;
    } catch(err) {
      console.error(err);
      await browser.close();
      return undefined;
    }
  }
}