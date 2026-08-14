class Rate {
    constructor(Limit, WindowSeconds) {
        this.Limit = Limit;
        this.WindowSeconds = WindowSeconds;
    }
}

export const DEFAULT_RATE = new Rate(2, 5);

export const STRICT_RATE = new Rate(3, 10);

export const LENIENT_RATE = new Rate(1, 1);