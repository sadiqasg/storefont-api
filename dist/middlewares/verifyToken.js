"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var tokenSecret = process.env.TOKEN_SECRET || '';
var verifyToken = function (req, res, next) {
    try {
        var token = req.cookies.auth_token;
        jsonwebtoken_1["default"].verify(token, tokenSecret);
    }
    catch (error) {
        return res.json(error);
    }
    next();
};
exports.verifyToken = verifyToken;
