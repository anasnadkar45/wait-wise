import { Sidebar } from "@/app/components/global/Sidebar";
import { requireUser } from "@/app/utils/hooks";
import { ScrollArea } from "@/components/ui/scroll-area";


export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = await requireUser();
    return (
        <div className="w-screen h-screen bg-background flex custom-scrollbar scroll-smooth">
            <div className="m-3 hidden md:flex flex-col">
                <Sidebar userId={user?.id as string} />
            </div>
            <ScrollArea className="h-[calc(100vh-1.5rem)] w-full m-3 p-4 bg-card border rounded-xl custom-scrollbar scroll-smooth">
                {children}
            </ScrollArea>

        </div>
    );
}