/**
 * AI Assistant for Resume Builder
 * Helps generate professional summaries based on user experience
 */

// Main module for AI functionality
const AIAssistant = (function() {
    // DOM elements
    const generateSummaryBtn = document.getElementById('generate-summary');
    const professionalSummaryInput = document.getElementById('professional-summary');
    let loadingContainer = null;
    
    // Initialize the module
    function init() {
        // Create loading indicator if it doesn't exist
        createLoadingIndicator();
        
        // Add event listeners
        if (generateSummaryBtn) {
            generateSummaryBtn.addEventListener('click', handleGenerateSummary);
        }
        
        console.log('AI Assistant initialized');
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
        init: init
    };
})();

// Initialize the AI Assistant when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    AIAssistant.init();
});

// Export the module for potential use by other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIAssistant;
}