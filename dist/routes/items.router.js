"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const items_controller_1 = require("../controllers/items.controller");
const itemsRouter = (0, express_1.Router)();
itemsRouter.get('/', items_controller_1.renderAllItemsPage);
itemsRouter.route('/add-item').get(items_controller_1.renderAddItemPage).post(items_controller_1.createItem);
itemsRouter.get('/:id', items_controller_1.renderItemPage);
itemsRouter.post('/:id/delete-item', items_controller_1.deleteItem);
itemsRouter
    .route('/:id/update-item')
    .get((req, res) => { })
    .put((req, res) => { });
exports.default = itemsRouter;
