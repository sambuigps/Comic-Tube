import type { comic } from "@/types/comic";
import ComicCard from "./ComicCard";

type ComicSectionProps = {
    sectionTitle: string;
    comicsArray: comic[];
};

export default function ComicSection({ sectionTitle, comicsArray }: ComicSectionProps) {
    return (
        <div className="w-auto m-2.5 p-3 flex-col">
            <span className="font-extrabold text-3xl">{sectionTitle}</span>
            <div className="flex gap-4 pt-2">
                {comicsArray.map((item) => (<ComicCard comic={item} key={item.id} />))}
            </div>
        </div>
    );
}