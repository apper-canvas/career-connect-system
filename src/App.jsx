import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getIcon } from './utils/iconUtils'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const NavBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const MoonIcon = getIcon('Moon')
  const SunIcon = getIcon('Sun')
  const BriefcaseIcon = getIcon('Briefcase')
  const MenuIcon = getIcon('Menu')
  const XIcon = getIcon('X')

  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(darkModePreference)
    if (darkModePreference) {
      document.documentElement.classList.add('dark')
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('darkMode', (!isDarkMode).toString())
  }
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-surface-800/95 shadow-md backdrop-blur-sm py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <BriefcaseIcon className="w-7 h-7 text-primary" />
          <span className="text-xl font-bold text-surface-900 dark:text-white">
            Career<span className="text-primary">Connect</span>
          </span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#jobs" className="text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
            Find Jobs
          </a>
          <a href="#post" className="text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
            Post a Job
          </a>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-surface-600" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-surface-600" />
            )}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-700"
          >
            {isMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-surface-800 shadow-lg">
          <div className="container mx-auto py-4 px-4 space-y-3">
            <a 
              href="#jobs" 
              className="block py-2 px-4 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Jobs
            </a>
            <a 
              href="#post" 
              className="block py-2 px-4 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Post a Job
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300">
      <NavBar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer className="bg-white dark:bg-surface-800 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-surface-500 dark:text-surface-400">
            &copy; {new Date().getFullYear()} CareerConnect. All rights reserved.
          </div>
        </div>
      </footer>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default App