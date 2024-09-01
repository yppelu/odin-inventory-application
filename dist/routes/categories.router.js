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
categoriesRouter.get('/:id', categories_controller_1.renderCategoryPage);
categoriesRouter.post('/:id/delete-category', categories_controller_1.deleteCategory);
categoriesRouter
    .route('/:id/update-category')
    .get(categories_controller_1.renderUpdateCategoryPage)
    .post(categories_controller_1.updateCategory);
exports.default = categoriesRouter;
