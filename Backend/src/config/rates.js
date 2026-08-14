class Rate {
    constructor(Limit, WindowSeconds) {
        this.Limit = Limit;
        this.WindowSeconds = WindowSeconds;
    }
}

export const DEFAULT_RATE = new Rate(5, 60);

export const STRICT_RATE = new Rate(10, 60);

export const LENIENT_RATE = new Rate(120, 60);