let myForm = document.getElementById('login-form');

let userName;
let password;
let errDiv
if (myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        userName = document.getElementById('userName').value;
        password = document.getElementById('password').value;
        errDiv = document.getElementById("error");
        errDiv.hidden = true;

        if (!userName) {
            errDiv.innerHTML = "Either username or password is invalid";
            errDiv.hidden = false;
            document.getElementById('userName').value = '';
            document.getElementById('userName').focus();
            return;
        }

        if (userName.length < 4) {
            errDiv.innerHTML = "Either username or password is invalid";
            errDiv.hidden = false;
            document.getElementById('userName').value = '';
            document.getElementById('userName').focus();
            return;
        }

        if (userName.trim().length === 0) {
            errDiv.innerHTML = "Either username or password is invalid";
            errDiv.hidden = false;
            document.getElementById('userName').value = '';
            document.getElementById('userName').focus();
            return;
        }

        if (userName.includes(' ')) {
            errDiv.innerHTML = "Either username or password is invalid";
            errDiv.hidden = false;
            document.getElementById('userName').value = '';
            document.getElementById('userName').focus();
            return;
        }

        let reg = /[ `!@#$%^&*()_=\-=\[\]{};';"\\|,.<>\/?~\n’‘“”—]/g;

        if (reg.test(userName)) {
            errDiv.innerHTML = "Either username or password is invalid";
            errDiv.hidden = false;
            document.getElementById('userName').value = '';
            document.getElementById('userName').focus();
            return;
        }

        if (!password) {
            errDiv.innerHTML = "Either username or password is invalid";
            errDiv.hidden = false;
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
            return;
        }

        if (password.length === 0) {
            errDiv.innerHTML = "Either username or password is invalid";
            errDiv.hidden = false;
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
            return;
        }

        if (password.trim().length === 0) {
            errDiv.innerHTML = "Either username or password is invalid";
            errDiv.hidden = false;
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
            return;
        }

        if (password.length < 6) {
            errDiv.innerHTML = "Either username or password is invalid";
            errDiv.hidden = false;
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
            return;
        }

        myForm.submit();
    });
}