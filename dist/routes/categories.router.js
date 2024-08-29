"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../controllers/categories.controller");
const categoriesRouter = (0, express_1.Router)();
categoriesRouter.get('/', categories_controller_1.renderAllCategoriesPage);
categoriesRouter
    .route('/add-category')
    .get(categories_controller_1.renderAddCategoryPage)
    .post(categories_controller_1.createCategory);
categoriesRouter
    .route('/:id')
    .get(categories_controller_1.renderCategoryPage)
    .delete((req, res) => { });
categoriesRouter
    .route('/:id/update-category')
    .get((req, res) => { })
    .put((req, res) => { });
exports.default = categoriesRouter;
