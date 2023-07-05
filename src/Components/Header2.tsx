import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header2 = () => {
  return (
    <div>
      <header className=" w-screen flex fixed justify-between items-center py-4 bg-neutral-400 	">
      <Link href="/" className="flex ml-10 gap-2 cursor-pointer">
        <Image src="/logo.png" alt="logo" width={40}
        height={40} />
        <div className=" m-auto text-xl text-white">Thesis Management System</div>
      </Link>  
      </header>
    </div>
  )
}

export default Header2
