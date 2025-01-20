'use client'

import { motion } from 'framer-motion'
import { ProjectType } from '@/app/utils/types'
import { SubmissionForm } from './SubmissionForm'

export default function WaitingListGreen({ project }: { project: ProjectType }) {

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#d7ffd7] text-green-800 relative overflow-hidden">

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 text-center">
        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 mb-12"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm">Get your spot now</span>
        </motion.div>

        {/* Header */}
        <header className="flex justify-center items-center p-6">
          <h1 className="text-xl font-medium">{project.name}</h1>
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
          className="text-green-700 text-lg mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Be the first to know when we launch. Sign up below to secure your spot on our waitlist.
        </motion.p>

        {/* Form */}
        <SubmissionForm project={project} />

        {/* Join Count */}
        <motion.div
          className="flex items-center justify-center gap-3 text-green-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span>Over 200+ have already joined</span>
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-green-200 border-2 border-[#f2f9f2]"
              />
            ))}
          </div>
        </motion.div>


      </main>

    </div>
  )
}

