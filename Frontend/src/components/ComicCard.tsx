import type { comic } from "@/types/comic";

type ComicCardProps = {
    comic: comic;
};

export default function ComicCard({ comic }: ComicCardProps) {
    return (
        <div className="h-76 w-40 flex flex-col rounded-2xl overflow-hidden">
            <div className="h-60 w-40 bg-blue-300">
                <img src={comic.cover} alt={comic.title} />
            </div>
            <div className="h-16 bg-blue-300 p-2 line-clamp-2 text-ellipsis">
                {comic.title}
            </div>
            <div >

            </div>
        </div>
    );
}