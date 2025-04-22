import  { useState, useEffect } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    if (window.innerWidth <= 480) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger Menu Toggle */}
      <div 
        className={`fixed right-5 top-5 z-50 flex flex-col justify-between h-6 w-7 cursor-pointer md:hidden ${scrolled ? 'text-white' : 'text-gray-800'}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`block w-full h-0.5 ${scrolled ? 'bg-white' : 'bg-gray-800'} transition-all duration-300`}></span>
        <span className={`block w-full h-0.5 ${scrolled ? 'bg-white' : 'bg-gray-800'} transition-all duration-300`}></span>
        <span className={`block w-full h-0.5 ${scrolled ? 'bg-white' : 'bg-gray-800'} transition-all duration-300`}></span>
      </div>
      
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled 
          ? 'py-1 bg-gray-800 bg-opacity-95 text-white' 
          : 'py-5 bg-white bg-opacity-90 text-gray-800'
      } shadow-md`}>
        <ul className={`flex justify-center list-none px-0 py-5 transition-transform duration-300 ${
          menuOpen ? 'transform-none' : 'md:transform-none -translate-y-full'
        } ${
          menuOpen ? 'flex-col items-center fixed top-0 left-0 w-full h-screen bg-white bg-opacity-95 pt-16 md:static md:flex-row md:pt-0 md:h-auto' : 'flex-row flex-wrap'
        }`}>
          <li className="mx-2.5 my-1 md:my-0">
            <a
              href="#home"
              onClick={closeMenu}
              className={`font-bold px-4 py-2 rounded transition-all duration-300 no-underline ${
                scrolled ? 'hover:bg-white hover:text-gray-800' : 'hover:bg-gray-800 hover:text-white'
              }`}
            >
              首頁
            </a>
          </li>
          <li className="mx-2.5 my-1 md:my-0">
            <a
              href="#about"
              onClick={closeMenu}
              className={`font-bold px-4 py-2 rounded transition-all duration-300 no-underline ${
                scrolled ? 'hover:bg-white hover:text-gray-800' : 'hover:bg-gray-800 hover:text-white'
              }`}
            >
              關於我
            </a>
          </li>
          <li className="mx-2.5 my-1 md:my-0">
            <a
              href="#skills"
              onClick={closeMenu}
              className={`font-bold px-4 py-2 rounded transition-all duration-300 no-underline ${
                scrolled ? 'hover:bg-white hover:text-gray-800' : 'hover:bg-gray-800 hover:text-white'
              }`}
            >
              技能
            </a>
          </li>
          <li className="mx-2.5 my-1 md:my-0">
            <a
              href="#projects"
              onClick={closeMenu}
              className={`font-bold px-4 py-2 rounded transition-all duration-300 no-underline ${
                scrolled ? 'hover:bg-white hover:text-gray-800' : 'hover:bg-gray-800 hover:text-white'
              }`}
            >
              作品
            </a>
          </li>
          <li className="mx-2.5 my-1 md:my-0">
            <a
              href="#contact"
              onClick={closeMenu}
              className={`font-bold px-4 py-2 rounded transition-all duration-300 no-underline ${
                scrolled ? 'hover:bg-white hover:text-gray-800' : 'hover:bg-gray-800 hover:text-white'
              }`}
            >
              聯絡我
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;