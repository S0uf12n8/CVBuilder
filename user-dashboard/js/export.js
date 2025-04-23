// Simplified functions for exporting resume to different formats

// Function to export resume as PDF
function exportToPDF() {
    // Show message
    alert("Preparing your PDF download...");
    
    // Get resume data
    const name = resumeData.heading.fullName || 'Candidate';
    const jobTitle = resumeData.heading.jobTitle || 'Professional';
    const email = resumeData.heading.email || '';
    const phone = resumeData.heading.phone || '';
    const location = resumeData.heading.location || '';
    const summary = resumeData.summary.professionalSummary || '';
    
    // Create PDF content as HTML
    let pdfContent = `
        <div class="resume-pdf" style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="margin: 0; font-size: 24px;">${name}</h1>
                <p style="margin: 5px 0; font-size: 16px; color: #666;">${jobTitle}</p>
                <div style="font-size: 14px; margin-top: 10px;">
                    ${email ? `<span style="margin: 0 10px;">${email}</span>` : ''}
                    ${phone ? `<span style="margin: 0 10px;">${phone}</span>` : ''}
                    ${location ? `<span style="margin: 0 10px;">${location}</span>` : ''}
                </div>
            </div>
    `;
    
    // Add summary if available
    if (summary) {
        pdfContent += `
            <div style="margin-bottom: 20px;">
                <h2 style="font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px; color: #444;">Professional Summary</h2>
                <p>${summary}</p>
            </div>
        `;
    }
    
    // Add experience section
    if (resumeData.experience && resumeData.experience.length > 0) {
        pdfContent += `<div style="margin-bottom: 20px;">
            <h2 style="font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px; color: #444;">Work Experience</h2>`;
        
        resumeData.experience.forEach(exp => {
            const endDate = exp.currentJob ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : '');
            pdfContent += `
                <div style="margin-bottom: 15px;">
                    <h3 style="margin-bottom: 5px; font-size: 16px;">${exp.position}</h3>
                    <div style="font-size: 14px; color: #666;">
                        <span>${exp.companyName}</span>
                        ${exp.location ? ` | <span>${exp.location}</span>` : ''}
                        ${exp.startDate ? ` | <span>${formatDate(exp.startDate)} - ${endDate}</span>` : ''}
                    </div>
                    ${exp.description ? `<p style="margin-top: 8px; font-size: 14px;">${exp.description}</p>` : ''}
                </div>
            `;
        });
        
        pdfContent += `</div>`;
    }
    
    // Add education section
    if (resumeData.education && resumeData.education.length > 0) {
        pdfContent += `<div style="margin-bottom: 20px;">
            <h2 style="font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px; color: #444;">Education</h2>`;
        
        resumeData.education.forEach(edu => {
            pdfContent += `
                <div style="margin-bottom: 15px;">
                    <h3 style="margin-bottom: 5px; font-size: 16px;">${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h3>
                    <div style="font-size: 14px; color: #666;">
                        <span>${edu.schoolName}</span>
                        ${edu.startDate ? ` | <span>${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>` : ''}
                    </div>
                    ${edu.achievements ? `<p style="margin-top: 8px; font-size: 14px;">${edu.achievements}</p>` : ''}
                </div>
            `;
        });
        
        pdfContent += `</div>`;
    }
    
    // Add skills section
    if (resumeData.skills && resumeData.skills.length > 0) {
        pdfContent += `<div style="margin-bottom: 20px;">
            <h2 style="font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px; color: #444;">Skills</h2>`;
        
        resumeData.skills.forEach(category => {
            if (category.skills.length > 0) {
                pdfContent += `
                    <div style="margin-bottom: 10px;">
                        <h3 style="margin-bottom: 5px; font-size: 16px;">${category.categoryName || 'Skills'}</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${category.skills.map(skill => `<span style="background-color: #f1f1f1; padding: 4px 10px; border-radius: 16px; font-size: 13px;">${skill}</span>`).join('')}
                        </div>
                    </div>
                `;
            }
        });
        
        pdfContent += `</div>`;
    }
    
    // Close the main container
    pdfContent += `</div>`;
    
    // Open a new window with the resume content
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${name} - Resume</title>
            <meta charset="utf-8">
            <style>
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    @page {
                        size: A4;
                        margin: 1cm;
                    }
                }
            </style>
        </head>
        <body>
            ${pdfContent}
            <script>
                // Automatically print and then close this window
                window.onload = function() {
                    window.print();
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Function to export resume to Word format
function exportToDocx() {
    alert("Preparing your Word document...");
    
    // Create a blob with HTML content that Word can open
    const name = resumeData.heading.fullName || 'Candidate';
    
    // Get the current content from the preview
    updateResumePreview();
    const previewContent = document.getElementById('resume-preview-content');
    
    // Create HTML content for Word
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${name} - Resume</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                h1 { text-align: center; margin-bottom: 5px; }
                .job-title { text-align: center; font-size: 16px; color: #666; margin-bottom: 10px; }
                .contact-info { text-align: center; margin-bottom: 20px; }
                h2 { font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px; color: #444; }
                .experience-item, .education-item { margin-bottom: 15px; }
                .experience-item h3, .education-item h3 { margin-bottom: 5px; }
                .meta { font-size: 14px; color: #666; margin-bottom: 5px; }
                .skills-container { display: flex; flex-wrap: wrap; gap: 8px; }
                .skill { background-color: #f1f1f1; padding: 4px 10px; border-radius: 16px; font-size: 13px; }
            </style>
        </head>
        <body>
            ${previewContent.innerHTML}
        </body>
        </html>
    `;
    
    // Create a blob
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    
    // Create a link to download the file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${name.replace(/\s+/g, '_')}_Resume.doc`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to export resume as HTML
function exportToHtml() {
    alert("Preparing your HTML document...");
    
    // Get the current content from the preview
    updateResumePreview();
    const previewContent = document.getElementById('resume-preview-content');
    const name = resumeData.heading.fullName || 'Candidate';
    
    // Create HTML content
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${name} - Resume</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                h1 { text-align: center; margin-bottom: 5px; }
                .job-title { text-align: center; font-size: 16px; color: #666; margin-bottom: 10px; }
                .contact-info { text-align: center; margin-bottom: 20px; }
                h2 { font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px; color: #444; }
                .experience-item, .education-item { margin-bottom: 15px; }
                .experience-item h3, .education-item h3 { margin-bottom: 5px; }
                .meta { font-size: 14px; color: #666; margin-bottom: 5px; }
                .skills-container { display: flex; flex-wrap: wrap; gap: 8px; }
                .skill { background-color: #f1f1f1; padding: 4px 10px; border-radius: 16px; font-size: 13px; }
                .resume-preview-heading { text-align: center; margin-bottom: 20px; }
                .resume-preview-section { margin-bottom: 20px; }
                .resume-preview-section h3 { color: #444; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
                .preview-item { margin-bottom: 15px; }
                .preview-skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
                .preview-skill { background-color: #f1f1f1; padding: 4px 10px; border-radius: 16px; font-size: 13px; }
            </style>
        </head>
        <body>
            ${previewContent.innerHTML}
        </body>
        </html>
    `;
    
    // Create a blob
    const blob = new Blob([htmlContent], { type: 'text/html' });
    
    // Create a link to download the file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${name.replace(/\s+/g, '_')}_Resume.html`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}