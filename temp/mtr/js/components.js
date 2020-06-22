var skipNav = {
    template:'\
        <div id="skip-nav">\
            <ul>\
                <li><a href="#a-gnb-focus" class="btn-nav">Skip to navigation</a></li>\
                <li><a href="#a-primary-focus" class="btn-skip">Skip to main content</a></li>\
                <li><a href="#a-footer-focus" class="btn-skip">Skip to footer</a></li>\
            </ul>\
        </div>\
    '
}

var utilFontZoom = {
    template:'\
        <div class="util-font-zoom">\
            <a href="javascript:;" class="zoom-size" data-size="s" title="文字大小:小">A</a>\
            <a href="javascript:;" class="zoom-size" data-size="m" title="文字大小:中">A</a>\
            <a href="javascript:;" class="zoom-size" data-size="l" title="文字大小:大">A</a>\
        </div>\
    '
}

var hsrBtnBackTop = {
    props:['btntxt'],
    template:'\
    <button class="btn-back-to-top" title="返回頁面頂部">\
        <span class="blind" v-html="btntxt">返回頁面頂部</span>\
    </button>\
    '
}

var hsrHeader = {
    props:['menu', 'page', 'article'],
    components:{
        "utilFontzoom":utilFontZoom,
    },
    methods: {
        countShare: function(opt) {
            this.$root.countShare(opt);
        }
    },
    template:'\
    <header>\
        <div class="header-inner">\
            <div class="header-logo">\
                <h1><a href="/" title="Home"><img src="./images/common/ico/ico_home.svg" alt="主頁" title="主頁"/></a></h1>\
            </div>\
            <div class="header-util">\
                <util-fontzoom></util-fontzoom>\
                <div class="util-sub-logo">\
                    <h2 class="logo">\
                        <a href="https://www.highspeed.mtr.com.hk/" class="logo_hsr" target="_blank">\
                            <img src="./images/common/logo_hsr.png" alt="High Speed Rail" title="高速鐵路 High Speed Rail"/>\
                        </a>\
                        <a href="http://www.mtr.com.hk/ch/customer/main/index.html" class="logo_mtr" target="_blank">\
                            <img src="./images/common/logo_mtr.png" alt="港鐵 MTR" title="港鐵 MTR"/>\
                        </a>\
                    </h2>\
                </div>\
                <div class="util-nav">\
                    <a href="javascript:;" id="menubutton" class="btn-nav" aria-controls="gnb" aria-expanded="false">\
                        <div class="btn-nav-bar">\
                            <div class="bar-item"></div>\
                            <div class="bar-item"></div>\
                            <div class="bar-item"></div>\
                        </div>\
                        <div class="blind">Show Menu</div>\
                    </a>\
                    <nav id="gnb" aria-label="Main menu" aria-labelledby="menubutton">\
                        <div id="a-gnb-focus" class="blind" role="main">Skip Anchor - Navigation</div>\
                        <div class="gnb-outer">\
                            <div class="gnb_menu">\
                            <ul role="menu">\
                                <li v-for="(item, idx) in menu" :class="{\'has-child\':item.depth2}" role="none">\
                                    <div class="menu-index"><div v-html="\'0\'+(idx+1)"></div></div>\
                                    <a :href="item.link" v-html="item.name" class="depth1" :title="item.name" role="menuitem" aria-haspopup="true" aria-expanded="false"></a>\
                                    <ul v-if="item.depth2" role="menu">\
                                        <li v-for="submenu in item.depth2" role="none"><a :href="submenu.link" v-html="submenu.name" :title="submenu.name" class="depth2" role="menuitem"></a></li>\
                                    </ul>\
                                </li>\
                            </ul>\
                            </div>\
                            <div class="gnb_inner-util">\
                                <div class="inner-utill_font-zoom">\
                                    <util-fontzoom></util-fontzoom>\
                                </div>\
                                <div class="inner-utill_sns">\
                                    <div class="util-sns-share">\
                                        <a href="#" @click.prevent="countShare([page+\'-topmenu\', article, \'Facebook\', \'root\'])" class="sns-item sns-fb" title="Facebook 分享"><span class="blind">Facebook 分享</span></a>\
                                        <a href="#" @click.prevent="countShare([page+\'-topmenu\', article, \'WhatsApp\', \'root\'])" class="sns-item sns-whatsapp" title="WhatsApp 分享"><span class="blind">WhatsApp 分享</span></a>\
                                        <a href="#" @click.prevent="countShare([page+\'-topmenu\', article, \'WeChat\', \'root\'])" class="sns-item sns-wechat" title="WeChat 分享"><span class="blind">WeChat 分享</span></a>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="gnb_deco">\
                                <svg id="midline">\
                                    <path id="followPath_invisible" d="M1948,104s-114.33,206.927-358.04,443.472C1276.77,851.462,1030.79,594.575,801,313,460.415-104.343,64.2,315.861-16,411" stroke="#f8b37a"  fill="none"/>\
                                    <path id="followPath" d="M1948,104s-114.33,206.927-358.04,443.472C1276.77,851.462,1030.79,594.575,801,313,460.415-104.343,64.2,315.861-16,411" stroke="#f8b37a" fill="none"/>\
                                    <g id="circle-big" class="deco-circle" ><circle cy="-30" r="313"/><circle cy="-30" r="221.91"/><circle cy="-30" r="203.47"/><circle cy="-30" r="80.83"/><circle cy="283" r="40.42"/><circle cy="283" r="29.75"/><circle cy="283" r="3.91" fill="#f8b37a"/></g>\
                                    <g id="circle-sm" class="deco-circle" ><circle r="40.42"/><circle r="29.75"/><circle r="3.91" fill="#f8b37a"/></g>\
                                    <g id="circle-sm2" class="deco-circle" ><circle r="40.42"/><circle r="29.75"/><circle r="3.91" fill="#f8b37a"/></g>\
                                </svg>\
                                <svg id="topline">\
                                    <g id="circle-top" class="deco-circle"><circle cx="160" cy="160" r="160"/><circle cx="160" cy="160" r="127"/><circle cx="160" cy="160" r="115"/><circle cx="160" cy="160" r="40"/><circle cx="160" cy="160" r="3.91" fill="#f8b37a"/></g>\
                                </svg>\
                                <svg id="btmline">\
                                    <g id="circle-btm" class="deco-circle"><circle cx="160" cy="160" r="160"/><circle cx="160" cy="160" r="127"/><circle cx="160" cy="160" r="115"/><circle cx="160" cy="160" r="40"/><circle cx="160" cy="160" r="3.91" fill="#f8b37a"/></g>\
                                </svg>\
                            </div>\
                        </div>\
                    </nav>\
                </div>\
            </div>\
        </div>\
    </header>   \
    '
}

