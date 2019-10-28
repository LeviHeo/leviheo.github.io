// Project list Data
var projectList = (function () {
    var projectList = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "src/project/project.json",
        'dataType': "json",
        'success': function (data) {
            projectList = data;
        }
    });
    return projectList;
})();

// Project thumbnail Temp
var thumb = "";
var pagenavi = '<div class="pagenavi-inner">';
for (var i in projectList.project) {
    thumb += '<a href="javascript:;" class="lh-img-thumb has-detail" data-idx="'+ projectList.project[i].idx +'" data-cla-id="'+ projectList.project[i].client + '" data-pj-id="' + projectList.project[i].projectId + '" data-thumb-img="./src/project/' + projectList.project[i].client + '/' + projectList.project[i].projectId + '/thumb.jpg" data-thumb-tit="' + projectList.project[i].projectTitle + '"></a>';
    pagenavi += '<div class="pagenavi-item" data-idx="'+projectList.project[i].idx+'"><div></div></div>';
}
pagenavi += "</div>";
$("#lh-project").html(thumb);
$('#lh-pj-navi').html(pagenavi);

// Popup Detail Temp
function detailPopup(id) {
    var tempPopup = "";
    $.each(projectList.project, function(){
        if(this.projectId == id) {
            tempPopup+=
            '<div class="lh-popup" data-idx="'+this.idx+'" data-cla-id="'+this.client+'" data-pj-id="'+this.projectId+'">'+
            '    <div class="lh-popup_inner">'+
            '            <div class="lh-pj-close"><div class="lh-pj-close-inner"><div></div><div></div></div></div>'+
            '            <div class="lh-pj-header" data-aos="fade-in" data-aos-delay="500" data-aos-duration="3000" data-desk-img="./src/project/'+this.client+'/'+this.projectId+'/header.jpg" data-mobile-img="./src/project/'+this.client+'/'+this.projectId+'/header_m.jpg"></div>'+
            '            <div class="lh-pj-content">'+
            '                <div class="pj-content_wrap">'+
            '                    <div class="content_inner">' +
            '                       <div class="pj-content_tit">'+
            '                           <h3 data-aos="fade-up" data-aos-delay="1000" data-aos-duration="1000">' + this.projectTitle + '</h3>' +
            '                           <div class="pj-content_type" data-aos="fade-up" data-aos-delay="1200" data-aos-duration="1000">' + this.projectDate + ' | ' + this.projectType + '</div>' +
            '                       </div>' +
            '                       <div id="content-anchor" class="pj-content_arti" data-aos="fade-up" data-aos-delay="1500" data-aos-duration="1000">'+
            '                       </div>';
                                    if (this.projectSkill != 0) {
                                        tempPopup += '<div class="pj-content_skill" data-aos="fade-up" data-aos-delay="2000" data-aos-anchor="#content-anchor" data-aos-duration="1000">';
                                            $.each(this.projectSkill, function (i, skills) {
                                                tempPopup +=
                                                '<div class="item_skills ico_'+skills+'" title="'+skills+'"><span class="sound-only">'+skills+'</span></div>';
                                            });
                                        tempPopup += '</div>';
                                    }
                                tempPopup +=
            '                    </div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="lh-pj-footer">'+
            '                <div class="content_inner">' +
            '                   <div class="foot-left">';
                                if((this.idx-1) != 0){
                                    tempPopup+= '<a href="javascript:;" class="lh-btn-encased-sm btn-go-item" data-way="prev" data-idx="'+(this.idx-1)+'" ><i class="icon-left-open view767"></i><span class="br767">PREV</span></a>&nbsp;';
                                }
                                if((this.idx+1) <= projectList.project.length){
                                    tempPopup+= '<a href="javascript:;" class="lh-btn-encased-sm btn-go-item" data-way="next" data-idx="'+(this.idx+1)+'" ><span class="br767">NEXT</span><i class="icon-right-open view767"></i></a>';
                                }
                                tempPopup+=
            '                    &nbsp;</div>';
                                tempPopup+=
            '                    <div class="foot-right"><a href="'+this.launchUrl+'" class="lh-btn-encased-sm btn-ar-r" target="_blank">Launch Project</a></div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="lh-pj-content-bg"></div>'+
            '    </div>'+
            '</div>'
        }
    });
    $('body').append(tempPopup);
}

