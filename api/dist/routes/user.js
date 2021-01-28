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
const alert_1 = require("./../schemas/alert");
class UserRoutes {
    routes(app) {
        app.post('/user/update', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { user } = yield req.body;
            const { id, phone } = yield user;
            try {
                const user = yield user_1.default.findById(id);
                user.set('phone', phone);
                user.save();
                res.json(user);
            }
            catch (error) {
                console.error(error);
                res.json(error);
            }
        }));
        app.get('/user/alerts', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const alerts = yield alert_1.default.aggregate([
                    {
                        $addFields: {
                            maxPrice: {
                                $objectToArray: "$maxPrice",
                            },
                        },
                    },
                    {
                        $unwind: "$maxPrice"
                    },
                    {
                        $addFields: {
                            price: "$maxPrice.k",
                            maxPrice: {
                                $objectToArray: "$maxPrice.v",
                            }
                        },
                    },
                    {
                        $match: {
                            "maxPrice.k": req.user.id,
                        },
                    },
                    {
                        $project: {
                            price: 1,
                            item: 1
                        },
                    },
                ]);
                res.send(alerts);
            }
            catch (error) {
                console.error(error);
                res.send(error);
            }
        }));
        app.post('/user/alerts/create', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { item, id: userId, maxPrice } = yield req.body;
            const discogsItem = {
                id: item.id,
                masterId: item.basic_information.master_id,
                artist: item.basic_information.artists[0].name,
                title: item.basic_information.title,
                cover: item.basic_information.cover_image,
            };
            try {
                let alert = yield alert_1.default.findOne({ 'item.id': item.id });
                if (!alert) {
                    alert = yield alert_1.default.create(Object.assign(Object.assign({}, discogsItem), { maxPrice: { [maxPrice]: { [userId]: true } } }));
                }
                alert.item = discogsItem;
                alert.maxPrice = updateMaxPrice(alert, maxPrice, userId);
                alert.save();
                res.send('Success');
            }
            catch (error) {
                console.error(error);
                res.json(error);
            }
        }));
        app.post('/user/alerts/update', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { item } = yield req.body;
                const { id: userId } = (yield req).user;
                let alert = yield alert_1.default.findOne({ 'item.id': item.id });
                alert.maxPrice = updateMaxPrice(alert, item.price, userId);
                alert.item.notes = item.notes;
                yield alert.save();
                res.send('Success');
            }
            catch (err) {
                console.error(err);
            }
        }));
        app.post('/user/alerts/delete', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { item } = yield req.body;
                const { id: userId } = (yield req).user;
                let alert = yield alert_1.default.findOne({ 'item.id': item.item.id });
                alert.maxPrice = deleteNotification(alert, userId);
                alert.markModified('maxPrice');
                alert.save();
                res.send('Success');
            }
            catch (err) {
                console.error(err);
            }
        }));
    }
}
exports.UserRoutes = UserRoutes;
exports.default = UserRoutes;
function updateMaxPrice(alert, maxPrice, userId) {
    if (!alert.maxPrice)
        alert.maxPrice = {};
    Object.keys(alert.maxPrice).map((key) => {
        delete alert.maxPrice[key][userId];
        deleteEmptyPrices(alert, key);
    });
    return alert.maxPrice = Object.assign(Object.assign({}, alert.maxPrice), { [maxPrice]: Object.assign(Object.assign({}, alert.maxPrice[maxPrice]), { [userId]: true }) });
}
function deleteNotification(alert, userId) {
    Object.keys(alert.maxPrice).map((key) => {
        delete alert.maxPrice[key][userId];
        deleteEmptyPrices(alert, key);
    });
    return alert.maxPrice;
}
function deleteEmptyPrices(alert, maxPrice) {
    if (Object.keys(alert.maxPrice[maxPrice]).length === 0) {
        delete alert.maxPrice[maxPrice];
    }
}
//# sourceMappingURL=user.js.map