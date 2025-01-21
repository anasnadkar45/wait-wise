"use client"
import { updateProject } from '@/app/actions'
import { SubmitButton } from '@/app/components/buttons/SubmitButton'
import { themes } from '@/app/components/project/AddProject'
import { ProjectType } from '@/app/utils/types'
import { UploadDropzone } from '@/app/utils/uploadthing'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'

const UpdateProject = ({project}:{project:ProjectType}) => {
  const initialState = { message: "", status: undefined, errors: {} }
  const [state, formAction] = useActionState(updateProject, initialState)
  const [logo, setLogo] = useState<string>(project.logo)
  const [selectedTheme, setSelectedTheme] = useState<string>(project.waitListCode);
  console.log(project)

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
      <form action={formAction} className="space-y-6">
        <input type="hidden" name='projectId' value={project.id} />
        <div className="space-y-2">
          <Label htmlFor="name" className="text-left text-sm font-medium">
            Name
          </Label>
          <Input id="name" name="name" defaultValue={project.name} placeholder="e.g. Starlink" className="w-full" />
          {state.errors?.name && (
            <p className="text-destructive">{state.errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-left text-sm font-medium">
            Description
          </Label>
          <Textarea defaultValue={project.description} placeholder="e.g. High-speed internet access from space" name="description" className="w-full min-h-[100px]" />
          {state.errors?.description && (
            <p className="text-destructive">{state.errors.description}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Handle</Label>
          <Input name="handle" type="text" defaultValue={project.handle} placeholder="e.g. starlink" required minLength={3} className="w-full" />
          {state.errors?.handle && (
            <p className="text-destructive">{state.errors.handle}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Pick a theme</Label>
          <Input name="waitListCode" type="hidden" value={selectedTheme} required className="w-full" />
          <div className='grid grid-cols-3 gap-2'>
            {themes.map((theme) => (
              <Button
                type='button'
                className={cn(
                  "flex flex-col gap-2 rounded-lg border-2 p-4 h-32 text-left hover:border-primary",
                )}
                style={{ backgroundColor: theme.backgroundColor, borderColor: selectedTheme === theme.name ? theme.foregroundColor : '' }}
                onClick={() => setSelectedTheme(theme.name)}
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
        <SubmitButton text="Update Project" />
      </form>
    </div>
  )
}

export default UpdateProject