"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemsRouter = (0, express_1.Router)();
itemsRouter.get('/', (req, res) => { });
itemsRouter
    .route('/add-item')
    .get((req, res) => { })
    .post((req, res) => { });
itemsRouter
    .route('/:id')
    .get((req, res) => { })
    .delete((req, res) => { });
itemsRouter
    .route('/:id/update-item')
    .get((req, res) => { })
    .put((req, res) => { });
exports.default = itemsRouter;
