// Simplified functions for exporting resume to different formats
// Using jsPDF library for proper PDF generation

// Function to export resume as PDF
function exportToPDF() {
    // Show message
    alert("Preparing your PDF download...");
    
    // Check if jsPDF is loaded, if not, load it dynamically
    if (typeof jsPDF === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = function() {
            const scriptHtml2Canvas = document.createElement('script');
            scriptHtml2Canvas.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            scriptHtml2Canvas.onload = generatePDF;
            document.head.appendChild(scriptHtml2Canvas);
        };
        document.head.appendChild(script);
    } else {
        generatePDF();
    }
}

// Function that actually generates the PDF
function generatePDF() {
    // Get the resume preview element
    updateResumePreview(); // Make sure preview is up to date
    const resumeElement = document.getElementById('resume-preview-content');
    const name = resumeData.heading.fullName || 'Candidate';
    
    // Use html2canvas to capture the resume as an image
    html2canvas(resumeElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        
        // Calculate PDF dimensions based on A4 size
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        
        pdf.addImage(imgData, 'JPEG', imgX, 0, imgWidth * ratio, imgHeight * ratio);
        
        // Download the PDF file
        pdf.save(`${name.replace(/\s+/g, '_')}_Resume.pdf`);
    }).catch(error => {
        console.error('Error generating PDF:', error);
        alert('There was an error generating your PDF. Please try again.');
    });
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