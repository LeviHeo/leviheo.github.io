
var articleList = [{
    episode: 1,
    video: "zvHf0ZwDvvw",
    editor: [{
        id: "fiona_sun",
        name: "Fiona Sun",
        title: "Reporter, SCMP’s Hong Kong desk",
        article: [{
            link: "https://www.scmp.com/news/hong-kong/society/article/3181419/nearly-1-4-young-hongkongers-low-income-families-lying-flat",
            title: "Hong Kong / Society",
            desc: "Nearly 1 in 4 young Hongkongers from low-income families ‘lying flat’, while some feel hopeless about future, survey shows"
        }, {

            link: "https://multimedia.scmp.com/news/hong-kong/article/3181013/subdivided-units-part3/index.html",
            title: "Hong Kong’s subdivided units",
            desc: "Can Hong Kong deliver on 2049 target to wipe out subdivided flats and ‘cage homes’?"
        }, {

            link: "https://multimedia.scmp.com/news/hong-kong/article/3180896/subdivided-units-part2/index.html",
            title: "Hong Kong’s subdivided units",
            desc: "Depression, cockroaches, rats and shame add up to misery for Hongkongers in subdivided flats"
        }, {

            link: "https://multimedia.scmp.com/news/hong-kong/article/3180749/subdivided-units-part1/index.html",
            title: "Hong Kong’s subdivided units",
            desc: "Why Hongkongers in city’s notorious subdivided flats say they have no choice"
        },{

            link: "https://www.scmp.com/news/hong-kong/society/article/3181098/hong-kong-bosses-should-be-flexible-workers-caring-elderly",
            title: "Hong Kong / Society",
            desc: "Hong Kong bosses should be flexible with workers caring for elderly or disabled residents at home, study says"
        },{

            link: "https://www.scmp.com/news/hong-kong/society/article/3180642/funding-hong-kong-child-protection-group-cut-hk18-million",
            title: "Hong Kong / Society",
            desc: "Funding for Hong Kong child protection group cut by HK$1.8 million after abuse allegations"
        },]
    }, {
        id: "emily_tsang",
        name: "Emily Tsang",
        title: "News Editor, SCMP’s Hong Kong desk",
        article: [{

            link: "https://www.scmp.com/yp/discover/entertainment/music/article/3177454/death-depth-canto-pop-hong-kong-lyricist-siu-hak",
            title: "Young Post",
            desc: "From death to depth for Canto-pop: Hong Kong lyricist Siu Hak on Keung To’s anti-war song, local music scene’s growth"
        },{

            link: "https://www.scmp.com/yp/discover/article/3170895/project-stay-home-beat-early-summer-holiday-blues-young-posts-exercise",
            title: "Young Post",
            desc: "Project Stay Home: beat the early summer holiday blues with Young Post’s exercise challenge, student podcast and online game"
        },{

            link: "https://www.scmp.com/news/hong-kong/law-and-crime/article/3161360/hong-kong-national-security-police-arrest-6-ties-stand",
            title: "Hong Kong / Law and Crime",
            desc: "Hong Kong’s Stand News shuts down after national security police arrest 7, freeze HK$61 million in assets"
        },{

            link: "https://www.scmp.com/news/hong-kong/article/3160744/university-hong-kong-covers-pillar-shame-sculpture-marking-tiananmen",
            title: "Hong Kong / Politics",
            desc: "University of Hong Kong removes Pillar of Shame sculpture marking Tiananmen Square crackdown in middle of night"
        },{

            link: "https://www.scmp.com/news/hong-kong/society/article/3155965/m-museum-what-see-jewel-hong-kong-arts-crown",
            title: "Hong Kong / Society",
            desc: "M+ museum: what to see at the jewel in Hong Kong art’s crown"
        },{

            link: "https://www.scmp.com/news/hong-kong/society/article/3159251/its-no-boy-band-hong-kongs-trial-error-scores-success",
            title: "Hong Kong / Society",
            desc: "It’s no boy band, but Hong Kong’s Trial & Error scores success between ‘red lines’ with videos, parodies, songs"
        }]
    }, {
        id: "zuraidah_ibrahim",
        name: "Zuraidah Ibrahim",
        title: " SCMP’s Executive Managing Editor",
        article: [{

            link: "https://www.scmp.com/news/hong-kong/society/article/3174036/hamstergate-omicron-superspreader-and-coffee-carcinogens",
            title: "Newsletter / Hong Kong Update",
            desc: "Hamstergate, Omicron superspreader and coffee carcinogens"
        },{

            link: "https://www.scmp.com/week-asia/opinion/article/3134413/hong-kong-politics-post-national-security-law-why-singapores",
            title: "This Week in Asia / Opinion",
            desc: "Hong Kong politics post-national security law: why Singapore’s Barisan Sosialis could hold lessons for city’s opposition"
        },{

            link: "https://www.scmp.com/week-asia/politics/article/3092783/singapore-election-hard-truths-pap-voters-deny-ruling-party-easy",
            title: "This Week in Asia / Politics",
            desc: "Analysis | Singapore election: hard truths for the PAP as voters deny ruling party an easy ride into power"
        },{

            link: "https://www.scmp.com/video/hong-kong/3088232/rebel-city-scmp-journalists-reflect-year-covering-hong-kongs-civil-unrest",
            title: "Video / Politics",
            desc: "Rebel City: SCMP journalists reflect on a year of covering Hong Kong’s civil unrest"
        },{

            link: "https://www.scmp.com/week-asia/opinion/article/3047239/singapore-election-paps-order-and-stability-will-win-out-how-will",
            title: "This Week in Asia / Opinion",
            desc: "Singapore election: the PAP’s order and stability will win out, but how will the opposition shape up?"
        },{

            link: "https://www.scmp.com/news/hong-kong/politics/article/3023485/hong-kong-protests-need-political-solution-and-should-start",
            title: "Hong Kong / Politics",
            desc: "Hong Kong protests need a political solution and that should start with withdrawing extradition bill, police watchdog chief Anthony Neoh says"
        },]
    }]
}]


