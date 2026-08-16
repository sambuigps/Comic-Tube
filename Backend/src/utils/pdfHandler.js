import { Poppler } from "node-poppler";
import path from "path";
import fs from "fs/promises";

const poppler = new Poppler();

export const getImageCount = async (file) => {
    const info = await poppler.pdfInfo(file, { printAsJson: true });
    return info.pages;
}

export const extractImages = async (file, fileDir) => {
    const outputDir = path.join(fileDir, "output");
    await fs.mkdir(outputDir, { recursive: true });
    const output = path.join(outputDir, "page");

    await poppler.pdfImages(file, output, {
        allFiles: true,
    });

    const images = await fs.readdir(outputDir);
    return images.map(file => path.join(outputDir, file));
}
