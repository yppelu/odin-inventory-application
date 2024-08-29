"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAllCategoriesPage = renderAllCategoriesPage;
exports.renderAddCategoryPage = renderAddCategoryPage;
exports.createCategory = createCategory;
exports.renderCategoryPage = renderCategoryPage;
const queries_1 = require("../model/db/queries");
function renderAllCategoriesPage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield (0, queries_1.getAllCategories)();
        res.render('pages/categories', { title: 'All Categories', categories });
    });
}
function renderAddCategoryPage(req, res) {
    res.render('pages/add-category', { title: 'Add Category' });
}
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = req.body;
        const createdCategory = yield (0, queries_1.addNewCategory)(params);
        res.redirect(`/categories/${createdCategory.id}`);
    });
}
function renderCategoryPage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = parseInt(req.params.id);
        const items = yield (0, queries_1.getItemsForCategory)(categoryId);
        const categoryData = yield (0, queries_1.getCategoryData)(categoryId);
        res.render('pages/category', {
            title: categoryData.name,
            categoryData,
            items: items
        });
    });
}
