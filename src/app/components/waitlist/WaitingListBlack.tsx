'use client'

import { useActionState, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spotlight } from '@/components/ui/Spotlight'
import { Geist, Geist_Mono } from "next/font/google";
import { toast } from 'sonner'
import { submitWaitList } from '@/app/actions'
import { SubmitButton } from '../buttons/SubmitButton'

export default function WaitingListBlack({ project }: any) {
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
    <div className="h-screen w-full rounded-md flex flex-col items-center justify-center bg-black/70 bg-[linear-gradient(to_right,#1f1f1f44_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f44_1px,transparent_1px)] bg-[size:1rem_1rem] antialiased bg-grid-white/10 relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />


      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4  text-center">
        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-[#2A2A2A] rounded-full px-4 py-2 mb-12"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm">Get your spot now</span>
        </motion.div>

        {/* Header */}
        <header className="flex justify-center items-center p-6">
          <h1 className="text-2xl font-bold">{project.name}</h1>
        </header>

        {/* Heading */}
        <motion.h2
          className="text-5xl font-medium leading-tight mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Join the {project.name} Waiting<br />
          List for Exclusive Access
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Be the first to know when we launch. Sign up below to secure your spot on our waitlist.
        </motion.p>

        {/* Form */}
        <motion.form
          action={formAction}
          className="flex gap-4 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <input type='hidden' name='projectId' value={project.id}/>
          <Input
            type="email"
            id='email'
            name='email'
            placeholder="name@email.com"
            className="flex-1 h-12 w-[600px] bg-[#2A2A2A] border-none text-white placeholder:text-gray-500"
            required
          />
          <SubmitButton text='Join Waitlist'/>
        </motion.form>

        {/* Join Count */}
        <motion.div
          className="flex items-center justify-center gap-3 text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span>Over 200+ have already joined</span>
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-gray-600 border-2 border-[#1C1C1C]"
              />
            ))}
          </div>
        </motion.div>

      </main>
    </div>
  )
}

