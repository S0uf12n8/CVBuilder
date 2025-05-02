/**
 * API Service for Resume Builder
 * Handles all external API communication, including AI services
 */

const APIService = (function() {
    // Configuration
    const config = {
        baseUrl: '/api', // Base URL for API calls
        endpoints: {
            generateSummary: '/generate-summary',
            enhanceExperience: '/enhance-experience',
            suggestSkills: '/suggest-skills'
        },
        // Default request options
        defaultOptions: {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 15000 // 15 seconds timeout
        }
    };
    
    // Initialize the service
    function init(options = {}) {
        // Merge custom options with defaults
        if (options.baseUrl) config.baseUrl = options.baseUrl;
        if (options.endpoints) {
            config.endpoints = {...config.endpoints, ...options.endpoints};
        }
        
        console.log('API Service initialized');
    }
    
    /**
     * Generate a professional summary based on user data
     * @param {Object} userData - User's experience, skills, and other information
     * @returns {Promise<Object>} - The generated summary
     */
    async function generateSummary(userData) {
        try {
            // For development/testing without a backend:
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                return mockGenerateSummary(userData);
            }
            
            // Real API call
            const response = await makeRequest(
                config.endpoints.generateSummary,
                'POST',
                userData
            );
            
            return response;
        } catch (error) {
            console.error('Error generating summary:', error);
            throw new Error('Failed to generate summary. Please try again later.');
        }
    }
    
    /**
     * Enhance work experience descriptions
     * @param {Object} experienceData - Job information to enhance
     * @returns {Promise<Object>} - Enhanced description
     */
    async function enhanceExperience(experienceData) {
        try {
            // For development/testing without a backend:
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                return mockEnhanceExperience(experienceData);
            }
            
            // Real API call
            const response = await makeRequest(
                config.endpoints.enhanceExperience,
                'POST',
                experienceData
            );
            
            return response;
        } catch (error) {
            console.error('Error enhancing experience:', error);
            throw new Error('Failed to enhance experience. Please try again later.');
        }
    }
    
    /**
     * Suggest relevant skills based on job titles and experience
     * @param {Object} userData - User's experience and job titles
     * @returns {Promise<Object>} - List of suggested skills
     */
    async function suggestSkills(userData) {
        try {
            // For development/testing without a backend:
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                return mockSuggestSkills(userData);
            }
            
            // Real API call
            const response = await makeRequest(
                config.endpoints.suggestSkills,
                'POST',
                userData
            );
            
            return response;
        } catch (error) {
            console.error('Error suggesting skills:', error);
            throw new Error('Failed to suggest skills. Please try again later.');
        }
    }
    
    /**
     * Make an API request
     * @param {string} endpoint - API endpoint
     * @param {string} method - HTTP method
     * @param {Object} data - Request payload
     * @returns {Promise<Object>} - API response
     */
    async function makeRequest(endpoint, method, data = null) {
        const url = `${config.baseUrl}${endpoint}`;
        
        const options = {
            ...config.defaultOptions,
            method: method,
            credentials: 'include' // Include cookies for authentication
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        
        try {
            const response = await fetchWithTimeout(url, options);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API error: ${response.status} - ${errorText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Request to ${endpoint} failed:`, error);
            throw error;
        }
    }
    
    /**
     * Fetch with timeout
     * @param {string} url - Request URL
     * @param {Object} options - Fetch options
     * @returns {Promise<Response>} - Fetch response
     */
    async function fetchWithTimeout(url, options) {
        const timeout = options.timeout || config.defaultOptions.timeout;
        
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(id);
            return response;
        } catch (error) {
            clearTimeout(id);
            throw error;
        }
    }
    
    // Mock functions for development/testing
    
    /**
     * Mock generate summary for development
     * @param {Object} userData - User data
     * @returns {Promise<Object>} - Simulated API response
     */
    async function mockGenerateSummary(userData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Extract user data
        const name = userData.name || 'professional';
        const jobTitle = userData.jobTitle || userData.experience?.[0]?.jobTitle || 'professional';
        const skills = userData.skills || [];
        const experience = userData.experience || [];
        
        // Generate appropriate content based on available data
        let summary = '';
        
        if (experience.length > 0 && skills.length > 0) {
            const recentJob = experience[0];
            const skillsText = skills.slice(0, 3).join(', ');
            
            summary = `Dedicated ${jobTitle} with ${experience.length}+ years of experience specializing in ${skillsText}. Proven track record at ${recentJob.employer || 'leading organizations'} of delivering exceptional results and driving business growth. Combines strong technical expertise with excellent communication skills to effectively collaborate with cross-functional teams.`;
        } else if (experience.length > 0) {
            const recentJob = experience[0];
            
            summary = `Experienced ${jobTitle} with a strong background in ${recentJob.jobTitle || 'the industry'}. Demonstrated success at ${recentJob.employer || 'previous organizations'}, consistently exceeding expectations and driving business objectives. Skilled at adapting to new challenges and delivering high-quality work in fast-paced environments.`;
        } else if (skills.length > 0) {
            const skillsText = skills.slice(0, 3).join(', ');
            
            summary = `Results-driven ${jobTitle} proficient in ${skillsText}. Adept at leveraging technical knowledge to implement innovative solutions to complex problems. Committed to continuous improvement and staying current with industry best practices.`;
        } else {
            summary = `Motivated ${jobTitle} with a passion for excellence and delivering results. Strong problem-solving skills and ability to thrive in fast-paced environments. Dedicated to professional growth and contributing to organizational success through innovative thinking and collaborative teamwork.`;
        }
        
        return { summary };
    }
    
    /**
     * Mock enhance experience for development
     * @param {Object} experienceData - Experience to enhance
     * @returns {Promise<Object>} - Simulated API response
     */
    async function mockEnhanceExperience(experienceData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const jobTitle = experienceData.jobTitle || 'professional';
        const employer = experienceData.employer || 'the organization';
        
        // Sample action verbs for different job types
        const actionVerbs = {
            developer: ['Developed', 'Implemented', 'Architected', 'Optimized', 'Refactored'],
            manager: ['Led', 'Managed', 'Directed', 'Oversaw', 'Coordinated'],
            designer: ['Designed', 'Created', 'Conceptualized', 'Crafted', 'Visualized'],
            analyst: ['Analyzed', 'Evaluated', 'Researched', 'Identified', 'Assessed'],
            default: ['Spearheaded', 'Executed', 'Delivered', 'Achieved', 'Improved']
        };
        
        // Choose appropriate verbs based on job title
        let verbSet = actionVerbs.default;
        Object.keys(actionVerbs).forEach(key => {
            if (jobTitle.toLowerCase().includes(key)) {
                verbSet = actionVerbs[key];
            }
        });
        
        // Generate enhanced bullet points
        const enhancedDescription = [
            `${verbSet[0]} key projects that resulted in a 20% increase in efficiency and significant cost savings.`,
            `${verbSet[1]} innovative solutions to address complex challenges, consistently exceeding stakeholder expectations.`,
            `${verbSet[2]} cross-functional team collaboration to ensure timely delivery of high-quality deliverables.`,
            `${verbSet[3]} process improvements that enhanced productivity and reduced operational overhead.`
        ].join('\n\n');
        
        return { 
            enhancedDescription 
        };
    }
    
    /**
     * Mock suggest skills for development
     * @param {Object} userData - User data
     * @returns {Promise<Object>} - Simulated API response
     */
    async function mockSuggestSkills(userData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const jobTitle = userData.jobTitle || 
            (userData.experience && userData.experience[0] ? userData.experience[0].jobTitle : '');
        
        // Skill suggestions by job category
        const skillsByCategory = {
            developer: {
                'Programming Languages': ['JavaScript', 'Python', 'Java', 'TypeScript', 'C#'],
                'Frameworks': ['React', 'Angular', 'Node.js', 'Express', 'Django'],
                'Tools': ['Git', 'Docker', 'AWS', 'Jenkins', 'Kubernetes']
            },
            designer: {
                'Design Tools': ['Adobe Creative Suite', 'Figma', 'Sketch', 'InVision', 'Photoshop'],
                'Skills': ['UI/UX Design', 'Wireframing', 'Prototyping', 'Typography', 'Color Theory'],
                'Concepts': ['User-Centered Design', 'Design Thinking', 'Responsive Design', 'Accessibility']
            },
            manager: {
                'Leadership': ['Team Leadership', 'Strategic Planning', 'Project Management', 'Budget Management'],
                'Methodologies': ['Agile', 'Scrum', 'Waterfall', 'Lean', 'Six Sigma'],
                'Tools': ['Jira', 'Asana', 'Trello', 'Slack', 'Microsoft Project']
            },
            analyst: {
                'Analysis Tools': ['Excel', 'Tableau', 'Power BI', 'SQL', 'R'],
                'Skills': ['Data Analysis', 'Statistical Analysis', 'Forecasting', 'Reporting', 'Data Visualization'],
                'Concepts': ['Business Intelligence', 'KPI Development', 'Process Improvement']
            },
            default: {
                'Professional Skills': ['Communication', 'Collaboration', 'Problem Solving', 'Time Management'],
                'Technical Skills': ['Microsoft Office', 'Google Workspace', 'Data Analysis', 'Research'],
                'Soft Skills': ['Leadership', 'Adaptability', 'Critical Thinking', 'Attention to Detail']
            }
        };
        
        // Determine which category to use
        let category = 'default';
        Object.keys(skillsByCategory).forEach(key => {
            if (jobTitle.toLowerCase().includes(key)) {
                category = key;
            }
        });
        
        return { 
            suggestedSkills: skillsByCategory[category] 
        };
    }
    
    // Return public API
    return {
        init,
        generateSummary,
        enhanceExperience,
        suggestSkills
    };
})();

// Initialize the API Service
document.addEventListener('DOMContentLoaded', function() {
    APIService.init();
});

// Export the module for use by other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIService;
} else {
    // Make it available globally in browser environments
    window.APIService = APIService;
}