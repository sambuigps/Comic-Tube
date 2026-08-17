import fs from "fs/promises";

export const removeDirectory = async (dir) => {
    if (!dir) return;

    try {
        await fs.rm(dir, {
            recursive: true,
            force: true,
        });
    } catch (err) {
        console.error("Failed to cleanup temporary directory:", err);
    }
};