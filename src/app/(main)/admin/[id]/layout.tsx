import { Sidebar } from "@/app/components/global/Sidebar";
import { requireUser } from "@/app/utils/hooks";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
    params: { id: string }
    children: React.ReactNode
  }
export default async function ProjectLayout({ params: { id }, children }: Props) {
    const { user } = await requireUser();
    return (
        <div className="w-screen h-screen bg-background flex custom-scrollbar scroll-smooth">
            <div className="m-3 mr-0 hidden md:flex flex-col">
                <Sidebar userId={user?.id as string} activeProjectId={id}/>
            </div>
            <ScrollArea className="h-[calc(100vh-1.5rem)] w-full m-3 p-4 bg-secondary/40 border rounded-2xl custom-scrollbar scroll-smooth">
                {children}
            </ScrollArea>

        </div>
    );
}