const container =document.querySelector('.container');
const signupBtn =document.querySelector('.signup-btn');
const loginBtn =document.querySelector('.login-btn');

signupBtn.addEventListener('click', () =>{
    container.classList.add('active');
});
loginBtn.addEventListener('click', () =>{
    container.classList.remove('active');
});
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (name && email) {
        // Save name to localStorage (optional, if you want to show it later)
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);

        // Redirect to dashboard
        window.location.href = "user-dashboard\index.html";
    }
});