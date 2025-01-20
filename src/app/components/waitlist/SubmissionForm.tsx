"use client"
import React, { useActionState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '../buttons/SubmitButton'
import { ProjectType } from '@/app/utils/types'
import { submitWaitList } from '@/app/actions'
import { toast } from 'sonner'

export const SubmissionForm = ({ project }: { project: ProjectType }) => {
    const initialState = { message: "", status: undefined, errors: {} }
    const [state, formAction] = useActionState(submitWaitList, initialState)

    useEffect(() => {
        console.log("State updated:", state)
        if (state.status === "success") {
          toast.success(state.message)
        } else if (state.status === "error") {
          toast.error(state.message)
        }
      }, [state])
    return (
        <motion.form
            action={formAction}
            className="flex flex-col gap-4 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <input type='hidden' name='projectId' value={project.id} />
            <Input
                type="email"
                id='email'
                name='email'
                placeholder="name@email.com"
                className="flex-1 h-16 w-full bg-[#2A2A2A] border-none text-white placeholder:text-gray-500"
                required
            />
            <SubmitButton text='Join Waitlist' />
        </motion.form>
    )
}
