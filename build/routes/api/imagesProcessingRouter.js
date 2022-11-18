"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = require("path");
var imageProcessing_1 = __importDefault(
  require("../../utilities/imageProcessing")
);
var currentDirectory = __dirname;
var thumbsDirectory = (0, path_1.join)(
  currentDirectory,
  "..",
  "..",
  "..",
  "edited"
);
var imagesProcessingRouter = express_1.default.Router();
imagesProcessingRouter.get("/", function (request, response) {
  return __awaiter(void 0, void 0, void 0, function () {
    var images,
      height,
      width,
      originalImageName,
      iReasult,
      hReasult,
      wReasult,
      i,
      iResized,
      iContent,
      error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          images = [
            "encenadaport",
            "fjord",
            "icelandwaterfall",
            "palmtunnel",
            "santamonica",
          ];
          height = parseInt(request.query.height);
          width = parseInt(request.query.width);
          originalImageName = request.query.image;
          iReasult = false;
          hReasult = false;
          wReasult = false;
          // validate image name
          for (i = 0; i < images.length; i++) {
            if (originalImageName == images[i]) {
              iReasult = true;
              break;
            } else iReasult = false;
          }
          // validate height
          if (height > 0 && !isNaN(height) && !NaN) {
            hReasult = true;
          }
          // validate width
          if (width > 0 && !isNaN(width) && !NaN) {
            wReasult = true;
          }
          if (!!iReasult) return [3 /*break*/, 1];
          response
            .status(400)
            .json({ Message: "Error image name is not valid" });
          response.end();
          return [3 /*break*/, 7];
        case 1:
          if (!!hReasult) return [3 /*break*/, 2];
          response
            .status(400)
            .json({ Message: "Error  height it/'s not valid" });
          response.end();
          return [3 /*break*/, 7];
        case 2:
          if (!!wReasult) return [3 /*break*/, 3];
          response
            .status(400)
            .json({ Message: "Error  width it/'s not valid" });
          response.end();
          return [3 /*break*/, 7];
        case 3:
          _a.trys.push([3, 6, , 7]);
          if (!(wReasult && hReasult && iReasult)) return [3 /*break*/, 5];
          return [
            4 /*yield*/,
            (0, imageProcessing_1.default)(originalImageName, height, width),
          ];
        case 4:
          if (_a.sent()) {
            iResized = (0, path_1.join)(
              thumbsDirectory,
              ""
                .concat(originalImageName, "_")
                .concat(height, "_")
                .concat(width, ".jpg")
            );
            iContent = fs_1.default.readFileSync(iResized, {
              flag: "r",
            });
            response.writeHead(200, { "Content-Type": "image/jpg" });
            response.write(iContent);
            response.end();
          } else {
            response.writeHead(500, {
              "Content-Type": " application/json; charset=utf-8",
            });
            response.write({
              Message: " Error Happened While Processing Image ",
            });
            response.end();
          }
          _a.label = 5;
        case 5:
          return [3 /*break*/, 7];
        case 6:
          error_1 = _a.sent();
          response.writeHead(500, {
            "Content-Type": " application/json; charset=utf-8",
          });
          response.write({
            Message: " Error Happened While Processing Image ",
          });
          response.end();
          return [3 /*break*/, 7];
        case 7:
          return [2 /*return*/];
      }
    });
  });
});
exports.default = imagesProcessingRouter;
