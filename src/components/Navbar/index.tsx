'use client'

import { useState, useEffect } from 'react'
import { Github, Linkedin } from 'lucide-react'
import SvgLogo from '../SVGLogo'

interface MenuProps {
  animate?: boolean
}

const Menu = ({ animate = false }: MenuProps) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        transition-all duration-500 ease-out
        ${animate ? ' translate-y-0' : 'hidden -translate-y-3 pointer-events-none'}
      `}
    >
      <ul className="text-white/70 text-lg space-y-4 py-4">
        {/* <li><button><Home className='w-6 h-6 cursor-pointer hover:text-white' /></button></li> */}
        <li><button onClick={() => window.open('https://github.com/ichexernest', '_blank')}><Github className='w-6 h-6 cursor-pointer hover:text-white' /></button></li>
        <li><button onClick={() => window.open('https://www.linkedin.com/in/ernest-chen-b85036128', '_blank')}><Linkedin className='w-6 h-6 cursor-pointer hover:text-white' /></button></li>
      </ul>
    </div>
  )
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 200
      setScrolled(isScrolled)

      // 滾動時自動收起 Menu
      if (isScrolled && menuOpen) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  return (
    <nav
      className="fixed top-0 w-full z-40 transition-all duration-300 flex items-center justify-between p-4 bg-transparent text-white"
    >
      {scrolled ? (
        <div
          className="flex flex-col items-start gap-3 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <SvgLogo />
          <Menu animate={menuOpen} />
        </div>
      ) : (
        <Menu animate={true} />
      )}
    </nav>
  )
}

export default Navbar
