"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../controllers/categories.controller");
const categoriesRouter = (0, express_1.Router)();
categoriesRouter.get('/', categories_controller_1.renderAllCategories);
categoriesRouter
    .route('/add-category')
    .get((req, res) => { })
    .post((req, res) => { });
categoriesRouter
    .route('/:id')
    .get((req, res) => { })
    .delete((req, res) => { });
categoriesRouter
    .route('/:id/update-category')
    .get((req, res) => { })
    .put((req, res) => { });
exports.default = categoriesRouter;
