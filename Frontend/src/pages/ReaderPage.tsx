import Toolbars from "@/components/Toolbars";
import type { comic } from "@/types/comic";
import { useEffect, useState } from "react";

type ReaderPageProps = { comic: comic };

export default function ReaderPage({ comic }: ReaderPageProps) {
    const [toolbar, setToolbar] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSrc, setPageSrc] = useState("");

    const prevPage = () => setPage((p) => Math.max(1, p - 1));
    const nextPage = () => setPage((p) => Math.min(comic.pages, p + 1));

    const toggleToolbar = () => setToolbar((t) => !t);

    useEffect(() => {
        setPageSrc(`https://picsum.photos/300/450?random=${page})}`);
        
        console.log("Page changed:", page);
    }, [page]);

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-base-100">
            {/* Reader */}
            <div className="h-full w-full">
                <div className="flex h-full w-full items-center justify-center">
                    <img
                        src={pageSrc}
                        alt={`Page ${page}`}
                        className="h-full w-auto object-contain"
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="absolute inset-0 z-10 flex">
                <div className="flex-1" onClick={prevPage} />
                <div className="flex-1" onClick={toggleToolbar} />
                <div className="flex-1" onClick={nextPage} />
            </div>

            {/* Toolbars */}
            {toolbar && (
                <Toolbars
                    comic={comic}
                    page={page}
                    setPage={setPage}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />
            )}
        </div>
    );
}