var hsrFooter = {
    props:['totoptxt', 'footmenu', 'copyright'],
    components:{
        "btnBacktop":hsrBtnBackTop,
    },
    template:'\
    <footer>\
        <btn-backtop :btntxt="totoptxt"></btn-backtop>\
        <div class="blind" id="a-footer-focus" role="main">Skip Anchor - Footer</div>\
        <div class="footer-inner">\
            <div class="footer-nav">\
                <ul role="menubar">\
                    <li v-for="(item, idx) in footmenu" role="none">\
                        <div class="menu-index"><div v-html="\'0\'+(idx+1)"></div></div>\
                        <a :href="item.link" :target="item.target" v-html="item.name" class="depth1" :title="item.name" role="menuitem"></a>\
                    </li>\
                </ul>\
            </div>\
            <div class="footer-copy"><small v-html="copyright"></small></div>\
        </div>\
    </footer>\
   '
}

var hasrBreadcrumb = {
    props:['root','depth1','depth1link','depth2','depth2link','current'],
    template:'\
        <nav aria-label="Breadcrumb" class="breadcrumb">\
            <ol>\
                <li>\
                    <a href="/" v-html="root" :title="root"></a>\
                </li>\
                <li v-if="depth1">\
                    <a :href="depth1link" v-html="depth1" :title="depth1"></a>\
                </li>\
                <li v-if="depth2">\
                    <a :href="depth2link" v-html="depth2" :title="depth2"></a>\
                </li>\
                <li v-if="current">\
                    <a href="#" aria-current="page" v-html="current" tabindex="-1" :title="current"></a>\
                </li>\
            </ol>\
        </nav>\
    '
}

