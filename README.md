# Resume Builder Web App

A clean, modern resume builder web application with a professional dashboard interface. This single-page application helps users create a polished resume through an intuitive step-by-step process.


## 🌟 Features

- **Professional dashboard layout** with sidebar navigation
- **Step-by-step resume creation** process
- **Real-time progress tracking**
- **Local storage** saves your progress automatically
- **Multiple export options** (PDF, DOCX, HTML)
- **Responsive design** works on all device sizes
- **No server required** - runs entirely in the browser

## 📋 Sections

The resume builder guides you through creating these essential resume sections:

1. **Heading Information** - Name, job title, contact details
2. **Education** - Academic history with multiple entry support
3. **Work Experience** - Professional experience with detailed descriptions
4. **Skills** - Categorized skill sets
5. **Summary** - Professional summary statement
6. **Final Review** - Preview and download options

## 🛠️ Technical Details

This project is built with:

- **HTML5** for semantic structure
- **CSS3** with Flexbox/Grid for modern layouts
- **Vanilla JavaScript** for all functionality
- **LocalStorage API** for saving resume data
- **Print API** for PDF generation

## 📁 Project Structure

```
resume-builder/
├── index.html          # Main page with sidebar + steps
├── css/
│   └── style.css       # All styling (sidebar, forms, progress)
├── js/
│   ├── navigation.js   # Sidebar step navigation logic
│   ├── storage.js      # Save/retrieve data from localStorage
│   ├── validation.js   # Form validation logic
│   ├── export.js       # Export functionality (PDF, DOCX, HTML)
│   └── app.js          # Main application controller
├── assets/
│   └── screenshot.png  # Project screenshot
└── resume-template.html # PDF generation template
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/resume-builder.git
   ```

2. Open `index.html` in your browser.

That's it! No build process, dependencies, or server setup required.

## 💻 Browser Compatibility

The Resume Builder works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📝 How to Use

1. Fill in each section of your resume with your details
2. Use the sidebar or navigation buttons to move between sections
3. Your progress is automatically saved in your browser's localStorage
4. In the "Final Review" section, preview your resume and download it in your preferred format

## 🔧 Customization

The application is designed to be easily customizable:

- **CSS Variables** - Update colors and styling by changing CSS variables in the `:root` selector
- **Modular JavaScript** - Each functionality is separated into its own file for easy maintenance
- **HTML Structure** - Clean, semantic HTML makes structural changes straightforward

## 📦 Deployment

As this is a client-side only application, you can deploy it to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- Amazon S3
- Any web hosting service
