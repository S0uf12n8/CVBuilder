// Save all data to localStorage
function saveAllData() {
    saveHeadingData();
    saveEducationData();
    saveExperienceData();
    saveSkillsData();
    saveSummaryData();
    
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
}

// Save heading section data
function saveHeadingData() {
    resumeData.heading = {
        fullName: document.getElementById('full-name').value,
        jobTitle: document.getElementById('job-title').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        website: document.getElementById('website').value
    };
}

// Save education section data
function saveEducationData() {
    const educationEntries = document.getElementById('education-entries');
    const entries = educationEntries.querySelectorAll('.education-entry');
    
    resumeData.education = [];
    
    entries.forEach((entry, index) => {
        const schoolName = entry.querySelector('input[name^="school-name"]').value;
        const degree = entry.querySelector('input[name^="degree"]').value;
        const fieldOfStudy = entry.querySelector('input[name^="field-of-study"]').value;
        const startDate = entry.querySelector('input[name^="edu-start-date"]').value;
        const endDate = entry.querySelector('input[name^="edu-end-date"]').value;
        const achievements = entry.querySelector('textarea[name^="achievements"]').value;
        
        resumeData.education.push({
            schoolName,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
            achievements
        });
    });
}

// Save experience section data
function saveExperienceData() {
    const experienceEntries = document.getElementById('experience-entries');
    const entries = experienceEntries.querySelectorAll('.experience-entry');
    
    resumeData.experience = [];
    
    entries.forEach((entry, index) => {
        const companyName = entry.querySelector('input[name^="company-name"]').value;
        const position = entry.querySelector('input[name^="job-position"]').value;
        const location = entry.querySelector('input[name^="job-location"]').value;
        const startDate = entry.querySelector('input[name^="job-start-date"]').value;
        const endDate = entry.querySelector('input[name^="job-end-date"]').value;
        const currentJob = entry.querySelector('input[name^="current-job"]')?.checked || false;
        const description = entry.querySelector('textarea[name^="job-description"]').value;
        
        resumeData.experience.push({
            companyName,
            position,
            location,
            startDate,
            endDate,
            currentJob,
            description
        });
    });
}

// Save skills section data
function saveSkillsData() {
    const skillCategories = document.getElementById('skill-categories');
    const categories = skillCategories.querySelectorAll('.skill-category');
    
    resumeData.skills = [];
    
    categories.forEach((category, index) => {
        const categoryName = category.querySelector('input[name^="category-name"]').value;
        const skillTags = [];
        
        category.querySelectorAll('.skill-tag').forEach(tag => {
            // Get text content excluding the × button
            const skillName = tag.textContent.replace('×', '').trim();
            skillTags.push(skillName);
        });
        
        resumeData.skills.push({
            categoryName,
            skills: skillTags
        });
    });
}

// Save summary section data
function saveSummaryData() {
    resumeData.summary = {
        professionalSummary: document.getElementById('professional-summary').value
    };
}

// Load saved data from localStorage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : null;
}

