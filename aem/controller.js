var element =  document.getElementById('cpt-btns');
if (typeof(element) != 'undefined' && element != null){
    console.log('already opend');
} else {
    // Add Stylesheet
    var style = document.createElement('link'),
    ref = document.querySelector('script');
    setAttributes(style, { 'id': 'cpt-style', 'href': 'https://leviheo.github.io/aem/controller.css', 'rel':'stylesheet', 'type':'text/css' });
    ref.parentNode.insertBefore(style, ref);

    // Get Current page title
    var pageTit = document.querySelector('title').innerHTML;

    // Add Buttons
    var btns = document.createElement('div');
    setAttributes(btns, {'id':'cpt-btns'});
    btns.innerHTML = 
        '<div>'+pageTit+'</div>'+
        '<div class="btns-inner">'+
            '<div class="btns-item" onclick="javascript:openPreviewAEM();">Preview AEM</div>'+
            '<div class="btns-item" onclick="javascript:openPreviewQA();">Preview QA</div>'+
            '<div class="btns-item" onclick="javascript:switchLang();">Switch Language</div>'+
            '<div class="btns-item" onclick="javascript:createTask();">Create Task</div>'+
        '</div>';
    document.body.appendChild(btns);
    setTimeout(function(){setAttributes(btns, {'class':'on-active'});}, 500);

    // Add Close Button
    var btnClose = document.createElement('div');
    setAttributes(btnClose, {'id': 'cpt-close', 'onclick': 'closePopup();'});
    document.body.appendChild(btnClose);

    // Add Mask
    var mask = document.createElement('div');
    mask.setAttribute('id', 'cpt-mask');
    document.body.appendChild(mask);
    setTimeout(function(){setAttributes(mask, {'class':'on-active'});}, 100);
}

function remove(me) {
    document.getElementById(me).outerHTML = "";
}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function openPreviewAEM() {
    var gg = '/editor.html/';
    if (window.location.href.indexOf(gg) > -1) {
        var swtichlink = window.location.href.replace(gg, '/');
        window.open(swtichlink + '?wcmmode=disabled');
    }
}

function openPreviewQA() {
    var gg = 'https://aem.samsung.com/editor.html/content/samsung/';
    if (window.location.href.indexOf(gg) > -1) {
        var swtichlink = window.location.href.replace(gg, 'https://qaweb.samsung.com/');
        window.open(swtichlink);
    }
}

function switchLang() {
    var routerHK = '/hk/';
    var routerEN = '/hk_en/';
    if (window.location.href.indexOf(routerHK) > -1) {
        var swtichlink = window.location.href.replace(routerHK, routerEN);
        window.location.href = swtichlink;
    }
    if (window.location.href.indexOf(routerEN) > -1) {
        var swtichlink = window.location.href.replace(routerEN, routerHK);
        window.location.href = swtichlink;
    }
}

function createTask() {
    window.location.href = "https://aem.samsung.com/aem/taskmanagement/create";
}

function closePopup() {
    setTimeout(function () {
        setAttributes(mask, {
            'class': ''
        });
        setAttributes(btns, {
            'class': ''
        });
    }, 500);
    setTimeout(function () {
        remove("cpt-close");
        remove("cpt-style");
        remove("cpt-mask");
        remove("cpt-btns");
    }, 800);
}

document.onkeydown=function(){
    if(window.event.keyCode == 27) {
        closePopup();
    }
};

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(prefix) {
        return this.slice(0, prefix.length) == prefix;
    };
}

var siteStatus,
    site_AEM  = "https://aem.samsung.com/",
    site_QA   = "https://qaweb.samsung.com/",
    site_Live = "https://www.samsung.com/";

if (document.location.href.startsWith(site_AEM)) {
    siteStatus = "aem";
}else if (document.location.href.startsWith(site_Live)) {
    siteStatus = "live";
}else if (document.location.href.startsWith(site_QA)) {
    siteStatus = "qa";
}else{
    siteStatus = "local";
}