var hasrBtnGoToPrev = {
    props:['goto', 'gototxt'],
    template:'\
        <nav aria-label="Go to previous page" class="go-to-prev">\
            <a :href="goto" v-html="gototxt"></a>\
        </nav>\
    '
}

var btnCircle = {
    props:{
        txt:String,
        link:String,
    },
    template:'\
    <a :href="link" class="btn-default type-ani-circle" :title="txt">\
        <div class="btn-txt_tit" v-html="txt"></div>\
        <div class="btn-txt_line"><i></i></div>\
    </a>\
    '
}

var btnAngle = {
    props:{
        txt:String,
        link:String,
    },
    template:'\
    <a :href="link" class="btn-default type-angle" :title="txt">\
        <div class="btn-txt_tit" v-html="txt"></div>\
    </a>\
    '
}

var btnLoadMore = {
    props:['txt', 'show', 'max'],
    template:'\
        <a href="javascript:;" class="btn-loadmore" @click="updatelistshow" v-if="show < max" :title="txt">\
            <div class="deco-go-down go-ani">\
                <div class="go-down_line"><i></i></div>\
            </div>\
            <span v-html="txt"></span>\
        </a>\
    ',
    methods: {
        updatelistshow: function() {
            //this.$root.listShow += 5;
            this.$root.updatelistshow();
        }
    }
}

var hsrTopBanner = {
    props:['banners', 'text', 'page'],
    components:{
        "btnCirlce":btnCircle,
    },
    template:'\
        <div id="topbanner" role="banner">\
            <div v-for="(item, idx) in banners" :key="idx" v-if="item.pageid == page">\
                <div class="topbanner-img swiper-container">\
                    <div class="swiper-wrapper">\
                        <div class="swiper-slide" v-for="(banner, idx) in item.banners" :key="idx">\
                            <img :src="banner.img" class="img-d" :alt="banner.img_alt?banner.img_alt:\'\'"/>\
                            <img :src="banner.img_t" class="img-t" :alt="banner.img_t_alt?banner.img_t_alt:\'\'"/>\
                            <img :src="banner.img_m" class="img-m" :alt="banner.img_m_alt?banner.img_m_alt:\'\'"/>\
                        </div>\
                    </div>\
                </div>\
                <div class="topbanner-deco">\
                    <div>\
                        <img :src="\'/images/common/sections/deco-top/\'+page+\'/bg_topbanner_btm.png\'" alt="" class="br767"/>\
                        <img :src="\'/images/common/sections/deco-top/\'+page+\'/bg_topbanner_btm_m.png\'" alt="" class="view767"/>\
                    </div>\
                </div>\
                <div class="topbanner-txt swiper-container">\
                    <div class="swiper-wrapper">\
                        <div class="swiper-slide" v-for="banner in item.banners">\
                            <div class="banner-txt-box">\
                                <h2 class="bn-txt_tit" v-html="banner.tit"></h2>\
                                <p class="bn-txt_desc" v-html="banner.desc"></p>\
                                <div class="bn-txt_btn"><btn-cirlce :txt="text.btnDetail" :link="banner.link"></btn-cirlce></div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="topbanner-util" v-if="item.banners.length > 1">\
                    <div class="swiper-pagination"></div>\
                    <a href="javascript:;" class="btn-banner-play"><span class="blind">Banner Play</span></a>\
                    <a href="javascript:;" class="btn-banner-stop"><span class="blind">Banner Stop</span></a>\
                </div>\
            </div>\
        </div>\
    '
}

