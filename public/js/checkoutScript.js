(function($) {
    var myForm = $('#myForm'),
        userName = $('userName'),
        planName=$('#planName'),
        price=$('#price'),
        validity=$('#validity'),
        limit=$('#limit'),
        discount=$('#discount'),
        cardTyp = $('#cars'),
        cardname = $('#cname'),
        cardNo = $('#ccnum'),
        expMonth = $('#expmonth'),
        expYear = $('#expyear'),
        cvv=$('#cvv');


    myForm.submit(function(event){
        event.preventDefault();
        var dataVal = {
            "userName":userName.val(),
            "planName":planName.val(),
            "cardDetails":{
                "nameOfCardHolder":cardname.val(),
                "cardNumber":cardNo.val(),
                "expirationDate":expMonth.val()+"/"+expYear.val(),
                "cardType":cardTyp.val()
            }
        }
        var requestConfig = {
            
            method: 'PUT',
            url:  '/users/checkout',
            contentType: 'application/json',
            data: JSON.stringify(dataVal) 
        }
        $.ajax(requestConfig).then(function(responseMessage){
            if(responseMessage.success){
                window.location = '/checkout/bill';
            }
            else{
                window.location = '/broadband/broadbandPlans';
            }
        });
    });

})(window.jQuery);