// Contact Form
var date = new Date(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    now = date.getFullYear() + (month < 10 ? '0' : '') + month + (day < 10 ? '0' : '') + day;

var formWrap = $('#lh-contact'),
    form = formWrap.find('#contact'),
    url = form.attr("action"),
    method = form.attr("method");

$('#lh-contact button').on('click', function(){
    var _ = $(this),
        arr = [],
        cnt = 0;
    _.blur();

    // Form Validation
    $('#lh-contact').find('[required]').each(function(i){
        var _ = $(this),
            gr = $('.lh-form-group'),
            el = $('[id='+_.attr('id')+']'),
            tg = el.closest(gr),
            er = 'error';

        if(_.val().length < 1) {
            cnt++;
            var pos = cnt - 1;
            arr[pos] = _.attr('name');
            tg.addClass(er);
            el.keyup(function(){
                if(_.val().length > 0){
                    tg.removeClass(er);
                }else if(_.val().length < 1){
                    tg.addClass(er);
                }
            });
        }else {
            tg.removeClass(er);
        }
    });
    
    if(cnt < 1) {
        $('input[name=sendtime]').val(date);
        msg('sending', 'Sending', formWrap, 'loading');
        formWrap.addClass('progress');
        formWrap.find('button').addClass('progress');
        var formData = new FormData(form[0]);
        $.ajax({
            url : url,
            type: method,
            data : formData,
            cache: false,
            contentType: false,
            processData:false,
        }).done(function(response){ 
            form[0].reset();
            $('.lh-msg').fadeOut(300, function(){
                $(this).remove();
            });
            msg('thx', 'Thanks for contacting me!<br/> I will get back to you soon!', formWrap, 'text');
            formWrap.removeClass('progress');
            formWrap.find('button').removeClass('progress');
        });
    }else{
        $('[id='+arr[0]+']').focus();
    }
});

// Thumbnail 
function aniThumb(){
    $('.lh-img-thumb').each(function(){
        var _ = $(this),
            blockR = 5, 
            blockH = _.outerHeight() / blockR,
            blockW = _.outerWidth() / blockR,
            block = "",
            title = "",
            max = blockR*blockR,
            txt = _.data('thumb-tit'),
            bg = _.data('thumb-img');
        
        _.html("");
        block += "<div class=\"thumb_img\">";
        for (var i = 0; i < max; i++) {
            block += "<div data-block=\""+(i+1)+"\" style=\"background-image: url("+bg+");background-size:"+(blockR*100)+"% "+(blockR*100)+"%;width:"+blockW+"px;height:"+blockH+"px;\"></div>";
        }
        block += "</div>";
        _.append(block);

        title += "<div class=\"thumb_tit\"><div>"+txt+"<div class=\"thumb_subtit\">S&nbsp;&nbsp;e&nbsp;&nbsp;e&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;a&nbsp;&nbsp;s&nbsp;&nbsp;e</div></div></div>";
        _.append(title);

        for (var c = 0; c < blockR+1; c++) {
            for (var i = 0; i < blockR; i++) {
                var dis = (i*blockR) + c;
                var leftDis = blockW*(c-1);
                var topDis = blockH*i;
                _.find('[data-block]:nth-child('+dis+')').css(
                    {
                        'top': topDis,
                        'left': leftDis,
                        'background-position': '-'+leftDis+'px -'+topDis+'px',
                    }
                );
            }
        }
    });
}

// Popup detail
function popup(c) {
    detailPopup(c);
    popupHeaderImg();
    popupDetailContent(c)
    var target = $('.lh-popup[data-pj-id="'+ c +'"]'),
        body = $('body');
    body.css('overflow', 'hidden');
    target.fadeIn(500);
    projectClose();
    btnNextPrev();
    AOS.init();
}

function popupOpen(c, x){
    popup(c);
    pageNavi(x);
    var mask = $('.lh-dimmed');
    mask.fadeIn(500);
    var panvi = $('#lh-pj-navi');
    panvi.addClass('on');
}

function btnNextPrev() {
    $('.btn-go-item').on('click', function () {
        var _ = $(this),
            way = _.data('way'),
            id = _.closest('.lh-popup').data('pj-id'),
            currentPopup = $('.lh-popup[data-pj-id="' + id + '"]'),
            nextPopupIdx = _.data('idx');
        
        if (way == "next") {
            currentPopup.addClass('go-transition go-next');        
        }

        if (way == "prev") {
            currentPopup.addClass('go-transition go-prev');        
        }

        setTimeout(function () {
            currentPopup.remove();
        }, 300);

        var target;
        $.each(projectList.project, function () {
            if (this.idx == nextPopupIdx) {
                target = this.projectId;
            }
            return target;
        });

        setTimeout(function () {
            popup(target);
            pageNavi(nextPopupIdx);
        }, 300);
    });
}

function btnNextPrevPageNav() {
    $('.pagenavi-item').on('click', function () {
        if (!$(this).hasClass('active')) {
            var _ = $(this),
                cidx = $('.pagenavi-item.active').data('idx'),
                idx = _.data('idx'),
                currentPopup = $('.lh-popup[data-idx='+cidx+']');
            
            if (idx > cidx) {
                currentPopup.addClass('go-transition go-next');  
            }

            if (idx < cidx) {
                currentPopup.addClass('go-transition go-prev');   
            }

            setTimeout(function () {
                currentPopup.remove();
            }, 300);

            var target;
            $.each(projectList.project, function () {
                if (this.idx == idx) {
                    target = this.projectId;
                }
                return target;
            });

            setTimeout(function () {
                popup(target);
                pageNavi(idx);
            }, 300); 
        }
    });
}
btnNextPrevPageNav();

function pageNavi(idx) {
    var item = $('#lh-pj-navi');
    item.find('[data-idx]').removeClass('active');
    item.find('[data-idx='+idx+']').addClass('active');
}

function popupCenter(k){
    $(k).css({
        "position" : "fixed",
        "marginTop": "-" + $(k).outerHeight() / 2 + "px",
        "marginLeft": "-" + $(k).outerWidth() / 2 + "px",
    });
}

function popupClose(){
    var target = $('.lh-popup'),
        mask = $('.lh-dimmed'),
        body = $('body');
    body.css('overflow', '');
    target.fadeOut(500);
    mask.fadeOut(500);
    setTimeout(function(){
        target.remove();
    }, 500);
    
    var item = $('#lh-pj-navi');
    item.find('[data-idx]').removeClass('active');

    var panvi = $('#lh-pj-navi');
    panvi.removeClass('on');
}

function projectClose() {
    $('.lh-pj-close').on('click', function(){
        popupClose();
        var id = $(this).closest('.lh-popup').data('pj-id');
        $('.lh-popup[data-pj-id="'+ id +'"]').fadeOut(300, function(){
            $(this).remove();
        });                
    });
}

function popupHeaderImg(){
    $('.lh-pj-header').each(function(){
        var _ = $(this),
            imgDesktop = _.data('desk-img'),
            imgMobile = _.data('mobile-img'),
            windowW = $(window).width();
        if(windowW > 767) {
            _.css('background-image', 'url("'+imgDesktop+'")');
        }else{
            _.css('background-image', 'url("'+imgMobile+'")');
        }
    });
}

function popupDetailContent(id) {
    $.each(projectList.project, function () {
        if (this.projectId == id) {
            var contentSrc = './src/project/' + this.client + '/' + this.projectId + '/index.html';
            $( "#content-anchor" ).load(contentSrc);
        }
    });
}

// Message Temp
function msg(id,txt, target, type) {
    var i = 0;
    var boxid = id,
        boxTemp = '<div id="'+boxid+'" class="lh-msg"></div>';
    target.append(boxTemp);

    if(type == 'loading') {
        setInterval(function () { 
            i++;
            var box = $('#'+boxid);
            var loading = ['/', '-','·', '\\', '|'];
            box.html(txt + '···' + loading[i]);
            if(i == loading.length)
            {
                box.html(txt + '···' + loading[0]);
                i = 0;
            }
        }, 200);
    }else{
        var box = $('#'+boxid);
        box.html(txt);
        setTimeout(function(){
            box.fadeOut(300, function(){
                $(this).remove();
            });
        }, 2000);
    }
}

$(function(){
    aniThumb();
    $('.has-detail').on('click', function(){
        var _ = $(this),
            id = _.data('pj-id'),
            idx = _.data('idx');
        popupOpen(id, idx);
    });
    $('.lh-dimmed').on('click', function(){
        popupClose();
    });
    document.onkeydown=function(e){
        if(window.event.keyCode == 27) {
            popupClose();
        }
    }
    popupHeaderImg();
    $(window).resize(function(){
        aniThumb();
        popupHeaderImg();
    });
});

// Logo
$('.lh-logo').addClass('ani-line');
setTimeout(function () {
    $('.lh-logo').addClass('ani-color');
}, 2000)