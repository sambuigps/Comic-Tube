import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { comic } from "@/types/comic";
import {
    ArrowLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "lucide-react";

type ToolbarsProps = {
    comic: comic;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    prevPage: () => void;
    nextPage: () => void;
};

export default function Toolbars({
    comic,
    page,
    setPage,
    prevPage,
    nextPage,
}: ToolbarsProps) {
    return (
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between">
            {/* Top Toolbar */}
            <div className="pointer-events-auto flex h-12 w-full items-center gap-2 bg-base-300 px-2">
                <Button
                    size="icon-lg"
                    variant="ghost"
                    className="text-base-content hover:bg-base-200 hover:text-base-content"
                >
                    <ArrowLeftIcon strokeWidth={2} />
                </Button>

                <span className="ml-2 truncate text-xl text-base-content">
                    {comic.title}
                </span>
            </div>

            {/* Bottom Toolbar */}
            <div className="pointer-events-auto flex h-12 w-full items-center gap-3 bg-base-300 px-3">
                <Button
                    size="icon-lg"
                    variant="ghost"
                    className="text-base-content hover:bg-base-200 hover:text-base-content"
                    onClick={prevPage}
                    disabled={page <= 1}
                >
                    <ChevronLeftIcon strokeWidth={4} />
                </Button>

                <Slider
                    value={[page]}
                    onValueChange={(value) => {
                        if (typeof value === "number") {
                            setPage(value);
                        }
                    }}
                    min={1}
                    max={comic.pages}
                    step={1}
                    className="flex-1"
                />

                <span className="w-14 text-center tabular-nums text-base-content/70">
                    {page} / {comic.pages}
                </span>

                <Button
                    size="icon-lg"
                    variant="ghost"
                    className="text-base-content hover:bg-base-200 hover:text-base-content"
                    onClick={nextPage}
                    disabled={page >= comic.pages}
                >
                    <ChevronRightIcon strokeWidth={4} />
                </Button>
            </div>
        </div>
    );
}