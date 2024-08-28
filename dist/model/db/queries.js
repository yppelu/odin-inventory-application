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
exports.queryAllCategories = queryAllCategories;
exports.queryAllItems = queryAllItems;
const pool_1 = __importDefault(require("./pool"));
const queries = {
    allCategories: { query: 'SELECT * FROM categories;' },
    allItems: { query: 'SELECT * FROM items;' }
};
function makeQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = query.params
            ? yield pool_1.default.query(query.query, query.params)
            : yield pool_1.default.query(query.query);
        return rows;
    });
}
function queryAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield makeQuery(queries.allCategories);
    });
}
function queryAllItems() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield makeQuery(queries.allItems);
    });
}
