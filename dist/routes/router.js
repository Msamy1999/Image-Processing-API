"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const imagesProcessingRouter_1 = __importDefault(require("./api/imagesProcessingRouter"));
const router = express_1.default.Router();
router.use("/images", express_1.default.static(path_1.default.join(__dirname, "..", "..", "original")));
router.get("/", (request, response) => {
    response.status(200).json("Hello To Image Processing Server");
    response.end();
});
router.use("/api/resize", imagesProcessingRouter_1.default);
router.all("/*", (request, response) => {
    response.status(404).json(`Error 404 Not Found  > r${request.url} `);
    response.end();
});
exports.default = router;
