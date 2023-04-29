"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRouters = void 0;
const playersRouter_1 = __importDefault(require("./playersRouter"));
const initRouters = (app) => {
    //Authentified routes
    app.use("/players", playersRouter_1.default);
    //Unauthentified routes
};
exports.initRouters = initRouters;
//# sourceMappingURL=router.js.map