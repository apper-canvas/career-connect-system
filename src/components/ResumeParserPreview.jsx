import { useState } from 'react';
import { getIcon } from '../utils/iconUtils';

const ResumeParserPreview = ({ 
  parsedData, 
  onConfirm, 
  onEditRequest,
  onCancel 
}) => {
  const { contactInfo, education, skills, experience } = parsedData;
  
  const CheckIcon = getIcon('CheckCircle');
  const EditIcon = getIcon('Edit2');
  const UserIcon = getIcon('User');
  const MailIcon = getIcon('Mail');
  const PhoneIcon = getIcon('Phone');
  const MapPinIcon = getIcon('MapPin');
  const BookIcon = getIcon('Book');
  const BriefcaseIcon = getIcon('Briefcase');
  const TagIcon = getIcon('Tag');
  const LinkedinIcon = getIcon('Linkedin');
  
  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Extracted Information</h3>
        <div className="flex space-x-3">
          <button 
            onClick={onEditRequest}
            className="btn-ghost text-sm flex items-center"
          >
            <EditIcon className="h-4 w-4 mr-1" />
            Edit
          </button>
          <button 
            onClick={onCancel}
            className="btn-ghost text-sm"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="btn-primary text-sm flex items-center"
          >
            <CheckIcon className="h-4 w-4 mr-1" />
            Confirm & Save
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="md:col-span-3 bg-surface-50 dark:bg-surface-700 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-lg flex items-center">
            <UserIcon className="h-5 w-5 mr-2 text-primary" />
            Contact Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-surface-500 dark:text-surface-400 text-sm">Name</p>
              <p className="font-medium">{contactInfo.name || 'Not detected'}</p>
            </div>
            <div>
              <p className="text-surface-500 dark:text-surface-400 text-sm flex items-center">
                <MailIcon className="h-4 w-4 mr-1" /> Email
              </p>
              <p className="font-medium">{contactInfo.email || 'Not detected'}</p>
            </div>
            <div>
              <p className="text-surface-500 dark:text-surface-400 text-sm flex items-center">
                <PhoneIcon className="h-4 w-4 mr-1" /> Phone
              </p>
              <p className="font-medium">{contactInfo.phone || 'Not detected'}</p>
            </div>
            <div>
              <p className="text-surface-500 dark:text-surface-400 text-sm flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1" /> Location
              </p>
              <p className="font-medium">{contactInfo.location || 'Not detected'}</p>
            </div>
            {contactInfo.linkedIn && (
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm flex items-center">
                  <LinkedinIcon className="h-4 w-4 mr-1" /> LinkedIn
                </p>
                <p className="font-medium">{contactInfo.linkedIn}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Skills */}
        <div className="md:col-span-3 bg-surface-50 dark:bg-surface-700 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-lg flex items-center">
            <TagIcon className="h-5 w-5 mr-2 text-primary" />
            Skills
          </h4>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="badge bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-surface-500 dark:text-surface-400">No skills detected</p>
          )}
        </div>
        
        {/* Education */}
        <div className="md:col-span-3 bg-surface-50 dark:bg-surface-700 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-lg flex items-center">
            <BookIcon className="h-5 w-5 mr-2 text-primary" />
            Education
          </h4>
          {education.length > 0 ? (
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-surface-600 dark:text-surface-300">{edu.school}</p>
                  <p className="text-surface-500 dark:text-surface-400 text-sm">{edu.year}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-surface-500 dark:text-surface-400">No education details detected</p>
          )}
        </div>
        
        {/* Experience */}
        <div className="md:col-span-3 bg-surface-50 dark:bg-surface-700 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-lg flex items-center">
            <BriefcaseIcon className="h-5 w-5 mr-2 text-primary" />
            Work Experience
          </h4>
          {experience.length > 0 ? (
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <p className="font-medium">{exp.title}</p>
                  <p className="text-surface-600 dark:text-surface-300">{exp.company}</p>
                  <p className="text-surface-500 dark:text-surface-400 text-sm mb-2">{exp.date}</p>
                  <p className="text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-surface-500 dark:text-surface-400">No work experience detected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeParserPreview;