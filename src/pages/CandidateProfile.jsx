import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import ResumeUploader from '../components/ResumeUploader';
import ResumeParserPreview from '../components/ResumeParserPreview';
import { parseResume } from '../utils/resumeParserUtils';

const CandidateProfile = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [parsedResumeData, setParsedResumeData] = useState(null);
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [showParserPreview, setShowParserPreview] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [candidateProfile, setCandidateProfile] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: ''
    },
    skills: [],
    education: [],
    experience: []
  });

  // Icons
  const UserIcon = getIcon('User');
  const MailIcon = getIcon('Mail');
  const PhoneIcon = getIcon('Phone');
  const MapPinIcon = getIcon('MapPin');
  const BookIcon = getIcon('Book');
  const BriefcaseIcon = getIcon('Briefcase');
  const PlusIcon = getIcon('Plus');
  const LinkedinIcon = getIcon('Linkedin');
  const FileTextIcon = getIcon('FileText');
  const SaveIcon = getIcon('Save');
  const XIcon = getIcon('X');

  // Handle resume file selection
  const handleFileSelected = async (file) => {
    setResumeFile(file);
    setIsParsingResume(true);
    
    try {
      const parsedData = await parseResume(file);
      setParsedResumeData(parsedData);
      setShowParserPreview(true);
      toast.success('Resume parsed successfully!');
    } catch (error) {
      console.error('Error parsing resume:', error);
      toast.error('Error parsing resume. Please try a different file.');
    } finally {
      setIsParsingResume(false);
    }
  };

  // Handle confirmation of parsed data
  const handleConfirmParsedData = () => {
    // Update profile with parsed data
    setCandidateProfile({
      personal: {
        fullName: parsedResumeData.contactInfo.name || '',
        email: parsedResumeData.contactInfo.email || '',
        phone: parsedResumeData.contactInfo.phone || '',
        location: parsedResumeData.contactInfo.location || '',
        linkedIn: parsedResumeData.contactInfo.linkedIn || ''
      },
      skills: parsedResumeData.skills || [],
      education: parsedResumeData.education || [],
      experience: parsedResumeData.experience || []
    });
    
    setShowParserPreview(false);
    toast.success('Profile updated with resume data!');
  };

  // Handle editing parsed data
  const handleEditRequest = () => {
    setShowEdit(true);
    setShowParserPreview(false);
    
    // Pre-populate the edit form with parsed data
    setCandidateProfile({
      personal: {
        fullName: parsedResumeData.contactInfo.name || '',
        email: parsedResumeData.contactInfo.email || '',
        phone: parsedResumeData.contactInfo.phone || '',
        location: parsedResumeData.contactInfo.location || '',
        linkedIn: parsedResumeData.contactInfo.linkedIn || ''
      },
      skills: parsedResumeData.skills || [],
      education: parsedResumeData.education || [],
      experience: parsedResumeData.experience || []
    });
  };

  // Handle cancel
  const handleCancel = () => {
    setShowParserPreview(false);
    setParsedResumeData(null);
    setResumeFile(null);
  };

  // Handle profile form input changes
  const handleInputChange = (section, field, value) => {
    setCandidateProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle skill input
  const [newSkill, setNewSkill] = useState('');
  
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setCandidateProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (index) => {
    setCandidateProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Handle education entries
  const handleAddEducation = () => {
    setCandidateProfile(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', school: '', year: '' }]
    }));
  };
  
  const handleRemoveEducation = (index) => {
    setCandidateProfile(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };
  
  const handleEducationChange = (index, field, value) => {
    setCandidateProfile(prev => {
      const newEducation = [...prev.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      return { ...prev, education: newEducation };
    });
  };

  // Handle experience entries
  const handleAddExperience = () => {
    setCandidateProfile(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', date: '', description: '' }]
    }));
  };
  
  const handleRemoveExperience = (index) => {
    setCandidateProfile(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };
  
  const handleExperienceChange = (index, field, value) => {
    setCandidateProfile(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = { ...newExperience[index], [field]: value };
      return { ...prev, experience: newExperience };
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    toast.success('Profile updated successfully!');
    setShowEdit(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.h1 
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Candidate Profile
        </motion.h1>

        {/* Parse Resume Section */}
        {!showEdit && !showParserPreview && (
          <motion.div 
            className="bg-white dark:bg-surface-800 rounded-xl shadow-md p-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center mb-4">
              <FileTextIcon className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-xl font-semibold">Upload & Parse Resume</h2>
            </div>
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              Upload your resume to automatically extract your information and populate your profile.
            </p>
            
            <ResumeUploader 
              onFileSelected={handleFileSelected} 
              isParsingResume={isParsingResume} 
            />
            
            {Object.keys(candidateProfile.personal).some(key => candidateProfile.personal[key]) && (
              <div className="mt-6 flex justify-end">
                <button 
                  className="btn-outline"
                  onClick={() => setShowEdit(true)}
                >
                  Edit Existing Profile
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Resume Parser Preview */}
        {showParserPreview && parsedResumeData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ResumeParserPreview 
              parsedData={parsedResumeData}
              onConfirm={handleConfirmParsedData}
              onEditRequest={handleEditRequest}
              onCancel={handleCancel}
            />
          </motion.div>
        )}

        {/* Edit Profile Form */}
        {showEdit && (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-surface-800 rounded-xl shadow-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-6">Edit Profile Information</h2>
            
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-primary" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-surface-700 dark:text-surface-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="input-field"
                    value={candidateProfile.personal.fullName}
                    onChange={(e) => handleInputChange('personal', 'fullName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-surface-700 dark:text-surface-300 mb-2 flex items-center">
                    <MailIcon className="h-4 w-4 mr-1" /> Email
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    value={candidateProfile.personal.email}
                    onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-surface-700 dark:text-surface-300 mb-2 flex items-center">
                    <PhoneIcon className="h-4 w-4 mr-1" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    value={candidateProfile.personal.phone}
                    onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-surface-700 dark:text-surface-300 mb-2 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" /> Location
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={candidateProfile.personal.location}
                    onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-surface-700 dark:text-surface-300 mb-2 flex items-center">
                    <LinkedinIcon className="h-4 w-4 mr-1" /> LinkedIn URL
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={candidateProfile.personal.linkedIn}
                    onChange={(e) => handleInputChange('personal', 'linkedIn', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Skills Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <BookIcon className="h-5 w-5 mr-2 text-primary" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {candidateProfile.skills.map((skill, index) => (
                  <div key={index} className="badge bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light flex items-center">
                    {skill}
                    <button
                      type="button"
                      className="ml-1 text-primary-dark dark:text-primary-light"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      <XIcon className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="input-field flex-1 mr-2"
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                />
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleAddSkill}
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Education Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium flex items-center">
                  <BookIcon className="h-5 w-5 mr-2 text-primary" />
                  Education
                </h3>
                <button
                  type="button"
                  className="btn-outline text-sm"
                  onClick={handleAddEducation}
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Education
                </button>
              </div>
              
              {candidateProfile.education.map((edu, index) => (
                <div key={index} className="mb-6 bg-surface-50 dark:bg-surface-700 p-4 rounded-lg relative">
                  <button
                    type="button"
                    className="absolute top-3 right-3 text-surface-500 hover:text-red-500"
                    onClick={() => handleRemoveEducation(index)}
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-surface-700 dark:text-surface-300 mb-2">Degree</label>
                      <input
                        type="text"
                        className="input-field"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-surface-700 dark:text-surface-300 mb-2">School</label>
                      <input
                        type="text"
                        className="input-field"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-surface-700 dark:text-surface-300 mb-2">Years</label>
                      <input
                        type="text"
                        className="input-field"
                        value={edu.year}
                        onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                        placeholder="e.g., 2018-2022"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {candidateProfile.education.length === 0 && (
                <div className="text-center py-6 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <p className="text-surface-500 dark:text-surface-400">No education entries yet.</p>
                  <button
                    type="button"
                    className="btn-primary mt-2"
                    onClick={handleAddEducation}
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Education
                  </button>
                </div>
              )}
            </div>
            
            {/* Experience Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium flex items-center">
                  <BriefcaseIcon className="h-5 w-5 mr-2 text-primary" />
                  Work Experience
                </h3>
                <button
                  type="button"
                  className="btn-outline text-sm"
                  onClick={handleAddExperience}
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Experience
                </button>
              </div>
              
              {candidateProfile.experience.map((exp, index) => (
                <div key={index} className="mb-6 bg-surface-50 dark:bg-surface-700 p-4 rounded-lg relative">
                  <button
                    type="button"
                    className="absolute top-3 right-3 text-surface-500 hover:text-red-500"
                    onClick={() => handleRemoveExperience(index)}
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-surface-700 dark:text-surface-300 mb-2">Job Title</label>
                      <input
                        type="text"
                        className="input-field"
                        value={exp.title}
                        onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-surface-700 dark:text-surface-300 mb-2">Company</label>
                      <input
                        type="text"
                        className="input-field"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-surface-700 dark:text-surface-300 mb-2">Dates</label>
                      <input
                        type="text"
                        className="input-field"
                        value={exp.date}
                        onChange={(e) => handleExperienceChange(index, 'date', e.target.value)}
                        placeholder="e.g., Jan 2020 - Present"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-surface-700 dark:text-surface-300 mb-2">Description</label>
                    <textarea
                      className="input-field resize-none"
                      rows="3"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              ))}
              
              {candidateProfile.experience.length === 0 && (
                <div className="text-center py-6 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <p className="text-surface-500 dark:text-surface-400">No experience entries yet.</p>
                  <button
                    type="button"
                    className="btn-primary mt-2"
                    onClick={handleAddExperience}
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Experience
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => {
                  setShowEdit(false);
                  setResumeFile(null);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                <SaveIcon className="h-5 w-5 mr-2" />
                Save Profile
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;