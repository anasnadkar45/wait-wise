'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function WaitingListGreen({project}:any) {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Submitted email:', email)
    setIsSubmitted(true)
    setEmail('')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f2f9f2] px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <div className="mx-auto w-16 h-16 relative">
          <Image
            src={project.logo}
            alt="Logo"
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-serif text-[#1a472a]">
            Join the Waitlist
          </h1>
          <p className="text-[#2e5a3c] text-lg max-w-md mx-auto">
            Be the first to know when we launch. Sign up below to secure your spot on our waitlist.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow bg-white rounded-md border-gray-200"
            />
            <Button 
              type="submit"
              className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-medium px-6"
            >
              Join waitlist
            </Button>
          </div>
          
          <p className="text-[#2e5a3c] text-sm">
            Join now to secure your #2 place.
          </p>
          
          <p className="text-[#2e5a3c] text-sm">
            We value your privacy. No spam, promised.
          </p>
        </form>

        {isSubmitted && (
          <div className="text-[#4CAF50] font-medium">
            Thanks for joining! We'll be in touch soon.
          </div>
        )}

        {/* Footer */}
        <div className="pt-12">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>Powered by</span>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-S9vxFFcmIJNkuck7ATD6Q8vt4bPyMO.png"
              alt="Waitless Logo"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="font-medium">Waitless</span>
          </div>
        </div>
      </div>
    </div>
  )
}

