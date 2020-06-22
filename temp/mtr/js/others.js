// NOTE: Other Common Function
$(function(){
    
    // QR Code - jQuer code 
    // https://larsjung.de/jquery-qrcode/latest/demo/
    /*
    var qr = (function(){
        var init = function(){
            generate();
        },
        generate = function(){
            $('.btn-gen-qr').on('click', function(){
                var qrtext = $(this).data('qr');
                $('#qrcode').qrcode({render:'image',text:qrtext})
            })
        }
        return {
            qr : init
        }   
    })().qr();
    */

    // Like Button
    $(".inc-like-btn").submit(function(e) {
        if ($.cookie("")) {
            alert('already cliked like button');
            return false;
        }
        
        $.ajax({
            type : 'POST',
            url  : $(this).attr('action'),
            data : $(this).serialize(),
            dataType :'json',
            success : function(data) {
                alert(data.msg);
            }
        });
        
        e.preventDefault();
    });
})