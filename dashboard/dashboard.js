document.addEventListener('DOMContentLoaded', function() {
    // Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // New CV button also switches to the create tab
    document.getElementById('new-cv-btn').addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        document.querySelector('[data-tab="create"]').classList.add('active');
        document.getElementById('create-tab').classList.add('active');
    });
    
    // Initialize dynamic form elements
    setupAddItemButtons();
    setupRemoveButtons();
    setupDeleteProjectButtons();
    setupFormActionButtons();
});

// Setup all add item buttons
function setupAddItemButtons() {
    // Key Highlights
    document.getElementById('add-highlight').addEventListener('click', () => {
        addDynamicInput('highlights-container', 'keyHighlights[]', 'Key achievement or strength');
    });
    
    // Skills
    document.getElementById('add-skill').addEventListener('click', () => {
        addTagInput('skills-container', 'skills[]', 'Add skill', 'tag-blue');
    });
    
    // Languages
    document.getElementById('add-language').addEventListener('click', () => {
        addTagInput('languages-container', 'languages[]', 'Add language', 'tag-green');
    });
    
    // Certifications
    document.getElementById('add-certification').addEventListener('click', () => {
        addDynamicInput('certifications-container', 'certifications[]', 'Certificate name or achievement');
    });
    
    // Education
    document.getElementById('add-education').addEventListener('click', () => {
        const container = document.getElementById('education-container');
        const index = container.children.length;
        
        const template = `
            <div class="dynamic-group">
                <div class="form-grid">
                    <div class="form-group">
                        <label>School/University</label>
                        <input type="text" name="education[${index}][school]">
                    </div>
                    <div class="form-group">
                        <label>Degree/Certificate</label>
                        <input type="text" name="education[${index}][degree]">
                    </div>
                    <div class="form-group">
                        <label>Start Date</label>
                        <input type="date" name="education[${index}][startDate]">
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input type="date" name="education[${index}][endDate]">
                    </div>
                </div>
                <div class="group-actions">
                    <button type="button" class="btn-remove">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', template);
        setupRemoveButtons();
    });
    
    // Experience
    document.getElementById('add-experience').addEventListener('click', () => {
        const container = document.getElementById('experience-container');
        const index = container.children.length;
        
        const template = `
            <div class="dynamic-group">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Job Title</label>
                        <input type="text" name="experience[${index}][jobTitle]">
                    </div>
                    <div class="form-group">
                        <label>Company</label>
                        <input type="text" name="experience[${index}][company]">
                    </div>
                    <div class="form-group">
                        <label>Start Date</label>
                        <input type="date" name="experience[${index}][startDate]">
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input type="date" name="experience[${index}][endDate]">
                    </div>
                    <div class="form-group full-width">
                        <label>Description</label>
                        <textarea name="experience[${index}][description]" rows="3" placeholder="Describe your responsibilities and achievements..."></textarea>
                    </div>
                </div>
                <div class="group-actions">
                    <button type="button" class="btn-remove">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', template);
        setupRemoveButtons();
    });
    
    // Social Links
    document.getElementById('add-link').addEventListener('click', () => {
        const container = document.getElementById('links-container');
        const index = container.children.length;
        
        const template = `
            <div class="dynamic-input link-input">
                <div class="platform-input">
                    <input type="text" name="links[${index}][platform]" placeholder="Platform (e.g. LinkedIn)">
                </div>
                <div class="url-input">
                    <input type="url" name="links[${index}][url]" placeholder="URL">
                    <button type="button" class="btn-remove">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', template);
        setupRemoveButtons();
    });
}

// Add a simple input with remove button
function addDynamicInput(containerId, inputName, placeholder) {
    const container = document.getElementById(containerId);
    
    const template = `
        <div class="dynamic-input">
            <input type="text" name="${inputName}" placeholder="${placeholder}">
            <button type="button" class="btn-remove">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', template);
    setupRemoveButtons();
}

// Add a tag-style input
function addTagInput(containerId, inputName, placeholder, tagClass) {
    const container = document.getElementById(containerId);
    
    const template = `
        <div class="tag ${tagClass}">
            <input type="text" name="${inputName}" placeholder="${placeholder}">
            <button type="button" class="btn-remove-tag">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', template);
    setupRemoveButtons();
}

// Setup all remove buttons 
function setupRemoveButtons() {
    // Regular remove buttons
    document.querySelectorAll('.btn-remove').forEach(button => {
        if (!button.hasAttribute('data-listener')) {
            button.setAttribute('data-listener', 'true');
            button.addEventListener('click', function() {
                // Get the parent element (the entire input group)
                const parent = this.closest('.dynamic-input') || this.closest('.dynamic-group');
                
                // Get the container
                const container = parent.parentNode;
                
                // If this is the last item, don't remove it
                if (container.children.length > 1) {
                    parent.remove();
                }
            });
        }
    });
    
    // Tag remove buttons
    document.querySelectorAll('.btn-remove-tag').forEach(button => {
        if (!button.hasAttribute('data-listener')) {
            button.setAttribute('data-listener', 'true');
            button.addEventListener('click', function() {
                // Get the parent element (the entire tag)
                const parent = this.closest('.tag');
                
                // Get the container
                const container = parent.parentNode;
                
                // If this is the last item, don't remove it
                if (container.children.length > 1) {
                    parent.remove();
                }
            });
        }
    });
}

// Setup delete project buttons
function setupDeleteProjectButtons() {
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.project-card');
            
            // Could add a confirmation dialog here
            if (confirm('Are you sure you want to delete this project?')) {
                card.remove();
            }
        });
    });
}

// Setup form action buttons
function setupFormActionButtons() {
    // Preview CV button
    document.getElementById('preview-btn').addEventListener('click', () => {
        // Collect form data and generate preview
        const formData = collectFormData();
        alert('Preview functionality would open a modal with the CV preview');
        console.log('CV Preview Data:', formData);
    });
    
    // Enhance with AI button
    document.getElementById('enhance-btn').addEventListener('click', () => {
        alert('This would send data to an AI service to enhance the CV content');
    });
    
    // Save CV button
    document.getElementById('save-btn').addEventListener('click', () => {
        // Validate and save the form data
        const formData = collectFormData();
        
        // Validate form (simplified example)
        if (!formData.firstName || !formData.lastName || !formData.email) {
            alert('Please fill in at least your name and email.');
            return;
        }
        
        // Simulate saving
        alert('CV Saved Successfully!');
        console.log('Saved CV Data:', formData);
        
        // In a real implementation, this would send the data to a server
        // and then redirect to the projects tab or show a success message
        
        // Switch back to projects tab after saving
        document.querySelector('[data-tab="previous"]').click();
        
        // Optionally add the new project to the projects grid
        addNewProject(formData);
    });
}

// Collect all form data
function collectFormData() {
    const form = document.getElementById('cv-form');
    const formData = new FormData(form);
    
    // Convert FormData to a more usable object
    const data = {};
    for (let [key, value] of formData.entries()) {
        // Parse complex field names like education[0][school]
        if (key.includes('[')) {
            const match = key.match(/([^\[]+)\[(\d*)\](?:\[([^\]]+)\])?/);
            if (match) {
                const section = match[1];
                const index = match[2];
                const field = match[3];
                
                if (!data[section]) data[section] = [];
                
                if (field) {
                    // Handle nested objects like education[0][school]
                    if (!data[section][index]) data[section][index] = {};
                    data[section][index][field] = value;
                } else {
                    // Handle arrays like skills[]
                    data[section].push(value);
                }
            }
        } else {
            // Handle simple fields
            data[key] = value;
        }
    }
    
    return data;
}

// Add a new project to the projects grid
function addNewProject(formData) {
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Create a title for the CV
    const title = `${formData.firstName} ${formData.lastName}'s CV`;
    
    // Create a preview based on available data
    let preview = '';
    if (formData.experience && formData.experience.length > 0 && formData.experience[0].jobTitle) {
        preview = `${formData.experience[0].jobTitle}`;
        if (formData.experience[0].company) {
            preview += ` at ${formData.experience[0].company}`;
        }
    } else if (formData.education && formData.education.length > 0 && formData.education[0].degree) {
        preview = `${formData.education[0].degree}`;
        if (formData.education[0].school) {
            preview += ` from ${formData.education[0].school}`;
        }
    } else if (formData.aboutMe) {
        // Truncate about me to a reasonable length
        preview = formData.aboutMe.substring(0, 50) + (formData.aboutMe.length > 50 ? '...' : '');
    } else {
        preview = 'Personal CV';
    }
    
    // Get current date
    const currentDate = new Date();
    const dateStr = currentDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Create new project card
    const template = `
        <div class="project-card">
            <h3>${title}</h3>
            <p class="project-preview">${preview}</p>
            <p class="project-date">Created: ${dateStr}</p>
            <div class="project-actions">
                <button class="btn-action btn-edit">
                    <i class="fas fa-edit"></i>
                    Edit
                </button>
                <button class="btn-action btn-delete">
                    <i class="fas fa-trash"></i>
                    Delete
                </button>
            </div>
        </div>
    `;
    
    projectsGrid.insertAdjacentHTML('afterbegin', template);
    setupDeleteProjectButtons();
}