import AppSidebar from "@/components/AppSidebar";
import ComicSection from "@/components/ComicSection";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function HomePage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {sectionList.map((item) => (
                    <ComicSection sectionTitle={item.sectionTitle} comicsArray={item.comicsArray} />
                ))}
            </SidebarInset>
        </SidebarProvider >
    );
}

const sectionList = [
    {
        sectionTitle: "Continue Reading", comicsArray: [
            {
                id: "1",
                title: "One Piece",
                cover: "https://picsum.photos/300/450?random=1",
                pages: 30,
            },
            {
                id: "2",
                title: "Solo Leveling",
                cover: "https://picsum.photos/300/450?random=2",
                pages: 30,
            },
            {
                id: "3",
                title: "Jujutsu Kaisen",
                cover: "https://picsum.photos/300/450?random=3",
                pages: 30,
            },
        ]
    },
    {
        sectionTitle: "Newly uploaded", comicsArray: [

            {
                id: "2",
                title: "Solo Leveling",
                cover: "https://picsum.photos/300/450?random=2",
                pages: 30,
            },
            {
                id: "3",
                title: "Jujutsu Kaisen",
                cover: "https://picsum.photos/300/450?random=3",
                pages: 30,
            },
        ]
    },
    {
        sectionTitle: "ComicTube", comicsArray: [
            {
                id: "4",
                title: "That Time I Died and Was Reincarnated as A TSX Component",
                cover: "https://picsum.photos/300/450?random=4",
                pages: 30,
            },
        ]
    },
];