"use client"
import { projectType } from '@/app/utils/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Clipboard } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export const ShareCard = ({project}:{project:projectType}) => {
    const [copied, setCopied] = useState(false)
    const handleCopyClick = () => {
        if (project?.handle) {
            navigator.clipboard.writeText(`localhost:3000/${project.handle}`).then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)  // Reset copied state after 2 seconds
            })
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Share
                </CardTitle>
                <CardDescription>
                    {project?.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Input defaultValue={`waitwise.com/${project?.handle}`} readOnly />
                <Button variant={'outline'} size={'icon'} onClick={handleCopyClick}>
                    <Clipboard />
                </Button>
                {copied && <span className="text-green-500">Copied!</span>}
            </CardContent>
            <CardFooter>
                <Link href={`/${project?.handle}`} target="_blank" rel="noopener noreferrer">
                    <Button>Visit</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}