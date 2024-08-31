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
exports.renderAllItemsPage = renderAllItemsPage;
exports.renderAddItemPage = renderAddItemPage;
exports.createItem = createItem;
exports.renderItemPage = renderItemPage;
const queries_1 = require("../model/db/queries");
function renderAllItemsPage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield (0, queries_1.getAllItems)();
        res.render('pages/items', { title: 'All Items', items });
    });
}
function renderAddItemPage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield (0, queries_1.getAllCategories)();
        res.render('pages/add-item', { title: 'Add Item', categories });
    });
}
function createItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const chosenCategories = [];
        for (const key in req.body) {
            if (key.match(/check-\d/)) {
                const categoryIdFromKey = parseInt(key.replace('check-', ''));
                chosenCategories.push(categoryIdFromKey);
            }
        }
        const params = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            categoryIds: chosenCategories,
            image: req.body['image-url']
        };
        const createdItem = yield (0, queries_1.addNewItem)(params);
        res.redirect(`/items/${createdItem.id}`);
    });
}
function renderItemPage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const itemId = parseInt(req.params.id);
        const itemData = yield (0, queries_1.getItemData)(itemId);
        res.render('pages/item', { title: itemData.name, itemData });
    });
}
