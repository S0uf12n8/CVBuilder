// PDF Generator for Resume Builder
document.addEventListener('DOMContentLoaded', function() {
    // Get the download button
    const downloadResumeBtn = document.getElementById('download-resume');
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function() {
            // Show loading indication
            const originalBtnText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Generating PDF...</span>';
            this.disabled = true;
            
            // Get the resume name to use as filename
            const fullNameInput = document.getElementById('full-name');
            const resumeName = (fullNameInput?.value || 'Resume').replace(/\s+/g, '_');
            
            // Get the resume preview element
            const resumeElement = document.querySelector('.resume');
            
            // Create a clone of the resume element to modify for optimal PDF generation
            const resumeClone = resumeElement.cloneNode(true);
            
            // Add some CSS to the clone for better PDF rendering
            resumeClone.style.width = '210mm'; // A4 width
            resumeClone.style.padding = '15mm'; // Margins
            resumeClone.style.backgroundColor = '#ffffff';
            resumeClone.style.position = 'absolute';
            resumeClone.style.top = '-9999px';
            resumeClone.style.left = '-9999px';
            resumeClone.style.transform = 'scale(1)'; // Reset any transform
            
            // Append the clone to the document for html2canvas to process it
            document.body.appendChild(resumeClone);
            
            // Generate PDF after a small delay to ensure styles are applied
            setTimeout(() => {
                // Use html2canvas to capture the resume as an image
                html2canvas(resumeClone, {
                    scale: 2, // Higher scale for better quality
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff'
                }).then(canvas => {
                    // Remove the clone from the document
                    document.body.removeChild(resumeClone);
                    
                    // Initialize jsPDF
                    const { jsPDF } = window.jspdf;
                    
                    // Create PDF with A4 dimensions
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    
                    // Calculate the PDF dimensions
                    const imgWidth = 210; // A4 width in mm
                    const pageHeight = 297; // A4 height in mm
                    const imgHeight = canvas.height * imgWidth / canvas.width;
                    
                    // Add the canvas as an image to the PDF
                    const imgData = canvas.toDataURL('image/png');
                    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                    
                    // Save the PDF
                    pdf.save(`${resumeName}_CV.pdf`);
                    
                    // Reset the button
                    downloadResumeBtn.innerHTML = originalBtnText;
                    downloadResumeBtn.disabled = false;
                    
                    // Show success message
                    alert('Your resume has been downloaded successfully!');
                }).catch(error => {
                    console.error('Error generating PDF:', error);
                    // Reset the button
                    downloadResumeBtn.innerHTML = originalBtnText;
                    downloadResumeBtn.disabled = false;
                    
                    // Show error message
                    alert('An error occurred while generating your PDF. Please try again.');
                });
            }, 500);
        });
    }
});