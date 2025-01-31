"use client"

import { Button } from '@/components/ui/button'
import React, { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { X } from 'lucide-react'
import { UploadDropzone } from '../../utils/uploadthing'
import { SubmitButton } from '../buttons/SubmitButton'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { addNewProject } from '../../actions'
import { cn } from '@/lib/utils'
import { Logo } from '../../../../public/logo'
import { ProjectDescriptionGenerator } from './ProjectDescriptionGenerator'

export const themes = [
    {
        name: 'Black',
        backgroundColor: 'Black',
        foregroundColor: 'white',
    },
    {
        name: 'Green',
        backgroundColor: '#d7ffd7',
        foregroundColor: '#166534',
    },
]
export const AddProject = () => {
    const initialState = { message: "", status: undefined, errors: {} }
    const [state, formAction] = useActionState(addNewProject, initialState)
    const [logo, setLogo] = useState<string>('')
    const [selectedTheme, setSelectedTheme] = useState(themes[0]);
    const [description, setDescription] = useState("")

    const handleDescriptionGenerated = (generatedDescription: string) => {
        setDescription(generatedDescription)
    }

    useEffect(() => {
        console.log("State updated:", state)
        if (state.status === "success") {
            toast.success(state.message)
        } else if (state.status === "error") {
            toast.error(state.message)
        }
    }, [state])

    const handleRemoveLogo = () => {
        setLogo('')
    }
    return (
        <div>
            <Dialog >
                <DialogTrigger asChild>
                    <Button variant="default" size="sm">
                        Create Project
                    </Button>
                </DialogTrigger>
                <DialogContent className=" max-w-[90vw] max-h-[90vh] grid grid-cols-2 overflow-y-auto p-0">
                    <div className='border-r-2 p-4'>
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-bold mb-6">Add Project</DialogTitle>
                        </DialogHeader>
                        <form action={formAction} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-left text-sm font-medium">
                                    Name
                                </Label>
                                <Input id="name" name="name" placeholder="e.g. Starlink" className="w-full" />
                                {state.errors?.name && (
                                    <p className="text-destructive">{state.errors.name}</p>
                                )}
                            </div>
                            <ProjectDescriptionGenerator onDescriptionGenerated={handleDescriptionGenerated} />
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-left text-sm font-medium">
                                    Description
                                </Label>
                                <Textarea placeholder="e.g. High-speed internet access from space" name="description" value={description} className="w-full min-h-[100px]" />
                                {state.errors?.description && (
                                    <p className="text-destructive">{state.errors.description}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Handle</Label>
                                <Input name="handle" type="text" placeholder="e.g. starlink" required minLength={3} className="w-full" />
                                {state.errors?.handle && (
                                    <p className="text-destructive">{state.errors.handle}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Pick a theme</Label>
                                <Input name="waitListCode" type="hidden" value={selectedTheme.name} required className="w-full" />
                                <div className='grid grid-cols-3 gap-2'>
                                    {themes.map((theme, id) => (
                                        <Button
                                            key={id}
                                            type='button'
                                            className={cn(
                                                "flex flex-col gap-2 rounded-lg border-2 p-4 h-32 text-left hover:border-primary",
                                            )}
                                            style={{ backgroundColor: theme.backgroundColor, borderColor: selectedTheme.name === theme.name ? theme.foregroundColor : '' }}
                                            onClick={() => setSelectedTheme(theme)}
                                        >
                                            <span className="text-sm font-medium" style={{ color: theme.foregroundColor }}>
                                                {theme.name}
                                            </span>
                                            <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: theme.backgroundColor }} />
                                        </Button>
                                    ))}
                                </div>
                                {state.errors?.waitListCode && (
                                    <p className="text-destructive">{state.errors.waitListCode}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <input type="hidden" name="logo" value={logo} />
                                <div className='flex items-center justify-start gap-10'>
                                    <div>
                                        <Label className="text-sm font-medium">Logo</Label>
                                        <UploadDropzone
                                            endpoint="imageUploader"
                                            onClientUploadComplete={(res) => {
                                                setLogo(res[0].url)
                                                toast.success("Your images have been uploaded")
                                            }}
                                            onUploadError={(error: Error) => {
                                                toast.error("Something went wrong, try again")
                                            }}
                                        />
                                    </div>
                                    {logo.length > 0 &&
                                        <div className="relative w-40 group border-2 border-primary/20 rounded-lg">
                                            <Image
                                                src={logo}
                                                alt={logo}
                                                width={400}
                                                height={400}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveLogo()}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    }
                                </div>
                                {state.errors?.logo && (
                                    <p className="text-destructive">{state.errors.logo}</p>
                                )}

                            </div>
                            <DialogFooter className='w-full'>
                                <DialogClose asChild>
                                    <SubmitButton text="Create Project" className='w-full' />
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </div>
                    <div className='flex flex-col gap-6 justify-center items-center' style={{ backgroundColor: selectedTheme.backgroundColor, color: selectedTheme.foregroundColor }}>
                        <div className="relative">
                            <Input className="bg-[#fff7f7] pr-24 w-full h-14 border-none" placeholder="Email" />
                            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2" style={{ backgroundColor: selectedTheme.foregroundColor, color: selectedTheme.backgroundColor }}>
                                Sign Up
                            </Button>
                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}