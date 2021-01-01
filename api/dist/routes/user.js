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
exports.UserRoutes = void 0;
const user_1 = require("./../schemas/user");
class UserRoutes {
    routes(app) {
        app.post('/user/update', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { user } = yield req.body;
            const { id, phone } = yield user;
            try {
                const user = yield user_1.default.findById(id);
                user.set('phone', phone);
                user.save();
                console.log({ user });
                res.json(user);
            }
            catch (error) {
                console.error(error);
                res.json(error);
            }
        }));
    }
}
exports.UserRoutes = UserRoutes;
exports.default = UserRoutes;
//# sourceMappingURL=user.js.map