var SCMP = new Vue({
    el: '#scmp-app',
    data: {
        isIE:false,
        isMob:false,
        isSlide:true,
        isShare:false,
        ww:0,
        wh:0,
        sectionNav:false,
        backtotop:false,
        articles:articleList,
    },
    created:function(){
        this.getWindowSize();
    },
    mounted:function(){
        this.placeVideo(this.articles);
        this.setScrollAni();
        $(window).resize(function(){
            ScrollTrigger.refresh();
            SCMP.getWindowSize([$(window).width(), $(window).height()]);
        });
    },
    watch:{
        isMob:function(val){
            console.log(val)
        },
    },
    computed:{
    },
    methods:{
        setScrollAni:function(){
            // Progress
            $(window).scroll(function() {
                var el = $("#kv"),
                    top_of_element    = el.offset().top,
                    bottom_of_element = el.offset().top + el.outerHeight(),
                    bottom_of_screen  = $(window).scrollTop() + $(window).innerHeight(),
                    top_of_screen     = $(window).scrollTop();

                if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element/2)){
                    $('.scmp-backtotop').addClass('pos-top');
                    $('#kv').removeClass('ani-pause');
                }else {
                    $('#kv').addClass('ani-pause');
                }
                //var blurVal = top_of_screen*0.006;
                var blurVal = top_of_screen*0.010;
                if(blurVal < 5) {
                    $('.kv-bg').css('filter', 'blur('+blurVal+'px)');
                    return false;
                }
            });

            var morethanTitle, morethanDesc, morethanBg, videoandarticle;
            morethanTitle = new Swiper(".kewords", {
                direction: "vertical",
                allowTouchMove: false,
                on:{
                    init:function(){
                        $('.title-first, .morethan-desc, .morethan-title-logo').addClass('active');
                        setTimeout(function(){
                            var toW = $('.kewords .swiper-slide-active').width();
                            $('.kewords').css('width', toW+'px');
                        }, 1500);
                    }
                }
            });

            morethanDesc = new Swiper(".morethandesc", {
                allowTouchMove: false,
                effect: "fade",
                mousewheel: false,
            });

            videoandarticle = new Swiper(".videoarticle", {
                allowTouchMove: false,
                mousewheel: false,
            })

            morethanTitle.on('slideChangeTransitionStart', function(){
                var toW = $('.kewords .swiper-slide-active').width();
                $('.kewords').css('width', toW+'px')
            });


            var timelineBar = gsap.timeline({
                scrollTrigger: {
                trigger: "body",
                scrub: 0.3,
                start: "top top",
                end: "bottom bottom",
                }
            });

            timelineBar.to('#progress span', { width: '100%', ease: 'none' }, 0)
            .to('#progress', { duration: 0.01, opacity: 1, ease: 'none' }, 0);

            // Header & Backtotop toggle hidden
            var showAnim = gsap.from('.scmp-head', {
                    y:-70,
                    paused: true,
                    duration: 0.3,
                    className:function(){
                    return "+=scmp-head head-toggle"
                },
            }).progress(1);

            var showBtt = gsap.from('.scmp-backtotop', {
                    y:70,
                    paused: true,
                    duration: 0.3,
                    className:'+=scmp-backtotop pos-top'
            }).progress(1);

            ScrollTrigger.create({
                start: "top top",
                end: 99999,
                onUpdate: function(self){
                    self.direction === -1 ? showBtt.play() : showBtt.reverse();
                }
            });

            function videoPlay(status){
                var url = $('.video-holder[data-video=1]').find('iframe').attr('src');
                var playUrl;
                if(status == 'play') {
                    playUrl = url.replace('autoplay=0', 'autoplay=1');
                }
                if(status == 'stop'){
                    playUrl = url.replace('autoplay=1', 'autoplay=0');
                }
                $('.video-holder[data-video="1"]').find('iframe').attr('src', playUrl);
            }

            const sections = document.querySelectorAll(".panel");
            const scrolling = {
                enabled: true,
                events: "scroll,wheel,touchmove,pointermove".split(","),
                prevent: e => e.preventDefault(),
                disable() {
                    if (scrolling.enabled) {
                    scrolling.enabled = false;
                    window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
                    scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
                    }
                },
                enable() {
                    if (!scrolling.enabled) {
                    scrolling.enabled = true;
                    window.removeEventListener("scroll", gsap.ticker.tick);
                    scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
                    }
                }
            };

            var scrollCnt = 0;
            var scrollTime;
            var cntScrollMove = function(){
                scrollTime = setTimeout(function(){
                    scrollCnt=0;
                }, 1500);
            }
            function goToSection(section, anim, i) {
                if (scrolling.enabled && document.readyState === 'complete') { // skip if a scroll tween is in progress
                if(!SCMP.backtotop) {
                    scrollCnt++;
                    cntScrollMove();
                    gsap.set("body", {overflow: "hidden"});
                    scrolling.disable();
                    gsap.to(window, {
                    scrollTo: {y: section, autoKill: false},
                    duration: 1.5,
                    onComplete:function(){
                        console.log(scrollCnt);
                        scrollCnt=0;
                        console.log(scrollCnt);
                        setTimeout(function(){
                            scrolling.enable();
                            gsap.set("body", {overflow: "auto"});
                        }, 0);
                    },
                    });
                    anim && anim.restart();
                }
                }
            }

            gsap.to('.bg-item', {opacity:0, scale:1, duration:0.5});
            sections.forEach((section, i) => {
                ScrollTrigger.create({
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                onEnter:function(){
                    scrolling.enable();
                    morethanTitle.slideTo(i, 300);
                    morethanDesc.slideTo(i, 300);
                    goToSection(section);

                    if($('.bg-item:nth-child('+(i)+')').length > 0) {
                        gsap.to('.bg-item:nth-child('+(i)+')', {opacity:0, scale:1, duration: 2})
                    }
                    if($('.bg-item:nth-child('+(i+1)+')').length > 0) {
                        gsap.to('.bg-item:nth-child('+(i+1)+')', {opacity:1, scale:1.02, duration: 2})
                    }
                },
                onEnterBack:function(){
                    morethanTitle.slideTo(i, 300);
                    morethanDesc.slideTo(i, 300);
                    goToSection(section);

                    if($('.bg-item:nth-child('+(i+1)+')').length > 0) {
                        gsap.to('.bg-item:nth-child('+(i+1)+')', {opacity:1, scale:1.02, duration: 2})
                    }
                    if($('.bg-item:nth-child('+(i+2)+')').length > 0) {
                        gsap.to('.bg-item:nth-child('+(i+2)+')', {opacity:0, scale:1, duration: 2})
                    }
                },
                onUpdate: function(self){
                    if(i == 4) {
                        if(self.direction === -1) {
                            //showAnim.reverse();
                        }else {
                            showAnim.play();
                        }
                    }else if(i == 0) {
                        if(self.direction === -1) {
                            //showAnim.reverse();
                        }else {
                            showAnim.play();
                        }
                    }else {
                        if(self.direction === -1) {
                            showAnim.play();
                        }else {
                            showAnim.reverse();
                        }
                    }
                }
                });
            });


            var sectionBtm;
            gsap.utils.toArray(".area-conntent-btm").forEach(function(section){
                sectionBtm = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start:"top bottom",
                        end: "bottom bottom",
                        onEnter:function(){
                            showAnim.reverse();
                            $('.main-message').addClass('disable');
                            goToSection(section);
                            videoPlay('play')
                        },
                        onLeaveBack:function(){
                            $('.main-message').removeClass('disable');
                        }
                    }
                });
            });

            // Desktop Mobile Seperate
            var size = this.ww > 752 ? "desktop" : "mobile";
            this.ww < 752 ? this.isMob = true : this.isMob = false;

            var timer = null;
            window.addEventListener('scroll', function() {
                if(timer !== null) {
                    clearTimeout(timer);
                    SCMP.moving = true;
                }
                timer = setTimeout(function() {
                    SCMP.moving = false;
                }, 100);
            }, false);

            if(this.isMob === false) {
                console.log('desktop');
            }

            if(this.isMob === true) {
                console.log('mobile');
            }

            function infoResponsive(ww, wh) {
                var newSize = ww > 752 ? "desktop" : "mobile";
                if (newSize != size) {
                    size = newSize;
                    if (newSize === "mobile") {
                        SCMP.isMob = true;
                        if(wh > 900) {
                            window.location.reload();
                        }
                    } else if (newSize === "desktop") {
                        SCMP.isMob = false;
                        if(wh > 900) {
                            window.location.reload();
                        }
                    }
                }
            }

            function isMobile(a) {
                if ($(document).width() < 768) {
                    return true;
                }
                return (
                    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) ||
                    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                        a.substr(0, 4)
                    )
                );
            }

            var globalLayout;
            function responsiveImg() {
                var winWidth = $(window).width(),
                    real_width;

                function checkWidth() {
                    if (isMobile !== null) {
                        real_width = winWidth;
                    } else {
                        real_width = window.outerWidth;
                    }
                    return real_width;
                }
                checkWidth();

                if (real_width < 760) {
                    globalLayout = "mobile";
                } else if (real_width < 1025) {
                    globalLayout = "tablet";
                } else {
                    globalLayout = "desktop";
                }

                $.each($("img"), function () {
                    $(this).attr("src", $(this).attr("data-media-" + globalLayout));
                });
            }

            responsiveImg();
            $(window).resize(function(){
                responsiveImg();
            });

            $('.scmp-backtotop a').on('click', function(e){
                e.preventDefault();
                var target = $(this).attr('href');
                SCMP.backtotop = true;
                    $('html, body').animate({
                        scrollTop:$(target).offset().top
                    }, 1000);

                setTimeout(function(){
                    SCMP.backtotop = false;
                }, 1000);
            });
            $(window).resize(function(){
                infoResponsive(SCMP.ww, SCMP.wh);
            });
        },
        openWindowAndShare:function(type){
            var u = window.location.origin+ window.location.pathname,
                t = document.title;

            var browserW = $(window).width(),
                isMobile;

            if(browserW < 700) {
                isMobile = true;
            }

            var postTitle = document.title.replace(/ /g, "+"),
                encoded   = encodeURI(postTitle);

            var urls = {
                "fb": 'http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'%3Futm_source=facebook%26utm_medium=social_share%26utm_campaign=more_than_a_story_share&t='+encodeURIComponent(t),
                "tw": "http://twitter.com/intent/tweet?text="+encoded+"&url=" + window.location.origin+ window.location.pathname +'%3Futm_source=tweeter%26utm_medium=social_share%26utm_campaign=more_than_a_story_share',
                "ln": "http://www.linkedin.com/shareArticle?mini=true&url=" + window.location.origin+ window.location.pathname+'%3F%26utm_source%3Dlinkedin%26utm_medium%3Dsocial_share%26utm_campaign%3Dmore_than_a_story_share'+'&source=more_than_a_story',
            }

            if(type === "facebook"){
                if(isMobile){
                    window.location.href = urls.fb;
                }else {
                    window.open(urls.fb,'sharer','toolbar=0,status=0,width=626,height=436');
                }

                gtag('event', 'Share button/Facebook/Click', {
                    'event_category': 'Share button (More than a story)',
                    'event_label':window.location.href
                });
            }

            if(type === "twitter"){
                if(isMobile) {
                    window.location.href = urls.tw;
                }else {
                    window.open(urls.tw,'twitter', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
                }
                gtag('event', 'Share button/Twitter/Click', {
                    'event_category': 'Share button (More than a story)',
                    'event_label':window.location.href
                });
            }

            if(type === "linkedin"){
                if(isMobile){
                    window.location.href = urls.ln;
                }else {
                    window.open(urls.ln,'linkedin', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
                }
                gtag('event', 'Share button/LinkedIn/Click', {
                    'event_category': 'Share button (More than a story)',
                    'event_label':window.location.href
                });
            }

            if(type === "email"){
                window.open("mailto:?subject="+document.title+'&body='+document.title+'%0D%0A'+ window.location.origin+ window.location.pathname+'%3Futm_source=email%26utm_medium=social_share%26utm_campaign=more_than_a_story', 'email', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
            }

            return false;
        },
        gotoSection:function(target){
            $('html, body').animate({
                scrollTop:$(target).offset().top
            }, 500);
        },
        getWindowSize:function(val){
            if(val) {
                this.ww = val[0];
                this.wh = val[1];
            }else {
                this.ww = $(window).width();
                this.wh = $(window).height();
            }
        },
        openShareBtn:function(){
            if(this.isShare === true) {
                this.isShare = false;
            }else {
                this.isShare = true;
            }
        },
        placeVideo:function(list){
            $('.video-holder').each(function(i){
                var vid = new Number($(this).data('video')) - 1;
                var holder = $(this).find('.video-holder-inner');
                var videoframe;
                videoframe = "<iframe type=\"text/html\" src=\"https://www.youtube.com/embed/"+list[vid].video+"?autoplay=0&controls=1&mute=1&playsinline=1&rel=0\" frameborder=\"0\" allow=\"autoplay\"></iframe>";
                holder.append(videoframe);
            });
        },
    }
});