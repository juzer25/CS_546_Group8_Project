(function($) {
    var errDiv = document.getElementById('error');
    let usname = document.getElementById('userName');
    let cards = document.getElementById('cars');
    let nameofCH = document.getElementById('cname');
    let cardnum = document.getElementById('ccnum');
    let month = document.getElementById('expmonth');
    let year = document.getElementById('expyear');
    let cardcvv = document.getElementById('cvv');
    var myForm = $('#myForm')
    myForm.submit(function(event) {
        event.preventDefault();


        var userName = $('#username').val(),
            planName = $('#planName').val(),
            price = $('#price'),
            validity = $('#validity'),
            limit = $('#limit'),
            discount = $('#discount'),
            cardTyp = $('#cars').val(),
            cardname = $('#cname').val(),
            cardNo = $('#ccnum').val(),
            expMonth = $('#expmonth').val(),
            expYear = $('#expyear').val(),
            cvv = $('#cvv').val();

        errDiv.hidden = true;
        if (!userName) {
            errDiv.innerHTML = "Please provide username";
            errDiv.hidden = false;
            usname.focus();
            return;
        }

        if (!planName) {
            errDiv.innerHTML = "Please provide plan name";
            errDiv.hidden = false;
            planName.focus();
            return;
        }

        if (!cardTyp) {
            errDiv.innerHTML = "Please provide card type";
            errDiv.hidden = false;
            cards.focus();
            return;
        }

        if (!cardname) {
            errDiv.innerHTML = "Please provide name of card holder";
            errDiv.hidden = false;
            nameofCH.focus();
            nameofCH.value = '';
            return;
        }
        if (!cardNo) {
            errDiv.innerHTML = "Please provide card no.";
            errDiv.hidden = false;
            cardnum.focus();
            cardnum.value = '';
            return;
        }

        if (cardNo.length === 0) {
            errDiv.innerHTML = "Please provide card no.";
            errDiv.hidden = false;
            cardnum.focus();
            cardnum.value = '';
            return;
        }

        if (cardNo.trim().length === 0) {
            errDiv.innerHTML = "Please provide card no.";
            errDiv.hidden = false;
            cardnum.focus();
            cardnum.value = '';
            return;
        }

        if (cardNo.length !== 16) {
            errDiv.innerHTML = "Please provide valid  card no.";
            errDiv.hidden = false;
            cardnum.focus();
            cardnum.value = '';
            return;
        }

        var regNo = /[0-9]{16}/;
        if (!regNo.test(cardNo)) {
            errDiv.innerHTML = "Please provide valid  card no.";
            errDiv.hidden = false;
            cardnum.focus();
            cardnum.value = '';
            return;
        }


        if (!expMonth) {
            errDiv.innerHTML = "Please provide card expiration month";
            errDiv.hidden = false;
            month.focus();
            month.value = '';
            return;
        }


        if (expMonth.length === 0) {
            errDiv.innerHTML = "Please provide a card expiry Month";
            errDiv.hidden = false;
            month.focus();
            month.value = '';
            return;
        }
        if (expMonth.trim().length === 0) {
            errDiv.innerHTML = "Please provide a card expiry Month";
            errDiv.hidden = false;
            month.focus();
            month.value = '';
            return;
        }
        if (expMonth.length !== 2) {
            errDiv.innerHTML = "Please provide a valid expiry Month";
            errDiv.hidden = false;
            month.focus();
            month.value = '';
            return;
        }


        var regDate = /^\d{2}$/;
        if (!regDate.test(expMonth)) {
            errDiv.innerHTML = "Please provide a valid expiry Month";
            errDiv.hidden = false;
            month.focus();
            month.value = '';
            return;
        }
        if (typeof parseInt(expMonth) !== 'number') {
            errDiv.innerHTML = "Please provide a valid expiry Month";
            errDiv.hidden = false;
            month.focus();
            month.value = '';
            return;
        }

        if (expMonth > 12) {
            errDiv.innerHTML = "Please provide a valid expiry Month";
            errDiv.hidden = false;
            month.focus();
            month.value = '';
            return;
        }

        if (!expYear) {
            errDiv.innerHTML = "Please provide card expiration year";
            errDiv.hidden = false;
            year.focus();
            year.value = '';
            return;
        }

        if (expYear.trim().length === 0) {
            errDiv.innerHTML = "Please provide card expiration year";
            errDiv.hidden = false;
            year.focus();
            year.value = '';
            return;
        }
        if (expYear.length !== 2) {
            errDiv.innerHTML = "Please provide a valid card expiration year";
            errDiv.hidden = false;
            year.focus();
            year.value = '';
            return;;
        }

        if (!regDate.test(expYear)) {
            errDiv.innerHTML = "Please provide a valid card expiration year";
            errDiv.hidden = false;
            year.focus();
            year.value = '';
            return;
        }

        if (typeof parseInt(expYear) !== 'number') {
            errDiv.innerHTML = "Please provide a valid card expiration year";
            errDiv.hidden = false;
            year.focus();
            year.value = '';
            return;;
        }

        let CurrentDate = new Date();
        let currMonthStr = CurrentDate.getMonth().toString();
        currMonthStr = parseInt(currMonthStr) + 1;
        currMonthStr = currMonthStr.toString();
        let currYearStr = CurrentDate.getFullYear().toString();
        let expirationYearFourDigit = "20";

        if (expYear.length === 2) {
            expirationYearFourDigit = expirationYearFourDigit + expYear;
        }
        
        if (expirationYearFourDigit < currYearStr) {
            errDiv.innerHTML = "You card has been expired. Please use different card for payment";
            errDiv.hidden = false;
            year.focus();
            year.value = '';
            return;
        } else if (parseInt(expirationYearFourDigit) > parseInt(currYearStr) + 10) {
            errDiv.innerHTML = "Please use different card for payment. This card seems ambitious";
            errDiv.hidden = false;
            year.focus();
            year.value = '';
            return;
        }
        
        if (expirationYearFourDigit == currYearStr && expirationMonth < currMonthStr) {
            errDiv.innerHTML = "You card has been expired. Please use different card for payment";
            errDiv.hidden = false;
            month.focus();
            month.value = '';
            return;
        }
       

        if (!cvv) {
            errDiv.innerHTML = "Please provide cvv";
            errDiv.hidden = false;
            cardcvv.focus();
            cardcvv.value = '';
            return;
        }

        if (cvv.length !== 3) {
            errDiv.innerHTML = "Please provide a valid cvv";
            errDiv.hidden = false;
            cardcvv.focus();
            cardcvv.value = '';
            return;
        }

        if (cvv.trim().length === 0) {
            errDiv.innerHTML = "Please provide a valid cvv";
            errDiv.hidden = false;
            cardcvv.focus();
            cardcvv.value = '';
            return;
        }

        var regCvv = /^\d{3}$/;
        if (!regCvv.test(cvv)) {
            errDiv.innerHTML = "Please provide a valid cvv";
            errDiv.hidden = false;
            cardcvv.focus();
            cardcvv.value = '';
            return;
        }
        var dataVal = {
            "userName": userName,
            "planName": planName,
            "cardDetails": {
                "nameOfCardHolder": cardname,
                "cardNumber": cardNo,
                "expirationMonth": expMonth,
                "expirationYear": expYear,
                "cardType": cardTyp
            }
        }
        var requestConfig = {

            method: 'PUT',
            url: '/users/checkout',
            contentType: 'application/json',
            data: JSON.stringify(dataVal),

        }
        $.ajax(requestConfig).then(function(responseMessage) {
            if (responseMessage.success) {
                window.location = '/checkout/bill';
            } else {
                window.location = '/error';
            }
        });
    });

})(window.jQuery);