let btnLog = document.querySelector('.btn-log');
let btnReg = document.querySelector('.btn-reg');
let homeimg = document.querySelector('.img-home');
let divLogReg = document.querySelector('.div-log-reg');

homeimg.addEventListener('click', function() {
    window.location.href = 'home.html';
});

btnLog.addEventListener('click', function() {
    window.location.href = 'login.html';
});

btnReg.addEventListener('click', function() {
    window.location.href = 'register.html';
});


(function(){
    if (localStorage.getItem('loggedIn') === 'true') {
        divLogReg.style.display = 'none';
    }
})();


////////////////////////////////////////////////////////////////////////////////////////////////


let em = document.querySelector('#em');
let pass = document.querySelector('#pass');
let loginBtn = document.querySelector('#login-btn');

let storedEmail = localStorage.getItem('email');

let storedPassword = localStorage.getItem('password');

loginBtn.addEventListener('click', function(e){
    e.preventDefault();
    if (em.value === "" || pass.value === "") {
        alert("Please fill in all fields.");
    } else {
        if (em.value === storedEmail && pass.value === storedPassword) {
            
            setTimeout(() => {
                window.location = "home.html";
            }, 1000);
            localStorage.setItem('loggedIn', 'true');
        } else {
            alert("Invalid email or password.");
        }
    }
});

em.style.borderColor = "green";
pass.style.borderColor = "green";
