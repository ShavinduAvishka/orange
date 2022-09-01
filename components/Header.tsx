import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'


function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const { logout } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
          }
    },[])

  return (
    <header className={`${isScrolled && 'bg-[#141414] drop-shadow-2xl'}`}>
        <div className="flex items-center space-x-2 md:space-x-10 drop-shadow-2xl ">
        <img
          src="https://rb.gy/we8jfx"
          width={180}
          height={180}
          className="cursor-pointer object-contain"
        />

        <ul className="hidden space-x-4 md:flex text-sm font-regular">
            {/* <li className="headerLink">Home</li>
            <li className="headerLink">TV Shows</li>
            <li className="headerLink">Movie</li>
            <li className="headerLink">New & Popular</li> */}
            <li className="headerLink">My List</li>
        </ul>
        </div>

        <div className="flex items-center space-x-4 text-sm font-medium">
            {/* <SearchIcon className="sm hidden h-6 w-6 sm:inline"/> */}
            {/* <p className="hidden lg:inline">Logout</p> */}
            {/* <BellIcon className="h-6 w-6" /> */}
            
            <p className="cursor-pointer flex items-center hover:text-[#ffa600] text-lg drop-shadow-2xl" onClick={logout}>Logout</p>
            <Link href="/account">
                <img
                onClick={logout}
                src="https://rb.gy/7wbkxj"
                width={50}
                height={50}
                className="cursor-pointer rounded"
                />
            </Link>
            
        </div>
    </header>
  )
}

export default Header