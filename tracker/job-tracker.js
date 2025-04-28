// job-tracker.js - JavaScript for Job Application Tracker

document.addEventListener('DOMContentLoaded', function() {
  // Initialize application data
  let applications = [];
  let notes = [];
  
  // Load data from localStorage if available
  loadData();
  
  // Tab switching functionality
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Modal functionality
  const addApplicationModal = document.getElementById('addApplicationModal');
  const addNoteModal = document.getElementById('addNoteModal');
  const viewDetailsModal = document.getElementById('viewDetailsModal');
  const addApplicationBtn = document.getElementById('addApplicationBtn');
  const cancelAddBtn = document.getElementById('cancelAddBtn');
  const cancelNoteBtn = document.getElementById('cancelNoteBtn');
  const closeButtons = document.querySelectorAll('.close');
  
  // Open Add Application Modal
  addApplicationBtn.addEventListener('click', function() {
    addApplicationModal.style.display = 'block';
    document.getElementById('applicationForm').reset();
    
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateApplied').value = today;
  });
  
  // Close modals with cancel buttons
  cancelAddBtn.addEventListener('click', function() {
    addApplicationModal.style.display = 'none';
  });
  
  cancelNoteBtn.addEventListener('click', function() {
    addNoteModal.style.display = 'none';
  });
  
  // Close modals with X buttons
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      addApplicationModal.style.display = 'none';
      addNoteModal.style.display = 'none';
      viewDetailsModal.style.display = 'none';
    });
  });
  
  // Close modals when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === addApplicationModal) {
      addApplicationModal.style.display = 'none';
    }
    if (event.target === addNoteModal) {
      addNoteModal.style.display = 'none';
    }
    if (event.target === viewDetailsModal) {
      viewDetailsModal.style.display = 'none';
    }
  });
  
  // Add event listeners to action buttons
  addActionButtonListeners();
  
  // Add event listeners to filter controls
  const searchInput = document.getElementById('searchInput');
  const statusFilter = document.getElementById('statusFilter');
  const dateFilter = document.getElementById('dateFilter');
  
  searchInput.addEventListener('input', filterApplications);
  statusFilter.addEventListener('change', filterApplications);
  dateFilter.addEventListener('change', filterApplications);
  
  // Form submissions
  const applicationForm = document.getElementById('applicationForm');
  applicationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const companyName = document.getElementById('companyName').value;
    const position = document.getElementById('position').value;
    const dateApplied = document.getElementById('dateApplied').value;
    const location = document.getElementById('location').value;
    const status = document.getElementById('jobStatus').value;
    const source = document.getElementById('source').value;
    const description = document.getElementById('jobDescription').value;
    const contactName = document.getElementById('contactName').value;
    const contactEmail = document.getElementById('contactEmail').value;
    
    // Create application object
    const newApplication = {
      id: Date.now(), // Use timestamp as unique ID
      company: companyName,
      position: position,
      dateApplied: dateApplied,
      location: location || 'Not specified',
      status: status,
      source: source || 'Not specified',
      description: description || 'No description provided',
      contactName: contactName || 'None',
      contactEmail: contactEmail || 'None',
      lastUpdate: dateApplied
    };
    
    // Add to applications array
    applications.unshift(newApplication);
    
    // Save to localStorage
    saveData();
    
    // Add to UI
    addApplicationToTable(newApplication);
    
    // Close modal
    addApplicationModal.style.display = 'none';
    
    // Show success notification
    showNotification('Application added successfully!', 'success');
    
    // Update statistics
    updateStatistics();
  });
  
  const noteForm = document.getElementById('noteForm');
  noteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const applicationId = document.getElementById('noteApplicationId').value;
    const title = document.getElementById('noteTitle').value;
    const date = document.getElementById('noteDate').value;
    const type = document.getElementById('noteType').value;
    const details = document.getElementById('noteDetails').value;
    
    // Create note object
    const newNote = {
      id: Date.now(),
      applicationId: applicationId,
      title: title,
      date: date,
      type: type,
      details: details
    };
    
    // Add to notes array
    notes.unshift(newNote);
    
    // Update last update date for application
    const appIndex = applications.findIndex(app => 
      app.company + ' - ' + app.position === applicationId
    );
    
    if (appIndex !== -1) {
      applications[appIndex].lastUpdate = date;
      
      // If note type is status change, update application status
      if (type === 'interview') {
        applications[appIndex].status = 'Interview';
      } else if (type === 'test') {
        applications[appIndex].status = 'Testing';
      } else if (type === 'offer') {
        applications[appIndex].status = 'Offered';
      } else if (type === 'rejection') {
        applications[appIndex].status = 'Rejected';
      }
      
      // Refresh the application table
      refreshApplicationTable();
    }
    
    // Add to timeline UI
    addNoteToTimeline(newNote);
    
    // Save to localStorage
    saveData();
    
    // Close modal
    addNoteModal.style.display = 'none';
    
    // Show success notification
    showNotification('Note added successfully!', 'success');
    
    // Update statistics
    updateStatistics();
  });
  
  // Helper Functions
  
  // Format date for display
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
  
  // Get status badge class
  function getStatusClass(status) {
    switch(status) {
      case 'Applied':
        return 'status-applied';
      case 'Interview':
        return 'status-interview';
      case 'Testing':
        return 'status-testing';
      case 'Offered':
        return 'status-offered';
      case 'Rejected':
        return 'status-rejected';
      default:
        return 'status-applied';
    }
  }
  
  // Add application to table
  function addApplicationToTable(application) {
    const tableBody = document.getElementById('applications-table');
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-id', application.id);
    
    newRow.innerHTML = `
      <td>${application.company}</td>
      <td>${application.position}</td>
      <td>${formatDate(application.dateApplied)}</td>
      <td>${application.location}</td>
      <td><span class="status-badge ${getStatusClass(application.status)}">${application.status}</span></td>
      <td>${formatDate(application.lastUpdate)}</td>
      <td>
        <button class="action-btn view-btn" title="View Details">
          <i class="fas fa-eye"></i>
        </button>
        <button class="action-btn edit-btn" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn add-note-btn" title="Add Note">
          <i class="fas fa-sticky-note"></i>
        </button>
        <button class="action-btn delete-btn" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    
    tableBody.prepend(newRow);
    
    // Add event listeners to the new row's buttons
    addRowButtonListeners(newRow);
  }
  
  // Add note to timeline
  function addNoteToTimeline(note) {
    const timeline = document.querySelector('#notes .timeline');
    const newItem = document.createElement('div');
    newItem.className = 'timeline-item';
    newItem.setAttribute('data-id', note.id);
    
    newItem.innerHTML = `
      <div class="timeline-content">
        <div class="timeline-date">${formatDate(note.date)}</div>
        <div class="timeline-title">${note.title}</div>
        <div class="timeline-text">${note.details}</div>
      </div>
    `;
    
    timeline.prepend(newItem);
  }
  
  // Refresh application table
  function refreshApplicationTable() {
    const tableBody = document.getElementById('applications-table');
    tableBody.innerHTML = '';
    
    applications.forEach(app => {
      addApplicationToTable(app);
    });
  }
  
  // Filter applications based on search and filters
  function filterApplications() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;
    const dateValue = dateFilter.value;
    
    const rows = document.querySelectorAll('#applications-table tr');
    
    rows.forEach(row => {
      const company = row.cells[0].textContent.toLowerCase();
      const position = row.cells[1].textContent.toLowerCase();
      const date = row.cells[2].textContent;
      const statusText = row.cells[4].textContent.trim();
      
      let matchesSearch = company.includes(searchTerm) || position.includes(searchTerm);
      let matchesStatus = !statusValue || statusText === statusValue;
      let matchesDate = true; // Default to true if no date filter
      
      // Date filtering logic
      if (dateValue) {
        const today = new Date();
        const appDate = new Date(date);
        
        if (dateValue === 'today') {
          matchesDate = isSameDay(appDate, today);
        } else if (dateValue === 'week') {
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          matchesDate = appDate >= weekAgo;
        } else if (dateValue === 'month') {
          const monthAgo = new Date(today);
          monthAgo.setMonth(today.getMonth() - 1);
          matchesDate = appDate >= monthAgo;
        } else if (dateValue === 'quarter') {
          const quarterAgo = new Date(today);
          quarterAgo.setMonth(today.getMonth() - 3);
          matchesDate = appDate >= quarterAgo;
        }
      }
      
      if (matchesSearch && matchesStatus && matchesDate) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
  
  // Helper to check if two dates are the same day
  function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }
  
  // Add event listeners to action buttons in all rows
  function addActionButtonListeners() {
    // Add Note buttons
    const addNoteButtons = document.querySelectorAll('.add-note-btn');
    addNoteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        const applicationId = row.cells[0].textContent + ' - ' + row.cells[1].textContent;
        
        document.getElementById('noteApplicationId').value = applicationId;
        
        // Set current date
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('noteDate').value = today;
        
        addNoteModal.style.display = 'block';
      });
    });
    
    // View buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        const appId = row.getAttribute('data-id');
        
        // Find application in data
        const application = applications.find(app => app.id.toString() === appId);
        
        if (application) {
          // Update details view
          document.getElementById('detailCompany').textContent = application.company;
          document.getElementById('detailPosition').innerHTML = `<strong>Position:</strong> ${application.position}`;
          document.getElementById('detailDate').innerHTML = `<strong>Applied on:</strong> ${formatDate(application.dateApplied)}`;
          document.getElementById('detailLocation').innerHTML = `<strong>Location:</strong> ${application.location}`;
          document.getElementById('detailStatus').innerHTML = `<strong>Status:</strong> <span class="status-badge ${getStatusClass(application.status)}">${application.status}</span>`;
          document.getElementById('detailSource').innerHTML = `<strong>Source:</strong> ${application.source}`;
          
          const contactInfo = application.contactName !== 'None' ? 
            `${application.contactName} (${application.contactEmail})` : 
            'No contact information';
          
          document.getElementById('detailContact').innerHTML = `<strong>Contact:</strong> ${contactInfo}`;
          document.getElementById('detailDescription').textContent = application.description;
          
          // Get and display application notes
          const applicationNotes = notes.filter(note => 
            note.applicationId === `${application.company} - ${application.position}`
          );
          
          const timelineContainer = document.querySelector('#viewDetailsModal .timeline');
          timelineContainer.innerHTML = '';
          
          if (applicationNotes.length > 0) {
            applicationNotes.forEach(note => {
              const noteItem = document.createElement('div');
              noteItem.className = 'timeline-item';
              
              noteItem.innerHTML = `
                <div class="timeline-content">
                  <div class="timeline-date">${formatDate(note.date)}</div>
                  <div class="timeline-title">${note.title}</div>
                  <div class="timeline-text">${note.details}</div>
                </div>
              `;
              
              timelineContainer.appendChild(noteItem);
            });
          } else {
            timelineContainer.innerHTML = '<p>No updates recorded for this application.</p>';
          }
          
          viewDetailsModal.style.display = 'block';
        }
      });
    });
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this application?')) {
          const row = this.closest('tr');
          const appId = row.getAttribute('data-id');
          
          // Remove from data array
          applications = applications.filter(app => app.id.toString() !== appId);
          
          // Remove from UI
          row.remove();
          
          // Save updated data
          saveData();
          
          // Update statistics
          updateStatistics();
          
          showNotification('Application deleted', 'info');
        }
      });
    });
  }
  
  // Add event listeners to a specific row's buttons
  function addRowButtonListeners(row) {
    const viewBtn = row.querySelector('.view-btn');
    const addNoteBtn = row.querySelector('.add-note-btn');
    const deleteBtn = row.querySelector('.delete-btn');
    
    viewBtn.addEventListener('click', function() {
      const appId = row.getAttribute('data-id');
      
      // Find application in data
      const application = applications.find(app => app.id.toString() === appId);
      
      if (application) {
        // Update details view
        document.getElementById('detailCompany').textContent = application.company;
        document.getElementById('detailPosition').innerHTML = `<strong>Position:</strong> ${application.position}`;
        document.getElementById('detailDate').innerHTML = `<strong>Applied on:</strong> ${formatDate(application.dateApplied)}`;
        document.getElementById('detailLocation').innerHTML = `<strong>Location:</strong> ${application.location}`;
        document.getElementById('detailStatus').innerHTML = `<strong>Status:</strong> <span class="status-badge ${getStatusClass(application.status)}">${application.status}</span>`;
        document.getElementById('detailSource').innerHTML = `<strong>Source:</strong> ${application.source}`;
        
        const contactInfo = application.contactName !== 'None' ? 
          `${application.contactName} (${application.contactEmail})` : 
          'No contact information';
        
        document.getElementById('detailContact').innerHTML = `<strong>Contact:</strong> ${contactInfo}`;
        document.getElementById('detailDescription').textContent = application.description;
        
        // Get and display application notes
        const applicationNotes = notes.filter(note => 
          note.applicationId === `${application.company} - ${application.position}`
        );
        
        const timelineContainer = document.querySelector('#viewDetailsModal .timeline');
        timelineContainer.innerHTML = '';
        
        if (applicationNotes.length > 0) {
          applicationNotes.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.className = 'timeline-item';
            
            noteItem.innerHTML = `
              <div class="timeline-content">
                <div class="timeline-date">${formatDate(note.date)}</div>
                <div class="timeline-title">${note.title}</div>
                <div class="timeline-text">${note.details}</div>
              </div>
            `;
            
            timelineContainer.appendChild(noteItem);
          });
        } else {
          timelineContainer.innerHTML = '<p>No updates recorded for this application.</p>';
        }
        
        viewDetailsModal.style.display = 'block';
      }
    });
    
    addNoteBtn.addEventListener('click', function() {
      const applicationId = row.cells[0].textContent + ' - ' + row.cells[1].textContent;
      document.getElementById('noteApplicationId').value = applicationId;
      
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('noteDate').value = today;
      
      addNoteModal.style.display = 'block';
    });
    
    deleteBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to delete this application?')) {
        const appId = row.getAttribute('data-id');
        
        // Remove from data array
        applications = applications.filter(app => app.id.toString() !== appId);
        
        // Remove from UI
        row.remove();
        
        // Save updated data
        saveData();
        
        // Update statistics
        updateStatistics();
        
        showNotification('Application deleted', 'info');
      }
    });
  }
  
  // Update statistics
  function updateStatistics() {
    document.getElementById('total-count').textContent = applications.length;
    
    const activeCount = applications.filter(app => 
      app.status !== 'Rejected'
    ).length;
    
    document.getElementById('active-count').textContent = activeCount;
    
    // Count applications this month
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const monthCount = applications.filter(app => 
      new Date(app.dateApplied) >= firstDayOfMonth
    ).length;
    
    document.getElementById('month-count').textContent = monthCount;
    
    // Count by status
    const interviewCount = applications.filter(app => app.status === 'Interview').length;
    const testCount = applications.filter(app => app.status === 'Testing').length;
    const offerCount = applications.filter(app => app.status === 'Offered').length;
    const rejectCount = applications.filter(app => app.status === 'Rejected').length;
    
    document.getElementById('interview-count').textContent = interviewCount;
    document.getElementById('test-count').textContent = testCount;
    document.getElementById('offer-count').textContent = offerCount;
    document.getElementById('reject-count').textContent = rejectCount;
  }
  
  // Show notification
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show the notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
  
  // Load data from localStorage
  function loadData() {
    const savedApplications = localStorage.getItem('jobApplications');
    const savedNotes = localStorage.getItem('applicationNotes');
    
    if (savedApplications) {
      applications = JSON.parse(savedApplications);
      applications.forEach(app => {
        addApplicationToTable(app);
      });
    }
    
    if (savedNotes) {
      notes = JSON.parse(savedNotes);
      notes.forEach(note => {
        addNoteToTimeline(note);
      });
    }
    
    // Update statistics
    updateStatistics();
  }
  
  // Save data to localStorage
  function saveData() {
    localStorage.setItem('jobApplications', JSON.stringify(applications));
    localStorage.setItem('applicationNotes', JSON.stringify(notes));
  }
});
