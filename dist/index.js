"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const express_1 = __importDefault(require("express"));
const index_router_1 = __importDefault(require("./routes/index.router"));
const categories_router_1 = __importDefault(require("./routes/categories.router"));
const items_router_1 = __importDefault(require("./routes/items.router"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', node_path_1.default.join(__dirname, 'views'));
app.use(express_1.default.static(node_path_1.default.join(__dirname, 'public')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', index_router_1.default);
app.use('/categories', categories_router_1.default);
app.use('/items', items_router_1.default);
app.use('*', (req, res) => {
    res.render('pages/404');
});
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
