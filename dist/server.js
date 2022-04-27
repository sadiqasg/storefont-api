"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var user_1 = __importDefault(require("./handlers/user"));
var product_1 = __importDefault(require("./handlers/product"));
var dashboard_1 = __importDefault(require("./handlers/dashboard"));
var order_1 = __importDefault(require("./handlers/order"));
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
app.use((0, cookie_parser_1["default"])());
var port = process.env.PORT || 3000;
(0, user_1["default"])(app);
(0, dashboard_1["default"])(app);
(0, product_1["default"])(app);
(0, order_1["default"])(app);
app.get('*', function (req, res) {
    res.status(404).json({ message: 'This route does not exist' });
});
app.listen(port, function () {
    console.log("Listening on ".concat(port));
});
