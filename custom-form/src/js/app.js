// Timer
$.fn.countdown = function(milliseconds, callback) {
    var $el = this;
    var buffer = 10;
    var end, timer;

    milliseconds = milliseconds || 5 * 60 * 1000; // 5 minutes
    end = new Date(Date.now() + milliseconds + buffer)
    tick();
    function formatTime(time){
        minutes = time.getMinutes();
        seconds = time.getSeconds();
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }
        return minutes + ":" + seconds;
    }
    function tick() {
        var remaining = new Date(end - Date.now());

        if (remaining > 0) {
            $el.html(formatTime(remaining));
            timer = setTimeout(tick, 1000);
        } else {
            clearInterval(timer);
            if (callback) callback.apply($el);
        }
    };
};

$('#timer').countdown(30 * 1000, function(){
    this.html("00:00");
    if ('parentIFrame' in window) window.parentIFrame.sendMessage('timeout');return false;
});

// Form
var formWrap = $('#clp-form'),
    form     = formWrap.find('#regiform'),
    url      = form.attr("action"),
    method   = form.attr("method");

$('#clp-form [class*="submit"]').on('click', function(){
    var _   = $(this),
        arr = [],
        cnt = 0;

    _.blur();

    // Validation
    $('#regiform').find('[required]').each(function(i){
        var _  = $(this),
            gr = $('.form-group'),
            el = $('[id='+_.attr('id')+']'),
            tg = el.closest(gr),
            er = 'error';

        if(!_.val()) {
            var pos;
            cnt++;
            pos = cnt - 1;
            arr[pos] = _.attr('name');
            var msg = _.data('error-msg');
            tg.addClass(er).find('.error-msg').html(msg);
            el.keyup(function(){
                if(_.val().length > 0){
                    tg.removeClass(er).find('.error-msg').html('');
                }else if(_.val().length < 1){
                    tg.addClass(er).find('.error-msg').html(msg);
                }
            });
            $('select').on('change', function(){
                var _ = $(this),
                    vl = _.find("option:selected").val(),
                    gr = _.closest('.form-group');
                if(vl.length < 1) {
                    gr.addClass(er).find('.error-msg').html(msg);
                }
                if(vl.length > 0) {
                    gr.removeClass(er).find('.error-msg').html('');
                }
            });
            
        }else {
            tg.removeClass(er).find('.error-msg').html('');
        }
    });

    $('#regiform').find('[type=checkbox]').each(function () {
        var _  = $(this),
            gr = $('.form-group'),
            el = $('[id='+_.attr('id')+']'),
            tg = el.closest(gr),
            er = 'error';
        
        if(_.prop('checked')) {
            console.log("Checked Box Selected");
        } else {
            cnt++;
            var msg = _.data('error-msg');
            tg.addClass(er).find('.error-msg').html(msg);
            console.log("Checked Box deselect");
        }

        _.on('change', function () {
            if (_.prop('checked')) {
                tg.removeClass(er).find('.error-msg').html('');
            } else {
                tg.addClass(er).find('.error-msg').html(msg);
            }
        });
    });
    
    function getFormData(form){
        var originData = form.serializeArray();
        var exportData = {};
        $.map(originData, function(n, i){
            exportData[n['name']] = n['value'];
        });
        return exportData;
    }

    //console.log(cnt);
    if(cnt < 1) {
        var form = $("#regiform"),
            data = getFormData(form);
        
        $.ajax({
            url : url,
            type: method,
            data: JSON.stringify(data),
            cache: false,
            contentType: false,
            processData: false,
            
        }).done(function(data){ 
            form[0].reset();
        })
    }else{
        $('[id='+arr[0]+']').focus();
    }
});