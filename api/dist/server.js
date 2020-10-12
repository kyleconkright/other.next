"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// app.listen(process.env.PORT, () => {
//     console.log(`Express server listening on port ${process.env.PORT} in the ${process.env.NODE_ENV} environment`);
//     console.log(`API ${process.env.API_URL}`);
// })
app_1.default.listen(5001, () => {
    console.log('listening on port 5001');
});
//# sourceMappingURL=server.js.map