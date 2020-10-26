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
exports.searchAmazon = void 0;
const amazon = require('amazon-product-api');
let client = amazon.createClient({
    awsId: process.env.AMAZON_KEY_ID,
    awsSecret: process.env.AMAZON_SECRET,
    awsTag: "othersuppl0a5-20"
});
const amazonApiOptions = {
    searchIndex: 'Music',
    responseGroup: 'ItemAttributes,Offers,Images',
    merchantId: 'Amazon',
    condition: 'New',
    availability: 'Available',
};
exports.searchAmazon = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield client.itemSearch(Object.assign({ browseNode: '14772275011', keywords: query }, amazonApiOptions));
        console.log({ results });
        return results;
    }
    catch (err) {
        throw new Error('Don\'t know what\'s wrong');
    }
});
//# sourceMappingURL=index.js.map