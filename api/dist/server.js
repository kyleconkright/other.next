"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.default.listen(5001, () => {
    console.log(`Server Running... ${process.env.CLIENT_URL}`);
});
//# sourceMappingURL=server.js.map