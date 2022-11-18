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
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const currentDirectory = __dirname;
const imagesDirectory = path_1.default.join(currentDirectory, "..", "..", "original");
const thumbsDirectory = path_1.default.join(currentDirectory, "..", "..", "edited");
const makeDirectory = () => {
    fs_1.default.mkdir(thumbsDirectory, (err) => {
        console.log(`Error:${err}`);
    });
};
const checkDir = () => {
    if (fs_1.default.existsSync(thumbsDirectory))
        return;
    else {
        makeDirectory();
        return;
    }
};
const checkImage = (image, iHeight, iWidth) => {
    const imageResized = path_1.default.join(thumbsDirectory, `${image}_${iHeight}_${iWidth}.jpg`);
    return fs_1.default.existsSync(imageResized);
};
const imageProcessingApi = (image, iHeight, iWidth) => __awaiter(void 0, void 0, void 0, function* () {
    const imageResized = path_1.default.join(thumbsDirectory, `${image}_${iHeight}_${iWidth}.jpg`);
    const nonResizedImage = path_1.default.join(imagesDirectory, `${image}.jpg`);
    yield (0, sharp_1.default)(nonResizedImage)
        .resize({ height: iHeight, width: iWidth })
        .toFile(imageResized);
});
const imagesProcessing = (image, iHeight, iWidth) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        checkDir();
        let status = false;
        if (checkImage(image, iHeight, iWidth)) {
            status = true;
        }
        else {
            yield imageProcessingApi(image, iHeight, iWidth);
            status = true;
        }
        return status;
    }
    catch (err) {
        console.log(`Error:${err}`);
        return false;
    }
});
exports.default = imagesProcessing;
