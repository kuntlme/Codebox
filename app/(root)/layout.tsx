
import Footer from '@/features/home/components/footer'
import Header from '@/features/home/components/header'
import React from 'react'

const HomeLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='bg-white dark:bg-zinc-800'>
    {/* header */}
    <Header/>
    {/* main */}
    <main className='z-20 relative w-full pt-0 md:pt-0'>
        {children}
    </main>
    {/* footer */}
    <Footer />

    </div>
  )
}

export default HomeLayout