"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var imagesProcessingRouter_1 = __importDefault(
  require("./api/imagesProcessingRouter")
);
var router = express_1.default.Router();
router.use(
  "/images",
  express_1.default.static(
    path_1.default.join(__dirname, "..", "..", "original")
  )
);
router.get("/", function (request, response) {
  response.status(200).json({ Message: "welcome To Image Processing Server " });
  response.end();
});
router.use("/api/resize", imagesProcessingRouter_1.default);
router.all("/*", function (request, response) {
  response
    .status(404)
    .json({ Message: "Error 404 Not Found ->".concat(request.url, " ") });
  response.end();
});
exports.default = router;
