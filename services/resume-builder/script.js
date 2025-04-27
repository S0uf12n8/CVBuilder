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