var hsrSubTopBanner = {
    props:['banners', 'page'],
    template:'\
        <div id="topbanner" class="topbanner-sub" role="banner" v-if="page">\
        <div v-for="(item, idx) in banners" :key="idx" v-if="item.pageid == page">\
                <div v-for="(banner, idx) in item.banners" :key="idx">\
                    <div class="topbanner-img" :style="{ backgroundImage: \'url(\'+banner.img+\')\' }">\
                        <img :src="banner.img" class="img-d" :alt="banner.img_alt?banner.img_alt:\'\'"/>\
                        <img :src="banner.img_t" class="img-t" :alt="banner.img_t_alt?banner.img_t_alt:\'\'"/>\
                    </div>\
                </div>\
                <div class="topbanner-deco">\
                    <div>\
                        <img :src="\'/images/common/sections/deco-top/\'+page+\'/bg_topbanner_btm.png\'" alt="" class="br767"/>\
                        <img :src="\'/images/common/sections/deco-top/\'+page+\'/bg_topbanner_btm_m.png\'" alt="" class="view767"/>\
                    </div>\
                </div>\
            </div>\
        </div>\
    '
}

var hsrAgencyPop = {
    props:['agency'],
    template:'\
        <div class="ex-item-detail">\
            <article class="detail-cont_agency">\
                <h3 class="sec-tit tit-type_line">\
                    <div><span class="sec-tit_txt">高鐵自由行專家</span></div>\
                </h3>\
                <div class="cont_agency__inner">\
                    <ul class="agency-list">\
                        <li class="agency-item" v-for="(item, idx) in agency" v-if="idx < 9">\
                            <div class="agency-item_logo">\
                                <figure>\
                                    <img :src="item.logo" :alt="item.name?item.name:\'\'" class="br767"/>\
                                    <img :src="item.logo_m" :alt="item.name?item.name:\'\'" class="view767"/>\
                                    <figcaption class="blind" v-html="item.name+\' logo\'"></figcaption>\
                                </figure>\
                                <span class="agency-item_license" v-html="\'牌照號碼：\'+item.license"></span>\
                            </div>\
                            <div class="agency-item_info">\
                                <div class="agency_info__site">\
                                    <i class="ico-type-circle ico-website"></i>\
                                    <a v-html="item.website" :href="\'https://\'+item.website" target="_blank"></a>\
                                </div>\
                                <div class="agency_info__tel">\
                                    <i class="ico-type-circle ico-tel"></i>\
                                    <a v-html="\'+852 \'+item.tel1" :href="\'tel:+852 \'+item.tel1"></a>\
                                    <a v-html="\'&nbsp;/ \'+item.tel2" v-if="item.tel2" :href="\'tel:+852 \'+item.tel2"></a>\
                                </div>\
                            </div>\
                        </li>\
                    </ul>\
                </div>\
            </article>\
            <a href="javascript:;" class="btn-agency-close">\
                <span class="blind">Close popup</span>\
            </a>\
        </div>\
    '
}

var hsrAside = {
    props:['link'],
    template:'\
    <aside class="external-link">\
        <ul>\
            <li>\
                <a :href="link[0].link_d" target="_blank" class="ext-item btn-fare-pdf" role="link" aria-label="">\
                    <span class="blind"  v-html="link[0].tit">Open to Fare information PDF</span>\
                </a>\
            </li>\
            <li>\
                <a :href="link[1].link_d" target="_blank" class="ext-item btn-timetable" role="link" aria-label="">\
                    <span class="blind"  v-html="link[1].tit">Go to Timetable information</span>\
                </a>\
            </li>\
            <li>\
                <a href="javascript:;" class="ext-item btn-agency">\
                    <span class="blind">Open Agency List</span>\
                </a>\
            </li>\
        </ul>\
    </aside>\
    '
}

