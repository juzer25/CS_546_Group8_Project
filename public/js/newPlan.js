let myForm = document.getElementById('newPlan');

let planName;
let price;
let validity;
let limit;
let discount;

if (myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        planName = document.getElementById('planName').value;
        price = document.getElementById('price').value;
        validity = document.getElementById('validity').value;
        limit = document.getElementById('limit').value;
        discount = document.getElementById('discount').value;
        errDiv = document.getElementById("error");
        errDiv.hidden = true;

        if (!planName) {
            errDiv.innerHTML = "PLANNAME cannot be empty";
            errDiv.hidden = false;
            document.getElementById('planName').value = '';
            document.getElementById('planName').focus();
            return;
        }

        if (planName.length < 4) {
            errDiv.innerHTML = "PLANNAME should be of atleast 4 character";
            errDiv.hidden = false;
            document.getElementById('planName').value = '';
            document.getElementById('planName').focus();
            return;
        }

        if (planName.trim().length === 0) {
            errDiv.innerHTML = "PLANNAME cannot be just spaces";
            errDiv.hidden = false;
            document.getElementById('planName').value = '';
            document.getElementById('planName').focus();
            return;
        }

        if (planName.includes(' ')) {
            errDiv.innerHTML = "PLANNAME should not contain spaces";
            errDiv.hidden = false;
            document.getElementById('planName').value = '';
            document.getElementById('planName').focus();
            return;
        }

        let reg = /[ `!@#$%^&*()_=\-=\[\]{};';"\\|,.<>\/?~\n’‘“”—]/g;

        if (reg.test(planName)) {
            errDiv.innerHTML = "Invalid PLANNAME ";
            errDiv.hidden = false;
            document.getElementById('planName').value = '';
            document.getElementById('planName').focus();
            return;
        }

        if (!price) {
            errDiv.innerHTML = "PRICE cannot be empty";
            errDiv.hidden = false;
            document.getElementById('price').value = '';
            document.getElementById('price').focus();
            return;
        }

        if (price.length === 0) {
            errDiv.innerHTML = "PRICE cannot be empty";
            errDiv.hidden = false;
            document.getElementById('price').value = '';
            document.getElementById('price').focus();
            return;
        }

        if (price.trim().length === 0) {
            errDiv.innerHTML = "PRICE cannot be just empty spaces";
            errDiv.hidden = false;
            document.getElementById('price').value = '';
            document.getElementById('price').focus();
            return;
        }

        if (!(/^\d+$/.test(price))) {
            errDiv.innerHTML = "PRICE should only be number";
            errDiv.hidden = false;
            document.getElementById('price').value = '';
            document.getElementById('price').focus();
            return;
        }

        if (!validity) {
            errDiv.innerHTML = "VALIDITY cannot be empty";
            errDiv.hidden = false;
            document.getElementById('validity').value = '';
            document.getElementById('validity').focus();
            return;
        }

        if (validity.length === 0) {
            errDiv.innerHTML = "VALIDITY cannot be empty";
            errDiv.hidden = false;
            document.getElementById('validity').value = '';
            document.getElementById('validity').focus();
            return;
        }

        if (validity.trim().length === 0) {
            errDiv.innerHTML = "VALIDITY cannot be just empty spaces";
            errDiv.hidden = false;
            document.getElementById('validity').value = '';
            document.getElementById('validity').focus();
            return;
        }

        if (!limit) {
            errDiv.innerHTML = "LIMIT cannot be empty";
            errDiv.hidden = false;
            document.getElementById('limit').value = '';
            document.getElementById('limit').focus();
            return;
        }

        if (limit.length === 0) {
            errDiv.innerHTML = "LIMIT cannot be empty";
            errDiv.hidden = false;
            document.getElementById('limit').value = '';
            document.getElementById('limit').focus();
            return;
        }

        if (limit.trim().length === 0) {
            errDiv.innerHTML = "LIMIT cannot be just empty spaces";
            errDiv.hidden = false;
            document.getElementById('limit').value = '';
            document.getElementById('limit').focus();
            return;
        }

        if (!price) {
            errDiv.innerHTML = "PRICE cannot be empty";
            errDiv.hidden = false;
            document.getElementById('price').value = '';
            document.getElementById('price').focus();
            return;
        }

        if (discount.length === 0) {
            errDiv.innerHTML = "DISCOUNT cannot be empty";
            errDiv.hidden = false;
            document.getElementById('discount').value = '';
            document.getElementById('discount').focus();
            return;
        }

        if (discount.trim().length === 0) {
            errDiv.innerHTML = "DISCOUNT cannot be just empty spaces";
            errDiv.hidden = false;
            document.getElementById('discount').value = '';
            document.getElementById('discount').focus();
            return;
        }

        if (!(/^\d{1,2}$/.test(discount))) {
            errDiv.innerHTML = "DISCOUNT should only be number";
            errDiv.hidden = false;
            document.getElementById('discount').value = '';
            document.getElementById('discount').focus();
            return;
        }
        myForm.submit();
    });
}