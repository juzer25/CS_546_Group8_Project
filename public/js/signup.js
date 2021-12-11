let myForm = document.getElementById('signup-form');

let userName;
let password;
let firstName;
let lastName;
let email;
let dob;
let phoneNo;
let addr;
let city;
let state;
let zip;



let errDiv;
if (myForm) {


    myForm.addEventListener('submit', (event) => {
        event.preventDefault();

        userName = document.getElementById('userName').value;
        password = document.getElementById('password').value;
        firstName = document.getElementById('firstName').value;
        lastName = document.getElementById('lastName').value;
        email = document.getElementById('email').value;
        dob = document.getElementById('dob').value;
        phoneNo = document.getElementById('phoneNo').value;
        addr = document.getElementById('addr').value;
        city = document.getElementById('city').value;
        state = document.getElementById('state').value;
        zip = document.getElementById('zip').value;
        errDiv = document.getElementById("error");
        errDiv.hidden = true;
        if (!userName) {
            //l1 = document.getElementById('1');
            errDiv.innerHTML = "Please Enter valid userName";
            errDiv.hidden = false;
            document.getElementById('userName').value = '';
            document.getElementById('userName').focus();
            return;
        }

        if (userName.length < 4) {
            //let l1 = document.getElementById('1');
            errDiv.innerHTML = "Please Enter valid userName. Username should have more than 4 characters";
            errDiv.hidden = false;
            document.getElementById('userName').value = '';
            document.getElementById('userName').focus();
            return;
        }
        if (userName.trim().length === 0) {
            //let l1 = document.getElementById('1');
            errDiv.innerHTML = "Please Enter valid userName";
            errDiv.hidden = false;
            document.getElementById('userName').value = '';
            document.getElementById('userName').focus();
            return;
        }
        let reg = /[ `!@#$%^&*()_=\-=\[\]{};';"\\|,.<>\/?~\n’‘“”—]/g;
        if (reg.test(userName)) {
            //let l1 = document.getElementById('1');
            errDiv.innerHTML = "Please Enter valid userName. Username should not contain speacial characters";
            errDiv.hidden = false;
            document.getElementById('userName').value = '';
            document.getElementById('userName').focus();
            return;
        }

        if (!password) {
            //let l = document.getElementById('2');
            errDiv.innerHTML = "Please provide a password";
            errDiv.hidden = false;
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
            return;

        }
        if (password.length < 6) {
            //let l = document.getElementById('2');
            errDiv.innerHTML = "Password should have more than 6 characters";
            errDiv.hidden = false;
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
            return;

        }
        if (password.trim().length === 0) {
            //let l = document.getElementById('2');
            errDiv.innerHTML = "Please provide a password";
            errDiv.hidden = false;
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
            return;

        }
        if (password.includes(' ')) {
            //let l = document.getElementById('2');
            errDiv.innerHTML = "Please provide a valid password";
            errDiv.hidden = false;
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
            return;

        }

        if (!firstName) {
            //let l = document.getElementById('3');
            errDiv.innerHTML = "Please provide firstName";
            errDiv.hidden = false;
            document.getElementById('firstName').value = '';
            document.getElementById('firstName').focus();
            return;
        }
        if (firstName.length === 0) {
            //let l = document.getElementById('3');
            errDiv.innerHTML = "Please provide firstName";
            errDiv.hidden = false;
            document.getElementById('firstName').value = '';
            document.getElementById('firstName').focus();
            return;
        }
        if (firstName.trim().length === 0) {
            //let l = document.getElementById('3');
            errDiv.innerHTML = "Please provide firstName";
            errDiv.hidden = false;
            document.getElementById('firstName').value = '';
            document.getElementById('firstName').focus();
            return;
        }
        if (!lastName) {
            //let l = document.getElementById('4');
            errDiv.innerHTML = "Please provide lastName";
            errDiv.hidden = false;
            document.getElementById('lastName').value = '';
            document.getElementById('lastName').focus();
            return;
        }
        if (!lastName.length === 0) {
            //let l = document.getElementById('4');
            errDiv.innerHTML = "Please provide lastName";
            errDiv.hidden = false;
            document.getElementById('lastName').value = '';
            document.getElementById('lastName').focus();
            return;
        }
        if (!lastName.trim().length === 0) {
            //let l = document.getElementById('4');
            errDiv.innerHTML = "Please provide lastName";
            errDiv.hidden = false;
            document.getElementById('lastName').value = '';
            document.getElementById('lastName').focus();
            return;
        }
        if (!email) {
            //let l = document.getElementById('5');
            errDiv.innerHTML = "Please provide an email";
            errDiv.hidden = false;
            document.getElementById('email').value = '';
            document.getElementById('email').focus();
            return;
        }
        if (email.length === 0) {
            //let l = document.getElementById('5');
            errDiv.innerHTML = "Please provide an email";
            errDiv.hidden = false;
            document.getElementById('email').value = '';
            document.getElementById('email').focus();
            return;
        }
        if (email.trim().length === 0) {
            //let l = document.getElementById('5');
            errDiv.innerHTML = "Please provide an email";
            errDiv.hidden = false;
            document.getElementById('email').value = '';
            document.getElementById('email').focus();
            return;
        }
        //emailReg = /^[a-zA-Z0-9][(-._|a-zA-Z0-9)]+@[(.com|.org|.edu)]$]/;
        emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailReg.test(email)) {
            //let l = document.getElementById('5');
            errDiv.innerHTML = "Please provide a valid email";
            errDiv.hidden = false;
            document.getElementById('email').value = '';
            document.getElementById('email').focus();
            return;
        }

        if (!dob) {
            //let l = document.getElementById('6');
            errDiv.innerHTML = "Please provide date of birth";
            errDiv.hidden = false;
            document.getElementById('dob').value = '';
            document.getElementById('dob').focus();
            return;
        }
        if (dob.length === 0) {
            //let l = document.getElementById('6');
            errDiv.innerHTML = "Please provide date of birth";
            errDiv.hidden = false;
            document.getElementById('dob').value = '';
            document.getElementById('dob').focus();
            return;
        }
        if (dob.trim().length === 0) {
            //let l = document.getElementById('6');
            errDiv.innerHTML = "Please provide date of birth";
            errDiv.hidden = false;
            document.getElementById('dob').value = '';
            document.getElementById('dob').focus();
            return;
        }
        //let dob1 = dob 
        //dob1 = dob1.split("-").reverse().join("-");
        d1 = new Date(dob + " 00:00:00");
        d2 = new Date();
        diffDate = d2.getFullYear() - d1.getFullYear();
        if (d1 > d2 || d1 === d2) {
            //let l = document.getElementById('6');
            errDiv.innerHTML = "Please provide a valid date of birth";
            errDiv.hidden = false;
            document.getElementById('dob').value = '';
            document.getElementById('dob').focus();
            return;
        }

        if (diffDate < 18) {
            //let l = document.getElementById('6');
            errDiv.innerHTML = "Please provide a valid date of birth. User should be of age 18 or more";
            errDiv.hidden = false;
            document.getElementById('dob').value = '';
            document.getElementById('dob').focus();
            return;
        }

        if (!phoneNo) {
            //let l = document.getElementById('7');
            errDiv.innerHTML = "Please provide a phone no.";
            errDiv.hidden = false;
            document.getElementById('phoneNo').value = '';
            document.getElementById('phoneNo').focus();
            return;
        }
        if (phoneNo.length === 0) {
            //let l = document.getElementById('7');
            errDiv.innerHTML = "Please provide a phone no.";
            errDiv.hidden = false;
            document.getElementById('phoneNo').value = '';
            document.getElementById('phoneNo').focus();
            return;
        }
        if (phoneNo.trim().length === 0) {
            //let l = document.getElementById('7');
            errDiv.innerHTML = "Please provide a phone no.";
            errDiv.hidden = false;
            document.getElementById('phoneNo').value = '';
            document.getElementById('phoneNo').focus();
            return;
        }
        let val = /[0-9]{3}\-[0-9]{3}\-[0-9]{4}/;
        if (!val.test(phoneNo)) {
            ///// let l = document.getElementById('7');
            errDiv.innerHTML = "Please provide a valid phone no. Format - XXX-XXX-XXXX";
            errDiv.hidden = false;
            document.getElementById('phoneNo').value = '';
            document.getElementById('phoneNo').focus();
            return;
        }

        if (!addr) {
            //let l = document.getElementById('8');
            errDiv.innerHTML = "Please provide an address";
            errDiv.hidden = false;
            document.getElementById('addr').value = '';
            document.getElementById('addr').focus();
            return;
        }
        if (addr.length === 0) {
            //let l = document.getElementById('8');
            errDiv.innerHTML = "Please provide an address";
            errDiv.hidden = false;
            document.getElementById('addr').value = '';
            document.getElementById('addr').focus();
            return;
        }
        if (addr.trim().length === 0) {
            //// let l = document.getElementById('8');
            errDiv.innerHTML = "Please provide an address";
            errDiv.hidden = false;
            document.getElementById('addr').value = '';
            document.getElementById('addr').focus();
            return;
        }

        if (!city) {
            //let l = document.getElementById('9');
            errDiv.innerHTML = "Please provide city";
            errDiv.hidden = false;
            document.getElementById('city').value = '';
            document.getElementById('city').focus();
            return;
        }
        if (city.length === 0) {
            // let l = document.getElementById('9');
            errDiv.innerHTML = "Please provide city";
            errDiv.hidden = false;
            document.getElementById('city').value = '';
            document.getElementById('city').focus();
            return;
        }
        if (city.trim().length === 0) {
            //let l = document.getElementById('9');
            errDiv.innerHTML = "Please provide city";
            errDiv.hidden = false;
            document.getElementById('city').value = '';
            document.getElementById('city').focus();
            return;
        }
        if (!state) {
            //let l = document.getElementById('10');
            errDiv.innerHTML = "Please provide state";
            errDiv.hidden = false;
            document.getElementById('state').value = '';
            document.getElementById('state').focus();
            return;
        }
        if (state.length === 0) {
            ////let l = document.getElementById('10');
            errDiv.innerHTML = "Please provide state";
            errDiv.hidden = false;
            document.getElementById('state').value = '';
            document.getElementById('state').focus();
            return;
        }
        if (!state.trim().length === 0) {
            //let l = document.getElementById('10');
            errDiv.innerHTML = "Please provide state";
            errDiv.hidden = false;
            document.getElementById('state').value = '';
            document.getElementById('state').focus();
            return;
        }
        if (!zip) {
            //let l = document.getElementById('11');
            errDiv.innerHTML = "Please provide zipcode";
            errDiv.hidden = false;
            document.getElementById('zip').value = '';
            document.getElementById('zip').focus();
            return;
        }
        if (zip.length === 0) {
            //// let l = document.getElementById('11');
            errDiv.innerHTML = "Please provide zipcode";
            errDiv.hidden = false;
            document.getElementById('zip').value = '';
            document.getElementById('zip').focus();
            return;
        }
        if (zip.trim().length === 0) {
            //let l = document.getElementById('11');
            errDiv.innerHTML = "Please provide zipcode";
            errDiv.hidden = false;
            document.getElementById('zip').value = '';
            document.getElementById('zip').focus();
            return;
        }
        zipReg = /\d{5}/;

        if (!zipReg.test(zip)) {
            //let l = document.getElementById('11');
            errDiv.innerHTML = "Please provide a valid zipcode. Format XXXXX";
            errDiv.hidden = false;
            document.getElementById('zip').value = '';
            document.getElementById('zip').focus();
            return;
        }

        myForm.submit();
    });


}