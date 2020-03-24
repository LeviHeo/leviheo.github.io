'use strict';

// Check -- Status
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (prefix) {
        return this.slice(0, prefix.length) == prefix;
    };
}

var siteStatus,
    site_AEM        = "https://aem.samsung.com/",
    site_QA         = "https://qaweb.samsung.com/",
    site_Live       = "https://www.samsung.com/",
    site_CreateTask = "https://aem.samsung.com/aem/taskmanagement/create",
    site_AEMEditor = "https://aem.samsung.com/editor.html/content/samsung/",
    status_AEM      = "AEM",
    status_QA       = "QA",
    status_Live     = "LIVE",
    status_Local    = "LOCAL",
    lang,
    path;

// Check -- Language
var routerHK = '/hk/',
routerEN = '/hk_en/';
if (window.location.href.indexOf(routerHK) > -1) {
lang = "hk";
}
if (window.location.href.indexOf(routerEN) > -1) {
lang = "hk_en";
}

if (document.location.href.startsWith(site_AEM)) {
    siteStatus = status_AEM;
    path       = window.location.href.replace(site_AEM, '');
} else if (document.location.href.startsWith(site_Live)) {
    siteStatus = site_Live;
    path       = window.location.href.replace(site_Live, '');
} else if (document.location.href.startsWith(site_QA)) {
    siteStatus = status_QA;
    path       = window.location.href.replace(site_QA, '');
} else {
    siteStatus = status_Local;
    if (lang == "hk") {
        path = window.location.href.replace(/.*(?=\/hk)/i, "");    
    } else if(lang=="hk_en"){
        path = window.location.href.replace(/.*(?=\/hk_en)/i, "");    
    }
}

console.log(siteStatus);

var element = document.getElementById('cpt-btns');
if (typeof (element) != 'undefined' && element != null) {
    console.log('already opened');
} else {

    // Add Stylesheet
    var style = document.createElement('link'),
        ref = document.querySelector('script');
    //setAttributes(style, { 'id': 'cpt-style', 'href': '/helper.min.css', 'rel': 'stylesheet', 'type': 'text/css' });
    setAttributes(style, { 'id': 'cpt-style', 'href': 'https://leviheo.github.io/aem/helper.css', 'rel': 'stylesheet', 'type': 'text/css' });
    ref.parentNode.insertBefore(style, ref);

    // Get Current page info
    var pageTit      = document.querySelector('title').innerHTML;
    var pageDesc     = getMeta('description');
    var pageKeyword  = getMeta('keywords');
    var pageSitecode = lang; //getMeta('sitecode');

    // Add Buttons
    function btnDiv(txt, func, param) {return '<div class="btns-item" onclick="javascript:' + func + '('+param+');">' + txt + '</div>';}
    var btn_PreviewAEM      = btnDiv('Preview AEM', 'openPreviewAEM'),
        btn_PreviewQA       = btnDiv('Preview QA', 'openPreviewQA'),
        btn_SwitchLang      = btnDiv('Switch Language', 'switchLang'),
        btn_CreateTask      = btnDiv('Create Task', 'createTask'),
        btn_ViewTask        = btnDiv('View Task', 'viewTask'),
        btn_SearchTask      = btnDiv('Search Task', 'searchTask'),
        btn_AutoInputTaskHK = btnDiv('Auto Input Task(HK)', 'AutoInpuTask', '\"hk\"'),
        btn_AutoInputTaskEN = btnDiv('Auto Input Task(HK_EN)', 'AutoInpuTask', '\"hk_en\"');
    
    function detailRow(list, data) {
        return '<div class="cpt-detail-row">' +
                    '<div class="cpt-detail-dh">' +
                        list +
                    '</div>' +
                    '<div class="cpt-detail-dt">' +
                        data +
                    '</div>'+
                '</div>';
    }

    var info_status      = detailRow('Status', siteStatus);
    var info_description = detailRow('Description', pageDesc);
    var info_keyword     = detailRow('Keyword', pageKeyword);
    var info_sitecode    = detailRow('Sitecode', pageSitecode);

    var btns = document.createElement('div');
    setAttributes(btns, { 'id': 'cpt-btns' });
    var btnsCont =
        '<div class="btns-inner">' +
            '<div id="cpt-info">' +
                '<div class="cpt-tit">' + pageTit + '</div>' +
                '<div class="cpt-detail">' +
                    info_status +
                    info_sitecode +
                    info_description +
                    info_keyword;
    
                    if (siteStatus == status_Local || siteStatus == undefined) {
                    }
                    
                    if (siteStatus == status_QA) {
                    }
                    
                    if (siteStatus == status_Live) {
                    }
                    
                    if (siteStatus == status_AEM) {
                    }
    
        btnsCont += 
                    '<div class="cpt-detail-row">' +
                        '<div class="cpt-detail-dh">' +
                            'Mobile' +
                        '</div>' +
                        '<div class="cpt-detail-dt">' +
                            '<div class="cpt-detail-qr">' +
                                '<div class="cpt-qr-item"><div class="cpt-qr-item_tit">QA</div><div class="cpt-qr-item_img"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+site_QA+lang+'/'+path+'"/></div></div>' +
                                '<div class="cpt-qr-item"><div class="cpt-qr-item_tit">Live</div><div class="cpt-qr-item_img"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+site_Live+lang+'/'+path+'"/></div></div>'+
                            '</div>' +
                        '</div>'+
                    '</div>'+
                '</div>' +
            '</div>' + 
            
        '<div id="cpt-btnlist"><div>';
            
                    if (document.location.href.startsWith(site_AEMEditor)) {
                        btnsCont += btn_PreviewAEM + btn_PreviewQA;
                    }
                        
        btnsCont += btn_SwitchLang +
                    btn_CreateTask;
                    
                    // Create Task page
                    if (document.location.href.startsWith(site_CreateTask)) {
                        btnsCont += btn_AutoInputTaskHK + btn_AutoInputTaskEN;
                    }
    
        btnsCont += btn_ViewTask +
                    btn_SearchTask +
            '</div></div>' +
        '</div>';
    
    btns.innerHTML = btnsCont;
        
    document.body.appendChild(btns);
    setTimeout(function () { setAttributes(btns, { 'class': 'on-active' }); }, 800);

    var infoHead = document.getElementById("cpt-info");
    setTimeout(function () {
        setAttributes(infoHead, { 'class': 'on-active' });
    }, 800);

    // Add Close Button
    var btnClose = document.createElement('div');
    setAttributes(btnClose, { 'id': 'cpt-close', 'onclick': 'closePopup();' });
    document.body.appendChild(btnClose);

    // Add Mask
    var mask = document.createElement('div');
    mask.setAttribute('id', 'cpt-mask');
    document.body.appendChild(mask);
    setTimeout(function () { setAttributes(mask, { 'class': 'on-active' }); }, 100);
}

