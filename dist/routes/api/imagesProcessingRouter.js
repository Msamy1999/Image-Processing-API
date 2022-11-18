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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const imageProcessing_1 = __importDefault(require("../../utilities/imageProcessing"));
const currentDirectory = __dirname;
const thumbsDirectory = (0, path_1.join)(currentDirectory, "..", "..", "..", "edited");
const imagesProcessingRouter = express_1.default.Router();
imagesProcessingRouter.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const images = [
        "encenadaport",
        "fjord",
        "icelandwaterfall",
        "palmtunnel",
        "santamonica",
    ];
    const height = parseInt(request.query.height);
    const width = parseInt(request.query.width);
    const originalImageName = request.query.image;
    let imageResult = false;
    let heightResult = false;
    let widthResult = false;
    // validate image name
    for (let i = 0; i < images.length; i++) {
        if (originalImageName == images[i]) {
            imageResult = true;
            break;
        }
        else
            imageResult = false;
    }
    // validate height
    if (height > 0 && !isNaN(height) && !NaN) {
        heightResult = true;
    }
    // validate width
    if (width > 0 && !isNaN(width) && !NaN) {
        widthResult = true;
    }
    if (!imageResult || !heightResult || !widthResult) {
        response.status(400).json({ Message: "Error image name is not valid" });
        response.end();
    }
    else {
        try {
            // Api started
            if (widthResult && heightResult && imageResult) {
                if (yield (0, imageProcessing_1.default)(originalImageName, height, width)) {
                    const imageResized = (0, path_1.join)(thumbsDirectory, `${originalImageName}_${height}_${width}.jpg`);
                    const imageContent = fs_1.default.readFileSync(imageResized, {
                        flag: "r",
                    });
                    response.writeHead(200, { "Content-Type": "image/jpg" });
                    response.write(imageContent);
                    response.end();
                }
                else {
                    response.writeHead(500, {
                        "Content-Type": " application/json; charset=utf-8",
                    });
                    response.write({
                        Message: "Error Happened While Processing Image :(",
                    });
                    response.end();
                }
            }
        }
        catch (error) {
            response.writeHead(500, {
                "Content-Type": " application/json; charset=utf-8",
            });
            response.write({
                Message: "Error Happened While Processing Image :(",
            });
            response.end();
        }
    }
}));
exports.default = imagesProcessingRouter;
