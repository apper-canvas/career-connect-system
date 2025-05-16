import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

/**
 * Parse a PDF file and extract the text content
 * @param {File} file - The PDF file to parse
 * @returns {Promise<string>} - The extracted text content
 */
export const parsePdfFile = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const data = await pdfParse(Buffer.from(arrayBuffer));
  return data.text;
};

/**
 * Parse a DOCX file and extract the text content
 * @param {File} file - The DOCX file to parse
 * @returns {Promise<string>} - The extracted text content
 */
export const parseDocxFile = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({arrayBuffer});
  return result.value;
};

/**
 * Extract contact information from resume text
 * @param {string} text - The resume text content
 * @returns {Object} - Contact information object
 */
export const extractContactInfo = (text) => {
  const contactInfo = {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: ''
  };
  
  // Extract email with regex
  const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
  if (emailMatch) {
    contactInfo.email = emailMatch[0];
  }
  
  // Extract phone with regex (various formats)
  const phoneMatch = text.match(/(?:\+\d{1,3}[- ]?)?\(?(?:\d{3})?\)?[- ]?\d{3}[- ]?\d{4}/g);
  if (phoneMatch) {
    contactInfo.phone = phoneMatch[0];
  }
  
  // Extract LinkedIn URL
  const linkedInMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9-]+/gi);
  if (linkedInMatch) {
    contactInfo.linkedIn = `https://www.${linkedInMatch[0]}`;
  }
  
  // Try to extract name (assuming it's near the top of resume)
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length > 0) {
    // Assume the first non-empty line might be the name if it's short enough
    if (lines[0].length < 40 && !lines[0].includes('@') && !lines[0].includes('http')) {
      contactInfo.name = lines[0].trim();
    }
  }
  
  // Try to extract location from common patterns
  const locationMatch = text.match(/(?:City|Location|Address):\s*([^,\n]+(?:,\s*[A-Z]{2})?)/i);
  if (locationMatch) {
    contactInfo.location = locationMatch[1].trim();
  }
  
  return contactInfo;
};

/**
 * Extract education information from resume text
 * @param {string} text - The resume text content
 * @returns {Array} - Array of education objects
 */
export const extractEducation = (text) => {
  const education = [];
  
  // Look for education section
  const educationPattern = /(?:EDUCATION|ACADEMIC BACKGROUND|ACADEMIC CREDENTIALS|QUALIFICATIONS)(?:\s|:)+([\s\S]*?)(?:EXPERIENCE|EMPLOYMENT|WORK|SKILLS|PROJECTS|$)/i;
  const educationMatch = text.match(educationPattern);
  
  if (educationMatch) {
    const educationText = educationMatch[1];
    
    // Extract each education entry
    const degreePatterns = [
      /(Bachelor|Master|PhD|B\.S\.|M\.S\.|B\.A\.|M\.A\.|M\.B\.A\.|Ph\.D\.)/gi,
      /(?:University|College|Institute|School) of ([^\n,]+)/gi
    ];
    
    // Process with degree patterns
    let matches = [];
    degreePatterns.forEach(pattern => {
      const found = [...educationText.matchAll(pattern)];
      if (found.length) matches = [...matches, ...found];
    });
    
    // Process found educational institutions
    if (matches.length) {
      const entries = educationText.split(/\n\s*\n/);
      
      entries.forEach(entry => {
        if (entry.trim()) {
          // Extract degree info, school, year
          const degreeMatch = entry.match(/(Bachelor|Master|PhD|B\.S\.|M\.S\.|B\.A\.|M\.A\.|M\.B\.A\.|Ph\.D\.)[^,\n]*/i);
          const schoolMatch = entry.match(/(?:University|College|Institute|School)[^,\n]*/i);
          const yearMatch = entry.match(/(19|20)\d{2}(?:\s*-\s*(19|20)\d{2}|(?:\s*to\s*)(present|now))?/i);
          
          if (degreeMatch || schoolMatch) {
            education.push({
              degree: degreeMatch ? degreeMatch[0].trim() : '',
              school: schoolMatch ? schoolMatch[0].trim() : '',
              year: yearMatch ? yearMatch[0].trim() : ''
            });
          }
        }
      });
    }
  }
  
  return education;
};

/**
 * Extract skills from resume text
 * @param {string} text - The resume text content
 * @returns {Array} - Array of skills
 */
