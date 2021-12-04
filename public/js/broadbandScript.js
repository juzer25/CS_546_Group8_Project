(function($) {
    let table = document.getElementById('plansTable');
    var plansTable = $('#plansTable');
    $(document).ready(function(){
        plansTable.on('click','.select',function(){
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