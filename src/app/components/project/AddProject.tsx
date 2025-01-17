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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { addNewProject } from '../../actions'

const categories = ['Green', 'Black']
export const AddProject = () => {
    const initialState = { message: "", status: undefined, errors: {} }
    const [state, formAction] = useActionState(addNewProject, initialState)
    const [logo, setLogo] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

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
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default" size="sm">
                        Create Project
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-full sm:max-w-full lg:max-w-[800px] max-h-[100vh] overflow-y-auto p-6">
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
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-left text-sm font-medium">
                                Description
                            </Label>
                            <Textarea placeholder="e.g. High-speed internet access from space" name="description" className="w-full min-h-[100px]" />
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
                            <Label className="text-sm font-medium">Category</Label>
                            <Input name="waitListCode" type="hidden" value={selectedCategory} required className="w-full" />
                            <Select onValueChange={(value) => setSelectedCategory(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Categories</SelectLabel>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
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
                        <DialogFooter>
                            <DialogClose asChild>
                                <SubmitButton text="Create Project" />
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}