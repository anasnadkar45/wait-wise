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
        <div className="w-screen h-screen flex custom-scrollbar scroll-smooth">
            <div className="m-3 hidden md:flex flex-col">
                <Sidebar userId={user?.id} />
            </div>
            <div className="w-full">
                <ScrollArea className="h-[100vh] md:h-[100vh] pb-16 md:pb-0">
                    {children}
                </ScrollArea>
            </div>
        </div>
    );
}