// Load saved data into form fields
function loadSavedData() {
    if (!resumeData) return;
    
    // Load heading data
    if (resumeData.heading) {
        document.getElementById('full-name').value = resumeData.heading.fullName || '';
        document.getElementById('job-title').value = resumeData.heading.jobTitle || '';
        document.getElementById('email').value = resumeData.heading.email || '';
        document.getElementById('phone').value = resumeData.heading.phone || '';
        document.getElementById('location').value = resumeData.heading.location || '';
        document.getElementById('website').value = resumeData.heading.website || '';
    }
    
    // Load education data
    if (resumeData.education && resumeData.education.length > 0) {
        const educationEntries = document.getElementById('education-entries');
        educationEntries.innerHTML = ''; // Clear default entry
        
        resumeData.education.forEach((edu, index) => {
            const newEntry = document.createElement('div');
            newEntry.className = 'education-entry';
            newEntry.innerHTML = `
                <h3>Degree #${index + 1} <button class="remove-entry" title="Remove this entry">×</button></h3>
                <div class="input-group">
                    <label for="school-name-${index + 1}">School Name</label>
                    <input type="text" name="school-name-${index + 1}" placeholder="e.g. University of California" value="${edu.schoolName || ''}">
                </div>
                <div class="input-row">
                    <div class="input-group">
                        <label for="degree-${index + 1}">Degree</label>
                        <input type="text" name="degree-${index + 1}" placeholder="e.g. Bachelor of Science" value="${edu.degree || ''}">
                    </div>
                    <div class="input-group">
                        <label for="field-of-study-${index + 1}">Field of Study</label>
                        <input type="text" name="field-of-study-${index + 1}" placeholder="e.g. Computer Science" value="${edu.fieldOfStudy || ''}">
                    </div>
                </div>
                <div class="input-row">
                    <div class="input-group">
                        <label for="edu-start-date-${index + 1}">Start Date</label>
                        <input type="month" name="edu-start-date-${index + 1}" value="${edu.startDate || ''}">
                    </div>
                    <div class="input-group">
                        <label for="edu-end-date-${index + 1}">End Date</label>
                        <input type="month" name="edu-end-date-${index + 1}" value="${edu.endDate || ''}">
                    </div>
                </div>
                <div class="input-group">
                    <label for="achievements-${index + 1}">Achievements/Activities (Optional)</label>
                    <textarea name="achievements-${index + 1}" rows="3" placeholder="e.g. Dean's List, Relevant Coursework, etc.">${edu.achievements || ''}</textarea>
                </div>
            `;
            
            educationEntries.appendChild(newEntry);
        });
    }
    
    // Load experience data
    if (resumeData.experience && resumeData.experience.length > 0) {
        const experienceEntries = document.getElementById('experience-entries');
        experienceEntries.innerHTML = ''; // Clear default entry
        
        resumeData.experience.forEach((exp, index) => {
            const newEntry = document.createElement('div');
            newEntry.className = 'experience-entry';
            newEntry.innerHTML = `
                <h3>Experience #${index + 1} <button class="remove-entry" title="Remove this entry">×</button></h3>
                <div class="input-group">
                    <label for="company-name-${index + 1}">Company</label>
                    <input type="text" name="company-name-${index + 1}" placeholder="e.g. Acme Corporation" value="${exp.companyName || ''}">
                </div>
                <div class="input-row">
                    <div class="input-group">
                        <label for="job-position-${index + 1}">Position</label>
                        <input type="text" name="job-position-${index + 1}" placeholder="e.g. Senior Developer" value="${exp.position || ''}">
                    </div>
                    <div class="input-group">
                        <label for="job-location-${index + 1}">Location</label>
                        <input type="text" name="job-location-${index + 1}" placeholder="e.g. San Francisco, CA" value="${exp.location || ''}">
                    </div>
                </div>
                <div class="input-row">
                    <div class="input-group">
                        <label for="job-start-date-${index + 1}">Start Date</label>
                        <input type="month" name="job-start-date-${index + 1}" value="${exp.startDate || ''}">
                    </div>
                    <div class="input-group">
                        <label for="job-end-date-${index + 1}">End Date</label>
                        <input type="month" name="job-end-date-${index + 1}" value="${exp.endDate || ''}" ${exp.currentJob ? 'disabled' : ''}>
                        <div class="checkbox-group">
                            <input type="checkbox" id="current-job-${index + 1}" name="current-job-${index + 1}" ${exp.currentJob ? 'checked' : ''}>
                            <label for="current-job-${index + 1}">I currently work here</label>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <label for="job-description-${index + 1}">Description</label>
                    <textarea name="job-description-${index + 1}" rows="4" placeholder="Describe your responsibilities and achievements">${exp.description || ''}</textarea>
                </div>
            `;
            
            experienceEntries.appendChild(newEntry);
        });
    }
    
    // Load skills data
    if (resumeData.skills && resumeData.skills.length > 0) {
        const skillCategories = document.getElementById('skill-categories');
        skillCategories.innerHTML = ''; // Clear default entry
        
        resumeData.skills.forEach((category, categoryIndex) => {
            const newCategory = document.createElement('div');
            newCategory.className = 'skill-category';
            
            let skillTagsHTML = '';
            category.skills.forEach(skill => {
                skillTagsHTML += `<span class="skill-tag">${skill}<button class="remove-tag">×</button></span>`;
            });
            
            newCategory.innerHTML = `
                <div class="category-header">
                    <input type="text" name="category-name-${categoryIndex + 1}" placeholder="Category name (e.g. Technical Skills)" value="${category.categoryName || ''}">
                    <button class="remove-entry" title="Remove this category">×</button>
                </div>
                <div class="skill-tags">
                    <div class="skill-tag-input">
                        <input type="text" class="skill-input" placeholder="Type a skill and press Enter">
                    </div>
                    <div class="skill-tags-container">
                        ${skillTagsHTML}
                    </div>
                </div>
            `;
            
            skillCategories.appendChild(newCategory);
        });
    }
    
    // Load summary data
    if (resumeData.summary) {
        document.getElementById('professional-summary').value = resumeData.summary.professionalSummary || '';
    }
    
    // Re-attach event listeners
    setupInputListeners();
}