// dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    // Display username from localStorage if available
    const username = localStorage.getItem('username');
    const userNameElement = document.querySelector('.user-info h2');
    if (username && userNameElement) {
        userNameElement.textContent = username;
    }
    
    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Check window width on load to set initial state
    if (window.innerWidth < 992) {
        sidebar.classList.add('collapsed');
    }
    
    sidebarToggle.addEventListener('click', function() {
        if (window.innerWidth < 992) {
            sidebar.classList.toggle('expanded');
        } else {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        }
    });
    
    // Close expanded sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (window.innerWidth < 992 && 
            !sidebar.contains(event.target) && 
            !sidebarToggle.contains(event.target) && 
            sidebar.classList.contains('expanded')) {
            sidebar.classList.remove('expanded');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            sidebar.classList.remove('collapsed');
            sidebar.classList.remove('expanded');
        } else {
            sidebar.classList.add('collapsed');
        }
    });
    
    // Logout button functionality
    const logoutButton = document.querySelector('.logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show confirmation modal or use browser confirm
            if (confirm('Are you sure you want to log out?')) {
                // Clear user data from localStorage
                localStorage.removeItem('username');
                localStorage.removeItem('userEmail');
                
                // Show notification
                showNotification('Successfully logged out', 'info');
                
                // Redirect to login page after a short delay
                setTimeout(() => {
                    window.location.href = "../login/login.html";
                }, 1000);
            }
        });
    }
    
    // Navigation active state
    const navItems = document.querySelectorAll('.nav-item a');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.parentElement.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.parentElement.classList.add('active');
            
            // Update header title based on the clicked item
            const sectionTitle = this.querySelector('span').textContent;
            document.querySelector('.content-header h1').textContent = sectionTitle;
            
            // If mobile view, close sidebar
            if (window.innerWidth < 992) {
                sidebar.classList.remove('expanded');
            }
            
            // Handle navigation based on href
            const targetHref = this.getAttribute('href');
            
            if (targetHref === '#settings') {
                e.preventDefault();
                showSettingsSection();
            } else if (targetHref === '#dashboard') {
                e.preventDefault();
                showDashboardSections();
            }
        });
    });
    
    // Function to show settings section and hide other sections
    function showSettingsSection() {
        // Show stats cards which are always visible
        document.querySelector('.stats-cards').style.display = 'grid';
        
        // Hide all main content sections except stats-cards and settings-section
        const contentSections = document.querySelectorAll('.dashboard-content > section:not(.stats-cards):not(#settings-section)');
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show settings section
        const settingsSection = document.getElementById('settings-section');
        if (settingsSection) {
            settingsSection.style.display = 'block';
            
            // Scroll to settings section
            settingsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Function to show dashboard sections and hide settings
    function showDashboardSections() {
        // Show all main content sections except settings
        const contentSections = document.querySelectorAll('.dashboard-content > section:not(#settings-section)');
        contentSections.forEach(section => {
            if (section.classList.contains('stats-cards')) {
                section.style.display = 'grid';
            } else if (section.classList.contains('service-cards')) {
                section.style.display = 'block';
            } else {
                section.style.display = 'block';
            }
        });
        
        // Hide settings section
        const settingsSection = document.getElementById('settings-section');
        if (settingsSection) {
            settingsSection.style.display = 'none';
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Settings action buttons
    const settingsButtons = document.querySelectorAll('.settings-action .btn');
    settingsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const settingType = this.getAttribute('href').split('/')[1];
            showNotification(`${settingType.replace('-', ' ')} settings opened`, 'info');
        });
    });
    
    // Skill tag click handler
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.backgroundColor = '#d1fae5';
            this.style.borderColor = '#10b981';
            this.querySelector('i').className = 'fas fa-check';
            this.querySelector('i').style.color = '#10b981';
            
            // Show notification
            showNotification('Skill added to your profile', 'success');
        });
    });
    
    // Show notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'info' ? 'info-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: white;
            padding: 12px 18px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            transform: translateY(100px);
            transition: transform 0.3s ease;
            border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'info' ? '#3a86ff' : '#f59e0b'};
            max-width: 300px;
        `;
        
        notification.querySelector('i').style.color = type === 'success' ? '#10b981' : type === 'info' ? '#3a86ff' : '#f59e0b';
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
    
    // Check if settings is in URL hash on page load
    if (window.location.hash === '#settings') {
        // Find the settings nav item and trigger a click
        const settingsNavItem = document.querySelector('.nav-item a[href="#settings"]');
        if (settingsNavItem) {
            settingsNavItem.click();
        }
    }
    
    // Initialize any other components or functionality
    initializeCharts();
    initializeInterviewPrep();
    initializeJobSearch();
});

// Placeholder for chart initialization
function initializeCharts() {
    // This would be where you initialize any charts or data visualizations
    // Example with a mock function, would need a charting library like Chart.js
    console.log('Charts initialized');
}

// Initialize Interview Preparation functionality
function initializeInterviewPrep() {
    // Global variables
    let currentQuestion = 1;
    let totalQuestions = 5;
    let questionsAnswered = 0;
    
    // Questions by category
    const questions = {
        technical: [
            "Explain how you would design a scalable web application.",
            "Describe a challenging technical problem you solved recently.",
            "How do you stay updated with the latest technologies?",
            "Describe your approach to debugging a complex issue.",
            "Explain your experience with cloud technologies."
        ],
        behavioral: [
            "Tell me about yourself.",
            "Describe a situation where you had to work under pressure.",
            "How do you handle criticism?",
            "Tell me about a time you failed and what you learned.",
            "How do you prioritize your work?"
        ],
        management: [
            "How do you motivate team members?",
            "Describe your leadership style.",
            "How do you handle conflicts in your team?",
            "Tell me about a project you led that succeeded.",
            "How do you make difficult decisions?"
        ]
    };
    
    // DOM elements
    const setupSection = document.getElementById('setup');
    const chatSection = document.getElementById('chat');
    const librarySection = document.getElementById('library');
    const messagesContainer = document.getElementById('messages');
    const userInput = document.getElementById('userInput');
    const progressBar = document.getElementById('progress');
    
    // Function to handle the interview prep section visibility
    function showInterviewPrepSection() {
        // Show stats cards which are always visible
        document.querySelector('.stats-cards').style.display = 'grid';
        
        // Hide all main content sections except stats-cards and interview-prep
        const contentSections = document.querySelectorAll('.dashboard-content > section:not(.stats-cards):not(#interview-prep)');
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show interview prep section
        const interviewPrepSection = document.getElementById('interview-prep');
        if (interviewPrepSection) {
            interviewPrepSection.style.display = 'block';
            
            // Scroll to interview prep section
            interviewPrepSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Button event listeners
    const startPracticeBtn = document.getElementById('startPracticeBtn');
    const questionLibraryBtn = document.getElementById('questionLibraryBtn');
    const startInterviewBtn = document.getElementById('startInterviewBtn');
    const sendBtn = document.getElementById('sendBtn');
    const skipBtn = document.getElementById('skipBtn');
    const endBtn = document.getElementById('endBtn');
    
    if (startPracticeBtn) {
        startPracticeBtn.addEventListener('click', function() {
            setupSection.classList.remove('hidden');
            chatSection.classList.add('hidden');
            librarySection.classList.add('hidden');
        });
    }
    
    if (questionLibraryBtn) {
        questionLibraryBtn.addEventListener('click', function() {
            setupSection.classList.add('hidden');
            chatSection.classList.add('hidden');
            librarySection.classList.remove('hidden');
        });
    }
    
    if (startInterviewBtn) {
        startInterviewBtn.addEventListener('click', function() {
            setupSection.classList.add('hidden');
            chatSection.classList.remove('hidden');
            
            // Reset interview state
            messagesContainer.innerHTML = '';
            currentQuestion = 1;
            questionsAnswered = 0;
            updateProgress();
            
            // Get selected category
            const category = document.getElementById('category').value;
            
            // Ask first question
            askQuestion(category);
        });
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendAnswer);
    }
    
    if (skipBtn) {
        skipBtn.addEventListener('click', function() {
            const category = document.getElementById('category').value;
            
            messagesContainer.innerHTML += `
                <div style="text-align: right; margin-bottom: 10px;">
                    <div style="display: inline-block; background-color: #4a6bff; color: white; padding: 10px; border-radius: 10px;">
                        I'd like to skip this question.
                    </div>
                </div>
            `;
            
            messagesContainer.innerHTML += `
                <div style="margin-bottom: 10px;">
                    <div style="display: inline-block; background-color: #f0f2f5; padding: 10px; border-radius: 10px;">
                        No problem, let's move on to the next question.
                    </div>
                </div>
            `;
            
            questionsAnswered++;
            updateProgress();
            
            if (questionsAnswered < totalQuestions) {
                currentQuestion++;
                setTimeout(() => {
                    askQuestion(category);
                }, 1000);
            } else {
                finishInterview();
            }
        });
    }
    
    if (endBtn) {
        endBtn.addEventListener('click', finishInterview);
    }
    
    // Handle Enter key in input
    if (userInput) {
        userInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                sendAnswer();
            }
        });
    }
    
    // Filter buttons in the library
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get category to filter
            const category = this.dataset.category;
            
            // Filter questions
            const questionItems = document.querySelectorAll('#questionList li');
            questionItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Practice buttons in the library
    const practiceButtons = document.querySelectorAll('.practice-btn');
    practiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.parentElement.textContent.trim().replace('Practice', '').trim();
            
            setupSection.classList.add('hidden');
            librarySection.classList.add('hidden');
            chatSection.classList.remove('hidden');
            
            // Reset interview state
            messagesContainer.innerHTML = '';
            totalQuestions = 1;
            currentQuestion = 1;
            questionsAnswered = 0;
            updateProgress();
            
            // Ask the specific question
            messagesContainer.innerHTML += `
                <div style="margin-bottom: 10px;">
                    <div style="display: inline-block; background-color: #f0f2f5; padding: 10px; border-radius: 10px;">
                        ${question}
                    </div>
                </div>
            `;
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    });
    
    // Function to ask a question
    function askQuestion(category) {
        const questionPool = questions[category];
        const question = questionPool[Math.floor(Math.random() * questionPool.length)];
        
        messagesContainer.innerHTML += `
            <div style="margin-bottom: 10px;">
                <div style="display: inline-block; background-color: #f0f2f5; padding: 10px; border-radius: 10px;">
                    ${question}
                </div>
            </div>
        `;
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Function to send user's answer
    function sendAnswer() {
        const userMessage = userInput.value.trim();
        
        if (userMessage !== '') {
            // Display user message
            messagesContainer.innerHTML += `
                <div style="text-align: right; margin-bottom: 10px;">
                    <div style="display: inline-block; background-color: #4a6bff; color: white; padding: 10px; border-radius: 10px;">
                        ${userMessage}
                    </div>
                </div>
            `;
            
            // Clear input
            userInput.value = '';
            
            // Provide feedback
            const feedback = generateFeedback();
            
            messagesContainer.innerHTML += `
                <div style="margin-bottom: 10px;">
                    <div style="display: inline-block; background-color: #f0f2f5; padding: 10px; border-radius: 10px;">
                        Thanks for your response.
                    </div>
                </div>
            `;
            
            messagesContainer.innerHTML += `
                <div style="margin-bottom: 15px; background-color: #fff8e1; padding: 10px; border-left: 3px solid #ffc107; border-radius: 5px;">
                    <strong>Feedback:</strong><br>
                    ${feedback}
                </div>
            `;
            
            // Update progress
            questionsAnswered++;
            updateProgress();
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Ask next question or finish
            if (questionsAnswered < totalQuestions) {
                currentQuestion++;
                setTimeout(() => {
                    const category = document.getElementById('category').value;
                    askQuestion(category);
                }, 1000);
            } else {
                finishInterview();
            }
        }
    }
    
    // Function to generate feedback
    function generateFeedback() {
        const strengths = [
            "Good use of specific examples.",
            "Clear and concise communication.",
            "Well-structured response.",
            "Good focus on results."
        ];
        
        const improvements = [
            "Try to be more specific with your examples.",
            "Consider quantifying your achievements.",
            "Use the STAR method to structure your answer better."
        ];
        
        // Pick random strength and improvement
        const strength = strengths[Math.floor(Math.random() * strengths.length)];
        const improvement = improvements[Math.floor(Math.random() * improvements.length)];
        
        return `<strong>Strength:</strong> ${strength}<br><strong>To improve:</strong> ${improvement}`;
    }
    
    // Function to update progress bar
    function updateProgress() {
        const progress = (questionsAnswered / totalQuestions) * 100;
        progressBar.style.width = progress + '%';
    }
    
    // Function to finish interview
    function finishInterview() {
        messagesContainer.innerHTML += `
            <div style="margin-bottom: 10px;">
                <div style="display: inline-block; background-color: #f0f2f5; padding: 10px; border-radius: 10px;">
                    That concludes our interview. Thank you for your time! If you'd like to practice again, please click the "Start Practice" button.
                </div>
            </div>
        `;
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Handle interview prep link in sidebar
    const interviewPrepNavItem = document.querySelector('.nav-item a[href="#interview-prep"]');
    if (interviewPrepNavItem) {
        interviewPrepNavItem.addEventListener('click', function(e) {
            e.preventDefault();
            showInterviewPrepSection();
        });
    }
    
    // Check if interview-prep is in URL hash on page load
    if (window.location.hash === '#interview-prep') {
        showInterviewPrepSection();
    }
}

// Initialize Job Search functionality
function initializeJobSearch() {
    // Job database with expanded fields
    const jobs = [
        { 
            id: 1,
            title: "Frontend Developer", 
            location: "Agadir", 
            type: "Online", 
            specialty: "Developer",
            description: "Creating modern responsive web interfaces with React",
            salary: "12,000 - 15,000 MAD",
            company: "TechMorocco"
        },
        { 
            id: 2,
            title: "Backend Developer", 
            location: "Safi", 
            type: "Online", 
            specialty: "Developer",
            description: "Building robust APIs and server applications",
            salary: "13,000 - 16,000 MAD",
            company: "DataSystems"
        },
        { 
            id: 3,
            title: "Marketing Manager", 
            location: "Tetouan", 
            type: "Offline", 
            specialty: "Marketing",
            description: "Leading marketing campaigns and strategy",
            salary: "18,000 - 22,000 MAD",
            company: "BrandConnect"
        },
        { 
            id: 4,
            title: "Graphic Designer", 
            location: "Casablanca", 
            type: "Offline", 
            specialty: "Designer",
            description: "Creating visual concepts for brand identities",
            salary: "10,000 - 15,000 MAD",
            company: "CreativeLab"
        },
        { 
            id: 5,
            title: "Data Analyst", 
            location: "Marrakech", 
            type: "Online", 
            specialty: "Data Analyst",
            description: "Analyzing and interpreting complex data sets",
            salary: "16,000 - 20,000 MAD",
            company: "InsightData"
        },
        { 
            id: 6,
            title: "UX Designer", 
            location: "Rabat", 
            type: "Hybrid", 
            specialty: "Designer",
            description: "Creating intuitive user experiences for web and mobile",
            salary: "14,000 - 18,000 MAD",
            company: "UserFirst"
        },
        { 
            id: 7,
            title: "Product Manager", 
            location: "Fes", 
            type: "Offline", 
            specialty: "Management",
            description: "Leading product development and roadmap planning",
            salary: "20,000 - 25,000 MAD",
            company: "InnovateMorocco"
        },
        { 
            id: 8,
            title: "SEO Specialist", 
            location: "Tangier", 
            type: "Online", 
            specialty: "Marketing",
            description: "Optimizing websites for better search engine performance",
            salary: "12,000 - 15,000 MAD",
            company: "RankHigher"
        },
        { 
            id: 9,
            title: "Full Stack Developer", 
            location: "Oujda", 
            type: "Online", 
            specialty: "Developer",
            description: "Creating end-to-end web applications",
            salary: "15,000 - 20,000 MAD",
            company: "TechSolutions"
        },
        { 
            id: 10,
            title: "UI Designer", 
            location: "Tetouan", 
            type: "Offline", 
            specialty: "Designer",
            description: "Creating visually appealing interfaces for websites and apps",
            salary: "12,000 - 16,000 MAD",
            company: "DesignMakers"
        },
        { 
            id: 11,
            title: "Social Media Manager", 
            location: "Kenitra", 
            type: "Online", 
            specialty: "Marketing",
            description: "Managing social media presence across platforms",
            salary: "10,000 - 14,000 MAD",
            company: "SocialBoost"
        },
        { 
            id: 12,
            title: "Mobile App Developer", 
            location: "Rabat", 
            type: "Hybrid", 
            specialty: "Developer",
            description: "Building native and cross-platform mobile applications",
            salary: "16,000 - 22,000 MAD",
            company: "AppFactory"
        },
        { 
            id: 13,
            title: "Content Writer", 
            location: "Casablanca", 
            type: "Online", 
            specialty: "Marketing",
            description: "Creating engaging content for websites and marketing",
            salary: "8,000 - 12,000 MAD",
            company: "ContentKings"
        },
        { 
            id: 14,
            title: "Project Manager", 
            location: "Marrakech", 
            type: "Offline", 
            specialty: "Management",
            description: "Overseeing project execution and team coordination",
            salary: "18,000 - 24,000 MAD",
            company: "ProjectPro"
        },
        { 
            id: 15,
            title: "DevOps Engineer", 
            location: "Agadir", 
            type: "Hybrid", 
            specialty: "Developer",
            description: "Managing infrastructure and deployment automation",
            salary: "18,000 - 25,000 MAD",
            company: "CloudOps"
        },
        // Additional international jobs
        { 
            id: 16,
            title: "Senior Frontend Developer", 
            location: "San Francisco", 
            type: "Hybrid", 
            specialty: "Developer",
            description: "Leading frontend development for a high-growth startup",
            salary: "$120,000 - $150,000",
            company: "TechGrowth"
        },
        { 
            id: 17,
            title: "Data Scientist", 
            location: "New York", 
            type: "Offline", 
            specialty: "Data Analyst",
            description: "Building machine learning models for financial forecasting",
            salary: "$140,000 - $170,000",
            company: "FinAnalytics"
        },
        { 
            id: 18,
            title: "React Native Developer", 
            location: "London", 
            type: "Online", 
            specialty: "Developer",
            description: "Developing cross-platform mobile applications with React Native",
            salary: "£65,000 - £85,000",
            company: "MobileInnovate"
        }
    ];

    // Application state
    const state = {
        displayedJobs: [],
        filteredJobs: [],
        currentJobsCount: 0,
        jobsPerPage: 6,
        searchTerm: '',
        filters: {
            location: '',
            jobType: '',
            specialty: ''
        }
    };

    // Initialize the job search
    function initApp() {
        // Get all jobs initially
        state.displayedJobs = [...jobs];
        state.filteredJobs = [...jobs];
        
        // Reset counters
        state.currentJobsCount = 0;
        
        // Display initial set of jobs
        displayJobs(state.filteredJobs);
        
        // Update results count
        updateResultsCount();
    }

    // Display jobs in the UI
    function displayJobs(jobList, append = false) {
        const resultsDiv = document.getElementById('results');
        
        if (!resultsDiv) return;
        
        // Clear results or keep existing
        if (!append) {
            resultsDiv.innerHTML = '';
            state.currentJobsCount = 0;
        }
        
        // Get next batch of jobs
        const jobsToShow = jobList.slice(state.currentJobsCount, state.currentJobsCount + state.jobsPerPage);
        
        if (jobsToShow.length === 0 && !append) {
            resultsDiv.innerHTML = '<div class="no-results">No jobs match your criteria. Try adjusting your filters.</div>';
            const showMoreBtn = document.getElementById('showMore');
            if (showMoreBtn) showMoreBtn.style.display = 'none';
            return;
        }
        
        // Create job cards
        jobsToShow.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.className = 'dashboard-job-item';
            jobCard.setAttribute('data-id', job.id);
            
            // Calculate a random match percentage (in a real app this would be based on user skills)
            const matchPercentage = Math.floor(Math.random() * 31) + 70; // 70-100%
            
            jobCard.innerHTML = `
                <div class="job-header">
                    <div class="job-company-logo small">
                        <img src="https://via.placeholder.com/40?text=${job.company.charAt(0)}" alt="${job.company} logo">
                    </div>
                    <div class="job-header-details">
                        <h4>${job.title}</h4>
                        <p>${job.company}</p>
                    </div>
                    <div class="job-match small">
                        <span class="match-label">${matchPercentage}% Match</span>
                    </div>
                </div>
                <div class="job-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                    <span><i class="fas fa-briefcase"></i> ${job.type}</span>
                    <span><i class="fas fa-tags"></i> ${job.specialty}</span>
                    <span><i class="fas fa-money-bill-wave"></i> ${job.salary}</span>
                </div>
                <div class="job-actions">
                    <button class="btn sm primary">Apply Now</button>
                    <button class="btn sm secondary">Save Job</button>
                </div>
            `;
            
            resultsDiv.appendChild(jobCard);
        });
        
        // Update count of displayed jobs
        state.currentJobsCount += jobsToShow.length;
        
        // Show/hide "Show More" button
        const showMoreBtn = document.getElementById('showMore');
        if (showMoreBtn) {
            showMoreBtn.style.display = state.currentJobsCount >= jobList.length ? 'none' : 'block';
        }
    }

    // Filter jobs based on selected criteria and search term
    window.filterJobs = function() {
        // Get filter values
        const locationSelect = document.getElementById('location');
        const jobTypeSelect = document.getElementById('jobType');
        const specialtySelect = document.getElementById('specialty');
        const searchInput = document.getElementById('searchInput');
        
        if (!locationSelect || !jobTypeSelect || !specialtySelect || !searchInput) return;
        
        state.filters.location = locationSelect.value;
        state.filters.jobType = jobTypeSelect.value;
        state.filters.specialty = specialtySelect.value;
        state.searchTerm = searchInput.value.toLowerCase();
        
        // Filter jobs
        state.filteredJobs = jobs.filter(job => {
            const matchesLocation = !state.filters.location || job.location === state.filters.location;
            const matchesType = !state.filters.jobType || job.type === state.filters.jobType;
            const matchesSpecialty = !state.filters.specialty || job.specialty === state.filters.specialty;
            const matchesSearch = !state.searchTerm || 
                                job.title.toLowerCase().includes(state.searchTerm) || 
                                job.description.toLowerCase().includes(state.searchTerm) ||
                                job.company.toLowerCase().includes(state.searchTerm);
            
            return matchesLocation && matchesType && matchesSpecialty && matchesSearch;
        });
        
        // Reset and display filtered jobs
        displayJobs(state.filteredJobs);
        
        // Update results count
        updateResultsCount();
    }

    // Clear all filters and reset the view
    window.clearFilters = function() {
        // Reset all filter controls
        const locationSelect = document.getElementById('location');
        const jobTypeSelect = document.getElementById('jobType');
        const specialtySelect = document.getElementById('specialty');
        const searchInput = document.getElementById('searchInput');
        
        if (!locationSelect || !jobTypeSelect || !specialtySelect || !searchInput) return;
        
        locationSelect.value = '';
        jobTypeSelect.value = '';  
        specialtySelect.value = '';
        searchInput.value = '';
        
        // Reset application state
        state.filters.location = '';
        state.filters.jobType = '';
        state.filters.specialty = '';
        state.searchTerm = '';
        state.filteredJobs = [...jobs];
        
        // Display all jobs again
        displayJobs(state.filteredJobs);
        
        // Update results count
        updateResultsCount();
    }

    // Show more jobs when button is clicked
    window.showMoreJobs = function() {
        displayJobs(state.filteredJobs, true);
        updateResultsCount();
    }

    // Update the results count display
    function updateResultsCount() {
        const countElement = document.getElementById('resultsCount');
        if (!countElement) return;
        
        const totalJobs = state.filteredJobs.length;
        const shownJobs = Math.min(state.currentJobsCount, totalJobs);
        
        if (totalJobs === 0) {
            countElement.textContent = 'No jobs found';
        } else {
            countElement.textContent = `Showing ${shownJobs} of ${totalJobs} jobs`;
        }
    }

    // Initialize custom select dropdown functionality
    function initializeCustomSelects() {
        const customSelects = document.getElementsByClassName("custom-select");
        
        for (let i = 0; i < customSelects.length; i++) {
            const select = customSelects[i].getElementsByTagName("select")[0];
            if (!select) continue;
            
            // Create a new DIV that will act as the selected item
            const selectedDiv = document.createElement("DIV");
            selectedDiv.setAttribute("class", "select-selected");
            selectedDiv.innerHTML = select.options[select.selectedIndex].innerHTML;
            customSelects[i].appendChild(selectedDiv);
            
            // Create a new DIV that will contain the option list
            const optionsDiv = document.createElement("DIV");
            optionsDiv.setAttribute("class", "select-items");
            
            for (let j = 0; j < select.length; j++) {
                // For each option in the original select element,
                // create a new DIV that will act as an option item
                const optionDiv = document.createElement("DIV");
                optionDiv.innerHTML = select.options[j].innerHTML;
                
                // When an item is clicked, update the original select box and the selected item
                optionDiv.addEventListener("click", function(e) {
                    let originalSelect = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    let selectedDiv = this.parentNode.previousSibling;
                    
                    for (let k = 0; k < originalSelect.length; k++) {
                        if (originalSelect.options[k].innerHTML === this.innerHTML) {
                            originalSelect.selectedIndex = k;
                            selectedDiv.innerHTML = this.innerHTML;
                            
                            let sameAsSelected = this.parentNode.getElementsByClassName("same-as-selected");
                            for (let l = 0; l < sameAsSelected.length; l++) {
                                sameAsSelected[l].removeAttribute("class");
                            }
                            
                            this.setAttribute("class", "same-as-selected");
                            
                            // Trigger the onchange event
                            let event = new Event('change');
                            originalSelect.dispatchEvent(event);
                            break;
                        }
                    }
                    
                    selectedDiv.click();
                });
                
                optionsDiv.appendChild(optionDiv);
            }
            
            customSelects[i].appendChild(optionsDiv);
            
            // When the select box is clicked, toggle between hiding and showing the options
            selectedDiv.addEventListener("click", function(e) {
                e.stopPropagation();
                
                // Close all other select boxes
                closeAllSelect(this);
                
                // Toggle active class and show/hide options
                this.classList.toggle("select-arrow-active");
                this.classList.toggle("select-focused");
                
                const nextSibling = this.nextSibling;
                if (nextSibling) {
                    nextSibling.classList.toggle("select-items-open");
                }
            });
        }
        
        // Close all select boxes when clicking elsewhere
        function closeAllSelect(elmnt) {
            const arrNo = [];
            const selectItems = document.getElementsByClassName("select-items");
            const selectSelected = document.getElementsByClassName("select-selected");
            
            for (let i = 0; i < selectSelected.length; i++) {
                if (elmnt === selectSelected[i]) {
                    arrNo.push(i);
                } else {
                    selectSelected[i].classList.remove("select-arrow-active");
                    selectSelected[i].classList.remove("select-focused");
                }
            }
            
            for (let i = 0; i < selectItems.length; i++) {
                if (arrNo.indexOf(i) === -1) {
                    selectItems[i].classList.remove("select-items-open");
                }
            }
        }
        
        // Close all select boxes when clicking elsewhere
        document.addEventListener("click", closeAllSelect);
    }

    // Function to handle showing job search section
    function showJobSearchSection() {
        // Show stats cards which are always visible
        document.querySelector('.stats-cards').style.display = 'grid';
        
        // Hide all main content sections except stats-cards and find-job-full-section
        const contentSections = document.querySelectorAll('.dashboard-content > section:not(.stats-cards):not(.find-job-full-section)');
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show job search section
        const jobSearchSection = document.querySelector('.find-job-full-section');
        if (jobSearchSection) {
            jobSearchSection.style.display = 'block';
            
            // Scroll to job search section
            jobSearchSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Handle job search link in sidebar
    const jobSearchNavItem = document.querySelector('.nav-item a[href="../find job/findjob.html"]');
    if (jobSearchNavItem) {
        jobSearchNavItem.addEventListener('click', function(e) {
            e.preventDefault();
            showJobSearchSection();
        });
    }

    // Initialize the job search functionality
    initApp();
    initializeCustomSelects();
    
    // Set up job service card link
    const findJobsBtn = document.querySelector('.card-actions a[href="services/job-search/index.html"]');
    if (findJobsBtn) {
        findJobsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showJobSearchSection();
        });
    }
}