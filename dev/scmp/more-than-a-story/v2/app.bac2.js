$(function(){
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
    });

    morethanBg = new Swiper(".morethanbg", {
        allowTouchMove: false,
        effect: "fade",
    })

    videoandarticle = new Swiper(".videoarticle", {
        allowTouchMove: false,
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


const sections = document.querySelectorAll(".panel");

        // this scrolling object just allows us to conveniently call scrolling.enable(), scrolling.disable(), and check if scrolling.enabled is true.
        // some browsers (like iOS Safari) handle scrolling on a separate thread and can cause things to get out of sync (jitter/jumpy), so when we're animating the scroll position, force an update of GSAP tweens when there's a scroll event in order to maintain synchronization)
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


        function goToSection(section, anim, i) {
          if (scrolling.enabled && document.readyState === 'complete') { // skip if a scroll tween is in progress
            scrolling.disable();
            gsap.to(window, {
              scrollTo: {y: section, autoKill: false},
              onComplete: scrolling.enable,
              duration: 1.5
            });

            anim && anim.restart();
          }
        }

        sections.forEach((section, i) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top bottom-=1",
            end: "bottom top+=1",
            onEnter:function(){
                morethanTitle.slideTo(i, 300);
                morethanDesc.slideTo(i, 300);
                morethanBg.slideTo(i, 1000);
                goToSection(section);
            },
            onEnterBack:function(){

                morethanTitle.slideTo(i, 300);
                morethanDesc.slideTo(i, 300);
                morethanBg.slideTo(i, 1000);
                goToSection(section);
            },
            onUpdate: function(self){
                if(i == 4) {
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


var sectionBtm, artiGroup;
gsap.utils.toArray(".area-conntent-btm").forEach(function(section){
    sectionBtm = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start:"top bottom",
            end: "bottom bottom",
            onEnter:function(){
                showAnim.reverse();
                $('.main-message').addClass('disable');
                if(document.readyState === 'complete') {
                    goToSection(section)
                }
            },
            onLeaveBack:function(){
                $('.main-message').removeClass('disable');
            }
        }
    });
});

gsap.utils.toArray(".article-group").forEach(function(group, index){
    artiGroup = gsap.to(group, {
        scrollTrigger: {
            trigger: group,
            start: 'top bottom',
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
        },
        onUpdate: function(self){
            //showAnim.play();
        }
    });
});




var ww = $(window).width(), wh = $(window).height(), size = ww > 752 ? "desktop" : "mobile";


if(size === "desktop") {
console.log('d')
}

if(size === "mobile") {
console.log('m')
}

function infoResponsive() {
ww = $(window).width();
wh = $(window).height();
var newSize = ww > 752 ? "desktop" : "mobile";
if (newSize != size) {
size = newSize;
if (newSize === "mobile") {
if(wh > 900) {
    window.location.reload();
}
} else if (newSize === "desktop") {
if(wh > 900) {
    window.location.reload();
}
}
}
}

if(ww < 752) {

}

$(window).resize(function(){
infoResponsive()
});



});