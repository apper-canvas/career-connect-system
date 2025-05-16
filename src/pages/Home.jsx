import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { getIcon } from '../utils/iconUtils'
import MainFeature from '../components/MainFeature'

// Sample job data
const SAMPLE_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    tags: ['React', 'TypeScript', 'UI/UX'],
    description: 'Leading e-commerce company seeking a talented Senior Frontend Developer to join our team. You\'ll work on high-impact projects and help shape the future of our platform.',
    postedDate: '2023-06-15',
    industry: 'Technology'
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'InnovateLabs',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$110,000 - $130,000',
    tags: ['Product Strategy', 'Agile', 'UX Research'],
    description: 'Growing startup looking for an experienced Product Manager to drive our product vision and roadmap. You\'ll work closely with engineering and design teams.',
    postedDate: '2023-06-18',
    industry: 'Technology' 
  },
  {
    id: 3,
    title: 'Marketing Specialist',
    company: 'BrandBoost Media',
    location: 'Remote',
    type: 'Contract',
    salary: '$75,000 - $90,000',
    tags: ['Digital Marketing', 'Content Strategy', 'SEO'],
    description: 'Digital marketing agency seeking a Marketing Specialist to help our clients grow their online presence through innovative campaigns and strategies.',
    postedDate: '2023-06-20',
    industry: 'Marketing'
  },
  {
    id: 4,
    title: 'Data Analyst',
    company: 'DataDriven Solutions',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$85,000 - $105,000',
    tags: ['SQL', 'Python', 'Tableau'],
    description: 'Financial services company seeking a Data Analyst to help transform data into actionable insights. You\'ll build dashboards and support decision-making processes.',
    postedDate: '2023-06-22',
    industry: 'Finance'
  },
  {
    id: 5,
    title: 'UX/UI Designer',
    company: 'DesignWorks Agency',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$95,000 - $120,000',
    tags: ['Figma', 'User Research', 'Prototyping'],
    description: 'Design agency looking for a talented UX/UI Designer to create beautiful, intuitive interfaces for our clients. You\'ll work on a variety of exciting projects.',
    postedDate: '2023-06-25',
    industry: 'Design'
  }
];

// Available industries and locations for filters
const INDUSTRIES = ['Technology', 'Marketing', 'Finance', 'Design', 'Healthcare', 'Education'];
const LOCATIONS = ['San Francisco, CA', 'New York, NY', 'Chicago, IL', 'Los Angeles, CA', 'Remote', 'Austin, TX'];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  const BriefcaseIcon = getIcon('Briefcase');
  const SearchIcon = getIcon('Search');
  const MapPinIcon = getIcon('MapPin');
  const TagsIcon = getIcon('Tags');
  const ClockIcon = getIcon('Clock');
  const CalendarIcon = getIcon('Calendar');
  const BuildingIcon = getIcon('Building2');
  const CheckIcon = getIcon('CheckCircle');

  // Filter jobs based on search term, industry, and location
  const filteredJobs = SAMPLE_JOBS.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = selectedIndustry === '' || job.industry === selectedIndustry;
    const matchesLocation = selectedLocation === '' || job.location === selectedLocation;
    
    return matchesSearch && matchesIndustry && matchesLocation;
  });

  const handleApply = (job) => {
    toast.success(`Applied to ${job.title} at ${job.company}!`);
    setIsModalOpen(false);
  };

  const openJobDetails = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary-dark py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Career Journey Starts Here
            </motion.h1>
            <motion.p 
              className="text-white/90 text-lg md:text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Connect with top employers and discover your next opportunity
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <div id="jobs">
        <MainFeature />
      </div>

      {/* Job Search Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Find Your Perfect Job</h2>
            <p className="text-surface-600 dark:text-surface-400 mb-8 text-center">Browse our curated job listings from top companies</p>
            
            {/* Search and Filter Controls */}
            <div className="bg-white dark:bg-surface-800 rounded-xl shadow-md p-4 md:p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-surface-400" />
                  </div>
                  <input
                    type="text"
                    className="input-field pl-10"
                    placeholder="Search jobs or keywords"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TagsIcon className="h-5 w-5 text-surface-400" />
                  </div>
                  <select
                    className="input-field pl-10 appearance-none"
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                  >
                    <option value="">All Industries</option>
                    {INDUSTRIES.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPinIcon className="h-5 w-5 text-surface-400" />
                  </div>
                  <select
                    className="input-field pl-10 appearance-none"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {LOCATIONS.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Job Listings */}
            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-surface-600 dark:text-surface-400">No jobs found matching your criteria.</p>
                </div>
              ) : (
                filteredJobs.map(job => (
                  <motion.div 
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="card hover:border-primary-light border-2 border-transparent cursor-pointer"
                    onClick={() => openJobDetails(job)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <BriefcaseIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold">{job.title}</h3>
                            <p className="text-surface-600 dark:text-surface-400 text-sm flex items-center">
                              <BuildingIcon className="h-4 w-4 mr-1" /> {job.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="badge bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
                            {job.type}
                          </span>
                          <span className="badge bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 flex items-center">
                            <MapPinIcon className="h-3 w-3 mr-1" /> {job.location}
                          </span>
                          <span className="badge bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" /> 
                            {new Date(job.postedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-2">
                        <p className="text-lg font-medium text-surface-800 dark:text-surface-200">{job.salary}</p>
                        <button className="btn-outline text-sm" onClick={(e) => {
                          e.stopPropagation();
                          handleApply(job);
                        }}>
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Job Detail Modal */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-surface-900/75 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <motion.div 
              className="inline-block align-bottom bg-white dark:bg-surface-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-4 right-4">
                <button 
                  type="button" 
                  className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <BriefcaseIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold">{selectedJob.title}</h3>
                      <p className="text-surface-600 dark:text-surface-400 flex items-center">
                        <BuildingIcon className="h-4 w-4 mr-1" /> {selectedJob.company}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-surface-50 dark:bg-surface-700 p-3 rounded-lg">
                      <p className="text-sm text-surface-500 dark:text-surface-400 mb-1">Location</p>
                      <p className="font-medium flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-1 text-primary" /> 
                        {selectedJob.location}
                      </p>
                    </div>
                    <div className="bg-surface-50 dark:bg-surface-700 p-3 rounded-lg">
                      <p className="text-sm text-surface-500 dark:text-surface-400 mb-1">Job Type</p>
                      <p className="font-medium flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1 text-primary" /> 
                        {selectedJob.type}
                      </p>
                    </div>
                    <div className="bg-surface-50 dark:bg-surface-700 p-3 rounded-lg">
                      <p className="text-sm text-surface-500 dark:text-surface-400 mb-1">Salary Range</p>
                      <p className="font-medium">
                        {selectedJob.salary}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Job Description</h4>
                    <p className="text-surface-700 dark:text-surface-300 mb-4">
                      {selectedJob.description}
                    </p>
                    <p className="text-surface-700 dark:text-surface-300">
                      We're looking for a talented professional who is passionate about their work and wants to be part of a fast-growing team. The ideal candidate will have excellent communication skills and be able to work collaboratively in a dynamic environment.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Requirements</h4>
                    <ul className="space-y-2">
                      {selectedJob.tags.map((tag, index) => (
                        <li key={index} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Experience with {tag}</span>
                        </li>
                      ))}
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Excellent communication and teamwork skills</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Problem-solving mindset and attention to detail</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-surface-200 dark:border-surface-700 pt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div className="flex items-center text-surface-500 dark:text-surface-400">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    <span>Posted on {new Date(selectedJob.postedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      className="btn-ghost"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn-primary"
                      onClick={() => handleApply(selectedJob)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home