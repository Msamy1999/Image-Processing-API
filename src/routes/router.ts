import express, { Router, Request, Response } from "express";
import path from "path";
import imagesProcessingRouter from "./api/imagesProcessingRouter";

const router: Router = express.Router();

router.use(
  "/images",
  express.static(path.join(__dirname, "..", "..", "original"))
);

router.get("/", (request: Request, response: Response): void => {
  response.status(200).json("Hello To Image Processing Server");
  response.end();
});

router.use("/api/resize", imagesProcessingRouter);

router.all("/*", (request: Request, response: Response): void => {
  response.status(404).json(`Error 404 Not Found  > r${request.url} `);
  response.end();
});

export default router;
