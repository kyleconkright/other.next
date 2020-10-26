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
exports.Routes = void 0;
const index_1 = require("./../controllers/amazon/index");
class Routes {
    routes(app) {
        app.get('/search/amazon', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield index_1.searchAmazon('green day');
                res.json({ results });
            }
            catch (err) {
                res.json({ err });
            }
        }));
    }
}
exports.Routes = Routes;
exports.default = Routes;
//# sourceMappingURL=search.js.map