var hsrSectionTit = {
    props:['title', 'img'],
    template:'\
        <h2 class="sec-tit tit-type_line">\
            <div>\
                <div class="sec-tit_ico" aria-hidden="true" v-if="img">\
                    <img :src="\'./images/common/ico/ico_\'+img+\'.png\'" :srcset="\'./images/common/ico/ico_\'+img+\'.svg\'" alt=""/>\
                </div>\
                <span class="sec-tit_txt" v-html="title"></span>\
            </div>\
        </h2>\
    '
}

var hsrTop = {
    props:['top', 'page', 'article'],
    components:{
        "hsrSkip":skipNav,
        "hsrHeader":hsrHeader,
    },
    template:'\
    <div>\
        <hsr-skip></hsr-skip>\
        <hsr-header :menu="top" :page="page" :article="article"></hsr-header>\
    </div>\
    '
}

var hsrFoot = {
    props:['aside', 'backtotop', 'agencylist', 'footmenulist', 'copytxt'],
    components:{
        "hsrAside":hsrAside,
        "hsrAgencyPop":hsrAgencyPop,
        "hsrFooter":hsrFooter,
    },
    template:'\
    <div>\
        <hsr-aside :link="aside"></hsr-aside>\
        <hsr-agency-pop :agency="agencylist"></hsr-agency-pop> \
        <hsr-footer :footmenu="footmenulist" :totoptxt="backtotop" :copyright="copytxt"></hsr-footer>\
    </div>\
    '
}

// Homepage
// NOTE : Not Used
var homeLatest = {
    props:['list', 'filter', 'page', 'btntxt', 'btntxtdetail'],
    components:{
        "btnCirlce":btnCircle,
    },
    methods: {
        countlike: function(target) {
            this.$root.countlike(target);
        },
        isLikeActive:function(target) {
            this.$root.isLikeActive(target);
        },
        isLikeActiveCnt:function(target){
            this.$root.isLikeActiveCnt(target);
        }
    },
    template:'\
        <div>\
            <a :href="page" v-html="btntxt" class="btn-default-arrow" role="link"></a>\
            <div class="swiper-container">\
                <div class="swiper-wrapper latest-list" v-for="section in list" v-if="section.section == filter">\
                    <div class="swiper-slide" v-for="(list, i) in section.article" :key="i">\
                        <div class="article-item">\
                            <div>\
                                <a :href="list.link">\
                                    <figure class="article-thumb">\
                                        <img :src="list.thumb" :alt="list.thumb_alt?list.thumb_alt:\'\'" class="br767"/>\
                                        <img :src="list.thumb_m" :alt="list.thumb_m_alt?list.thumb_m_alt:\'\'" class="view767"/>\
                                        <figcaption class="blind" v-html="list.thumb_alt"></figcaption>\
                                    </figure>\
                                </a>\
                                <div class="article-info">\
                                    <a :href="list.link">\
                                        <h3 class="arti-info_tit" v-html="list.tit"></h3>\
                                        <p class="arti-info_desc" v-html="list.desc"></p>\
                                    </a>\
                                    <div class="arti-info_like">\
                                        <div class="btn-like" :data-article-section="section.section" :data-article-id="list.id" @click="countlike([section.section, list.id])" tabindex="0">\
                                            <i class="ico-heart"></i><span class="like-count" v-html="0"></span>\
                                        </div>\
                                        <div class="btn-like" :class="[isLikeActive([section.section, list.id])?\'i-like\':\'\']" :data-article-section="section.section" :data-article-id="list.id" @click="countlike([section.section, list.id])" tabindex="0">\
                                            <i class="ico-heart"></i><span class="like-count" v-html="isLikeActiveCnt([section.section, list.id])"></span>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="article-btn">\
                                    <btn-cirlce :txt="btntxtdetail" :link="list.link"></btn-cirlce>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="swiper-pagination"></div>\
            </div>\
            <div class="btn-slide-ctr swiper-button-prev"></div>\
            <div class="btn-slide-ctr swiper-button-next"></div>\
        </div>\
    '
}