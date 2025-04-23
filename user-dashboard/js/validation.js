// Form validation functions
function validateHeadingSection() {
    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!fullName) {
        showValidationError('full-name', 'Please enter your full name');
        return false;
    }
    
    if (email && !isValidEmail(email)) {
        showValidationError('email', 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function validateEducationSection() {
    let isValid = true;
    const educationEntries = document.getElementById('education-entries');
    const entries = educationEntries.querySelectorAll('.education-entry');
    
    // If no entries, it's valid (optional)
    if (entries.length === 0) return true;
    
    // Check the first entry (primary education)
    if (entries.length > 0) {
        const firstEntry = entries[0];
        const schoolName = firstEntry.querySelector('input[name^="school-name"]').value.trim();
        const degree = firstEntry.querySelector('input[name^="degree"]').value.trim();
        
        if (!schoolName) {
            showValidationError(firstEntry.querySelector('input[name^="school-name"]').id, 'Please enter your school name');
            isValid = false;
        }
        
        if (!degree) {
            showValidationError(firstEntry.querySelector('input[name^="degree"]').id, 'Please enter your degree');
            isValid = false;
        }
    }
    
    return isValid;
}

function validateExperienceSection() {
    let isValid = true;
    const experienceEntries = document.getElementById('experience-entries');
    const entries = experienceEntries.querySelectorAll('.experience-entry');
    
    // If no entries, it's valid (optional)
    if (entries.length === 0) return true;
    
    // Check the first entry (primary experience)
    if (entries.length > 0) {
        const firstEntry = entries[0];
        const companyName = firstEntry.querySelector('input[name^="company-name"]').value.trim();
        const position = firstEntry.querySelector('input[name^="job-position"]').value.trim();
        
        if (!companyName) {
            showValidationError(firstEntry.querySelector('input[name^="company-name"]').id, 'Please enter the company name');
            isValid = false;
        }
        
        if (!position) {
            showValidationError(firstEntry.querySelector('input[name^="job-position"]').id, 'Please enter your position');
            isValid = false;
        }
    }
    
    return isValid;
}

function validateSkillsSection() {
    let isValid = true;
    const skillCategories = document.getElementById('skill-categories');
    const categories = skillCategories.querySelectorAll('.skill-category');
    
    // If no categories, it's valid (optional)
    if (categories.length === 0) return true;
    
    // Check if at least one skill in each category
    categories.forEach((category, index) => {
        const categoryName = category.querySelector('input[name^="category-name"]').value.trim();
        const skillTags = category.querySelectorAll('.skill-tag');
        
        if (!categoryName) {
            showValidationError(category.querySelector('input[name^="category-name"]').id, 'Please enter a category name');
            isValid = false;
        }
        
        if (skillTags.length === 0) {
            showValidationError(category.querySelector('.skill-input').id, 'Please add at least one skill');
            isValid = false;
        }
    });
    
    return isValid;
}

function validateSummarySection() {
    const summary = document.getElementById('professional-summary').value.trim();
    
    if (!summary) {
        showValidationError('professional-summary', 'Please enter a professional summary');
        return false;
    }
    
    return true;
}

// Helper validation functions
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showValidationError(fieldId, message) {
    const field = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
    if (!field) return;
    
    // Clear any existing error
    clearValidationError(fieldId);
    
    // Create and append error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    
    // Highlight the field
    field.classList.add('error');
    
    // Focus the field
    field.focus();
}

function clearValidationError(fieldId) {
    const field = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
    if (!field) return;
    
    const parent = field.parentNode;
    const existingError = parent.querySelector('.validation-error');
    
    if (existingError) {
        parent.removeChild(existingError);
    }
    
    field.classList.remove('error');
}

function clearAllValidationErrors() {
    document.querySelectorAll('.validation-error').forEach(error => {
        error.parentNode.removeChild(error);
    });
    
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
}

// Validate current section before proceeding
function validateCurrentSection() {
    clearAllValidationErrors();
    
    switch(sectionIds[currentSectionIndex]) {
        case 'heading':
            return validateHeadingSection();
        case 'education':
            return validateEducationSection();
        case 'experience':
            return validateExperienceSection();
        case 'skills':
            return validateSkillsSection();
        case 'summary':
            return validateSummarySection();
        default:
            return true;
    }
}