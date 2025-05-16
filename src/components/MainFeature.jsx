import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { getIcon } from '../utils/iconUtils'

const MainFeature = () => {
  // State for job posting form
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    industry: '',
    description: '',
    type: 'Full-time',
    salary: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Icon components
  const BriefcaseIcon = getIcon('Briefcase')
  const BuildingIcon = getIcon('Building2')
  const MapPinIcon = getIcon('MapPin')
  const TagsIcon = getIcon('Tags')
  const FileTextIcon = getIcon('FileText')
  const ClockIcon = getIcon('Clock')
  const DollarSignIcon = getIcon('DollarSign')
  const SendIcon = getIcon('Send')
  const CheckCircleIcon = getIcon('CheckCircle')
  const ArrowLeftIcon = getIcon('ArrowLeft')
  
  // Form validation
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) newErrors.title = 'Job title is required'
    if (!formData.company.trim()) newErrors.company = 'Company name is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.industry.trim()) newErrors.industry = 'Industry is required'
    if (!formData.description.trim()) newErrors.description = 'Job description is required'
    if (!formData.salary.trim()) newErrors.salary = 'Salary range is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        setShowSuccess(true)
        toast.success("Job posted successfully!")
      }, 1500)
    } else {
      toast.error("Please fill all required fields")
    }
  }
  
  // Reset the form
  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      industry: '',
      description: '',
      type: 'Full-time',
      salary: ''
    })
    setShowSuccess(false)
  }
  
  return (
    <section id="post" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Post a New Job
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Reach thousands of qualified candidates by posting your job opening on CareerConnect
            </p>
          </div>

          <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft dark:shadow-none overflow-hidden border border-surface-200 dark:border-surface-700">
            {!showSuccess ? (
              <motion.form 
                onSubmit={handleSubmit}
                className="p-6 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-surface-700 dark:text-surface-300 mb-2 font-medium">
                      Job Title*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BriefcaseIcon className="h-5 w-5 text-surface-400" />
                      </div>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`input-field pl-10 ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="e.g. Senior Frontend Developer"
                      />
                    </div>
                    {errors.title && (
                      <p className="mt-1 text-red-500 text-sm">{errors.title}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-surface-700 dark:text-surface-300 mb-2 font-medium">
                      Company Name*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BuildingIcon className="h-5 w-5 text-surface-400" />
                      </div>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={`input-field pl-10 ${errors.company ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="e.g. Acme Inc."
                      />
                    </div>
                    {errors.company && (
                      <p className="mt-1 text-red-500 text-sm">{errors.company}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-surface-700 dark:text-surface-300 mb-2 font-medium">
                      Location*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPinIcon className="h-5 w-5 text-surface-400" />
                      </div>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`input-field pl-10 ${errors.location ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="e.g. San Francisco, CA or Remote"
                      />
                    </div>
                    {errors.location && (
                      <p className="mt-1 text-red-500 text-sm">{errors.location}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-surface-700 dark:text-surface-300 mb-2 font-medium">
                      Industry*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <TagsIcon className="h-5 w-5 text-surface-400" />
                      </div>
                      <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className={`input-field pl-10 ${errors.industry ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="e.g. Technology, Healthcare"
                      />
                    </div>
                    {errors.industry && (
                      <p className="mt-1 text-red-500 text-sm">{errors.industry}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-surface-700 dark:text-surface-300 mb-2 font-medium">
                      Job Type
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ClockIcon className="h-5 w-5 text-surface-400" />
                      </div>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="input-field pl-10 appearance-none"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Temporary">Temporary</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-surface-700 dark:text-surface-300 mb-2 font-medium">
                      Salary Range*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSignIcon className="h-5 w-5 text-surface-400" />
                      </div>
                      <input
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className={`input-field pl-10 ${errors.salary ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="e.g. $80,000 - $100,000"
                      />
                    </div>
                    {errors.salary && (
                      <p className="mt-1 text-red-500 text-sm">{errors.salary}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-surface-700 dark:text-surface-300 mb-2 font-medium">
                      Job Description*
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <FileTextIcon className="h-5 w-5 text-surface-400" />
                      </div>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className={`input-field pl-10 resize-none ${errors.description ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="Describe the job responsibilities, requirements, and benefits..."
                      ></textarea>
                    </div>
                    {errors.description && (
                      <p className="mt-1 text-red-500 text-sm">{errors.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <SendIcon className="w-5 h-5 mr-2" />
                        Post Job
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                className="p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Job Posted Successfully!</h3>
                <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto">
                  Your job listing for {formData.title} at {formData.company} has been posted and is now visible to potential candidates.
                </p>
                <button
                  onClick={resetForm}
                  className="btn-primary"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Post Another Job
                </button>
              </motion.div>
            )}
          </div>
          
          <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 rounded-xl">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="mb-4 md:mb-0 md:mr-6">
                <BriefcaseIcon className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">Get Better Visibility</h3>
                <p className="text-surface-600 dark:text-surface-400">
                  Boost your job posting to reach more qualified candidates. Featured jobs receive up to 5x more applications.
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6">
                <button className="btn-outline">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainFeature