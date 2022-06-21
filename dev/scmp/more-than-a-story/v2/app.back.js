
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
        this.setScrollAni();
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

        /* setTimeout(function(){
            ScrollTrigger.refresh();
            $('.swiper-slide').each(function(){
                var ttt = $(this).width();
                $(this).find('.text-wrap').css('width', ttt+'px')
            });
        }, 100); */

        /* setTimeout(function(){
            ScrollTrigger.refresh();
        }, 1000); */

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
        checkIE:function(){
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf('MSIE ');
            var trident = ua.indexOf('Trident/');
            return (msie > 0 || trident > 0);
        },
        setScrollAni:function(){
            // Progress


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
                    if(self.direction === -1) {
                        showAnim.play();
                    }else {
                        showAnim.reverse();
                        setTimeout(function(){
                            SCMP.isShare = false;
                        }, 100);
                    }
                    self.direction === -1 ? showBtt.play() : showBtt.reverse();
                }
            });

            function goToSectionTop(section, anim) {
                gsap.to(window, {
                    scrollTo: {y: section, autoKill: true, ease: "expo.out"},
                    duration: 1
                });
            }

            function goToSection(i, anim) {
                if(!SCMP.backtotop && document.readyState === 'complete') {
                    gsap.set("body", {overflow: "hidden"});
                    gsap.to(window, {
                        scrollTo: { y: i * innerHeight, autoKill: false, ease: "Power3.easeInOut" },
                        duration: 0.6,
                        onComplete:function(){
                            setTimeout(function(){
                                gsap.set("body", {overflow: "auto"});
                            }, 00)
                        }
                    });
                    if(anim) {
                        anim.restart();
                    }
                }
            }

            function sectionsDesktop(){
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
                            }, 1000);
                        }
                    }
                });

                morethanDesc = new Swiper(".morethandesc", {
                    allowTouchMove: false,
                    effect: "fade",
                });

                morethanBg = new Swiper(".morethanbg", {
                    allowTouchMove: false,
                    effect: "fade",
                })

                videoandarticle = new Swiper(".videoarticle", {
                    allowTouchMove: false,
                })

                morethanTitle.on('slideChangeTransitionStart', function(){
                    var toW = $('.kewords .swiper-slide-active .text-wrap').width();
                    $('.kewords').css('width', toW+'px')
                });

                $(window).resize(function(){
                    morethanTitle.update();
                })

    
               /*  const sections = document.querySelectorAll("section");
                sections.forEach((section, i) => {


                        ScrollTrigger.create({
                            trigger: section,
                            start: "top top",
                            onEnter: function(){
                                goToSection(section);
                                morethanTitle.slideTo(i, 300);
                                morethanDesc.slideTo(i, 300);
                                morethanBg.slideTo(i, 1000);
                                setTimeout(function(){
                                    if(i+1 > 0) {
                                        $('.morethan-title-logo').addClass('hide');
                                    }

                                }, 500);
                            },
                            onEnterBack:function(){
                                goToSection(section)
                                morethanTitle.slideTo(i, 300);
                                morethanDesc.slideTo(i, 300);
                                morethanBg.slideTo(i, 1000);
                                setTimeout(function(){
                                    if(i < 1) {
                                        $('.morethan-title-logo').removeClass('hide');
                                    }
                                }, 500);
                            }
                        });

                    }); */


                    

               



            }

            function videoPlay(status){
                /* var url = $('.video-holder[data-video=1]').find('iframe').attr('src');
                var playUrl;
                if(status == 'play') {
                    playUrl = url.replace('autoplay=0', 'autoplay=1');
                }
                if(status == 'stop'){
                    playUrl = url.replace('autoplay=1', 'autoplay=0');
                }
                $('.video-holder[data-video="1"]').find('iframe').attr('src', playUrl); */
            }

            var sectionBtm, artiGroup;
            function sectionBottom(){
                /* gsap.utils.toArray(".area-conntent-btm").forEach(function(){
                    sectionBtm = gsap.timeline({
                        scrollTrigger: {
                            trigger: ".area-conntent-btm",
                            start:"top bottom",
                            end: "bottom bottom",
                            scrub: true,
                            onEnter:function(){
                                scrolling.disable();
                                $('.main-message').addClass('disable');
                                if(!SCMP.backtotop && document.readyState === 'complete') {
                                    gsap.set("body", {overflow: "hidden"});
                                    gsap.to(window, {
                                        scrollTo: { y: $('.area-conntent-btm').offset().top, autoKill: false, ease: "Power3.easeInOut" },
                                        duration: 1,
                                        onComplete:function(){
                                            scrolling.enable();
                                            gsap.set("body", {overflow: "auto"});
                                        }
                                    });
                                    if(anim) {
                                        anim && anim.restart();
                                    }

                                    console.log('hgero?')
                                }
                            },
                            onLeaveBack:function(){
                                $('.main-message').removeClass('disable');
                            }
                        }
                    });
                }); */

                gsap.utils.toArray(".article-group").forEach(function(group, index){
                    artiGroup = gsap.to(group, {
                        scrollTrigger: {
                            trigger: group,
                            start: 'top bottom-=100',
                            toggleActions: 'play none none reverse',
                        }
                    });

                    ScrollTrigger.create({
                        trigger: group,
                        id: index+1,
                        start: 'top center',
                        end: function(){
                            return "+="+group.clientHeight + 30
                        },
                        toggleActions: 'play reverse none reverse',
                        toggleClass: {targets: group, className: "hello"},
                        onEnter:function(){
                            $(group).addClass('active');
                        }
                    });
                });

            }

            var sectionVideo;
            function sectionVideo(){
               /*  gsap.utils.toArray("#video-n-article").forEach(function(){
                    sectionVideo = gsap.timeline({
                        scrollTrigger: {
                            trigger: "#video-n-article",
                            start:"top bottom",
                            end: "bottom bottom",
                            scrub: true,
                            onEnter:function(){
                                videoPlay('play');
                            },
                            onLeaveBack:function(){
                                videoPlay('stop');
                            }
                        }
                    });
                }); */
            }

            var sectionArticleGroup;
            function sectionArticleGroup(){
                /* gsap.utils.toArray(".article-wrap").forEach(function(){
                    sectionVideo = gsap.timeline({
                        scrollTrigger: {
                            trigger: ".article-wrap",
                            start:"top bottom",
                            end: "bottom bottom",
                            scrub: true,
                            onEnter:function(){
                                videoPlay('stop');
                            },
                            onLeaveBack:function(){
                                videoPlay('play');
                            }
                        }
                    });
                }); */
            }

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
                sectionsDesktop();
                sectionBottom();
                sectionVideo();
                sectionArticleGroup();
                console.log('desktop');
            }

            if(this.isMob === true) {
                console.log('mobile');
                sectionBottom();
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

                if (real_width < 769) {
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
                var target = $(this).attr('href')
                SCMP.backtotop = true;
                goToSectionTop(target);
                setTimeout(function(){
                    SCMP.backtotop = false;
                }, 1500);
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