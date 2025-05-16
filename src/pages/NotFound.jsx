import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getIcon } from '../utils/iconUtils'

const NotFound = () => {
  const HomeIcon = getIcon('Home')
  const AlertCircleIcon = getIcon('AlertCircle')

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <AlertCircleIcon className="w-12 h-12 text-red-500 dark:text-red-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-surface-900 dark:text-white">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-surface-800 dark:text-surface-200">Page Not Found</h2>
        <p className="mb-8 text-surface-600 dark:text-surface-400">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link to="/" className="btn-primary">
          <HomeIcon className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound