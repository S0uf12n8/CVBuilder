// Navigation between sections
function navigateToSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the target section
    document.getElementById(sectionId).classList.add('active');
    
    // Update sidebar navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionId) {
            item.classList.add('active');
        }
    });
    
    // Update section title
    document.getElementById('section-title').textContent = document.querySelector(`.nav-item[data-section="${sectionId}"] .step-text`).textContent;
    
    // Update current section index
    currentSectionIndex = sectionIds.indexOf(sectionId);
    
    // Update progress bar
    updateProgressBar();
    
    // Save current state
    saveAllData();
}

// Update progress bar based on completed sections
function updateProgressBar() {
    const totalSections = sectionIds.length - 1; // Excluding review section
    const completed = Math.min(currentSectionIndex, totalSections);
    const percentage = Math.floor((completed / totalSections) * 100);
    
    document.getElementById('progress-fill').style.width = `${percentage}%`;
    document.getElementById('progress-text').textContent = `${percentage}% Complete`;
    
    // Mark completed sections in sidebar
    document.querySelectorAll('.nav-item').forEach((item, index) => {
        if (index < currentSectionIndex) {
            item.classList.add('completed');
        } else {
            item.classList.remove('completed');
        }
    });
}

// Helper function to format dates from month input
function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    
    return `${month} ${year}`;
}

// Update resume preview in the review section
function updateResumePreview() {
    const previewContent = document.getElementById('resume-preview-content');
    
    // Simple preview HTML construction
    let previewHTML = `
        <div class="resume-preview-heading">
            <h2>${resumeData.heading.fullName || 'Your Name'}</h2>
            <p class="job-title">${resumeData.heading.jobTitle || 'Your Job Title'}</p>
            <div class="contact-info">
                ${resumeData.heading.email ? `<span><i class="fas fa-envelope"></i> ${resumeData.heading.email}</span>` : ''}
                ${resumeData.heading.phone ? `<span><i class="fas fa-phone"></i> ${resumeData.heading.phone}</span>` : ''}
                ${resumeData.heading.location ? `<span><i class="fas fa-map-marker-alt"></i> ${resumeData.heading.location}</span>` : ''}
                ${resumeData.heading.website ? `<span><i class="fas fa-globe"></i> ${resumeData.heading.website}</span>` : ''}
            </div>
        </div>
    `;
    
    // Add summary section if available
    if (resumeData.summary && resumeData.summary.professionalSummary) {
        previewHTML += `
            <div class="resume-preview-section">
                <h3>Professional Summary</h3>
                <p>${resumeData.summary.professionalSummary}</p>
            </div>
        `;
    }
    
    // Add experience section if available
    if (resumeData.experience && resumeData.experience.length > 0) {
        previewHTML += `<div class="resume-preview-section"><h3>Work Experience</h3>`;
        
        resumeData.experience.forEach(exp => {
            const endDateText = exp.currentJob ? 'Present' : formatDate(exp.endDate);
            previewHTML += `
                <div class="preview-item">
                    <div class="item-header">
                        <h4>${exp.position}</h4>
                        <div class="item-meta">
                            <span class="item-company">${exp.companyName}</span>
                            ${exp.location ? `<span class="item-location"> | ${exp.location}</span>` : ''}
                            ${exp.startDate ? `<span class="item-date"> | ${formatDate(exp.startDate)} - ${endDateText}</span>` : ''}
                        </div>
                    </div>
                    ${exp.description ? `<p class="item-description">${exp.description}</p>` : ''}
                </div>
            `;
        });
        
        previewHTML += `</div>`;
    }
    
    // Add education section if available
    if (resumeData.education && resumeData.education.length > 0) {
        previewHTML += `<div class="resume-preview-section"><h3>Education</h3>`;
        
        resumeData.education.forEach(edu => {
            previewHTML += `
                <div class="preview-item">
                    <div class="item-header">
                        <h4>${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h4>
                        <div class="item-meta">
                            <span class="item-school">${edu.schoolName}</span>
                            ${edu.startDate ? `<span class="item-date"> | ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>` : ''}
                        </div>
                    </div>
                    ${edu.achievements ? `<p class="item-description">${edu.achievements}</p>` : ''}
                </div>
            `;
        });
        
        previewHTML += `</div>`;
    }
    
    // Add skills section if available
    if (resumeData.skills && resumeData.skills.length > 0) {
        previewHTML += `<div class="resume-preview-section"><h3>Skills</h3>`;
        
        resumeData.skills.forEach(category => {
            if (category.skills.length > 0) {
                previewHTML += `
                    <div class="preview-skills-category">
                        <h4>${category.categoryName || 'Skills'}</h4>
                        <div class="preview-skills-list">
                            ${category.skills.map(skill => `<span class="preview-skill">${skill}</span>`).join('')}
                        </div>
                    </div>
                `;
            }
        });
        
        previewHTML += `</div>`;
    }
    
    // Add custom styling for preview
    previewHTML = `
        <style>
            .resume-preview-heading {
                text-align: center;
                margin-bottom: 24px;
            }
            .resume-preview-heading h2 {
                font-size: 24px;
                margin-bottom: 4px;
                color: #333;
            }
            .job-title {
                font-size: 16px;
                color: #666;
                margin-bottom: 12px;
            }
            .contact-info {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 16px;
                font-size: 14px;
            }
            .contact-info span {
                display: flex;
                align-items: center;
            }
            .contact-info i {
                margin-right: 6px;
                color: #3a86ff;
            }
            .resume-preview-section {
                margin-bottom: 24px;
            }
            .resume-preview-section h3 {
                color: #3a86ff;
                border-bottom: 1px solid #dee2e6;
                padding-bottom: 8px;
                margin-bottom: 16px;
                font-size: 18px;
            }
            .preview-item {
                margin-bottom: 16px;
            }
            .item-header h4 {
                font-size: 16px;
                margin-bottom: 4px;
            }
            .item-meta {
                color: #666;
                font-size: 14px;
                margin-bottom: 8px;
            }
            .item-description {
                font-size: 14px;
                white-space: pre-line;
            }
            .preview-skills-category {
                margin-bottom: 12px;
            }
            .preview-skills-category h4 {
                font-size: 16px;
                margin-bottom: 8px;
            }
            .preview-skills-list {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            .preview-skill {
                background-color: #e9ecef;
                padding: 4px 10px;
                border-radius: 16px;
                font-size: 13px;
            }
        </style>
        ${previewHTML}
    `;
    
    previewContent.innerHTML = previewHTML;
}