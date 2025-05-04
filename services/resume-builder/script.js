// Resume Builder JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sectionItems = document.querySelectorAll('.section-item');
    const templateOptions = document.querySelectorAll('.template-option');
    const fullNameInput = document.getElementById('full-name');
    const jobTitleInput = document.getElementById('job-title');
    const locationInput = document.getElementById('location');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const websiteInput = document.getElementById('website');
    
    // Preview elements
    const previewName = document.getElementById('preview-name');
    const previewTitle = document.getElementById('preview-title');
    const previewLocation = document.getElementById('preview-location');
    const previewEmail = document.getElementById('preview-email');
    const previewPhone = document.getElementById('preview-phone');
    const previewWebsite = document.getElementById('preview-website');
    const previewSummary = document.getElementById('preview-summary');
    
    // Resume template switching
    templateOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all templates
            templateOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked template
            this.classList.add('active');
            
            // Get template name
            const templateName = this.getAttribute('data-template');
            
            // Update resume preview template
            const resumePreview = document.querySelector('.resume');
            resumePreview.className = `resume ${templateName}-template`;
        });
    });
    
    // Section navigation
    sectionItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all section items
            sectionItems.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked section
            this.classList.add('active');
            
            // Get section name
            const sectionName = this.getAttribute('data-section');
            
            // Hide all sections
            document.querySelectorAll('.form-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            const sectionToShow = document.getElementById(`${sectionName}-section`);
            if (sectionToShow) {
                sectionToShow.classList.add('active');
            }
        });
    });
    
    // Navigation between form sections with next/previous buttons
    function navigateToSection(sectionName) {
        // Update sidebar navigation
        sectionItems.forEach(item => {
            if (item.getAttribute('data-section') === sectionName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Hide all form sections
        document.querySelectorAll('.form-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
            // Scroll to top of the form section
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Set up next/previous button navigation
    const nextButtons = document.querySelectorAll('.next-section');
    const prevButtons = document.querySelectorAll('.prev-section');
    
    // Define the section order
    const sectionOrder = [
        'personal',
        'summary',
        'experience',
        'education',
        'skills',
        'certifications',
        'languages',
        'projects'
    ];
    
    // Add event listeners to next buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the current active section
            const currentSection = document.querySelector('.form-section.active');
            const currentSectionId = currentSection.id.replace('-section', '');
            const currentIndex = sectionOrder.indexOf(currentSectionId);
            
            // Navigate to next section if not at the end
            if (currentIndex < sectionOrder.length - 1) {
                navigateToSection(sectionOrder[currentIndex + 1]);
            }
        });
    });
    
    // Add event listeners to previous buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the current active section
            const currentSection = document.querySelector('.form-section.active');
            const currentSectionId = currentSection.id.replace('-section', '');
            const currentIndex = sectionOrder.indexOf(currentSectionId);
            
            // Navigate to previous section if not at the beginning
            if (currentIndex > 0) {
                navigateToSection(sectionOrder[currentIndex - 1]);
            }
        });
    });
    
    // Real-time preview updates
    fullNameInput?.addEventListener('input', function() {
        previewName.textContent = this.value || 'John Smith';
    });
    
    jobTitleInput?.addEventListener('input', function() {
        previewTitle.textContent = this.value || 'Software Developer';
    });
    
    locationInput?.addEventListener('input', function() {
        const locationText = this.value || 'New York, NY';
        previewLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${locationText}`;
    });
    
    emailInput?.addEventListener('input', function() {
        const emailText = this.value || 'john@example.com';
        previewEmail.innerHTML = `<i class="fas fa-envelope"></i> ${emailText}`;
    });
    
    phoneInput?.addEventListener('input', function() {
        const phoneText = this.value || '(555) 123-4567';
        previewPhone.innerHTML = `<i class="fas fa-phone"></i> ${phoneText}`;
    });
    
    websiteInput?.addEventListener('input', function() {
        const websiteText = this.value || 'linkedin.com/in/johnsmith';
        previewWebsite.innerHTML = `<i class="fas fa-globe"></i> ${websiteText}`;
    });
    
    // Additional form elements for other sections
    const professionalSummaryInput = document.getElementById('professional-summary');
    
    // Function to initialize or get a preview section
    function getOrCreatePreviewSection(sectionId, sectionTitle) {
        let section = document.getElementById(sectionId);
        
        if (!section) {
            // Create new section if it doesn't exist
            const resumeBody = document.querySelector('.resume-body');
            section = document.createElement('div');
            section.className = 'resume-section';
            section.innerHTML = `
                <h3 class="section-title">${sectionTitle}</h3>
                <div class="section-content" id="${sectionId}"></div>
            `;
            resumeBody.appendChild(section);
        }
        
        return document.getElementById(sectionId);
    }
    
    // Real-time preview updates for professional summary
    professionalSummaryInput?.addEventListener('input', function() {
        if (!previewSummary) return;
        previewSummary.innerHTML = `<p>${this.value || 'Experienced software developer with 5+ years specializing in frontend development. Proven track record of building responsive web applications with modern JavaScript frameworks.'}</p>`;
    });
    
    // Real-time preview updates for work experience
    function updateExperiencePreview() {
        const experienceEntries = document.querySelectorAll('.experience-entry');
        const previewExperience = getOrCreatePreviewSection('preview-experience', 'Work Experience');
        
        let experienceHTML = '';
        
        experienceEntries.forEach((entry, index) => {
            const jobTitle = entry.querySelector(`#job-title-${index+1}`)?.value;
            const employer = entry.querySelector(`#employer-${index+1}`)?.value;
            const startDate = entry.querySelector(`#job-start-date-${index+1}`)?.value;
            const endDate = entry.querySelector(`#job-end-date-${index+1}`)?.value;
            const isCurrentJob = entry.querySelector(`#current-job-${index+1}`)?.checked;
            const location = entry.querySelector(`#job-location-${index+1}`)?.value;
            const description = entry.querySelector(`#job-description-${index+1}`)?.value;
            
            if (jobTitle || employer) {
                experienceHTML += `
                    <div class="resume-item">
                        <div class="item-header">
                            <h4>${jobTitle || 'Job Title'}</h4>
                            <div class="item-subheader">
                                <span class="item-employer">${employer || 'Company'}</span>
                                <span class="item-date">${formatDate(startDate)} - ${isCurrentJob ? 'Present' : formatDate(endDate)}</span>
                            </div>
                            ${location ? `<div class="item-location">${location}</div>` : ''}
                        </div>
                        <div class="item-description">
                            <p>${description || 'Job description'}</p>
                        </div>
                    </div>
                `;
            }
        });
        
        previewExperience.innerHTML = experienceHTML || '<p>No work experience added yet.</p>';
    }
    
    // Real-time preview updates for education
    function updateEducationPreview() {
        const educationEntries = document.querySelectorAll('.education-entry');
        const previewEducation = getOrCreatePreviewSection('preview-education', 'Education');
        
        let educationHTML = '';
        
        educationEntries.forEach((entry, index) => {
            const degree = entry.querySelector(`#degree-${index+1}`)?.value;
            const institution = entry.querySelector(`#institution-${index+1}`)?.value;
            const startDate = entry.querySelector(`#edu-start-date-${index+1}`)?.value;
            const endDate = entry.querySelector(`#edu-end-date-${index+1}`)?.value;
            const isCurrentEdu = entry.querySelector(`#current-edu-${index+1}`)?.checked;
            const location = entry.querySelector(`#edu-location-${index+1}`)?.value;
            const gpa = entry.querySelector(`#gpa-${index+1}`)?.value;
            const description = entry.querySelector(`#edu-description-${index+1}`)?.value;
            
            if (degree || institution) {
                educationHTML += `
                    <div class="resume-item">
                        <div class="item-header">
                            <h4>${degree || 'Degree'}</h4>
                            <div class="item-subheader">
                                <span class="item-institution">${institution || 'University'}</span>
                                <span class="item-date">${formatDate(startDate)} - ${isCurrentEdu ? 'Present' : formatDate(endDate)}</span>
                            </div>
                            ${location ? `<div class="item-location">${location}</div>` : ''}
                        </div>
                        ${gpa ? `<div class="item-gpa">GPA: ${gpa}</div>` : ''}
                        ${description ? `<div class="item-description"><p>${description}</p></div>` : ''}
                    </div>
                `;
            }
        });
        
        previewEducation.innerHTML = educationHTML || '<p>No education added yet.</p>';
    }
    
    // Real-time preview updates for skills
    function updateSkillsPreview() {
        const skillCategories = document.querySelectorAll('.skill-category');
        const previewSkills = getOrCreatePreviewSection('preview-skills', 'Skills');
        
        let skillsHTML = '';
        
        skillCategories.forEach(category => {
            const categoryName = category.querySelector('.category-name')?.value;
            const skillTags = category.querySelectorAll('.skill-tag span');
            
            if (categoryName || skillTags.length > 0) {
                skillsHTML += `<div class="skill-category-preview">`;
                if (categoryName) {
                    skillsHTML += `<h4>${categoryName}</h4>`;
                }
                
                skillsHTML += `<div class="skills-list">`;
                skillTags.forEach(tag => {
                    skillsHTML += `<span class="skill">${tag.textContent}</span>`;
                });
                skillsHTML += `</div></div>`;
            }
        });
        
        previewSkills.innerHTML = skillsHTML || '<p>No skills added yet.</p>';
    }
    
    // Real-time preview updates for certifications
    function updateCertificationsPreview() {
        const certEntries = document.querySelectorAll('.certification-entry');
        const previewCertifications = getOrCreatePreviewSection('preview-certifications', 'Certifications');
        
        let certHTML = '';
        
        certEntries.forEach((entry, index) => {
            const certName = entry.querySelector(`#cert-name-${index+1}`)?.value;
            const issuingOrg = entry.querySelector(`#issuing-org-${index+1}`)?.value;
            const certDate = entry.querySelector(`#cert-date-${index+1}`)?.value;
            const expDate = entry.querySelector(`#expiration-date-${index+1}`)?.value;
            const noExpiration = entry.querySelector(`#no-expiration-${index+1}`)?.checked;
            
            if (certName || issuingOrg) {
                certHTML += `
                    <div class="resume-item">
                        <div class="item-header">
                            <h4>${certName || 'Certification'}</h4>
                            <div class="item-subheader">
                                <span class="item-issuer">${issuingOrg || 'Issuing Organization'}</span>
                                <span class="item-date">
                                    ${formatDate(certDate)}${noExpiration ? '' : expDate ? ` - Expires: ${formatDate(expDate)}` : ''}
                                </span>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        
        previewCertifications.innerHTML = certHTML || '<p>No certifications added yet.</p>';
    }
    
    // Real-time preview updates for languages
    function updateLanguagesPreview() {
        const languageEntries = document.querySelectorAll('.language-entry');
        const previewLanguages = getOrCreatePreviewSection('preview-languages', 'Languages');
        
        let langHTML = '';
        
        languageEntries.forEach((entry, index) => {
            const langName = entry.querySelector(`#language-name-${index+1}`)?.value;
            const proficiency = entry.querySelector(`#proficiency-${index+1}`)?.value;
            
            if (langName) {
                langHTML += `
                    <div class="language-item">
                        <span class="language-name">${langName}</span>
                        ${proficiency ? `<span class="language-proficiency">(${proficiency})</span>` : ''}
                    </div>
                `;
            }
        });
        
        previewLanguages.innerHTML = langHTML || '<p>No languages added yet.</p>';
    }
    
    // Real-time preview updates for projects
    function updateProjectsPreview() {
        const projectEntries = document.querySelectorAll('.project-entry');
        const previewProjects = getOrCreatePreviewSection('preview-projects', 'Projects');
        
        let projectsHTML = '';
        
        projectEntries.forEach((entry, index) => {
            const projectTitle = entry.querySelector(`#project-title-${index+1}`)?.value;
            const projectRole = entry.querySelector(`#project-role-${index+1}`)?.value;
            const projectDate = entry.querySelector(`#project-date-${index+1}`)?.value;
            const ongoing = entry.querySelector(`#ongoing-project-${index+1}`)?.checked;
            const projectUrl = entry.querySelector(`#project-url-${index+1}`)?.value;
            const projectDesc = entry.querySelector(`#project-description-${index+1}`)?.value;
            
            if (projectTitle || projectDesc) {
                projectsHTML += `
                    <div class="resume-item">
                        <div class="item-header">
                            <h4>${projectTitle || 'Project Title'}</h4>
                            <div class="item-subheader">
                                ${projectRole ? `<span class="item-role">${projectRole}</span>` : ''}
                                <span class="item-date">${formatDate(projectDate)}${ongoing ? ' - Present' : ''}</span>
                            </div>
                        </div>
                        ${projectUrl ? `<div class="item-url"><a href="${projectUrl}" target="_blank">${projectUrl}</a></div>` : ''}
                        <div class="item-description">
                            <p>${projectDesc || 'Project description'}</p>
                        </div>
                    </div>
                `;
            }
        });
        
        previewProjects.innerHTML = projectsHTML || '<p>No projects added yet.</p>';
    }
    
    // Helper function to format dates for preview
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }
    
    // Set up event listeners for form inputs
    function setupPreviewListeners() {
        // Professional Summary
        document.getElementById('professional-summary')?.addEventListener('input', function() {
            updatePreview();
        });
        
        // Work Experience
        document.querySelectorAll('#experience-entries input, #experience-entries textarea, #experience-entries select')
            .forEach(input => input.addEventListener('input', updatePreview));
        document.querySelectorAll('#experience-entries input[type="checkbox"]')
            .forEach(checkbox => checkbox.addEventListener('change', updatePreview));
        
        // Education
        document.querySelectorAll('#education-entries input, #education-entries textarea, #education-entries select')
            .forEach(input => input.addEventListener('input', updatePreview));
        document.querySelectorAll('#education-entries input[type="checkbox"]')
            .forEach(checkbox => checkbox.addEventListener('change', updatePreview));
        
        // Skills
        document.querySelectorAll('.skill-category .category-name')
            .forEach(input => input.addEventListener('input', updatePreview));
        
        // Certifications
        document.querySelectorAll('#certification-entries input, #certification-entries textarea, #certification-entries select')
            .forEach(input => input.addEventListener('input', updatePreview));
        document.querySelectorAll('#certification-entries input[type="checkbox"]')
            .forEach(checkbox => checkbox.addEventListener('change', updatePreview));
        
        // Languages
        document.querySelectorAll('#language-entries input, #language-entries select')
            .forEach(input => input.addEventListener('input', updatePreview));
        
        // Projects
        document.querySelectorAll('#project-entries input, #project-entries textarea')
            .forEach(input => input.addEventListener('input', updatePreview));
        document.querySelectorAll('#project-entries input[type="checkbox"]')
            .forEach(checkbox => checkbox.addEventListener('change', updatePreview));
    }
    
    // Function to update all preview sections
    function updatePreview() {
        updateExperiencePreview();
        updateEducationPreview();
        updateSkillsPreview();
        updateCertificationsPreview();
        updateLanguagesPreview();
        updateProjectsPreview();
    }
    
    // Initialize listeners for dynamic content
    function initDynamicListeners() {
        // Add Experience button
        document.getElementById('add-experience')?.addEventListener('click', function() {
            const experienceEntries = document.getElementById('experience-entries');
            const entryCount = experienceEntries.querySelectorAll('.experience-entry').length + 1;
            
            // Create new experience entry HTML
            const newEntryHTML = `
                <div class="experience-entry">
                    <div class="entry-header">
                        <h3>Experience ${entryCount}</h3>
                        <button class="btn icon-only remove-entry" title="Remove Entry">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="job-title-${entryCount}">Job Title</label>
                            <input type="text" id="job-title-${entryCount}" placeholder="e.g., Senior Developer">
                        </div>
                        <div class="form-group">
                            <label for="employer-${entryCount}">Employer</label>
                            <input type="text" id="employer-${entryCount}" placeholder="e.g., Tech Solutions Inc.">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="job-start-date-${entryCount}">Start Date</label>
                            <input type="month" id="job-start-date-${entryCount}">
                        </div>
                        <div class="form-group">
                            <label for="job-end-date-${entryCount}">End Date</label>
                            <input type="month" id="job-end-date-${entryCount}">
                            <div class="checkbox-group">
                                <input type="checkbox" id="current-job-${entryCount}">
                                <label for="current-job-${entryCount}">I currently work here</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="job-location-${entryCount}">Location</label>
                        <input type="text" id="job-location-${entryCount}" placeholder="e.g., San Francisco, CA">
                    </div>
                    <div class="form-group">
                        <label for="job-description-${entryCount}">Description</label>
                        <textarea id="job-description-${entryCount}" rows="4" placeholder="Describe your responsibilities, achievements, and the technologies you used..."></textarea>
                    </div>
                    <div class="ai-suggestion">
                        <button class="btn secondary" id="enhance-experience-${entryCount}">
                            <i class="fas fa-robot"></i>
                            <span>Enhance with AI</span>
                        </button>
                    </div>
                </div>
            `;
            
            // Append new entry to the container
            experienceEntries.insertAdjacentHTML('beforeend', newEntryHTML);
            
            // Add remove entry listener
            const removeButtons = experienceEntries.querySelectorAll('.remove-entry');
            removeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove this entry
                    this.closest('.experience-entry').remove();
                    // Re-number the remaining entries
                    renumberEntries('experience-entry', 'Experience');
                    // Update the preview
                    updatePreview();
                });
            });
            
            setupPreviewListeners(); // Rebind event listeners
            updatePreview();
        });
        
        // Add Education button
        document.getElementById('add-education')?.addEventListener('click', function() {
            const educationEntries = document.getElementById('education-entries');
            const entryCount = educationEntries.querySelectorAll('.education-entry').length + 1;
            
            // Create new education entry HTML
            const newEntryHTML = `
                <div class="education-entry">
                    <div class="entry-header">
                        <h3>Education ${entryCount}</h3>
                        <button class="btn icon-only remove-entry" title="Remove Entry">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="degree-${entryCount}">Degree</label>
                            <input type="text" id="degree-${entryCount}" placeholder="e.g., Bachelor of Science in Computer Science">
                        </div>
                        <div class="form-group">
                            <label for="institution-${entryCount}">Institution</label>
                            <input type="text" id="institution-${entryCount}" placeholder="e.g., University of Technology">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="edu-start-date-${entryCount}">Start Date</label>
                            <input type="month" id="edu-start-date-${entryCount}">
                        </div>
                        <div class="form-group">
                            <label for="edu-end-date-${entryCount}">End Date</label>
                            <input type="month" id="edu-end-date-${entryCount}">
                            <div class="checkbox-group">
                                <input type="checkbox" id="current-edu-${entryCount}">
                                <label for="current-edu-${entryCount}">I'm currently studying here</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="edu-location-${entryCount}">Location</label>
                        <input type="text" id="edu-location-${entryCount}" placeholder="e.g., Boston, MA">
                    </div>
                    <div class="form-group">
                        <label for="gpa-${entryCount}">GPA (Optional)</label>
                        <input type="text" id="gpa-${entryCount}" placeholder="e.g., 3.8/4.0">
                    </div>
                    <div class="form-group">
                        <label for="edu-description-${entryCount}">Additional Information</label>
                        <textarea id="edu-description-${entryCount}" rows="3" placeholder="e.g., Relevant coursework, academic achievements, honors..."></textarea>
                    </div>
                </div>
            `;
            
            // Append new entry to the container
            educationEntries.insertAdjacentHTML('beforeend', newEntryHTML);
            
            // Add remove entry listener
            const removeButtons = educationEntries.querySelectorAll('.remove-entry');
            removeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove this entry
                    this.closest('.education-entry').remove();
                    // Re-number the remaining entries
                    renumberEntries('education-entry', 'Education');
                    // Update the preview
                    updatePreview();
                });
            });
            
            setupPreviewListeners(); // Rebind event listeners
            updatePreview();
        });
        
        // Add Certification button
        document.getElementById('add-certification')?.addEventListener('click', function() {
            const certificationEntries = document.getElementById('certification-entries');
            const entryCount = certificationEntries.querySelectorAll('.certification-entry').length + 1;
            
            // Create new certification entry HTML
            const newEntryHTML = `
                <div class="certification-entry">
                    <div class="entry-header">
                        <h3>Certification ${entryCount}</h3>
                        <button class="btn icon-only remove-entry" title="Remove Entry">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <div class="form-group">
                        <label for="cert-name-${entryCount}">Certification Name</label>
                        <input type="text" id="cert-name-${entryCount}" placeholder="e.g., AWS Certified Solutions Architect">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="issuing-org-${entryCount}">Issuing Organization</label>
                            <input type="text" id="issuing-org-${entryCount}" placeholder="e.g., Amazon Web Services">
                        </div>
                        <div class="form-group">
                            <label for="cert-date-${entryCount}">Date Issued</label>
                            <input type="month" id="cert-date-${entryCount}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="expiration-date-${entryCount}">Expiration Date (Optional)</label>
                            <input type="month" id="expiration-date-${entryCount}">
                            <div class="checkbox-group">
                                <input type="checkbox" id="no-expiration-${entryCount}">
                                <label for="no-expiration-${entryCount}">No expiration date</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="credential-id-${entryCount}">Credential ID (Optional)</label>
                            <input type="text" id="credential-id-${entryCount}" placeholder="e.g., ABC123456">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="credential-url-${entryCount}">Credential URL (Optional)</label>
                        <input type="url" id="credential-url-${entryCount}" placeholder="e.g., https://www.credential-verification.com/123">
                    </div>
                </div>
            `;
            
            // Append new entry to the container
            certificationEntries.insertAdjacentHTML('beforeend', newEntryHTML);
            
            // Add remove entry listener
            const removeButtons = certificationEntries.querySelectorAll('.remove-entry');
            removeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove this entry
                    this.closest('.certification-entry').remove();
                    // Re-number the remaining entries
                    renumberEntries('certification-entry', 'Certification');
                    // Update the preview
                    updatePreview();
                });
            });
            
            setupPreviewListeners(); // Rebind event listeners
            updatePreview();
        });
        
        // Add Language button
        document.getElementById('add-language')?.addEventListener('click', function() {
            const languageEntries = document.getElementById('language-entries');
            const entryCount = languageEntries.querySelectorAll('.language-entry').length + 1;
            
            // Create new language entry HTML
            const newEntryHTML = `
                <div class="language-entry">
                    <div class="entry-header">
                        <h3>Language ${entryCount}</h3>
                        <button class="btn icon-only remove-entry" title="Remove Entry">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="language-name-${entryCount}">Language</label>
                            <input type="text" id="language-name-${entryCount}" placeholder="e.g., Spanish">
                        </div>
                        <div class="form-group">
                            <label for="proficiency-${entryCount}">Proficiency Level</label>
                            <select id="proficiency-${entryCount}">
                                <option value="">Select proficiency</option>
                                <option value="Native">Native</option>
                                <option value="Fluent">Fluent</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Basic">Basic</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="language-details-${entryCount}">Additional Details (Optional)</label>
                        <input type="text" id="language-details-${entryCount}" placeholder="e.g., TOEFL score, years studied, etc.">
                    </div>
                </div>
            `;
            
            // Append new entry to the container
            languageEntries.insertAdjacentHTML('beforeend', newEntryHTML);
            
            // Add remove entry listener
            const removeButtons = languageEntries.querySelectorAll('.remove-entry');
            removeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove this entry
                    this.closest('.language-entry').remove();
                    // Re-number the remaining entries
                    renumberEntries('language-entry', 'Language');
                    // Update the preview
                    updatePreview();
                });
            });
            
            setupPreviewListeners(); // Rebind event listeners
            updatePreview();
        });
        
        // Add Project button
        document.getElementById('add-project')?.addEventListener('click', function() {
            const projectEntries = document.getElementById('project-entries');
            const entryCount = projectEntries.querySelectorAll('.project-entry').length + 1;
            
            // Create new project entry HTML
            const newEntryHTML = `
                <div class="project-entry">
                    <div class="entry-header">
                        <h3>Project ${entryCount}</h3>
                        <button class="btn icon-only remove-entry" title="Remove Entry">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <div class="form-group">
                        <label for="project-title-${entryCount}">Project Title</label>
                        <input type="text" id="project-title-${entryCount}" placeholder="e.g., E-commerce Website Redesign">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="project-role-${entryCount}">Your Role (Optional)</label>
                            <input type="text" id="project-role-${entryCount}" placeholder="e.g., Lead Developer">
                        </div>
                        <div class="form-group">
                            <label for="project-date-${entryCount}">Date</label>
                            <input type="month" id="project-date-${entryCount}">
                            <div class="checkbox-group">
                                <input type="checkbox" id="ongoing-project-${entryCount}">
                                <label for="ongoing-project-${entryCount}">Ongoing project</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="project-url-${entryCount}">Project URL (Optional)</label>
                        <input type="url" id="project-url-${entryCount}" placeholder="e.g., https://github.com/yourusername/project">
                    </div>
                    <div class="form-group">
                        <label for="project-description-${entryCount}">Description</label>
                        <textarea id="project-description-${entryCount}" rows="4" placeholder="Describe the project, your contributions, technologies used, and outcomes..."></textarea>
                    </div>
                    <div class="ai-suggestion">
                        <button class="btn secondary" id="enhance-project-${entryCount}">
                            <i class="fas fa-robot"></i>
                            <span>Enhance with AI</span>
                        </button>
                    </div>
                </div>
            `;
            
            // Append new entry to the container
            projectEntries.insertAdjacentHTML('beforeend', newEntryHTML);
            
            // Add remove entry listener
            const removeButtons = projectEntries.querySelectorAll('.remove-entry');
            removeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove this entry
                    this.closest('.project-entry').remove();
                    // Re-number the remaining entries
                    renumberEntries('project-entry', 'Project');
                    // Update the preview
                    updatePreview();
                });
            });
            
            setupPreviewListeners(); // Rebind event listeners
            updatePreview();
        });
        
        // Initialize remove entry buttons for pre-existing entries
        document.querySelectorAll('.remove-entry').forEach(button => {
            button.addEventListener('click', function() {
                const entryEl = this.closest('[class$="-entry"]');
                const entryClass = Array.from(entryEl.classList).find(cls => cls.endsWith('-entry'));
                const sectionName = entryClass.replace('-entry', '');
                
                // Remove the entry
                entryEl.remove();
                
                // Re-number entries
                const sectionTitle = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
                renumberEntries(`${sectionName}-entry`, sectionTitle);
                
                // Update preview
                updatePreview();
            });
        });
    }
    
    // Helper function to renumber entries after deletion
    function renumberEntries(entryClass, labelText) {
        const entries = document.querySelectorAll(`.${entryClass}`);
        entries.forEach((entry, index) => {
            const entryNumber = index + 1;
            const entryHeader = entry.querySelector('.entry-header h3');
            if (entryHeader) {
                entryHeader.textContent = `${labelText} ${entryNumber}`;
            }
            
            // Update IDs and for attributes
            entry.querySelectorAll('[id]').forEach(element => {
                const oldId = element.id;
                const idBase = oldId.replace(/\d+$/, ''); // Remove number at the end
                element.id = `${idBase}${entryNumber}`;
            });
            
            entry.querySelectorAll('label[for]').forEach(label => {
                const oldFor = label.getAttribute('for');
                const forBase = oldFor.replace(/\d+$/, ''); // Remove number at the end
                label.setAttribute('for', `${forBase}${entryNumber}`);
            });
        });
    }
    
    // Run setup functions
    setupPreviewListeners();
    initDynamicListeners();
    updatePreview(); // Initialize preview with default values
    
    // Preview zoom controls
    const zoomIn = document.getElementById('zoom-in');
    const zoomOut = document.getElementById('zoom-out');
    const fullscreen = document.getElementById('fullscreen');
    const resumeElement = document.querySelector('.resume');
    
    let scale = 1;
    
    zoomIn?.addEventListener('click', function() {
        if (scale < 1.5) {
            scale += 0.1;
            resumeElement.style.transform = `scale(${scale})`;
        }
    });
    
    zoomOut?.addEventListener('click', function() {
        if (scale > 0.5) {
            scale -= 0.1;
            resumeElement.style.transform = `scale(${scale})`;
        }
    });
    
    fullscreen?.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.querySelector('.resume-preview').requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });
    
    // Save draft functionality
    const saveDraftBtn = document.getElementById('save-draft');
    
    saveDraftBtn?.addEventListener('click', function() {
        const resumeData = {
            template: document.querySelector('.template-option.active').getAttribute('data-template'),
            name: fullNameInput?.value || '',
            jobTitle: jobTitleInput?.value || '',
            location: locationInput?.value || '',
            email: emailInput?.value || '',
            phone: phoneInput?.value || '',
            website: websiteInput?.value || '',
            dateModified: new Date().toISOString()
        };
        
        // Save to localStorage
        const savedResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]');
        savedResumes.push(resumeData);
        localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
        
        alert('Resume draft saved successfully!');
    });
    
    // AI Tips button
    const moreTipsBtn = document.getElementById('more-tips');
    const tipsList = [
        "Use bullet points to make your accomplishments easy to scan",
        "Include keywords from the job description to pass ATS screening",
        "Keep your resume to 1-2 pages maximum",
        "Highlight your most relevant achievements for the position",
        "Use strong action verbs like 'managed', 'created', or 'implemented'",
        "Focus on results and metrics when describing your experience"
    ];
    
    let currentTips = 0;
    
    moreTipsBtn?.addEventListener('click', function() {
        const aiTips = document.querySelector('.ai-tips ul');
        aiTips.innerHTML = '';
        
        // Get next 3 tips
        for (let i = 0; i < 3; i++) {
            const tipIndex = (currentTips + i) % tipsList.length;
            const li = document.createElement('li');
            li.textContent = tipsList[tipIndex];
            aiTips.appendChild(li);
        }
        
        currentTips = (currentTips + 3) % tipsList.length;
    });
});