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
 
 // Button event listeners
 document.getElementById('startPracticeBtn').addEventListener('click', function() {
   setupSection.classList.remove('hidden');
   chatSection.classList.add('hidden');
   librarySection.classList.add('hidden');
 });
 
 document.getElementById('questionLibraryBtn').addEventListener('click', function() {
   setupSection.classList.add('hidden');
   chatSection.classList.add('hidden');
   librarySection.classList.remove('hidden');
 });
 
 document.getElementById('startInterviewBtn').addEventListener('click', function() {
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
 
 document.getElementById('sendBtn').addEventListener('click', sendAnswer);
 
 document.getElementById('skipBtn').addEventListener('click', function() {
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
 
 document.getElementById('endBtn').addEventListener('click', finishInterview);
 
 // Handle Enter key in input
 userInput.addEventListener('keypress', function(event) {
   if (event.key === 'Enter') {
     sendAnswer();
   }
 });
 
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

     messagesContainer.innerHTML = '';
     totalQuestions = 1;
     currentQuestion = 1;
     questionsAnswered = 0;
     updateProgress();
     
     messagesContainer.innerHTML += `
       <div style="margin-bottom: 10px;">
         <div style="display: inline-block; background-color: #f0f2f5; padding: 10px; border-radius: 10px;">
           ${question}
         </div>
       </div>
     `;

     messagesContainer.scrollTop = messagesContainer.scrollHeight;
   });
 });

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

   messagesContainer.scrollTop = messagesContainer.scrollHeight;
 }
 

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