function getUsers() {
    var previousSignUp = localStorage.getItem('signUpData');
    return previousSignUp ? JSON.parse(previousSignUp) : [];
}

function saveUsers(userList) {
    localStorage.setItem('signUpData', JSON.stringify(userList));
}


var signUpButton = document.getElementById('signUpFirst');
if (signUpButton) {
    signUpButton.addEventListener('click', function (e) {
        e.preventDefault();

        var signUpName = document.getElementById('signUpName').value.trim();
        var signUpEmail = document.getElementById('signUpEmail').value.trim();
        var signUpPass = document.getElementById('signUpPass').value;


        if (signUpName === '' || signUpEmail === '' || signUpPass === '') {
            swal.fire({
                icon: 'error',
                text: 'Please fill all fields.'
            });
            return;
        }

        var userList = getUsers();


        var emailExists = false;

        for (var i = 0; i < userList.length; i++) {
            if (userList[i].s_signUpEmail === signUpEmail) {
                emailExists = true;
                break;
            }
        }

        if (emailExists) {
            swal.fire({
                icon: 'warning',
                text: 'This email is already registered. Please log in.'
            });
            return;
        }

        var userData = {
            s_userName: signUpName,
            s_signUpEmail: signUpEmail,
            s_signUpPass: signUpPass,
        }

        userList.push(userData);
        saveUsers(userList);                        ``

        swal.fire({
            icon: 'success',
            text: 'You have been signed up successfully'
        }).then(function () {

            window.location.href = 'login.html';
        });
    });
}

var logOnbutton = document.getElementById('log_button');

if (logOnbutton) {
    logOnbutton.addEventListener('click', function (e) {
        e.preventDefault();

        var loginEmail = document.getElementById('loginEmail').value.trim();
        var loginPass = document.getElementById('loginPass').value;

        if (loginEmail === '' || loginPass === '') {
            swal.fire({
                icon: 'error',
                text: 'Please fill all fields.'
            });
            return;
        }

        var userList = getUsers();

        if (userList.length === 0) {
            swal.fire({
                icon: 'error',
                text: 'No user found, please sign up first.',
            });
            return;
        }


        var foundUser = null;

        for (var i = 0; i < userList.length; i++) {
            if (userList[i].s_signUpEmail === loginEmail && userList[i].s_signUpPass === loginPass) {
                foundUser = userList[i];
                break; 
            }
        }

        if (foundUser) {

            sessionStorage.setItem('loggedInUser', JSON.stringify({ name: foundUser.s_userName }));

            swal.fire({
                icon: 'success',
                text: 'You have logged on',
            }).then(function () {

                window.location.href = 'dashboard.html';
            });
        } else {
            swal.fire({
                icon: 'error',
                text: 'Incorrect email or password.',
            });
        }
    });
}


var logoutButton = document.getElementById('logoutButton');

if (logoutButton) {
    logoutButton.addEventListener('click', function () {

        sessionStorage.removeItem('loggedInUser');

        swal.fire({
            icon: 'success',
            text: 'You have been logged out.',
        }).then(function () {

            window.location.href = 'login.html';
        });
    });
}


var body = document.body;
var bgToggle = document.getElementById('bgToggle');


var savedColor = localStorage.getItem('bgColor');
if (savedColor) {
    body.style.backgroundColor = savedColor;
}


bgToggle.addEventListener('click', function() {
    
    var currentColor = body.style.backgroundColor;

    
    var newColor;
    if (currentColor === 'lightblue') {
        newColor = 'lightyellow';
    } else {
        newColor = 'lightblue';
    }

    
    body.style.backgroundColor = newColor;


    localStorage.setItem('bgColor', newColor);
});
















