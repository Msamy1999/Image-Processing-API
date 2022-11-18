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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const imageProcessing_1 = __importDefault(require("../utilities/imageProcessing"));
// create a request object
const request = (0, supertest_1.default)(index_1.default);
describe("Test endpoint response", () => {
    it("test / endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/");
        expect(response.status).toBe(200);
    }));
    it("test /images/fjord.jpg endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/images/fjord.jpg");
        expect(response.status).toBe(200);
    }));
});
describe("Test Api ", () => {
    it("test / endpoint with valid query", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/api/resize/")
            .query({ height: 40, width: 50, image: "fjord" });
        expect(response.status).toBe(200);
    }));
    it("test / endpoint with unvaild", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/api/resize/")
            .query({ height: -1, width: 0, image: "something" });
        expect(response.status).toBe(400);
    }));
    it("test Functionality  with vaild", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, imageProcessing_1.default)("fjord", 99, 99);
        expect(result).toBe(true);
    }));
});
