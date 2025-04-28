const container = document.querySelector('.container');
const signupBtn = document.querySelector('.signup-btn');
const loginBtn = document.querySelector('.login-btn');

signupBtn.addEventListener('click', () => {
    container.classList.add('active');
});
loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});
<<<<<<< HEAD

const loginForm = document.querySelector('.login-form'); 

signupBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});


if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        

        const username = document.querySelector('.login-form input[type="text"]').value;
        const password = document.querySelector('.login-form input[type="password"]').value;
        

        if (username && password) {
            window.location.href = '/user-dashboard/index.html'; 
        } else {
            alert('Please enter valid credentials');
        }
    });
}

=======

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        // Set a default username if using email login
        localStorage.setItem('username', email.split('@')[0]);
        localStorage.setItem('userEmail', email);
        
        // Redirect to dashboard page
        window.location.href = "../user-dashboard/index.html";
    } else {
        alert("Please fill in all fields");
    }
});

// Handle signup form submission
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (username && email && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('userEmail', email);
        
        // Redirect to dashboard page
        window.location.href = "../user-dashboard/index.html";
    } else {
        alert("Please fill in all fields");
    }
});
>>>>>>> 25e5681c6128d6ae2726bb09c486b1f392825d82
