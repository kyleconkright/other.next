"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttl = void 0;
const puppeteer = require("puppeteer");
function scrape(url, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer.launch();
        const page = yield browser.newPage();
        try {
            yield page.goto(url);
            yield page.waitForSelector('span.converted_price');
            let element = yield page.$('span.converted_price');
            let value = yield page.evaluate(el => el.textContent, element);
            yield browser.close();
            return parseFloat(value.match(/\$(\d+\d*\.?\d+)/)[1]);
        }
        catch (err) {
            // console.error(err);
            yield browser.close();
            return undefined;
        }
    });
}
;
function ttl() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer.launch();
        const page = yield browser.newPage();
        try {
            yield page.goto('https://www.turntablelab.com/products/run-the-jewels-run-the-jewels-2-vinyl-2lp-turntable-lab-exclusive');
            try {
                const element = yield page.$('.out-of-stock');
                if (element) {
                    yield browser.close();
                    return true;
                }
                else {
                    yield browser.close();
                    return null;
                }
            }
            catch (err) {
                yield browser.close();
                return null;
            }
        }
        catch (err) {
            yield browser.close();
            return null;
        }
    });
}
exports.ttl = ttl;
;
exports.default = scrape;
//# sourceMappingURL=puppeteer.js.map