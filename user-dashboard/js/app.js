// Global variables
let resumeData = loadFromLocalStorage() || {
    heading: {},
    education: [],
    experience: [],
    skills: [],
    summary: {}
};

// Current section tracker
let currentSectionIndex = 0;
const sectionIds = ['heading', 'education', 'experience', 'skills', 'summary', 'review'];

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the UI
    updateProgressBar();
    setupInputListeners();
    loadSavedData();
    
    // Section navigation handlers
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', function() {
            const nextSection = this.getAttribute('data-next');
            if (validateCurrentSection()) {
                navigateToSection(nextSection);
            }
        });
    });
    
    document.querySelectorAll('.prev-btn').forEach(button => {
        button.addEventListener('click', function() {
            const prevSection = this.getAttribute('data-prev');
            navigateToSection(prevSection);
        });
    });
    
    // Sidebar navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            navigateToSection(section);
        });
    });
    
    // Preview button
    document.getElementById('preview-btn').addEventListener('click', function() {
        updateResumePreview();
        navigateToSection('review');
    });
    
    // Add Education Entry
    document.getElementById('add-education').addEventListener('click', function() {
        const educationEntries = document.getElementById('education-entries');
        const entryCount = educationEntries.querySelectorAll('.education-entry').length + 1;
        
        const newEntry = document.createElement('div');
        newEntry.className = 'education-entry';
        newEntry.innerHTML = `
            <h3>Degree #${entryCount} <button class="remove-entry" title="Remove this entry">×</button></h3>
            <div class="input-group">
                <label for="school-name-${entryCount}">School Name</label>
                <input type="text" id="school-name-${entryCount}" name="school-name-${entryCount}" placeholder="e.g. University of California">
            </div>
            <div class="input-row">
                <div class="input-group">
                    <label for="degree-${entryCount}">Degree</label>
                    <input type="text" id="degree-${entryCount}" name="degree-${entryCount}" placeholder="e.g. Bachelor of Science">
                </div>
                <div class="input-group">
                    <label for="field-of-study-${entryCount}">Field of Study</label>
                    <input type="text" id="field-of-study-${entryCount}" name="field-of-study-${entryCount}" placeholder="e.g. Computer Science">
                </div>
            </div>
            <div class="input-row">
                <div class="input-group">
                    <label for="edu-start-date-${entryCount}">Start Date</label>
                    <input type="month" id="edu-start-date-${entryCount}" name="edu-start-date-${entryCount}">
                </div>
                <div class="input-group">
                    <label for="edu-end-date-${entryCount}">End Date</label>
                    <input type="month" id="edu-end-date-${entryCount}" name="edu-end-date-${entryCount}">
                </div>
            </div>
            <div class="input-group">
                <label for="achievements-${entryCount}">Achievements/Activities (Optional)</label>
                <textarea id="achievements-${entryCount}" name="achievements-${entryCount}" rows="3" placeholder="e.g. Dean's List, Relevant Coursework, etc."></textarea>
            </div>
        `;
        
        educationEntries.appendChild(newEntry);
        setupRemoveEntryListeners();
        saveEducationData();
    });
    
    // Add Experience Entry
    document.getElementById('add-experience').addEventListener('click', function() {
        const experienceEntries = document.getElementById('experience-entries');
        const entryCount = experienceEntries.querySelectorAll('.experience-entry').length + 1;
        
        const newEntry = document.createElement('div');
        newEntry.className = 'experience-entry';
        newEntry.innerHTML = `
            <h3>Experience #${entryCount} <button class="remove-entry" title="Remove this entry">×</button></h3>
            <div class="input-group">
                <label for="company-name-${entryCount}">Company</label>
                <input type="text" id="company-name-${entryCount}" name="company-name-${entryCount}" placeholder="e.g. Acme Corporation">
            </div>
            <div class="input-row">
                <div class="input-group">
                    <label for="job-position-${entryCount}">Position</label>
                    <input type="text" id="job-position-${entryCount}" name="job-position-${entryCount}" placeholder="e.g. Senior Developer">
                </div>
                <div class="input-group">
                    <label for="job-location-${entryCount}">Location</label>
                    <input type="text" id="job-location-${entryCount}" name="job-location-${entryCount}" placeholder="e.g. San Francisco, CA">
                </div>
            </div>
            <div class="input-row">
                <div class="input-group">
                    <label for="job-start-date-${entryCount}">Start Date</label>
                    <input type="month" id="job-start-date-${entryCount}" name="job-start-date-${entryCount}">
                </div>
                <div class="input-group">
                    <label for="job-end-date-${entryCount}">End Date</label>
                    <input type="month" id="job-end-date-${entryCount}" name="job-end-date-${entryCount}">
                    <div class="checkbox-group">
                        <input type="checkbox" id="current-job-${entryCount}" name="current-job-${entryCount}">
                        <label for="current-job-${entryCount}">I currently work here</label>
                    </div>
                </div>
            </div>
            <div class="input-group">
                <label for="job-description-${entryCount}">Description</label>
                <textarea id="job-description-${entryCount}" name="job-description-${entryCount}" rows="4" placeholder="Describe your responsibilities and achievements"></textarea>
            </div>
        `;
        
        experienceEntries.appendChild(newEntry);
        setupRemoveEntryListeners();
        setupCurrentJobCheckboxes();
        saveExperienceData();
    });
    
    // Add Skill Category
    document.getElementById('add-skill-category').addEventListener('click', function() {
        const skillCategories = document.getElementById('skill-categories');
        const categoryCount = skillCategories.querySelectorAll('.skill-category').length + 1;
        
        const newCategory = document.createElement('div');
        newCategory.className = 'skill-category';
        newCategory.innerHTML = `
            <div class="category-header">
                <input type="text" id="category-name-${categoryCount}" name="category-name-${categoryCount}" placeholder="Category name (e.g. Technical Skills)">
                <button class="remove-entry" title="Remove this category">×</button>
            </div>
            <div class="skill-tags">
                <div class="skill-tag-input">
                    <input type="text" id="skill-input-${categoryCount}" class="skill-input" placeholder="Type a skill and press Enter">
                </div>
                <div class="skill-tags-container"></div>
            </div>
        `;
        
        skillCategories.appendChild(newCategory);
        setupRemoveEntryListeners();
        setupSkillTagInput(newCategory.querySelector('.skill-input'));
    });
    
    // Save Draft button
    document.getElementById('save-draft').addEventListener('click', function() {
        saveAllData();
        showSaveMessage();
    });
    
    // Finish button
    document.getElementById('finish-btn').addEventListener('click', function() {
        updateResumePreview();
        showCompletionMessage();
    });
    
    // Setup initial event listeners
    setupRemoveEntryListeners();
    setupCurrentJobCheckboxes();
});

