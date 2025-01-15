'use client'

import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, Settings, User } from 'lucide-react'
import Link from "next/link"
import { ProjectCard } from "@/app/components/ProjectCard"
import { redirect } from "next/navigation"
import { Logo } from "../../../../../public/logo"
import { AddProject } from "@/app/components/AddProject"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <nav className="flex w-[240px] m-4 flex-col border rounded-lg">
        <div className="flex h-14 items-center gap-2 px-4">
          <Logo />
          <span className="font-medium">Waitless</span>
        </div>

        <div className="flex-1 space-y-1 p-2">
          <Button variant="ghost" className="w-full justify-start gap-2 rounded-md px-2" asChild>
            <Link href="/updates">Updates</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 rounded-md px-2" asChild>
            <Link href="/support">
              <MessageSquare size={16} />
              Support
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 rounded-md px-2" asChild>
            <Link href="/settings">
              <Settings size={16} />
              Settings
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 rounded-md px-2" asChild>
            <Link href="/account">
              <User size={16} />
              Account
            </Link>
          </Button>
        </div>

        <div className="border-t p-4">
          <div className="mb-2 text-xs font-medium text-muted-foreground">FREE PLAN</div>
          <div className="mb-4 text-sm">
            <span className="font-medium">1</span>
            <span className="text-muted-foreground"> / 2,500 signups</span>
          </div>
          <Button size="sm" className="w-full" variant="outline">
            Upgrade Plan
          </Button>

        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 border-l">
        <header className="flex h-14 items-center justify-between border-b px-4">
          <h1 className="text-lg font-medium">Your projects</h1>
          <AddProject />
        </header>

        <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
          <ProjectCard
            name="waitlist"
            totalSignUps={0}
            last24h={0}
          />
          <ProjectCard
            name="RefFollowUp"
            totalSignUps={1}
            last24h={0}
          />
        </div>
      </main>
    </div>
  )
}



