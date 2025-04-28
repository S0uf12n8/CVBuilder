const container = document.querySelector('.container');
const signupBtn = document.querySelector('.signup-btn');
const loginBtn = document.querySelector('.login-btn');

signupBtn.addEventListener('click', () => {
    container.classList.add('active');
});
loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

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

