'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, Settings, UserCircle } from 'lucide-react'
import { FaAnglesLeft } from "react-icons/fa6";
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ModeToggle } from '../theme/ModeToggle'

interface userProps {
    userId: string
}

export function Sidebar({ userId }: userProps) {
    const pathname = usePathname()
    const projectId = pathname.split('/')[2];
    const sidebarLinks = [
        {
            category: "MENU",
            links: [
                { id: 0, name: "Dashboard", href: `/admin/${projectId}/dashboard`, icon: HomeIcon },
                { id: 1, name: "People", href: `/admin/${projectId}/people`, icon: UserCircle },
            ],
        },
        {
            category: "SUPPORT",
            links: [
                { id: 1, name: "Settings", href: "/settings/profile", icon: Settings },
            ],
        },
    ]


    return (
        <div className="hidden md:flex flex-col h-screen w-[220px]  bg-card/20 rounded-2xl p-2 border ">
            {/* <div className="flex justify-between items-center h-16 p-2 rounded-2xl border-2 bg-card">
                <div className='flex items-center gap-3'>
                    {project && project.logo ? (
                        <Image
                            src={project.logo}
                            alt={project.name || "Project"}
                            width={40}
                            height={40}
                            className='rounded-md border-2 border-muted'
                        />
                    ) : null}

                    <div>
                        <h1 className='text-lg font-bold text-primary'>{project?.name}</h1>
                    </div>
                </div>
                <FaAnglesLeft className='h-8 w-6 text-muted-foreground' />
            </div> */}

            {/* <ModeToggle /> */}
            <div className="flex h-full flex-col justify-between p-2">
                <div className="space-y-6 mt-4">
                    {sidebarLinks.map((section) => (
                        <div key={section.category} className="space-y-1">
                            <h2 className="px-4 text-xs font-bold text-zinc-500">{section.category}</h2>
                            <nav className="space-y-1">
                                {section.links.map((link) => (
                                    <Link
                                        key={link.id}
                                        href={link.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-primary",
                                            pathname.includes(link.href) && "bg-accent/80 text-primary/70 hover:bg-accent hover:text-primary"
                                        )}
                                    >
                                        <link.icon className="h-4 w-4" />
                                        {link.name}
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
