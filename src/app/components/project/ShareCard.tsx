"use client"

import { ProjectType } from '@/app/utils/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Clipboard, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

export const ShareCard = ({project}:{project:ProjectType}) => {
    const [copied, setCopied] = useState(false)
    const shareUrl = `/${project?.handle}`

    const handleCopyClick = () => {
        if (project?.handle) {
            navigator.clipboard.writeText(shareUrl).then(() => {
                setCopied(true)
                toast.success("Copyied successfully")
                setTimeout(() => setCopied(false), 2000)
            })
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Share <Clipboard className="h-5 w-5" />
                </CardTitle>
                <CardDescription>
                    Share your waitlist page with potential users
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Input 
                        value={shareUrl} 
                        readOnly 
                        className="flex-grow"
                    />
                    <Button 
                        variant={copied ? 'secondary' : 'default'} 
                        size={'icon'} 
                        onClick={handleCopyClick}
                    >
                        <Clipboard className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    Use this link to direct users to your waitlist page.
                </p>
            </CardContent>
            <CardFooter>
                <Link href={shareUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full">
                        Visit Page <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
