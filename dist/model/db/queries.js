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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = getAllCategories;
exports.getAllItems = getAllItems;
exports.getCategoryData = getCategoryData;
exports.getItemData = getItemData;
exports.getItemsForCategory = getItemsForCategory;
exports.addNewCategory = addNewCategory;
exports.addItemCategoriesRelation = addItemCategoriesRelation;
exports.addNewItem = addNewItem;
const pool_1 = __importDefault(require("./pool"));
const queries = {
    selectAllCategories: 'SELECT * FROM categories;',
    selectAllItems: 'SELECT * FROM items;',
    selectCategoryData: 'SELECT * FROM categories WHERE id = $1;',
    selectItemData: 'SELECT * FROM items WHERE id = $1;',
    selectITemsForCategory: `
    SELECT items.id, items.name, items.description, items.price, items.image
    FROM items
    JOIN category_item_relations ON items.id = category_item_relations.item_id
    WHERE category_item_relations.category_id = $1;`,
    insertNewCategory: 'INSERT INTO categories (name, description, image) VALUES ($1, $2, $3) RETURNING *;',
    insertNewItem: 'INSERT INTO items (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *;',
    insertCategoryItemRelation: 'INSERT INTO category_item_relations (category_id, item_id) VALUES ($1, $2);'
};
function makeQuery(query, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = params
            ? yield pool_1.default.query(query, params)
            : yield pool_1.default.query(query);
        return rows;
    });
}
function getAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield makeQuery(queries.selectAllCategories);
    });
}
function getAllItems() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield makeQuery(queries.selectAllItems);
    });
}
function getCategoryData(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoriesData = yield makeQuery(queries.selectCategoryData, [categoryId]);
        return categoriesData[0];
    });
}
function getItemData(itemId) {
    return __awaiter(this, void 0, void 0, function* () {
        const itemsData = yield makeQuery(queries.selectItemData, [itemId]);
        return itemsData[0];
    });
}
function getItemsForCategory(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield makeQuery(queries.selectITemsForCategory, [
            categoryId
        ]);
    });
}
function addNewCategory(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdCategories = yield makeQuery(queries.insertNewCategory, Object.values(params));
        return createdCategories[0];
    });
}
function addItemCategoriesRelation(itemId, categoryIds) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof categoryIds === 'number') {
            yield makeQuery(queries.insertCategoryItemRelation, [categoryIds, itemId]);
        }
        else {
            Promise.all(categoryIds.map((categoryId) => {
                return makeQuery(queries.insertCategoryItemRelation, [categoryId, itemId]);
            }));
        }
    });
}
function addNewItem(_a) {
    return __awaiter(this, arguments, void 0, function* ({ name, description, price, categoryIds, image }) {
        const createdItems = yield makeQuery(queries.insertNewItem, [
            name,
            description,
            price,
            image
        ]);
        const createdItem = createdItems[0];
        yield addItemCategoriesRelation(createdItem.id, categoryIds);
        return createdItem;
    });
}
