import AppSidebar from "@/components/AppSidebar";
import ComicSection from "@/components/ComicSection";
import { SidebarInset } from "@/components/ui/sidebar";

export default function HomePage() {
    return (
        <>
            <AppSidebar />
            <SidebarInset>
                {sectionList.map((item) => (
                    <ComicSection sectionTitle={item.sectionTitle} comicsArray={item.comicsArray} />
                ))}
            </SidebarInset>
        </>
    );
}

const sectionList = [
    {
        sectionTitle: "Continue Reading", comicsArray: [
            {
                id: "1",
                title: "One Piece",
                cover: "https://picsum.photos/300/450?random=1",
            },
            {
                id: "2",
                title: "Solo Leveling",
                cover: "https://picsum.photos/300/450?random=2",
            },
            {
                id: "3",
                title: "Jujutsu Kaisen",
                cover: "https://picsum.photos/300/450?random=3",
            },
        ]
    },
    {
        sectionTitle: "Newly uploaded", comicsArray: [

            {
                id: "2",
                title: "Solo Leveling",
                cover: "https://picsum.photos/300/450?random=2",
            },
            {
                id: "3",
                title: "Jujutsu Kaisen",
                cover: "https://picsum.photos/300/450?random=3",
            },
        ]
    },
    { sectionTitle: "ComicTube", comicsArray: [
        {
                id: "4",
                title: "That Time I Died and Was Reincarnated as A TSX Component",
                cover: "https://picsum.photos/300/450?random=4",
            },
    ] },
];