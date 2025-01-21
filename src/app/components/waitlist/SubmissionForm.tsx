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
      className="relative max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <input type='hidden' name='projectId' value={project.id} />
      <div className="relative">
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="name@email.com"
          className="bg-[#fff7f7] text-slate-700 pr-32 w-full h-14 border-none"
          required
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <SubmitButton text="Join Waitlist" className='bg-black'/>
        </div>
      </div>
    </motion.form>
  )
}
