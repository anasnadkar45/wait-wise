'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { HomeIcon, Settings, UserCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '../../../../public/logo'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/utils/redux/store'
import { ModeToggle } from '../theme/ModeToggle'

interface userProps {
    userId: string
    activeProjectId: string
}

export function Sidebar({ userId, activeProjectId }: userProps) {
    const router = useRouter()
    const pathname = usePathname()
    const projectId = activeProjectId
    const projects = useSelector((state: RootState) => state.ProjectsReducer.projects);
    console.log(projects)
    const sidebarLinks = [
        {
            category: "MENU",
            links: [
                { id: 0, name: "Dashboard", href: `/admin/${projectId}/dashboard`, icon: <HomeIcon /> },
                { id: 1, name: "People", href: `/admin/${projectId}/people`, icon: <UserCircle /> },
            ],
        },
        {
            category: "SUPPORT",
            links: [
                { id: 1, name: "Settings", href: "/settings/profile", icon: <Settings /> },
            ],
        },
    ]

    const onChangeActiveWorkspace = (value: string) => {
        router.push(`/admin/${value}/dashboard`)
    }

    return (
        <div className="bg-card flex-none relative p-4 h-full w-[250px] rounded-xl border-2 flex flex-col gap-4 items-start overflow-hidden">
            <div className="bg-background p-4 flex gap-2 justify-center items-center border-b mb-4 absolute top-0 left-0 right-0 ">
                <Logo />
                <p className="text-2xl font-bold">WaitWise</p>
                <ModeToggle />
            </div>
            <Select
                defaultValue={activeProjectId}
                onValueChange={onChangeActiveWorkspace}
            >
                <SelectTrigger className="mt-16">
                    <SelectValue placeholder="Select a workspace"></SelectValue>
                </SelectTrigger>
                <SelectContent className="backdrop-blur-xl">
                    <SelectGroup>
                        <SelectLabel>Workspaces</SelectLabel>
                        <Separator />
                        {projects.map((workspace) => (
                            <SelectItem
                                value={workspace.id}
                                key={workspace.id}
                            >
                                {workspace.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className="flex h-full flex-col justify-between p-2">
                <div className="space-y-6 mt-4">
                    {sidebarLinks.map((section) => (
                        <div key={section.category} className="space-y-1">
                            <h2 className="text-xs font-bold text-muted-foreground">{section.category}</h2>
                            <nav className="px-1 space-y-1">
                                {section.links.map((link) => (
                                    <Link
                                        key={link.id}
                                        href={link.href}
                                        className={cn(
                                            'flex items-center justify-between group rounded-lg hover:bg-muted',
                                            pathname.includes(link.href) ? 'bg-muted' : ''
                                        )}
                                    >
                                        <div className="flex items-center gap-2 transition-all p-[5px] cursor-pointer">
                                            {link.icon}
                                            <span
                                                className={cn(
                                                    'font-medium group-hover:text-[#9D9D9D] transition-all truncate w-32',
                                                    pathname.includes(link.href) ? 'text-[#9D9D9D]' : 'text-[#545454]'
                                                )}
                                            >
                                                {link.name}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}