export const cleanupMiddleware = (req, res, next) => {
    req.cleanupTasks = [];

    req.addCleanup = (task) => {
        if (typeof task === "function") {
            req.cleanupTasks.push(task);
        }
    };

    let cleanedUp = false;
    const executeCleanup = async () => {
        if (cleanedUp) return;
        cleanedUp = true;

        for (const task of req.cleanupTasks) {
            try {
                await task();
            } catch (err) {
                console.error("Post-response cleanup error:", err);
            }
        }
    }
    
    res.once("finish", executeCleanup);
    res.once("close", executeCleanup);

    next();
};