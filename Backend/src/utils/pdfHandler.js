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

    console.log(output);
    await poppler.pdfImages(file, output, {
        allFiles: true,
    });

    return outputDir;
}
