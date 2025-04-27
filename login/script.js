const container =document.querySelector('.container');
const signupBtn =document.querySelector('.signup-btn');
const loginBtn =document.querySelector('.login-btn');

signupBtn.addEventListener('click', () =>{
    container.classList.add('active');
});
loginBtn.addEventListener('click', () =>{
    container.classList.remove('active');
});