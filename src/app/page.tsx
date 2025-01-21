import Wrapper from '@/components/global/wrapper'
import Hero from '@/components/marketing/Hero'
import Navbar from '@/components/marketing/navbar'
import React from 'react'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full z-40 relative bg-black">
        <Wrapper className="py-20 relative">
          <Hero />
        </Wrapper>
      </main>
    </>
  )
}
