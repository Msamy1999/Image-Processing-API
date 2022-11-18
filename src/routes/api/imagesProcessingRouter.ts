import express, { Router, Request, Response } from "express";
import fs from "fs";
import { join } from "path";
import imagesProcessing from "../../utilities/imageProcessing";

const currentDirectory: string = __dirname;
const thumbsDirectory: string = join(
  currentDirectory,
  "..",
  "..",
  "..",
  "edited"
);

const imagesProcessingRouter: Router = express.Router();

imagesProcessingRouter.get(
  "/",
  async (request: Request, response: Response): Promise<void> => {
    const images: string[] = [
      "encenadaport",
      "fjord",
      "icelandwaterfall",
      "palmtunnel",
      "santamonica",
    ];

    const height: number = parseInt(request.query.height as string);
    const width: number = parseInt(request.query.width as string);
    const originalImageName: string = request.query.image as string;

    let imageResult = false;
    let heightResult = false;
    let widthResult = false;

    // validate image name

    for (let i = 0; i < images.length; i++) {
      if (originalImageName == images[i]) {
        imageResult = true;
        break;
      } else imageResult = false;
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
    } else {
      try {
        // Api started
        if (widthResult && heightResult && imageResult) {
          if (await imagesProcessing(originalImageName, height, width)) {
            const imageResized: string = join(
              thumbsDirectory,
              `${originalImageName}_${height}_${width}.jpg`
            );
            const imageContent: Buffer = fs.readFileSync(imageResized, {
              flag: "r",
            });
            response.writeHead(200, { "Content-Type": "image/jpg" });
            response.write(imageContent);
            response.end();
          } else {
            response.writeHead(500, {
              "Content-Type": " application/json; charset=utf-8",
            });
            response.write({
              Message: "Error Happened While Processing Image :(",
            });
            response.end();
          }
        }
      } catch (error) {
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
);

export default imagesProcessingRouter;
