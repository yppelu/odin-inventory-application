"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexRouter = (0, express_1.Router)();
indexRouter.get('/', (req, res) => {
    res.render('pages/index', { title: 'Inventory Application' });
});
exports.default = indexRouter;
