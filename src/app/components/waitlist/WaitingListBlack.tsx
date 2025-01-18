'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spotlight } from '@/components/ui/Spotlight'
import { Geist, Geist_Mono } from "next/font/google";

export default function WaitingListBlack({ project }: any) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted email:', email)
  }

  return (
    <div className="h-screen w-full rounded-md flex flex-col items-center justify-center bg-black/70 bg-[linear-gradient(to_right,#2a2a2a5a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a5a_1px,transparent_1px)] bg-[size:1rem_1rem] antialiased bg-grid-white/10 relative overflow-hidden">
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
          onSubmit={handleSubmit}
          className="flex gap-4 max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Input
            type="email"
            placeholder="name@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 bg-[#2A2A2A] border-none text-white placeholder:text-gray-500"
            required
          />
          <Button
            type="submit"
            className="h-12 px-8 bg-[#40ff93] hover:bg-[#40ff83] text-muted"
          >
            Join Waitlist
          </Button>
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

