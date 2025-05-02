/**
 * AI Service for Resume Builder
 * Handles AI functionality for generating resume content
 */

// Import dependencies
const axios = require('axios');
require('dotenv').config();

// AI service configuration
const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    apiUrl: 'https://api.openai.com/v1',
    model: 'gpt-4-turbo', // Or your preferred model
    maxTokens: 500,
    temperature: 0.7
  }
};

/**
 * AI Service Module
 */
const aiService = {
  /**
   * Generate a professional summary based on user data
   * @param {Object} userData - User's experience, skills, and other information
   * @returns {Promise<Object>} - The generated summary
   */
  async generateSummary(userData) {
    try {
      // Create prompt for the AI
      const prompt = createSummaryPrompt(userData);
      
      // Get response from AI model
      const completion = await callAIModel(prompt);
      
      return { summary: completion.trim() };
    } catch (error) {
      console.error('Error generating summary:', error);
      throw new Error('Failed to generate summary');
    }
  },
  
  /**
   * Enhance work experience descriptions
   * @param {Object} experienceData - Job information to enhance
   * @returns {Promise<Object>} - Enhanced description
   */
  async enhanceExperience(experienceData) {
    try {
      // Create prompt for the AI
      const prompt = createExperiencePrompt(experienceData);
      
      // Get response from AI model
      const completion = await callAIModel(prompt);
      
      return { enhancedDescription: completion.trim() };
    } catch (error) {
      console.error('Error enhancing experience:', error);
      throw new Error('Failed to enhance experience description');
    }
  },
  
  /**
   * Suggest relevant skills based on job titles and experience
   * @param {Object} userData - User's experience and job titles
   * @returns {Promise<Object>} - List of suggested skills
   */
  async suggestSkills(userData) {
    try {
      // Create prompt for the AI
      const prompt = createSkillsPrompt(userData);
      
      // Get response from AI model
      const completion = await callAIModel(prompt);
      
      // Parse the completion to extract skill categories
      const suggestedSkills = parseSkillsResponse(completion);
      
      return { suggestedSkills };
    } catch (error) {
      console.error('Error suggesting skills:', error);
      throw new Error('Failed to suggest skills');
    }
  }
};

/**
 * Create a prompt for summary generation
 * @param {Object} userData - User data
 * @returns {string} - Formatted prompt
 */
function createSummaryPrompt(userData) {
  // Extract user data
  const name = userData.name || '';
  const jobTitle = userData.jobTitle || '';
  const skills = (userData.skills || []).join(', ');
  
  // Format experience data
  const experienceText = (userData.experience || []).map(exp => {
    return `- ${exp.jobTitle || 'Position'} at ${exp.employer || 'Company'}: ${exp.description || 'No description provided'}`;
  }).join('\n');
  
  // Format education data
  const educationText = (userData.education || []).map(edu => {
    return `- ${edu.degree || 'Degree'} from ${edu.institution || 'Institution'}`;
  }).join('\n');
  
  // Construct the prompt
  return `
Create a compelling professional summary for a resume with the following details:

Name: ${name}
Current/Target Position: ${jobTitle}
Skills: ${skills}

Work Experience:
${experienceText}

Education:
${educationText}

The summary should be concise (3-4 sentences), highlight key strengths, mention notable achievements, and include relevant skills. Focus on quantifiable results where possible. The tone should be professional and confident.
`.trim();
}

/**
 * Create a prompt for experience enhancement
 * @param {Object} experienceData - Experience data
 * @returns {string} - Formatted prompt
 */
function createExperiencePrompt(experienceData) {
  // Extract experience data
  const jobTitle = experienceData.jobTitle || '';
  const employer = experienceData.employer || '';
  const description = experienceData.description || '';
  
  // Construct the prompt
  return `
Enhance the following job description for a resume. Transform it into 3-4 impactful bullet points that emphasize achievements, skills, and contributions. Use strong action verbs and include quantifiable results where possible.

Job Title: ${jobTitle}
Employer: ${employer}
Original Description: ${description}

Create bullet points that:
1. Start with powerful action verbs
2. Include specific, measurable achievements
3. Highlight relevant skills and technologies
4. Show impact on the company or team
`.trim();
}

/**
 * Create a prompt for skills suggestion
 * @param {Object} userData - User data
 * @returns {string} - Formatted prompt
 */
function createSkillsPrompt(userData) {
  // Extract user data
  const jobTitle = userData.jobTitle || '';
  
  // Format experience data
  const experienceText = (userData.experience || []).map(exp => {
    return `- ${exp.jobTitle || 'Position'} at ${exp.employer || 'Company'}: ${exp.description || 'No description provided'}`;
  }).join('\n');
  
  // Current skills
  const currentSkills = (userData.skills || []).join(', ');
  
  // Construct the prompt
  return `
Based on the following professional information, suggest relevant skills organized by category for a resume.

Current/Target Position: ${jobTitle}
Current Skills: ${currentSkills}

Work Experience:
${experienceText}

Please provide skills organized in 3 categories relevant to this professional profile. Format your response like this:

Category Name 1: skill1, skill2, skill3, skill4, skill5
Category Name 2: skill1, skill2, skill3, skill4, skill5
Category Name 3: skill1, skill2, skill3, skill4, skill5
`.trim();
}

/**
 * Parse the skills response from the AI
 * @param {string} response - AI response
 * @returns {Object} - Parsed skills by category
 */
function parseSkillsResponse(response) {
  const skillsByCategory = {};
  
  // Split the response by lines
  const lines = response.split('\n').filter(line => line.trim() !== '');
  
  // Parse each line as a category
  lines.forEach(line => {
    // Check if the line has the category: skills format
    if (line.includes(':')) {
      const [category, skillsText] = line.split(':').map(part => part.trim());
      
      // Split the skills by comma
      const skills = skillsText.split(',').map(skill => skill.trim());
      
      // Add to results
      skillsByCategory[category] = skills;
    }
  });
  
  return skillsByCategory;
}

/**
 * Call AI model with the given prompt
 * @param {string} prompt - Input prompt
 * @returns {Promise<string>} - Model completion
 */
async function callAIModel(prompt) {
  try {
    // Call OpenAI API
    const response = await axios.post(
      `${config.openai.apiUrl}/chat/completions`,
      {
        model: config.openai.model,
        messages: [
          { role: 'system', content: 'You are a professional resume writer with expertise in creating compelling content. Provide well-structured, concise, and impactful content.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: config.openai.maxTokens,
        temperature: config.openai.temperature
      },
      {
        headers: {
          'Authorization': `Bearer ${config.openai.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Extract the completion from the response
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling AI model:', error.response?.data || error.message);
    throw new Error('Failed to get response from AI model');
  }
}

module.exports = aiService;