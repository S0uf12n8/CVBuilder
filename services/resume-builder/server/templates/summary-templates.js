/**
 * Industry-specific Resume Summary Templates
 * Provides tailored professional summary templates for different industries
 */

const summaryTemplates = {
    /**
     * Get a template for a specific industry
     * @param {string} industry - Industry name
     * @param {Object} data - User data including experience, skills, etc.
     * @returns {string} - Formatted summary
     */
    getTemplate(industry, data) {
      // Normalize industry name
      const normalizedIndustry = industry ? industry.toLowerCase().trim() : '';
      
      // Find matching template or use default
      if (this.templates[normalizedIndustry]) {
        return this.templates[normalizedIndustry](data);
      }
      
      // Try to find partial matches
      for (const key in this.templates) {
        if (normalizedIndustry.includes(key)) {
          return this.templates[key](data);
        }
      }
      
      // Fall back to default template
      return this.templates.default(data);
    },
    
    /**
     * Collection of industry-specific templates
     * Each template is a function that takes user data and returns formatted text
     */
    templates: {
      // Technology Industry
      software(data) {
        const years = data.experience?.length > 0 ? `${data.experience.length}+` : '';
        const skills = (data.skills || []).slice(0, 3).join(', ');
        const company = data.experience?.[0]?.employer || 'leading organizations';
        
        return `Innovative ${data.jobTitle || 'software professional'} with ${years} years of expertise in ${skills || 'software development'}. Demonstrated success delivering high-quality solutions at ${company}, with a focus on clean code and efficient problem-solving. Passionate about staying current with emerging technologies and implementing industry best practices.`;
      },
      
      technology(data) {
        return this.software(data);
      },
      
      // Marketing Industry
      marketing(data) {
        const years = data.experience?.length > 0 ? `${data.experience.length}+` : '';
        const skills = (data.skills || []).slice(0, 3).join(', ');
        const company = data.experience?.[0]?.employer || 'market-leading companies';
        
        return `Results-driven ${data.jobTitle || 'marketing professional'} with ${years} years of experience specializing in ${skills || 'strategic marketing initiatives'}. Successfully executed campaigns at ${company} that increased brand visibility and drove measurable customer engagement. Skilled in analyzing market trends and developing data-driven strategies that deliver exceptional ROI.`;
      },
      
      // Finance Industry
      finance(data) {
        const years = data.experience?.length > 0 ? `${data.experience.length}+` : '';
        const skills = (data.skills || []).slice(0, 3).join(', ');
        const company = data.experience?.[0]?.employer || 'reputable organizations';
        
        return `Detail-oriented ${data.jobTitle || 'finance professional'} with ${years} years of experience in ${skills || 'financial analysis and reporting'}. Consistently delivered accurate financial insights at ${company}, supporting informed business decisions and regulatory compliance. Adept at identifying cost-saving opportunities while maintaining operational excellence.`;
      },
      
      accounting(data) {
        return this.finance(data);
      },
      
      // Healthcare Industry
      healthcare(data) {
        const years = data.experience?.length > 0 ? `${data.experience.length}+` : '';
        const skills = (data.skills || []).slice(0, 3).join(', ');
        const company = data.experience?.[0]?.employer || 'healthcare facilities';
        
        return `Compassionate ${data.jobTitle || 'healthcare professional'} with ${years} years dedicated to providing exceptional patient care. Specialized in ${skills || 'healthcare delivery'} with a consistent record of excellence at ${company}. Committed to maintaining the highest standards of care while efficiently managing resources and staying current with medical advances.`;
      },
      
      medical(data) {
        return this.healthcare(data);
      },
      
      // Education Industry
      education(data) {
        const years = data.experience?.length > 0 ? `${data.experience.length}+` : '';
        const skills = (data.skills || []).slice(0, 3).join(', ');
        const company = data.experience?.[0]?.employer || 'educational institutions';
        
        return `Dedicated ${data.jobTitle || 'education professional'} with ${years} years of experience in ${skills || 'teaching and curriculum development'}. Proven track record of enhancing student engagement and academic outcomes at ${company}. Committed to creating inclusive learning environments and implementing innovative educational strategies.`;
      },
      
      teaching(data) {
        return this.education(data);
      },
      
      // Engineering Industry
      engineering(data) {
        const years = data.experience?.length > 0 ? `${data.experience.length}+` : '';
        const skills = (data.skills || []).slice(0, 3).join(', ');
        const company = data.experience?.[0]?.employer || 'engineering firms';
        
        return `Solution-focused ${data.jobTitle || 'engineering professional'} with ${years} years specializing in ${skills || 'engineering design and implementation'}. Successfully delivered complex projects at ${company} with attention to quality, efficiency, and innovation. Combines technical expertise with strong analytical skills to solve challenging problems.`;
      },
      
      // Sales Industry
      sales(data) {
        const years = data.experience?.length > 0 ? `${data.experience.length}+` : '';
        const skills = (data.skills || []).slice(0, 3).join(', ');
        const company = data.experience?.[0]?.employer || 'industry-leading organizations';
        
        return `Dynamic ${data.jobTitle || 'sales professional'} with ${years} years of proven success in ${skills || 'revenue generation and customer acquisition'}. Consistently exceeded targets at ${company} by building strong client relationships and identifying new business opportunities. Skilled negotiator with excellent communication abilities and a customer-centric approach.`;
      },
      
      // Customer Service Industry
      customer(data) {
        const years = data.experience?.length > 0 ? `${data.experience.length}+` : '';
        const skills = (data.skills || []).slice(0, 3).join(', ');
        const company = data.experience?.[0]?.employer || 'customer-focused organizations';
        
        return `Client-focused ${data.jobTitle || 'customer service professional'} with ${years} years of experience in ${skills || 'customer support and relationship management'}. Demonstrated excellence at ${company} in resolving complex issues while maintaining high satisfaction rates. Skilled communicator committed to delivering exceptional service experiences.`;
      },
      
      service(data) {
        return this.customer(data);
      },
      
      // Project Management Industry
      project(data) {
        const years = data.experience?.length > 0 ? `${data.experience.length}+` : '';
        const skills = (data.skills || []).slice(0, 3).join(', ');
        const company = data.experience?.[0]?.employer || 'reputable organizations';
        
        return `Accomplished ${data.jobTitle || 'project management professional'} with ${years} years leading ${skills || 'cross-functional teams and complex initiatives'}. Successfully delivered multiple high-impact projects at ${company}, consistently meeting deadlines and budget requirements. Skilled in stakeholder management and implementing efficient project methodologies.`;
      },
      
      management(data) {
        return this.project(data);
      },
      
      // Design Industry
      design(data) {
        const years = data.experience?.length > 0 ? `${data.experience.length}+` : '';
        const skills = (data.skills || []).slice(0, 3).join(', ');
        const company = data.experience?.[0]?.employer || 'creative agencies';
        
        return `Creative ${data.jobTitle || 'design professional'} with ${years} years crafting exceptional ${skills || 'visual solutions and user experiences'}. Developed innovative designs at ${company} that successfully communicated brand messages and enhanced user engagement. Combines artistic vision with technical proficiency to deliver compelling visual outcomes.`;
      },
      
      // Human Resources Industry
      human(data) {
        const years = data.experience?.length > 0 ? `${data.experience.length}+` : '';
        const skills = (data.skills || []).slice(0, 3).join(', ');
        const company = data.experience?.[0]?.employer || 'diverse organizations';
        
        return `Strategic ${data.jobTitle || 'HR professional'} with ${years} years specializing in ${skills || 'talent management and organizational development'}. Successfully implemented effective HR initiatives at ${company} that improved employee engagement and operational efficiency. Skilled in aligning human resource strategies with business objectives while fostering positive workplace cultures.`;
      },
      
      resources(data) {
        return this.human(data);
      },
      
      hr(data) {
        return this.human(data);
      },
      
      // Legal Industry
      legal(data) {
        const years = data.experience?.length > 0 ? `${data.experience.length}+` : '';
        const skills = (data.skills || []).slice(0, 3).join(', ');
        const company = data.experience?.[0]?.employer || 'respected firms';
        
        return `Meticulous ${data.jobTitle || 'legal professional'} with ${years} years of experience in ${skills || 'contract management and legal compliance'}. Provided sound legal guidance at ${company}, effectively mitigating risks and ensuring regulatory adherence. Combines thorough legal knowledge with pragmatic business acumen to deliver actionable solutions.`;
      },
      
      // Research Industry
      research(data) {
        const years = data.experience?.length > 0 ? `${data.experience.length}+` : '';
        const skills = (data.skills || []).slice(0, 3).join(', ');
        const company = data.experience?.[0]?.employer || 'research institutions';
        
        return `Analytical ${data.jobTitle || 'research professional'} with ${years} years conducting impactful research in ${skills || 'data analysis and methodology development'}. Led significant research initiatives at ${company}, contributing valuable insights and evidence-based recommendations. Skilled in applying rigorous methodologies to solve complex problems and advance knowledge.`;
      },
      
      // Default Template (General Professional)
      default(data) {
        const years = data.experience?.length > 0 ? `${data.experience.length}+` : '';
        const skills = (data.skills || []).slice(0, 3).join(', ');
        const company = data.experience?.[0]?.employer || 'previous organizations';
        const jobTitle = data.jobTitle || data.experience?.[0]?.jobTitle || 'professional';
        
        return `Accomplished ${jobTitle} with ${years} years of experience specializing in ${skills || 'key industry areas'}. Demonstrated success at ${company}, consistently delivering high-quality results and exceeding expectations. Combines strong technical expertise with excellent communication skills to effectively collaborate with diverse teams and drive business objectives.`;
      }
    }
  };
  
  // For Node.js environments
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = summaryTemplates;
  } else {
    // For browser environments
    window.summaryTemplates = summaryTemplates;
  }