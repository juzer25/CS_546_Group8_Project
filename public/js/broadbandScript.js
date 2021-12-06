(function($) {
    let table = document.getElementById('plansTable');
    
    var plansTable = $('#plansTable'),
        userType = $('.userType');
    $(document).ready(function(){
        plansTable.on('click','.select',function(){
            console.log(userType.text().toString())
            if(userType.text() === 'admin'){
                return;
            }

            if(userType.text() === 'guest'){
                window.location = '/users/login';
                return ;
            }
            var currentRow = $(this).closest('tr');

            var col1 = currentRow.find('#planName').html();
            var col2 = currentRow.find('#price').html();
            var col3 = currentRow.find('#validity').html();
            var col4 = currentRow.find('#limit').html();
            var col5 = currentRow.find('#discount').html();

            console.log(col1);

            window.location = 'subscribe/'+col1;
        });
    });
})(window.jQuery);