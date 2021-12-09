//var trial = require('bcrypt');
//var saltRounds = 16;
(function($) {
    let table = document.getElementById('plansTable');
    
    var plansTable = $('#plansTable'),
        userType = $('.userType');

    function b2a(a) {
            var c, d, e, f, g, h, i, j, o, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", k = 0, l = 0, m = "", n = [];
            if (!a) return a;
            do c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), j = c << 16 | d << 8 | e, 
            f = 63 & j >> 18, g = 63 & j >> 12, h = 63 & j >> 6, i = 63 & j, n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i); while (k < a.length);
            return m = n.join(""), o = a.length % 3, (o ? m.slice(0, o - 3) :m) + "===".slice(o || 3);
    }    
    
    let btnClicked = false;
    $(document).ready(function(){
        plansTable.on('click','.select',function(){
            btnClicked = true;
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
            if(btnClicked){
                //let hashed =  bcrypt.hash(btnClicked,saltRounds);
                //console.log();
                window.location = 'subscribe/'+col1+'?val='+b2a(''+btnClicked+'');;
            }
            
        });
    });
})(window.jQuery);