/**
 * AI Assistant for Resume Builder
 * Helps generate professional summaries based on user experience
 */

// Main module for AI functionality
const AIAssistant = (function() {
    // DOM elements
    const generateSummaryBtn = document.getElementById('generate-summary');
    const suggestSkillsBtn = document.getElementById('suggest-skills');
    const professionalSummaryInput = document.getElementById('professional-summary');
    let loadingContainer = null;
    
    // Initialize the module
    function init() {
        // Create loading indicator if it doesn't exist
        createLoadingIndicator();
        
        // Add event listeners for summary generation
        if (generateSummaryBtn) {
            generateSummaryBtn.addEventListener('click', handleGenerateSummary);
        }
        
        // Add event listeners for skill suggestions
        if (suggestSkillsBtn) {
            suggestSkillsBtn.addEventListener('click', handleSuggestSkills);
        }
        
        // Add event listeners for experience enhancement
        setupEnhanceExperienceListeners();
        
        // Add event listeners for project enhancement
        setupEnhanceProjectListeners();
        
        console.log('AI Assistant initialized');
    }
    
    // Setup enhance experience buttons
    function setupEnhanceExperienceListeners() {
        document.querySelectorAll('[id^="enhance-experience-"]').forEach(button => {
            button.addEventListener('click', function() {
                const entryId = this.id.split('-').pop();
                const entryElement = this.closest('.experience-entry');
                
                if (entryElement) {
                    handleEnhanceExperience(entryElement, entryId);
                }
            });
        });
    }
    
    // Setup enhance project buttons
    function setupEnhanceProjectListeners() {
        document.querySelectorAll('[id^="enhance-project-"]').forEach(button => {
            button.addEventListener('click', function() {
                const entryId = this.id.split('-').pop();
                const entryElement = this.closest('.project-entry');
                
                if (entryElement) {
                    handleEnhanceProject(entryElement, entryId);
                }
            });
        });
    }
    
    // Re-setup listeners after DOM changes
    function refreshListeners() {
        setupEnhanceExperienceListeners();
        setupEnhanceProjectListeners();
    }
    
    // Create the loading indicator element
    function createLoadingIndicator() {
        // Check if the loading container already exists
        if (document.getElementById('ai-loading-container')) {
            loadingContainer = document.getElementById('ai-loading-container');
            return;
        }
        
        // Create loading container element
        loadingContainer = document.createElement('div');
        loadingContainer.id = 'ai-loading-container';
        loadingContainer.className = 'ai-loading';
        
        // Create HTML structure for loading animation
        loadingContainer.innerHTML = `
            <div class="loading-animation">
                <i class="fas fa-robot" style="color: var(--primary-color);"></i>
                <div class="loading-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
            <div class="loading-text">
                <p>Analyzing your experience and crafting a professional summary...</p>
            </div>
        `;
        
        // Insert the loading container after the generate button
        if (generateSummaryBtn && generateSummaryBtn.parentNode) {
            generateSummaryBtn.parentNode.insertBefore(
                loadingContainer, 
                generateSummaryBtn.nextSibling
            );
        }
    }
    
    // Handle generate button click
    async function handleGenerateSummary() {
        // Show loading state
        setLoadingState(true);
        
        try {
            // Collect data from the form
            const userData = collectUserData();
            
            // Check if we have enough data
            if (!hasEnoughData(userData)) {
                showError('Please fill in more details about your experience and skills first.');
                return;
            }
            
            // Generate summary
            const summary = await generateSummary(userData);
            
            // Update the summary field
            updateSummaryField(summary);
            
            // Show success message
            showSuccess();
            
        } catch (error) {
            console.error('Error generating summary:', error);
            showError('Sorry, we encountered an error. Please try again later.');
        } finally {
            // Hide loading state
            setLoadingState(false);
        }
    }
    
    // Handle enhance experience button click
    async function handleEnhanceExperience(entryElement, entryId) {
        // Get the button and description field
        const enhanceBtn = entryElement.querySelector(`#enhance-experience-${entryId}`);
        const descriptionField = entryElement.querySelector(`#job-description-${entryId}`);
        
        if (!enhanceBtn || !descriptionField) return;
        
        // Show loading state
        enhanceBtn.disabled = true;
        enhanceBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enhancing...</span>';
        
        try {
            // Collect data for this experience entry
            const jobTitleField = entryElement.querySelector(`#job-title-${entryId}`);
            const employerField = entryElement.querySelector(`#employer-${entryId}`);
            
            const experienceData = {
                jobTitle: jobTitleField?.value || '',
                employer: employerField?.value || '',
                description: descriptionField?.value || ''
            };
            
            // Check if we have enough data
            if (!experienceData.description) {
                showError('Please add a description to enhance.');
                return;
            }
            
            // Call API to enhance the experience description
            const enhancedDescription = await enhanceExperienceDescription(experienceData);
            
            // Update the description field
            descriptionField.value = enhancedDescription;
            
            // Trigger an input event to update preview
            const event = new Event('input', { bubbles: true });
            descriptionField.dispatchEvent(event);
            
            // Show success indication
            enhanceBtn.innerHTML = '<i class="fas fa-check"></i> <span>Enhanced!</span>';
            setTimeout(() => {
                enhanceBtn.innerHTML = '<i class="fas fa-robot"></i> <span>Enhance with AI</span>';
                enhanceBtn.disabled = false;
            }, 2000);
            
        } catch (error) {
            console.error('Error enhancing experience:', error);
            showError('Failed to enhance experience description.');
            enhanceBtn.innerHTML = '<i class="fas fa-robot"></i> <span>Enhance with AI</span>';
        } finally {
            enhanceBtn.disabled = false;
        }
    }
    
    // Handle enhance project button click
    async function handleEnhanceProject(entryElement, entryId) {
        // Get the button and description field
        const enhanceBtn = entryElement.querySelector(`#enhance-project-${entryId}`);
        const descriptionField = entryElement.querySelector(`#project-description-${entryId}`);
        
        if (!enhanceBtn || !descriptionField) return;
        
        // Show loading state
        enhanceBtn.disabled = true;
        enhanceBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enhancing...</span>';
        
        try {
            // Collect data for this project entry
            const projectTitleField = entryElement.querySelector(`#project-title-${entryId}`);
            const projectRoleField = entryElement.querySelector(`#project-role-${entryId}`);
            
            const projectData = {
                projectTitle: projectTitleField?.value || '',
                projectRole: projectRoleField?.value || '',
                description: descriptionField?.value || ''
            };
            
            // Check if we have enough data
            if (!projectData.description) {
                showError('Please add a description to enhance.');
                return;
            }
            
            // Call API to enhance the project description
            const enhancedDescription = await enhanceProjectDescription(projectData);
            
            // Update the description field
            descriptionField.value = enhancedDescription;
            
            // Trigger an input event to update preview
            const event = new Event('input', { bubbles: true });
            descriptionField.dispatchEvent(event);
            
            // Show success indication
            enhanceBtn.innerHTML = '<i class="fas fa-check"></i> <span>Enhanced!</span>';
            setTimeout(() => {
                enhanceBtn.innerHTML = '<i class="fas fa-robot"></i> <span>Enhance with AI</span>';
                enhanceBtn.disabled = false;
            }, 2000);
            
        } catch (error) {
            console.error('Error enhancing project:', error);
            showError('Failed to enhance project description.');
            enhanceBtn.innerHTML = '<i class="fas fa-robot"></i> <span>Enhance with AI</span>';
        } finally {
            enhanceBtn.disabled = false;
        }
    }
    
    // Handle suggest skills button click
    async function handleSuggestSkills() {
        if (!suggestSkillsBtn) return;
        
        // Show loading state
        suggestSkillsBtn.disabled = true;
        suggestSkillsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Suggesting...</span>';
        
        try {
            // Collect user data
            const userData = collectUserData();
            
            // Check if we have enough data
            if (!hasEnoughData(userData)) {
                showError('Please fill in more details about your experience first.');
                return;
            }
            
            // Get suggested skills
            const suggestedSkills = await suggestSkillsForUser(userData);
            
            // Apply the suggested skills to the form
            applySuggestedSkills(suggestedSkills);
            
            // Show success indication
            suggestSkillsBtn.innerHTML = '<i class="fas fa-check"></i> <span>Skills Added!</span>';
            setTimeout(() => {
                suggestSkillsBtn.innerHTML = '<i class="fas fa-robot"></i> <span>Suggest Skills with AI</span>';
                suggestSkillsBtn.disabled = false;
            }, 2000);
            
        } catch (error) {
            console.error('Error suggesting skills:', error);
            showError('Failed to suggest skills.');
            suggestSkillsBtn.innerHTML = '<i class="fas fa-robot"></i> <span>Suggest Skills with AI</span>';
        } finally {
            suggestSkillsBtn.disabled = false;
        }
    }
    
    // Enhance experience description through API
    async function enhanceExperienceDescription(experienceData) {
        // In a real implementation, this would call your API service
        // For example:
        try {
            const response = await window.APIService.enhanceExperience(experienceData);
            return response.enhancedDescription;
        } catch (error) {
            console.error('API call failed:', error);
            // Fall back to mock implementation if API fails
            return mockEnhanceDescription(experienceData);
        }
    }
    
    // Mock enhance description function
    function mockEnhanceDescription(data) {
        const jobTitle = data.jobTitle || 'professional';
        const employer = data.employer || 'company';
        
        return `• Led key initiatives and projects that resulted in a 25% increase in operational efficiency at ${employer}.
• Developed innovative solutions that streamlined workflows and reduced processing time by 30%.
• Collaborated with cross-functional teams to implement best practices and optimize resource allocation.
• Demonstrated expertise in problem-solving, resulting in significant cost savings and improved customer satisfaction.`;
    }
    
    // Enhance project description through API
    async function enhanceProjectDescription(projectData) {
        // In a real implementation, this would call your API service
        // For now, let's use the same enhancement logic as for experiences
        try {
            const experienceData = {
                jobTitle: projectData.projectRole || projectData.projectTitle,
                employer: 'Project',
                description: projectData.description
            };
            const response = await window.APIService.enhanceExperience(experienceData);
            return response.enhancedDescription;
        } catch (error) {
            console.error('API call failed:', error);
            // Fall back to mock implementation
            return mockEnhanceProjectDescription(projectData);
        }
    }
    
    // Mock enhance project description function
    function mockEnhanceProjectDescription(data) {
        const projectTitle = data.projectTitle || 'project';
        
        return `• Designed and implemented a comprehensive ${projectTitle} solution that increased user engagement by 40%.
• Built robust architecture using modern technologies, ensuring scalability and maintainability.
• Optimized performance through efficient algorithms and data structures, reducing load times by 60%.
• Collaborated with stakeholders to deliver a high-quality solution that exceeded initial requirements.`;
    }
    
    // Suggest skills through API
    async function suggestSkillsForUser(userData) {
        // In a real implementation, this would call your API service
        try {
            const response = await window.APIService.suggestSkills(userData);
            return response.suggestedSkills;
        } catch (error) {
            console.error('API call failed:', error);
            // Fall back to mock implementation
            return mockSuggestSkills(userData);
        }
    }
    
    // Mock suggest skills function
    function mockSuggestSkills(userData) {
        const jobTitle = userData.jobTitle?.toLowerCase() || '';
        
        // Default skills by category
        let suggestedSkills = {
            'Technical Skills': ['Problem Solving', 'Data Analysis', 'Project Management', 'Research'],
            'Soft Skills': ['Communication', 'Teamwork', 'Time Management', 'Leadership'],
            'Tools & Technologies': ['Microsoft Office', 'Google Workspace', 'CRM Systems', 'Data Visualization']
        };
        
        // Specialized skills based on job title keywords
        if (jobTitle.includes('develop') || jobTitle.includes('program') || jobTitle.includes('engineer')) {
            suggestedSkills = {
                'Programming Languages': ['JavaScript', 'Python', 'Java', 'TypeScript', 'C#'],
                'Frameworks & Libraries': ['React', 'Angular', 'Node.js', 'Express', '.NET'],
                'Tools & Technologies': ['Git', 'Docker', 'AWS', 'CI/CD', 'REST APIs']
            };
        } else if (jobTitle.includes('design') || jobTitle.includes('ux') || jobTitle.includes('ui')) {
            suggestedSkills = {
                'Design Skills': ['UI/UX Design', 'Wireframing', 'Prototyping', 'User Research', 'Visual Design'],
                'Tools': ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Photoshop'],
                'Concepts': ['User-Centered Design', 'Responsive Design', 'Design Systems', 'Accessibility']
            };
        } else if (jobTitle.includes('market') || jobTitle.includes('brand')) {
            suggestedSkills = {
                'Marketing Skills': ['Digital Marketing', 'Content Strategy', 'SEO/SEM', 'Social Media Marketing', 'Email Campaigns'],
                'Analysis Tools': ['Google Analytics', 'HubSpot', 'SEMRush', 'Mailchimp', 'Social Media Analytics'],
                'Concepts': ['Conversion Optimization', 'A/B Testing', 'Brand Development', 'Market Research']
            };
        }
        
        return suggestedSkills;
    }
    
    // Apply suggested skills to the form
    function applySuggestedSkills(suggestedSkills) {
        const skillCategoriesContainer = document.getElementById('skill-categories');
        if (!skillCategoriesContainer) return;
        
        // Clear existing categories if needed
        // We'll keep existing ones and add new ones
        
        // For each suggested category
        Object.entries(suggestedSkills).forEach(([categoryName, skills], index) => {
            // Create or get category container
            let categoryContainer;
            
            // Try to find an existing category with this name
            const existingCategories = skillCategoriesContainer.querySelectorAll('.category-name');
            let categoryExists = false;
            
            existingCategories.forEach(categoryInput => {
                if (categoryInput.value === categoryName) {
                    categoryContainer = categoryInput.closest('.skill-category');
                    categoryExists = true;
                }
            });
            
            // If category doesn't exist, create a new one
            if (!categoryExists) {
                // Create new category element
                categoryContainer = document.createElement('div');
                categoryContainer.className = 'skill-category';
                categoryContainer.innerHTML = `
                    <div class="category-header">
                        <input type="text" class="category-name" value="${categoryName}">
                        <button class="btn icon-only remove-category" title="Remove Category">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <div class="skills-container">
                        <input type="text" class="add-skill-input" placeholder="Type a skill and press Enter">
                    </div>
                `;
                
                // Add the new category to the DOM
                skillCategoriesContainer.appendChild(categoryContainer);
            }
            
            // Get the skills container for this category
            const skillsContainer = categoryContainer.querySelector('.skills-container');
            const addSkillInput = skillsContainer.querySelector('.add-skill-input');
            
            // Add skills to this category
            skills.forEach(skill => {
                // Check if this skill already exists
                const existingSkills = Array.from(skillsContainer.querySelectorAll('.skill-tag span')).map(span => span.textContent.trim());
                if (!existingSkills.includes(skill)) {
                    // Create new skill tag
                    const skillTag = document.createElement('div');
                    skillTag.className = 'skill-tag';
                    skillTag.innerHTML = `
                        <span>${skill}</span>
                        <button class="remove-skill"><i class="fas fa-times"></i></button>
                    `;
                    
                    // Add event listener to remove button
                    skillTag.querySelector('.remove-skill').addEventListener('click', function() {
                        this.closest('.skill-tag').remove();
                        
                        // Trigger update of the preview
                        const event = new Event('input', { bubbles: true });
                        document.dispatchEvent(event);
                    });
                    
                    // Insert the new skill tag before the input
                    skillsContainer.insertBefore(skillTag, addSkillInput);
                }
            });
        });
        
        // Trigger update of the preview
        const event = new Event('input', { bubbles: true });
        document.dispatchEvent(event);
    }
    
    // Collect relevant user data from the form
    function collectUserData() {
        const data = {
            name: document.getElementById('full-name')?.value || '',
            jobTitle: document.getElementById('job-title')?.value || '',
            skills: collectSkills(),
            experience: collectExperience(),
            education: collectEducation()
        };
        
        return data;
    }
    
    // Collect skills from the form
    function collectSkills() {
        const skills = [];
        const skillTags = document.querySelectorAll('.skill-tag span');
        
        skillTags.forEach(tag => {
            if (tag.textContent) {
                skills.push(tag.textContent.trim());
            }
        });
        
        return skills;
    }
    
    // Collect work experience from the form
    function collectExperience() {
        const experience = [];
        const experienceEntries = document.querySelectorAll('.experience-entry');
        
        experienceEntries.forEach(entry => {
            const jobTitleField = entry.querySelector('[id^="job-title-"]');
            const employerField = entry.querySelector('[id^="employer-"]');
            const descriptionField = entry.querySelector('[id^="job-description-"]');
            
            if (jobTitleField && employerField && descriptionField) {
                const jobTitle = jobTitleField.value.trim();
                const employer = employerField.value.trim();
                const description = descriptionField.value.trim();
                
                if (jobTitle || employer || description) {
                    experience.push({
                        jobTitle,
                        employer,
                        description
                    });
                }
            }
        });
        
        return experience;
    }
    
    // Collect education from the form
    function collectEducation() {
        const education = [];
        const educationEntries = document.querySelectorAll('.education-entry');
        
        educationEntries.forEach(entry => {
            const degreeField = entry.querySelector('[id^="degree-"]');
            const institutionField = entry.querySelector('[id^="institution-"]');
            
            if (degreeField && institutionField) {
                const degree = degreeField.value.trim();
                const institution = institutionField.value.trim();
                
                if (degree || institution) {
                    education.push({
                        degree,
                        institution
                    });
                }
            }
        });
        
        return education;
    }
    
    // Check if we have enough data to generate a meaningful summary
    function hasEnoughData(userData) {
        // Need at least some work experience or skills
        return (userData.experience.length > 0 || userData.skills.length > 0);
    }
    
    // Generate summary based on user data
    async function generateSummary(userData) {
        // For now, we'll use a template-based approach
        // In a real implementation, this would call an API
        
        // Get the most recent job (if available)
        const recentJob = userData.experience[0] || {};
        
        // Get the top skills (up to 3)
        const topSkills = userData.skills.slice(0, 3).join(', ');
        
        // Create a summary based on available data
        let summary = '';
        
        if (recentJob.jobTitle && topSkills) {
            summary = `Experienced ${recentJob.jobTitle} with expertise in ${topSkills}. `;
        } else if (userData.jobTitle && topSkills) {
            summary = `Experienced ${userData.jobTitle} with expertise in ${topSkills}. `;
        } else if (recentJob.jobTitle) {
            summary = `Experienced ${recentJob.jobTitle} with a proven track record of success. `;
        } else if (userData.jobTitle) {
            summary = `Experienced ${userData.jobTitle} with a proven track record of success. `;
        } else {
            summary = 'Experienced professional with a proven track record of success. ';
        }
        
        // Add experience details if available
        if (recentJob.employer && recentJob.description) {
            const descriptionSnippet = recentJob.description.split('.')[0]; // Just first sentence
            summary += `Demonstrated success at ${recentJob.employer}, where I ${descriptionSnippet.toLowerCase()}. `;
        } else if (recentJob.employer) {
            summary += `Demonstrated success and delivered results at ${recentJob.employer}. `;
        }
        
        // Add education if available
        const recentEdu = userData.education[0] || {};
        if (recentEdu.degree && recentEdu.institution) {
            summary += `Holds a ${recentEdu.degree} from ${recentEdu.institution}. `;
        }
        
        // Add a strong closing statement
        summary += 'Committed to delivering high-quality results and driving business objectives.';
        
        // In a real implementation, you would call your AI service here
        // For example:
        // const response = await fetch('/api/generate-summary', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(userData)
        // });
        // return response.json().then(data => data.summary);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return summary;
    }
    
    // Update the summary field with generated text
    function updateSummaryField(summary) {
        if (professionalSummaryInput) {
            professionalSummaryInput.value = summary;
            
            // Also update the preview if available
            const previewSummary = document.getElementById('preview-summary');
            if (previewSummary) {
                previewSummary.innerHTML = `<p>${summary}</p>`;
            }
            
            // Trigger an input event to update any listeners
            const event = new Event('input', { bubbles: true });
            professionalSummaryInput.dispatchEvent(event);
        }
    }
    
    // Set loading state
    function setLoadingState(isLoading) {
        if (generateSummaryBtn) {
            generateSummaryBtn.disabled = isLoading;
            
            if (isLoading) {
                generateSummaryBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Generating...</span>';
                loadingContainer.classList.add('active');
            } else {
                generateSummaryBtn.innerHTML = '<i class="fas fa-robot"></i> <span>Generate with AI</span>';
                loadingContainer.classList.remove('active');
            }
        }
    }
    
    // Show error message
    function showError(message) {
        alert(message);
    }
    
    // Show success indication
    function showSuccess() {
        if (generateSummaryBtn) {
            const originalContent = generateSummaryBtn.innerHTML;
            generateSummaryBtn.innerHTML = '<i class="fas fa-check"></i> <span>Generated!</span>';
            
            setTimeout(() => {
                generateSummaryBtn.innerHTML = originalContent;
            }, 2000);
        }
    }
    
    // Return public API
    return {
        init: init,
        refreshListeners: refreshListeners // Expose this method to refresh listeners after DOM changes
    };
})();

// Initialize the AI Assistant when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    AIAssistant.init();
});

// Refresh listeners after dynamic content is added
document.addEventListener('DOMNodeInserted', function(e) {
    // Check if the inserted element might contain AI buttons
    if (e.target && (
        e.target.classList && (
            e.target.classList.contains('experience-entry') || 
            e.target.classList.contains('project-entry')
        ) ||
        e.target.querySelector && (
            e.target.querySelector('[id^="enhance-experience-"]') || 
            e.target.querySelector('[id^="enhance-project-"]')
        )
    )) {
        // Small delay to ensure DOM is fully updated
        setTimeout(() => {
            AIAssistant.refreshListeners();
        }, 100);
    }
});

// Export the module for potential use by other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIAssistant;
}