// Setup listeners for all input fields to save data as user types
function setupInputListeners() {
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('change', function() {
            saveAllData();
        });
    });
    
    // Setup skill tag input handlers
    document.querySelectorAll('.skill-input').forEach(input => {
        setupSkillTagInput(input);
    });
}

// Setup skill tag input functionality
function setupSkillTagInput(inputElement) {
    inputElement.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            e.preventDefault();
            const skill = this.value.trim();
            const tagsContainer = this.closest('.skill-tags').querySelector('.skill-tags-container');
            
            // Create new skill tag
            const tagElement = document.createElement('span');
            tagElement.className = 'skill-tag';
            tagElement.innerHTML = `${skill}<button class="remove-tag">×</button>`;
            
            tagsContainer.appendChild(tagElement);
            this.value = '';
            
            // Add remove button listener
            tagElement.querySelector('.remove-tag').addEventListener('click', function() {
                this.parentElement.remove();
                saveSkillsData();
            });
            
            saveSkillsData();
        }
    });
}

// Setup remove entry button listeners
function setupRemoveEntryListeners() {
    document.querySelectorAll('.remove-entry').forEach(button => {
        button.addEventListener('click', function() {
            const entry = this.closest('.education-entry, .experience-entry, .skill-category');
            entry.remove();
            
            // Update entry numbering
            if (entry.classList.contains('education-entry')) {
                updateEntryNumbering('education-entries', 'education-entry', 'Degree #');
                saveEducationData();
            } else if (entry.classList.contains('experience-entry')) {
                updateEntryNumbering('experience-entries', 'experience-entry', 'Experience #');
                saveExperienceData();
            } else if (entry.classList.contains('skill-category')) {
                saveSkillsData();
            }
        });
    });
    
    // Setup remove tag listeners
    document.querySelectorAll('.remove-tag').forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.remove();
            saveSkillsData();
        });
    });
}

// Setup checkbox listeners for current job
function setupCurrentJobCheckboxes() {
    document.querySelectorAll('input[type="checkbox"][id^="current-job"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const endDateInput = this.closest('.input-row').querySelector('input[name^="job-end-date"]');
            if (this.checked) {
                endDateInput.disabled = true;
                endDateInput.value = '';
            } else {
                endDateInput.disabled = false;
            }
            saveExperienceData();
        });
    });
}

// Update numbering for entries after deletion
function updateEntryNumbering(containerId, entryClass, labelPrefix) {
    const container = document.getElementById(containerId);
    const entries = container.querySelectorAll(`.${entryClass}`);
    
    entries.forEach((entry, index) => {
        const heading = entry.querySelector('h3');
        heading.innerHTML = `${labelPrefix}${index + 1} <button class="remove-entry" title="Remove this entry">×</button>`;
    });
    
    // Re-attach event listeners
    setupRemoveEntryListeners();
}

// Show save message tooltip
function showSaveMessage() {
    const message = document.createElement('div');
    message.className = 'save-message';
    message.innerHTML = '<i class="fas fa-check-circle"></i> Resume saved to your browser';
    message.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #38b000;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-size: 14px;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 500);
    }, 3000);
}

// Show completion message
function showCompletionMessage() {
    const message = document.createElement('div');
    message.className = 'completion-message';
    message.innerHTML = '<i class="fas fa-check-circle"></i> Congratulations! Your resume is ready.';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        color: #333;
        padding: 30px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-size: 20px;
        font-weight: 600;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    `;
    
    const icon = message.querySelector('i');
    icon.style.cssText = `
        font-size: 48px;
        color: #38b000;
        margin-bottom: 10px;
    `;
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Continue to Download';
    closeButton.className = 'btn btn-primary';
    closeButton.style.marginTop = '10px';
    
    message.appendChild(closeButton);
    document.body.appendChild(message);
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
    `;
    document.body.appendChild(overlay);
    
    closeButton.addEventListener('click', () => {
        document.body.removeChild(message);
        document.body.removeChild(overlay);
    });
    
    overlay.addEventListener('click', () => {
        document.body.removeChild(message);
        document.body.removeChild(overlay);
    });
}