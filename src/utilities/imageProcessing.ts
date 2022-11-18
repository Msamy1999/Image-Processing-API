import path from "path";
import sharp from "sharp";
import fs from "fs";

const currentDirectory: string = __dirname;

const imagesDirectory: string = path.join(
  currentDirectory,
  "..",
  "..",
  "original"
);

const thumbsDirectory: string = path.join(
  currentDirectory,
  "..",
  "..",
  "edited"
);

const makeDirectory = (): void => {
  fs.mkdir(thumbsDirectory, (err) => {
    console.log(`Error:${err}`);
  });
};

const checkDir = (): void => {
  if (fs.existsSync(thumbsDirectory)) return;
  else {
    makeDirectory();
    return;
  }
};

const checkImage = (
  image: string,
  iHeight: number,
  iWidth: number
): boolean => {
  const imageResized: string = path.join(
    thumbsDirectory,
    `${image}_${iHeight}_${iWidth}.jpg`
  );

  return fs.existsSync(imageResized);
};

const imageProcessingApi = async (
  image: string,
  iHeight: number,
  iWidth: number
): Promise<void> => {
  const imageResized: string = path.join(
    thumbsDirectory,
    `${image}_${iHeight}_${iWidth}.jpg`
  );
  const nonResizedImage: string = path.join(imagesDirectory, `${image}.jpg`);

  await sharp(nonResizedImage)
    .resize({ height: iHeight, width: iWidth })
    .toFile(imageResized);
};

const imagesProcessing = async (
  image: string,
  iHeight: number,
  iWidth: number
): Promise<boolean> => {
  try {
    checkDir();

    let status = false;

    if (checkImage(image, iHeight, iWidth)) {
      status = true;
    } else {
      await imageProcessingApi(image, iHeight, iWidth);
      status = true;
    }

    return status;
  } catch (err) {
    console.log(`Error:${err}`);
    return false;
  }
};

export default imagesProcessing;
