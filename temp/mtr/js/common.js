// loading
var loading = function(){
    var $this = $('.loading-msg_txt'),
        countTo = 100;
    
    $({ countNum: $this.text()}).animate({
        countNum: countTo
    },
    {
        duration:400,
        easing:'linear',
        step: function() {
            $this.text(Math.floor(this.countNum) + "%");
        },
        complete: function() {
            $this.text(this.countNum + "%");
            setTimeout(function(){
                $('#hsr-loading').fadeOut();
            }, 500);            
        }
    }); 
}();

// Get Parameter
var QueryString = function (){
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++){
        var pair = vars[i].split("=");
        if (typeof query_string[pair[0]] === "undefined"){
            query_string[pair[0]] = decodeURIComponent(pair[1]);
        } else if (typeof query_string[pair[0]] === "string"){
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();

var LIKE_API_ALL   = 'https://mtrjackytest.azurewebsites.net/Like/GetLikeByCategroy',
    LIKE_API_GET   = 'https://mtrjackytest.azurewebsites.net/Like/GetLikeByCategroyById',
    LIKE_API_POST  = 'https://mtrjackytest.azurewebsites.net/Like/likeArticle',
    SHARE_API_POST = 'https://mtrjackytest.azurewebsites.net/Share/InsertShareLog';

// Site Handle
var MTR = new Vue({
    el:"#hsr",
    data:{
        highlights:[],
        pagetitle:'',
        pageid:'',
        breadcrumb:'',
        depth1:'',
        depth1link:'',
        depth2:'',
        depth2link:'',
        text:language,
        agency:agency,
        listShow:4,
        listTotal:1000,
        articleId:'',
        articleCate:[],
        articleList:[],
        articleTitle:'',
        articleDetail:[],
        articleLike:[],
        planDay:'',
        max:'',
        searchkeyword:'',
        searchkeywordAuto:'',
        searchmessage:'',
        dropSelected:'all',
        dropSelectedDepth:'',
        topmenu:[],
        banners:[],
        footmenu:[],
        asides:[]
    },
    components:{
        "hsrTop":hsrTop,
        "hsrFoot":hsrFoot,
        "hsrBreadcrumb":hasrBreadcrumb,
        "hsrBreadcrumbPrev":hasrBtnGoToPrev,
        "sectionTit":hsrSectionTit,
        "btnCirlce":btnCircle,
        "btnAngle":btnAngle,
        "topBanner":hsrTopBanner,
        "subTopBanner":hsrSubTopBanner,
        "utilFontzoom":utilFontZoom,
        "btnLoadmore":btnLoadMore,
    },
    beforeMount:function(){
        $.getJSON('./data/menu.json').then(function(data){this.topmenu = data}.bind(this)),
        $.getJSON('./data/banners.json').then(function(data){this.banners = data}.bind(this)), 
        $.getJSON('./data/menu-footer.json').then(function(data){this.footmenu = data}.bind(this)),
        $.getJSON('./data/aside.json').then(function(data){this.asides = data}.bind(this)),
        $.getJSON(LIKE_API_ALL).then(function(data){this.articleLike = data}.bind(this)),
        $.getJSON('./data/language.json').then(function(data){this.text = data}.bind(this)),
        $.getJSON('./data/agency.json').then(function(data){this.agency = data}.bind(this));
    },
    mounted:function(){        
        var browserSet = (function(){
            // Key or mouse Check
            var rootEl   = $('body'),
                on_a11y  = 'a11y-on',
                off_a11y = 'a11y-off';

            var set_a11y = {
                init:function(){
                    rootEl.addClass(off_a11y);

                    rootEl.bind('mousedown', function(){
                        rootEl.addClass(off_a11y).removeClass(on_a11y);
                    });
            
                    rootEl.bind('keydown', function(event){
                        if (event.keyCode === 9){
                            rootEl.addClass(on_a11y).removeClass(off_a11y);
                        }
                    });
                }
            }
            set_a11y.init();

            var set_ms = {
                init:function(){
                    var isIE = false;
                    var ua = window.navigator.userAgent,
                        old_ie = ua.indexOf('MSIE '),
                        new_ie = ua.indexOf('Trident/');

                    if ((old_ie > -1) || (new_ie > -1)){
                        isIE = true;
                    }

                    if (isIE){
                        rootEl.addClass('ie11');
                    }
                }
            }
            set_ms.init();

            var set_mobile = {
                init:function(){
                    var isMobile = false; 
                   
                    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
                        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){ 
                        isMobile = true;
                        rootEl.addClass('device-mobile');
                    }
                }
            }
            set_mobile.init();
        })();
    
        // Navigation
        var nav = (function(){

            var el       = $('.wrap'),
                btn      = $('.btn-nav'),
                btnSkip  = $('.btn-skip'),
                logo     = $('.logo_hsr'),
                active   = 'nav-active',
                lihide;

            var hasChild = $('.has-child'),
                opened = 'open-child';

            var n = {
                init:function(){
                    btn.on('click', function(){
                        n.check();  
                    });

                    btnSkip.on('click', function(){
                        n.close();
                    });

                    n.m_init();
                },
                check:function(){
                    var hasclass = (el.hasClass(active)) ? n.close() : n.open();
                },
                open:function(){
                    el.addClass(active);
                    n.changeLogo('open');
                    deco01.restart();
                    deco02.restart();
                    deco03.restart();

                    // a11y set
                    btn.bind('keydown', function(event){
                        if(event.shiftKey && event.keyCode == 9){ 
                            n.close();
                        }
                    });
                    btn.attr('aria-expanded', 'true');

                    $('#gnb .gnb_menu > ul > li > a').last().bind('keydown', function(event){
                        if (!event.shiftKey && event.keyCode === 9){
                            n.close();
                        }
                    });

                    lihide = setTimeout(function(){
                        el.addClass('nav-li-show-over');
                    },4000);

                    $(document).bind('keydown', function(event){
                        if (event.keyCode === 27){
                            n.close();
                            btn.focus();
                        }
                    });
                },
                close:function(){
                    btn.attr('aria-expanded', 'false');
                    el.removeClass(active);
                    clearTimeout(lihide);
                    el.removeClass('nav-li-show-over');
                    n.changeLogo('close');
                    deco01.stop();
                    deco02.stop();
                    deco03.stop();
                    
                    if($(window).width() < 1000){
                        $('#gnb .has-child').find('>ul').css('display', 'none');
                        $('#gnb .has-child').removeClass(opened);
                    }
                },
                changeLogo:function(status){
                    var tar = logo.find('img'),
                        src = tar.attr('src'),
                        off = 'logo_hsr.png',
                        on  = 'logo_hsr_on.png',
                        newpath;

                    if(status === 'open'){
                        newpath = src.replace(off, on);
                    }else if (status === 'close'){
                        newpath = src.replace(on, off); 
                    }
                    return tar.attr('src',newpath);
                },

                // Mobile
                m_init:function(){
                    var btmShowSub = '<button class="btn-show-submenu" tabindex="0" aria-expanded="false"></button>';
                    setTimeout(function(){
                        $.each($('#gnb .has-child'),function(){
                            $(this).prepend(btmShowSub);
                        })

                        function openMobSubMenu(crr){
                            var anchor = crr.parent('li');
                            if(!anchor.hasClass(opened)){
                                var target = $('#gnb .has-child');
                                target.removeClass(opened);
                                target.find('>ul').slideUp();
                                target.find('> a').attr('aria-expanded', 'false');
                                target.find('.btn-show-submenu').attr('aria-expanded', 'false');
                                anchor.addClass(opened).find('>ul').slideDown();
                                crr.attr('aria-expanded', 'true');
                                crr.parent().find('> a').attr('aria-expanded', 'true');
                            }
                        }

                        $('.btn-show-submenu').bind({
                            click:function(){
                                openMobSubMenu($(this));
                            },
                            keydown:function(e){
                                if (event.keyCode === 13){
                                    openMobSubMenu($(this));
                                }
                            },
                            focus:function(){
                                $(this).parent('li').addClass('key-focus');
                            },
                            focusout:function(){
                                $(this).parent('li').removeClass('key-focus');
                            }
                        });

                        var windowType;
                        var $wind = $(window);

                        var desktopFunctions = function(){
                            $('#gnb .has-child').find('.depth1').attr('tabindex', '');
                        }
                    
                        var mobileFunctions = function(){
                            $('#gnb .has-child').find('.depth1').attr('tabindex', '-1');
                        }
                    
                        var mobileCheck = function(){
                            var window_w = $wind.width();
                            var currType = window_w < 1000 ? 'mobile' :'desktop';
                    
                            if (windowType == currType){
                                return;
                            } else {
                                windowType = currType;
                            }                        
                            if (windowType == 'mobile'){                
                                mobileFunctions();
                            } else {
                                desktopFunctions();
                            }
                        }
                        mobileCheck();
                        var resizeTimer;
                        $wind.resize(function(){
                            if (resizeTimer){
                                clearTimeout(resizeTimer);
                            }
                            resizeTimer = setTimeout(mobileCheck, 300);
                        });
                    }, 1000);
                }
            }
            n.init();

            // Navigation Deco Ani - Snap.svg required
            var g             = Snap("#midline"),
                circleBig     = g.select('#circle-big'),
                circleS       = g.select('#circle-sm'),
                circleS2      = g.select('#circle-sm2'),
                invisiblePath = g.select('#followPath_invisible'),
                lenPath       = Snap.path.getTotalLength(invisiblePath.attr("d")),
                path0Pos      = invisiblePath.getPointAtLength(0);

            var circles = [circleBig, circleS];

            var cirlceBigAni,
                speed01 = 50000,
                cirlceSmAni,
                speed02 = 30000,
                cirlceSmAni2,
                speed03 = 28000;

            var deco01 = {
                init:function(){
                    $.each(circles, function(idx, val){
                        val.attr({
                            transform: 't' + [path0Pos.x, path0Pos.y] + 'r' + (path0Pos.alpha - 90)
                        });
                    });
                    cirlceBigAni = Snap.animate(500, lenPath, function(val){
                        deco01.ani(circleBig, val);
                    }, speed01, mina.easeinout, function(){
                        deco01.end();
                    });

                    cirlceBigAni.pause();                    
                },
                start:function(){
                    cirlceBigAni = Snap.animate(0, lenPath, function(val){
                        deco01.ani(circleBig, val);
                    }, speed01, mina.easeinout, function(){
                        deco01.end();
                    });
                },
                end:function(){
                    cirlceBigAni = Snap.animate(lenPath, 0, function(val){
                        deco01.ani(circleBig, val);
                    }, speed01, mina.easeinout, function(){
                        deco01.start();
                    });
                },
                ani:function(target, val){
                    var pos = invisiblePath.getPointAtLength(val);
                    target.attr({
                        transform: 't' + [pos.x, pos.y] + 'r' + (pos.alpha - 90)
                    });
                },
                stop:function(){
                    cirlceBigAni.pause();
                },
                restart:function(){
                    cirlceBigAni.resume();
                }
            }
            deco01.init();

            var deco02 = {
                init:function(){
                    cirlceSmAni = Snap.animate(1000, lenPath, function(val){
                        deco02.ani(circleS, val);
                    }, speed02, mina.easeinout, function(){
                        deco02.end();
                    });
                    cirlceSmAni.pause();  
                },
                start:function(){
                    cirlceSmAni = Snap.animate(lenPath, 0, function(val){
                        deco02.ani(circleS, val);
                    }, speed02, mina.easeinout, function(){
                        deco02.end();
                    });
                },
                end:function(){
                    cirlceSmAni = Snap.animate(0, lenPath, function(val){
                        deco02.ani(circleS, val);
                    }, speed02, mina.easeinout, function(){
                        deco02.start();
                    });
                },
                ani:function(target, val){
                    var pos = invisiblePath.getPointAtLength(val);
                    target.attr({
                        transform: 't' + [pos.x, pos.y] + 'r' + (pos.alpha - 90),
                    });
                },
                stop:function(){
                    cirlceSmAni.pause();
                },
                restart:function(){
                    cirlceSmAni.resume();
                }
            }
            deco02.init();

            var deco03 = {
                init:function(){
                    cirlceSmAni2 = Snap.animate(2000, lenPath, function(val){
                        deco03.ani(circleS2, val);
                    }, speed03, mina.easeinout, function(){
                        deco03.end();
                    });
                    cirlceSmAni2.pause();
                },
                start:function(){
                    cirlceSmAni2 = Snap.animate(lenPath, 0, function(val){
                        deco03.ani(circleS2, val);
                    }, speed03, mina.easeinout, function(){
                        deco03.end();
                    });
                },
                end:function(){
                    cirlceSmAni2 = Snap.animate(0, lenPath, function(val){
                        deco03.ani(circleS2, val);
                    }, speed03, mina.easeinout, function(){
                        deco03.start();
                    });
                },
                ani:function(target, val){
                    var pos = invisiblePath.getPointAtLength(val);
                    target.attr({
                        transform: 't' + [pos.x, pos.y] + 'r' + (pos.alpha - 90),
                    });
                },
                stop:function(){
                    cirlceSmAni2.pause();
                },
                restart:function(){
                    cirlceSmAni2.resume();
                }
            }
            deco03.init();
        })();

        // Font-zoom util
        var utilFontZoom = (function(){

            var rootEl = $('body'),
                btn    = $('.zoom-size'),
                cookie = 'font-size';

            var zoom = {
                init:function(){
                    zoom.default();
                    zoom.select();
                },
                default:function(){
                    var current = Cookies.get(cookie);
                    if(current != undefined){
                        zoom.set(current);
                    }else{
                        zoom.set('m');
                    }
                },
                select:function(){
                    btn.on('click', function(){
                        var size = $(this).data('size');
                        zoom.set(size);
                    })
                },
                set:function(size){
                    btn.removeClass('active');
                    $('.zoom-size[data-size="'+size+'"]').addClass('active');
                    rootEl.removeClass('font-size-s font-size-m font-size-l').addClass('font-size-'+size);
                    Cookies.set(cookie, size);
                }
            }
            zoom.init();
        })();

        var btnBackToTop = (function(){

            var el  = $('.btn-back-to-top');
            var backtop = {
                init:function(){
                    backtop.click();
                }, 
                click:function(){
                    el.on('click', function(e){
                        e.preventDefault();
                        smoothScroll($('body'), 2, 500);
                        setTimeout(function(){
                            $('.btn-nav').focus();
                        }, 500);
                    });
                }
            }
            backtop.init();
        })();

        var btmWave = (function(){

            var unit = 100;
            var canvas, context, height, width, xAxis, yAxis, draw, timing;
        
            function init(el, w, h){
                canvas        = document.getElementById(el);
                //canvas.width  = document.documentElement.clientWidth;
                canvas.width  = w;
                canvas.height = h;
                context       = canvas.getContext("2d");
                height        = canvas.height;
                width         = canvas.width;
                xAxis         = Math.floor(height/2);
                yAxis         = 0;
                draw();
            }

            function pause(el){
               el.remove();
            }
            
            function draw(){
                context.clearRect(0, 0, width, height);
                
                var crrW = $(window).width();
                if(crrW > 1000){
                    //（fillcolor, alpha, zoom, delay）
                    drawWave('#f5994e', 1, 3, 0);
                }else if(crrW < 700){
                    drawWave('#f5994e', 1, 1.5, 0);
                }else {
                    drawWave('#f5994e', 1, 2, 0);
                }

                // Update the time and draw again
                draw.seconds = draw.seconds + .003;
                draw.t = draw.seconds*Math.PI;
                timing = setTimeout(draw, 35);
            };
        
            function drawWave(fillcolor, alpha, zoom, delay){
                context.fillStyle = fillcolor;
                context.globalAlpha = alpha;
        
                context.beginPath(); //パスの開始
                drawSine(draw.t / 0.5, zoom, delay); // Speed
                context.lineTo(width + 10, height); 
                context.lineTo(0, height); 
                context.closePath();
                context.fill(); 
            }
        
            function drawSine(t, zoom, delay){
                var x = t; 
                var y = Math.sin(x)/zoom;
                context.moveTo(yAxis, unit*y+xAxis); 
        
                // Loop to draw segments
                var crrW = $(window).width();
                var sin;
                if(crrW > 1000){
                    sin = 3;
                }else if(crrW < 700){
                    sin = 4;
                }else {
                    sin = 4.5;
                }

                for (i = yAxis; i <= width + 10; i += 10){
                    x = t+(-yAxis+i)/unit/zoom;
                    y = Math.sin(x - delay)/sin; // sin
                    context.lineTo(i, unit*y+xAxis);
                }
            }

            draw.seconds = 0;
            draw.t = 0;
        
            //init();
            var currentWave = 0;
            $('#canvas-container').on('inview', function(event, isInView){
                var crrW = $(window).width();
                var h;
                if(crrW > 1000){
                     h = 142;
                }else if(crrW < 700){
                     h = 80;
                }else {
                     h = 100;
                }
                if (isInView){
                    currentWave++;
                    $('#canvas-container').append('<canvas id="btm-wave-'+currentWave+'" width="100%" style="width:100%;"></canvas>');
                    init("btm-wave-"+currentWave, crrW, h);
                } else {
                    clearTimeout(timing);
                    pause($('#btm-wave-'+currentWave));
                }
            });

            $(window).resize(function(){
                clearTimeout(timing);
                pause($('#btm-wave-'+currentWave));

                var crrW = $(window).width();
                var h;
                if(crrW > 1000){
                     h = 142;
                }else if(crrW < 700){
                     h = 80;
                }else {
                     h = 100;
                }

                currentWave++;
                $('#canvas-container').append('<canvas id="btm-wave-'+currentWave+'"></canvas>');
                init("btm-wave-"+currentWave, crrW, h);
            })
        
        })();        
        
        // Search input focus
        $('input[name=keyword]').bind({
            focusin:function(){
                $('.search-keyword').removeClass('off-autosearch');
                $('.search-list-auto').removeClass('load-list');
            },
            keydown:function(){
                $('.search-keyword').removeClass('off-autosearch');
                var crr = $('.search-list-auto li.selected');

                var keymove = {
                    handle:function(){
                        if (event.keyCode === 40){
                            if(crr.length > 0){
                                if(crr.next().is('li')){
                                    crr.next().addClass('selected');
                                    crr.first().removeClass('selected');
                                    keymove.gettit();
                                }
                                return
                            }else {
                                $('.search-list-auto li').first().addClass('selected');
                                keymove.gettit();
                            }
                        }

                        if (event.keyCode === 38){
                            if(crr.length > 0){
                                if(crr.prev().is('li')){
                                    crr.prev().addClass('selected');
                                    crr.last().removeClass('selected');
                                    keymove.gettit();
                                }else {
                                    crr.removeClass('selected');
                                }
                                return
                            }
                        }

                        if (event.keyCode === 13){
                            if(crr.length > 0){
                                MTR.searchkeywordAuto = keymove.gettit();
                            }
                        }
                    },
                    gettit:function(){
                        var txt = $('.search-list-auto li.selected').find('.auto-result-tit').html();
                        return txt;
                    }
                }
                keymove.handle();
            }
        })

        function smoothScroll(x, s, c){
            $('html, body').animate({scrollTop: x.offset().top + s}, c);
        }

        setTimeout(function(){
            MTR.asideAfix();
            MTR.hsrDrop();  
            MTR.updateMeta();
            MTR.loadMore();
        }, 500);

        // Fin mounted
    },
    methods: {
        updateMeta:function(){
            var title = MTR.text.siteName +' > '+ MTR.pagetitle;
            var metas = '<meta name="keywords" content="'+MTR.text.siteKeyword+'">\
            <meta name="description" content="'+MTR.text.siteDescription+'"></meta>\
            <meta property="og:url" content="">\
            <meta property="og:type" content="website">\
            <meta property="og:locale" content="zh-HK">\
            <meta property="og:title" content="'+title+'">\
            <meta property="og:description" content="'+MTR.text.siteDescription+'">\
            <meta property="og:image" content="./images/common/share-img.jpg">\
            <meta name="twitter:card" content="Summary">\
            <meta name="twitter:site" content="">\
            <meta name="twitter:creator" content="">\
            <meta name="twitter:url" content="">\
            <meta name="twitter:title" content="'+title+'">\
            <meta name="twitter:description" content="'+MTR.text.siteDescription+'">\
            <meta name="twitter:image" content="./images/common/share-img.jpg"/>\
            '
            //$('head').append(metas);   // NOTE: Not Support FB Share
            $('title').html(title);
        },
        qr:function(txt, tar){
            if($(tar).html().length < 1){
                $(tar).qrcode({render:'image',text:txt});
            }
        },
        popupOpen:function(prevFocus, content){
            var popupMask = '<div class="hsr-mask"></div>',
                popupCont = '<div class="hsr-popup"><div class="hsr-popup-in"><div class="hsr-popup-content"><a href="javascript:;" class="btn-close-popup"></a></div></div></div>';

            $('body').append(popupMask).append(popupCont);
            $('.hsr-mask').fadeIn(300);
            if(content){
                $('.hsr-popup-content').append(content);
                $('.btn-close-popup').focus();
            }
            MTR.popupClose(prevFocus);
        },
        popupClose:function(prevFocus){
            $('.btn-close-popup').on('click',function(){
                $('.hsr-mask, .hsr-popup').fadeOut(300, function(){
                    $(this).remove();
                });
                prevFocus.focus();
            });
        },
        countlike:function(target){
            var heart = {
                init:function(){
                    heart.click();
                },
                click:function(){
                    heart.post(target[0], target[1]);
                },
                post:function(cate, id){
                    var like = {"category":cate, "CategoryId":id}
                    $.ajax(
                        {
                            type:'POST',
                            url:LIKE_API_POST,
                            dataType:"json",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            data:like,
                            crossDomain:true,
                            success: function(data){
                                console.log(data);
                                var el = $('.btn-like[data-article-section='+data.Category+'][data-article-id='+data.CategoryId+']');
                                el.addClass('i-like');
                                el.find('.like-count').html(data.TotalLike);
                            }
                        }
                    );
                }
            }
            heart.init();
        },
        countShare:function(opt){
            var holder = opt[0],
                page  = opt[1],
                target = opt[2],
                type   = opt[3]

            MTR.openShare(type, target);

            var share = {"Category":holder,"CategoryId":page,"Channel":target}
            $.ajax(
                {
                    type:'POST',
                    url:SHARE_API_POST,
                    dataType:"json",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data:share,
                    crossDomain:true,
                    success: function(data){
                        //console.log('Saved Share Count -' + JSON.stringify(data));
                    }
                }
            );

        },
        openShare:function(opt, target){
            var windowHeight = 750,
                windowWidth  = 620,
                alignTop     = (screen.height / 2) - (windowHeight / 2),
                alignLeft    = (screen.width / 2) - (windowWidth / 2);

            if(opt == 'root') {
                var url = MTR.text.siteUrl;
                if(target == 'Facebook'){
                    window.open( 'https://www.facebook.com/sharer/sharer.php?u='+url+'&hashtag=%23'+MTR.text.siteHash, "","top=" + alignTop + ",left=" + alignLeft + ",width=" + windowWidth +",height=" + windowHeight);
                    return
                }else if(target == 'WhatsApp'){
                    window.open( 'https://api.whatsapp.com/send?text='+url+'%0D%0A'+MTR.text.siteName+'%0D%0A'+MTR.text.siteDescription, "","top=" + alignTop + ",left=" + alignLeft + ",width=" + windowWidth +",height=" + windowHeight);
                    return
                }else if(target == 'WeChat'){
                    MTR.openShareWeChat(url);
                    return
                }
            }

            if(opt == 'crr'){                
                var currentPage = window.location.href;

                if(target == 'Facebook'){
                    window.open( 'https://www.facebook.com/sharer/sharer.php?u='+currentPage+'&hashtag=%23'+MTR.text.siteHash, "","top=" + alignTop + ",left=" + alignLeft + ",width=" + windowWidth +",height=" + windowHeight);
                    return
                }else if(target == 'WhatsApp'){
                    window.open( 'https://api.whatsapp.com/send?text='+currentPage+'%0D%0A'+MTR.articleTitle, "","top=" + alignTop + ",left=" + alignLeft + ",width=" + windowWidth +",height=" + windowHeight);
                    return
                }else if(target == 'WeChat'){
                    MTR.openShareWeChat(url);
                    return
                }
            }
        },
        openShareWeChat:function(url){
            var content_desktop = 
            '<div class="share-wechat type-desktop">'+
                '<div>'+
                    '<div class="qr-wechat"></div>'+
                    '<div>'+
                        '<img class="share-logo" src="./images/common/logo_wechat.png" alt="'+MTR.text.share_wechat_btn2+'"/>'+
                        '<div>'+
                            '<p>'+MTR.text.share_wechat_desc+'</p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';

            var content_mobile = 
            '<div class="share-wechat type-mobile">'+
                '<div>'+
                    '<div>'+
                        '<img class="share-logo" src="./images/common/logo_wechat.png" alt="'+MTR.text.share_wechat_btn2+'"/>'+
                        '<div>'+
                            '<input type="text" class="copy-url" readonly/>'+
                            '<div class="btn-area">'+
                                '<a href="javscript:;" class="copy-txt">'+MTR.text.share_wechat_btn1+'</a>'+
                                '<a href="weixin://dl/posts" target="_blank">'+MTR.text.share_wechat_btn2+'</a>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '</div>';

            var rootEl = $('body'),
                btnOpen = $('.sns-wechat');

            if(rootEl.hasClass('device-mobile')){
                MTR.popupOpen(btnOpen, content_mobile);
            }else {
                MTR.popupOpen(btnOpen, content_desktop);
            }

            $('.qr-wechat').qrcode({render:'image',text:url});
            $('.copy-url').val(location.href);
        },
        gosearch:function(key){
            this.dropSelected = 'all';            
            $('.search-keyword').addClass('off-autosearch');

            if(key){
                this.searchkeywordAuto = key;  
                return this.searchkeyword = key;
            }else {
                return this.searchkeyword = this.$refs.keyword.value;
            }
        },
        hsrDrop:function(){
            var el = $('.hsr-drop');
            $.each(el, function(){
                var wrap = $(this);
                wrap.find('.drop-list-crr').on('click', function(){
                    wrap.find('.drop-list').slideToggle(300);
                    wrap.toggleClass('drop-open');
                });
                wrap.find('.drop-list > ul > li > .list-txt').bind({
                    click:function(){
                        wrap.addClass('selected');
                    },
                    focusin:function(){
                        wrap.find('.drop-list > ul > li').removeClass('focused');
                        $(this).parent().addClass('focused');
                    }
                });

                $.each(wrap.find('.drop-list > ul > li > ul'), function(){
                    $(this).find('li').last().bind({
                        focusout:function(){
                            wrap.find('.focused').focus();
                        }
                    });
                });
            });
        },
        dropOption:function(list, idx){
            if(idx=='all'){
                this.dropSelected = 'all';
            }else {
                var id = list[idx].cateId;
                this.dropSelected = id;
            }
            this.dropSelectedDepth = '1';
            this.searchkeyword = '';
            this.dropClickAfter();
        },
        dropOptionSub:function(list, idx, crr){
            if(idx=='all'){
                this.dropSelected = 'all';
            }else {
                var id = list[idx].subcate[crr];
                this.dropSelected = id;
            }

            this.dropSelectedDepth = '2';
            this.searchkeyword = '';
            this.dropClickAfter();
        },
        dropOptionDay:function(list, idx){
            this.dropSelected = list[0].plan[idx].day;
            var el = $('.plan-select-day');
            el.find('.drop-list').slideToggle(300);
            el.find('.hsr-drop').toggleClass('drop-open');

            var gab      = $('header').height();
            $('html, body').animate({
                scrollTop: $('.detail-item-cont').offset().top - gab
            }, 500);
        },
        dropClickAfter:function(){
            $('.external-link').removeAttr('style');
            var el = $('.sec-cont-search');
            el.find('.drop-list').slideToggle(300);
            el.find('.hsr-drop').toggleClass('drop-open');
            $('html, body').animate({
                scrollTop: el.offset().top
            }, 500);
        },
        modelist:function(e){
            if((e.keyCode == 40)){               
                var next = e.target.nextElementSibling;
                if(next === null) return                
                e.target.nextElementSibling.focus();
            }
            if((e.keyCode == 38)){
                var prev = e.target.previousElementSibling;
                if(prev === null){
                    $('.search-keyword input').focus();
                }
                e.target.previousElementSibling.focus();
            }
            return
        },
        updatelistshow:function(){
            var lastlist = this.listShow,
                anch     = lastlist+1,
                gab      = $('header').height();

            this.listShow += 4;
            $('.external-link').removeAttr('style');
            setTimeout(function(){
                $('html, body').animate({
                    scrollTop: $('.article-list').find('li:nth-child('+anch+')').offset().top - gab
                }, 500, function(){
                    $('.article-list').find('li:nth-child('+anch+')').find('a').focus();
                });
            }, 300);
        },
        loadMore:function(){
            $(window).scroll(function(){
                var el = $('.btn-loadmore');
                if(el.length > 0) {
                    var top    = el.offset().top,
                        height = $(window).scrollTop()+$(window).height() - el.height();
                    if(height > top) {
                        $('.external-link').removeAttr('style');
                        MTR.listShow += 4;
                    }
                }
            })
        },
        dayPagination:function(target){
            var crr = new Number(this.dropSelected);
            this.max = this.articleDetail[0].plan.length;
            
            if(target == "prev") {
                var to = crr - 1;
            }

            if(target == "next") {
                var to = crr + 1;
            }

            this.checkHasHotspot();

            var gab      = $('header').height();
            $('html, body').animate({
                scrollTop: $('.detail-item-cont').offset().top - gab
            }, 500);
            
            return this.dropSelected = to;
        },
        checkHasHotspot:function(){

            var item = $('.path-list-item');
            item.removeClass('has-hotspot-last');
            item.removeClass('has-hotspot-first');

            setTimeout(function(){
                var hasHotspot = $('.has-hotspot');
                hasHotspot.last().addClass('has-hotspot-last');
                hasHotspot.first().addClass('has-hotspot-first');    
            });

            setTimeout(function(){
                $('.plan-select-day a').focus();
            }, 500);
        },
        isLikeActive:function(item){
            var status = 0;
            $.each(MTR.articleLike, function(index, like){
                if(like.category == item[0]) {
                    $.each(like.detail, function(idx, ct){
                        if(ct.CategoryId == item[1]) {
                            if(ct.IsAbleToLike == 0) {
                                status = 1;
                            }else {
                                status = 0;
                            }
                        }
                    });
                }
            });
            if(status == 1) {
                return true;
            }
        },
        isLikeActiveCnt:function(item){
            var cnt = 0;
            $.each(MTR.articleLike, function(index, like){
                if(like.category == item[0]) {
                    $.each(like.detail, function(idx, ct){
                        if(ct.CategoryId == item[1]) {
                            cnt = ct.TotalLike;
                        }
                    });
                }
            });
            return cnt;
        },
        asideAfix:function(){
            var el     = $('.external-link'),
                anchor = $('.btn-back-to-top');

            var detailAgency   = $('.ex-item-detail'),
                btnOpenAgency  = $('.btn-agency'),
                btncloseAgency = $('.btn-agency-close'),
                cactive        = 'active';

            var pos = {
                init:function(){
                    pos.scroll();
                    setTimeout(function(){
                        pos.check();
                    },1000);
                },
                scroll:function(){
                    $(window).scroll(function(){
                        pos.check();
                    })

                    $(window).resize(function(){
                        el.removeAttr('style');
                        pos.check();
                    })
                },
                check:function(){
                    var posAnchorTop = anchor.offset().top,
                        h = el.height(),
                        posTop = posAnchorTop - h;

                    var a = $(window).scrollTop()+$(window).height() - h,
                        b = el.offset().top,
                        e = b + h;
                        
                    pos.handle(posAnchorTop, e , h, posTop, a, b);
                },
                handle:function(posAnchorTop, e, h, posTop, a, b){
                    
                    if(e >= posAnchorTop){
                        el.css({
                            'position':'absolute',
                            'top':posTop,
                            'height':h
                        });
                    }
                    if(a < b){
                        el.removeAttr('style');
                    }
                }
            }
            pos.init();

            var detailPop = {
                init:function(){
                    detailAgency.css('visibility', 'hidden');
                    detailPop.open();
                    detailPop.close();
                },
                open:function(){
                    btnOpenAgency.on('click', function(){
                        detailAgency.addClass(cactive).css('visibility', 'visible');
                        $('.agency-list').find('li:first-child .agency_info__site a').focus();
                    });
                },
                close:function(){
                    btncloseAgency.on('click', function(){
                        detailAgency.removeClass(cactive);
                        setTimeout(function(){
                            detailAgency.css('visibility', 'hidden');
                        }, 300);
                        btnOpenAgency.focus();
                    });
                }
            }
            detailPop.init();

            $(document).bind('keydown', function(event){
                if (event.keyCode === 27){
                    $('.ex-item-detail').removeClass('active');
                    setTimeout(function(){
                        $('.ex-item-detail').css('visibility', 'hidden');
                    }, 300);
                    $('.btn-agency').focus();
                }
            }); 
        }
    },
    computed:{
        articleListFilter:function(){

            this.listShow = 4;
            this.listTotal = this.articleList.length;

            var resultMsg       = $('.search-list .result-msg'),
                resultAutoBlock = $('.search-keyword_autoresult');

            resultMsg.css('display', 'none');
            
            var article = this.articleList,
                keyword, depth,
                cnt=0;

            if(this.dropSelected.length < 1 || this.dropSelected == 'all'){
                keyword = this.searchkeyword;
                
                article.filter(function(item){
                    if(item.tit.indexOf(keyword) !== -1 || item.cateId.indexOf(keyword) !== -1){
                        cnt++;
                        return item;
                    }
                });
                
                if(cnt == 0){
                    resultMsg.css('display', 'block');
                    this.searchmessage = this.text.searchNoResult
                    return article;
                }

                if(keyword.length < 1){
                    resultMsg.css('display', 'none');
                    return article;
                }

                article = article.filter(function(item){
                    if(item.tit.indexOf(keyword) !== -1 || item.cateId.indexOf(keyword) !== -1){
                        return item;
                    }
                });

                if(article.length < 1){
                    resultMsg.css('display', 'block');
                    return article;
                }

                resultAutoBlock.css('display','none');
                this.listTotal = article.length;

                return article;
            }else {
                keyword = this.dropSelected;
                depth = this.dropSelectedDepth;

                if(depth == "1") {
                    article.filter(function(item){
                        if(item.cateId.indexOf(keyword) !== -1){
                            cnt++;
                            return item;
                        }
                    });
                    
                    if(cnt == 0){
                        if(cnt == 0){
                            this.searchmessage = this.text.searchNoResult
                            return article;
                        }
                    }
        
                    if(keyword.length < 1){
                        return article;
                    }
        
                    article = article.filter(function(item){
                        if(item.cateId.indexOf(keyword) !== -1){
                            return item;
                        }
                    });
        
                    if(article.length < 1){
                        return article;
                    }
                    this.listTotal = article.length;
        
                    return article;
                }

                if(depth == "2") {
                    article.filter(function(item){
                        if(item.subcate.indexOf(keyword) !== -1){
                            cnt++;
                            return item;
                        }
                    });
                    
                    if(cnt == 0){
                        if(cnt == 0){
                            this.searchmessage = this.text.searchNoResult
                            return article;
                        }
                    }
        
                    if(keyword.length < 1){
                        return article;
                    }
        
                    article = article.filter(function(item){
                        if(item.subcate.indexOf(keyword) !== -1){
                            return item;
                        }
                    });
        
                    if(article.length < 1){
                        return article;
                    }
                    this.listTotal = article.length;
                    return article;
                }

            }

        },
        autosearch:function(){            
            var article = this.articleList,
                keyword = this.searchkeywordAuto;
            
            if(!keyword){
                keyword = this.text.searchPleaseInput;
            }

            article = article.filter(function(item){
                if(item.tit.indexOf(keyword) !== -1){
                    return item;
                }
            });

            if(article.length < 1){
                return article;
            }

            return article;
        },
        cateList:function(){
            var catename = this.dropSelected,
                crr;

            if(catename == "all"){
                return this.text.selectAll;
            }else if(MTR.dropSelectedDepth == "1"){
                $.each(this.articleCate, function(index, item){
                    if(item.cateId === MTR.dropSelected) {
                        crr = item.label;
                    }
                });
                return crr
            }else if(MTR.dropSelectedDepth == "2"){
                $.each(this.articleCate, function(index, item){
                    $.each(item.subcate, function(index, cate){
                        if(cate === MTR.dropSelected) {
                            crr = cate;
                         }
                    });
                });
                return crr
            }
        },
        dayList:function(){
            var day   = this.dropSelected,
                order = new Number(day) - 1;

            this.checkHasHotspot();
            return this.text.day[order]
        }
    },
})