// Functions 
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
    var uri = "";
    if (lang == "hk") {
        uri = window.location.href.replace(/.*(?=\/hk)/i, "");    
    } else if(lang=="hk_en"){
        uri  = window.location.href.replace(/.*(?=\/hk_en)/i, "");    
    }
    if (uri.indexOf('.html')) {
        uri = uri.replace(".html", "");    
    }
    var createPagePath = 'https://aem.samsung.com/aem/taskmanagement/create';
    window.open(createPagePath + '?siteCode=' + lang + '&path=' +uri+'&title='+pageTit.split('|')[0] );
}

function AutoInpuTask(siteCode) {
    // Get Parameter From URL
    var QueryString = function () {
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }();

    var inputPagetit = QueryString.title,
        inputLang = QueryString.siteCode,
        inputPath = QueryString.path;
    
    if (inputLang) {
        $('.coral-SelectList-item--option[data-value="'+inputLang+'"]').click();
    } else {
        $('.coral-SelectList-item--option[data-value="'+siteCode+'"]').click();    
    }

    $('.coral-SelectList-item--option[id="coral-66"]').click();
    setTimeout(function(){$('#dueDate').find('li.coral-SelectList-item--option').click();}, 500);
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    if (inputPagetit) {
        $('input[name="requestTitle"]').val(inputPagetit+' ' + date);
    } else {
        $('input[name="requestTitle"]').val('New Task ' + date);    
    }
    
    $('.coral-TabPanel-navigation').find('a:nth-child(2)').click();
    $('.coral-SelectList-item--option[data-value="DP"]').click();
    $('.coral-SelectList-item--option[data-value="Static"]').click();

    if (inputPath) {
        $('input[name="inputPath"]').val(inputPath);
    } else {
        $('input[name="inputPath"]').focus();    
    }

    if (inputPagetit) {
        $('input[name="pageTitle"]').val(inputPagetit+' ' + date);
    } else {
        $('input[name="pageTitle"]').val('New Task Title')
    }
}

function viewTask() {
    window.open("https://aem.samsung.com/notifications.html");
}

function searchTask() {
    var innerpop = document.createElement('div');
    innerpop.setAttribute('id', 'cpt-inner-pop');
    innerpop.innerHTML =
        '<div class="popups-inner">' +
            '<div class="popups-tit">Please enter the Requester ID.</div>' +
            '<div class="popups-cont"><div class="popups-input"><input name="requester" id="find-requester" /></div></div>' +
            '<div class="popups-btns"><a href="javascript:closeInPopup();">Back</a></div>'+
        '</ div> ';

    document.body.appendChild(innerpop);
    setTimeout(function () { setAttributes(innerpop, { 'class': 'on-active' }); }, 100);

    var inputel = document.getElementById('find-requester');
    inputel.focus();
    inputel.addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            var requester = inputel.value;
            window.open("https://aem.samsung.com/aem/taskmanagement?_charset_=utf-8&task=alltask&siteCode=all&taskStatus=RUNNING&searchKey=requestedBy&keyword="+requester);
        }
    });
}

function closePopup() {
    setTimeout(function () {
        setAttributes(mask, {'class': ''});
        setAttributes(btns, {'class': ''});
        setAttributes(infoHead, {'class': ''});
    }, 100);
    setTimeout(function () {
        remove("cpt-close");
        remove("cpt-style");
        remove("cpt-mask");
        remove("cpt-btns");
    }, 800);
}

function closeInPopup() {
    var innerpop = document.getElementById('cpt-inner-pop');
    setTimeout(function () {
        setAttributes(innerpop, {'class': ''});
    }, 100);
    setTimeout(function () {
        remove("cpt-inner-pop");
    }, 500);
}

function getMeta(metaName) {
    const metas = document.getElementsByTagName('meta');

    for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === metaName) {
        return metas[i].getAttribute('content');
        }
    }

    return '';
}

document.onkeydown = function () {
    if (window.event.keyCode == 27) {
        closePopup();
    }
};
