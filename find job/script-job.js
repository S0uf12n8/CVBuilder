// Enhanced Job Filter Tool

// Expanded job database with more fields
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

/**
 * Initialize the application
 */
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

/**
 * Display jobs in the UI
 * @param {Array} jobList - List of jobs to display
 * @param {Boolean} append - Whether to append jobs or replace existing ones
 */
function displayJobs(jobList, append = false) {
  const resultsDiv = document.getElementById('results');
  
  // Clear results or keep existing
  if (!append) {
    resultsDiv.innerHTML = '';
    state.currentJobsCount = 0;
  }
  
  // Get next batch of jobs
  const jobsToShow = jobList.slice(state.currentJobsCount, state.currentJobsCount + state.jobsPerPage);
  
  if (jobsToShow.length === 0 && !append) {
    resultsDiv.innerHTML = '<div class="no-results">No jobs match your criteria. Try adjusting your filters.</div>';
    document.getElementById('showMore').style.display = 'none';
    return;
  }
  
  // Create job cards
  jobsToShow.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    jobCard.setAttribute('data-id', job.id);
    
    jobCard.innerHTML = `
      <div class="job-title">${job.title}</div>
      <div class="job-details"><strong>Location:</strong> ${job.location}</div>
      <div class="job-details"><strong>Type:</strong> ${job.type}</div>
      <div class="job-details"><strong>Specialty:</strong> ${job.specialty}</div>
      <div class="job-details"><strong>Company:</strong> ${job.company}</div>
      <div class="job-details"><strong>Salary:</strong> ${job.salary}</div>
    `;
    
    resultsDiv.appendChild(jobCard);
  });
  
  // Update count of displayed jobs
  state.currentJobsCount += jobsToShow.length;
  
  // Show/hide "Show More" button
  const showMoreBtn = document.getElementById('showMore');
  showMoreBtn.style.display = state.currentJobsCount >= jobList.length ? 'none' : 'block';
}

/**
 * Filter jobs based on selected criteria and search term
 */
function filterJobs() {
  // Get filter values
  state.filters.location = document.getElementById('location').value;
  state.filters.jobType = document.getElementById('jobType').value;
  state.filters.specialty = document.getElementById('specialty').value;
  state.searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
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

/**
 * Clear all filters and reset the view
 */
function clearFilters() {
  // Reset all filter controls
  document.getElementById('location').value = '';
  document.getElementById('jobType').value = '';  
  document.getElementById('specialty').value = '';
  document.getElementById('searchInput').value = '';
  
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

/**
 * Show more jobs when button is clicked
 */
function showMoreJobs() {
  displayJobs(state.filteredJobs, true);
  updateResultsCount();
}

/**
 * Update the results count display
 */
function updateResultsCount() {
  const countElement = document.getElementById('resultsCount');
  const totalJobs = state.filteredJobs.length;
  const shownJobs = Math.min(state.currentJobsCount, totalJobs);
  
  if (totalJobs === 0) {
    countElement.textContent = 'No jobs found';
  } else {
    countElement.textContent = `Showing ${shownJobs} of ${totalJobs} jobs`;
  }
}

// Initialize the application when the page loads
window.addEventListener('load', initApp);
document.addEventListener('DOMContentLoaded', function() {
  // Custom select implementation
  const customSelects = document.getElementsByClassName("custom-select");
  
  for (let i = 0; i < customSelects.length; i++) {
    const select = customSelects[i].getElementsByTagName("select")[0];
    
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
});