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
        sidebar.classList.toggle('expanded');
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