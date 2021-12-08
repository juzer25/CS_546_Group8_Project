(function($) {
    let table = document.getElementById('plansTable');
    
    var plansTable = $('#plansTable');
        
    $(document).ready(function(){
        plansTable.on('click','.select',function(){
            
            var currentRow = $(this).closest('tr');

            var col1 = currentRow.find('#planName').html();
            
            var col2 = currentRow.find('#validity').html();
            var col3 = currentRow.find('#limit').html();
            var dataVal = {
                "planName" : col1
            }
            var requestConfig = {
                method:'POST',
                url: '/users/removePlan',
                contentType: 'application/json',
                data: JSON.stringify(dataVal) 
            }
            $.ajax(requestConfig).then(function(responseMessage){
                if(responseMessage.success){
                    window.location = '/users/profile/myPlans';
                }
            });

            //window.location = 'subscribe/'+col1;
        });
    });
})(window.jQuery);