export const extractSkills = (text) => {
  const skills = [];
  
  // Common skill keywords to look for
  const skillKeywords = [
    'JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Python', 'Java', 'SQL', 'AWS', 'Docker',
    'TypeScript', 'Angular', 'Vue.js', 'MongoDB', 'Express', 'Git', 'REST API', 'GraphQL',
    'PHP', 'C#', 'C++', 'Ruby', 'Swift', 'Kotlin', 'Go', 'Rust', 'Scala', '.NET', 'Django',
    'Flask', 'Spring', 'Laravel', 'React Native', 'Flutter', 'Kubernetes', 'Jenkins', 'CI/CD',
    'Agile', 'Scrum', 'Product Management', 'Project Management', 'Leadership', 'Communication',
    'Problem Solving', 'Critical Thinking', 'Teamwork', 'User Experience', 'UI Design',
    'Data Analysis', 'Machine Learning', 'AI', 'Big Data', 'Data Visualization', 'SEO',
    'Digital Marketing', 'Content Strategy', 'Social Media', 'Photoshop', 'Illustrator',
    'Figma', 'Sketch', 'InDesign', 'After Effects', 'Premiere Pro', 'Final Cut Pro'
  ];
  
  // Look for skills section
  const skillsPattern = /(?:SKILLS|TECHNICAL SKILLS|CORE COMPETENCIES|TECHNOLOGIES|EXPERTISE)(?:\s|:)+([\s\S]*?)(?:EXPERIENCE|EMPLOYMENT|WORK|EDUCATION|PROJECTS|$)/i;
  const skillsMatch = text.match(skillsPattern);
  
  if (skillsMatch) {
    const skillsText = skillsMatch[1];
    
    // Check for each skill keyword
    skillKeywords.forEach(skill => {
      if (new RegExp(`\\b${skill}\\b`, 'i').test(skillsText)) {
        skills.push(skill);
      }
    });
  }
  
  return skills;
};

/**
 * Extract work experience from resume text
 * @param {string} text - The resume text content
 * @returns {Array} - Array of experience objects
 */
export const extractExperience = (text) => {
  const experience = [];
  
  // Look for experience section
  const experiencePattern = /(?:EXPERIENCE|EMPLOYMENT|WORK HISTORY|PROFESSIONAL EXPERIENCE)(?:\s|:)+([\s\S]*?)(?:EDUCATION|SKILLS|PROJECTS|$)/i;
  const experienceMatch = text.match(experiencePattern);
  
  if (experienceMatch) {
    const experienceText = experienceMatch[1];
    
    // Split by potential job entries (looking for date patterns)
    const entries = experienceText.split(/(?=((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)[\s,]+(?:19|20)\d{2}))/i);
    
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i].trim();
      if (!entry) continue;
      
      // Try to extract job title, company, date, and description
      const titleMatch = entry.match(/(?:^|\n)([A-Za-z\s]+)(?:\sat\s|\s-\s|\s@\s)/i);
      const companyMatch = entry.match(/(?:at|@|-)\s([A-Za-z0-9\s&,.]+)/i);
      const dateMatch = entry.match(/((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)[\s,]+(?:19|20)\d{2})\s*(?:to|–|-|—)\s*((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)[\s,]+(?:19|20)\d{2}|Present|Current|Now)/i);
      
      if (titleMatch || companyMatch || dateMatch) {
        let description = entry.replace(titleMatch?.[0] || '', '')
                             .replace(companyMatch?.[0] || '', '')
                             .replace(dateMatch?.[0] || '', '')
                             .trim();
        
        experience.push({
          title: titleMatch ? titleMatch[1].trim() : '',
          company: companyMatch ? companyMatch[1].trim() : '',
          date: dateMatch ? dateMatch[0].trim() : '',
          description: description
        });
      }
    }
  }
  
  return experience;
};

/**
 * Parse a resume file and extract structured data
 * @param {File} file - The resume file to parse
 * @returns {Promise<Object>} - The extracted resume data
 */
export const parseResume = async (file) => {
  let text;
  
  if (file.type === 'application/pdf') {
    text = await parsePdfFile(file);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    text = await parseDocxFile(file);
  } else {
    throw new Error('Unsupported file format');
  }
  
  const contactInfo = extractContactInfo(text);
  const education = extractEducation(text);
  const skills = extractSkills(text);
  const experience = extractExperience(text);
  
  return {
    contactInfo,
    education,
    skills,
    experience,
    rawText: text
  };
};