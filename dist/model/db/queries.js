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
exports.addNewCategory = addNewCategory;
const pool_1 = __importDefault(require("./pool"));
const queries = {
    selectAllCategories: 'SELECT * FROM categories;',
    selectAllItems: 'SELECT * FROM items;',
    insertNewCategory: 'INSERT INTO categories (name, description, image) VALUES ($1, $2, $3) RETURNING *;'
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
function addNewCategory(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdCategories = yield makeQuery(queries.insertNewCategory, Object.values(params));
        return createdCategories[0];
    });
}
