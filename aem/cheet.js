'use strict';
// Check -- Status
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (prefix) {
        return this.slice(0, prefix.length) == prefix;
    };
}

var siteStatus,
    site_AEM = "https://aem.samsung.com/",
    site_QA = "https://qaweb.samsung.com/",
    site_Live = "https://www.samsung.com/",
    lang,
    path;

if (document.location.href.startsWith(site_AEM)) {
    siteStatus = "AEM";
    path = window.location.href.replace(site_AEM, '');
} else if (document.location.href.startsWith(site_Live)) {
    siteStatus = "LIVE";
    path = window.location.href.replace(site_Live, '');
} else if (document.location.href.startsWith(site_QA)) {
    siteStatus = "QA";
    path = window.location.href.replace(site_QA, '');
} else {
    siteStatus = "LOCAL";
}

// Check -- Language
var routerHK = '/hk/',
    routerEN = '/hk_en/';
if (window.location.href.indexOf(routerHK) > -1) {
    lang = "hk";
}
if (window.location.href.indexOf(routerEN) > -1) {
    lang = "hk_en";
}

var element = document.getElementById('cpt-btns');
if (typeof (element) != 'undefined' && element != null) {
    console.log('already opend');
} else {

    // Add Stylesheet
    var style = document.createElement('link'),
        ref = document.querySelector('script');
    setAttributes(style, { 'id': 'cpt-style', 'href': '/controller.min.css', 'rel': 'stylesheet', 'type': 'text/css' });
    ref.parentNode.insertBefore(style, ref);

    // Get Current page info
    var pageTit      = document.querySelector('title').innerHTML;
    var pageDesc     = getMeta('description');
    var pageKeyword  = getMeta('keywords');
    var pageSitecode = getMeta('sitecode');

    // Add Buttons
    function btnDiv(txt, func) {return '<div class="btns-item" onclick="javascript:' + func + '();">' + txt + '</div>';}
    var btn_PreviewAEM = btnDiv('Preview AEM', 'openPreviewAEM'),
        btn_PreviewQA  = btnDiv('Preview QA', 'openPreviewQA'),
        btn_SwitchLang = btnDiv('Switch Language', 'switchLang'),
        btn_CreateTask = btnDiv('Create Task', 'createTask'),
        btn_ViewTask   = btnDiv('View Task', 'viewTask');
    
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
    btns.innerHTML =
        '<div class="btns-inner">' +
            '<div id="cpt-info">' +
                '<div class="cpt-tit">' + pageTit + '</div>' +
                '<div class="cpt-detail">' +
                    info_status +
                    info_sitecode +
                    info_description +
                    info_keyword +
                    '<div class="cpt-detail-row">' +
                        '<div class="cpt-detail-dh">' +
                            'Mobile' +
                        '</div>' +
                        '<div class="cpt-detail-dt">' +
                            '<div class="cpt-detail-qr">' +
                                '<div class="cpt-qr-item"><div class="cpt-qr-item_tit">QA</div><div class="cpt-qr-item_img"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+site_QA+path+'"/></div></div>' +
                                '<div class="cpt-qr-item"><div class="cpt-qr-item_tit">Live</div><div class="cpt-qr-item_img"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+site_Live+path+'"/></div></div>'+
                            '</div>' +
                        '</div>'+
                    '</div>'+
                '</div>' +
            '</div>' +
            '<div id="cpt-btnlist"><div>' +
                    btn_PreviewAEM +
                    btn_PreviewQA +
                    btn_SwitchLang +
                    btn_CreateTask +
                    btn_ViewTask +
            '</div></div>' +
        '</div>';
    
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
    var createPage = 'https://aem.samsung.com/aem/taskmanagement/create';
    window.open(createPage + '?siteCode=' + lang + '&path=' +path );
}

function viewTask() {
    window.open("https://aem.samsung.com/notifications.html");
}

function closePopup() {
    setTimeout(function () {
        setAttributes(mask, {
            'class': ''
        });
        setAttributes(btns, {
            'class': ''
        });
        setAttributes(infoHead, {
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

/*

Create Task

$('.coral-SelectList-item--option[data-value="hk"]').click();
$('.coral-SelectList-item--option[id="coral-66"]').click();
setTimeout(function(){$('#dueDate').find('li.coral-SelectList-item--option').click();}, 500);
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
$('input[name="requestTitle"]').val('New Task '+ date);
$('.coral-TabPanel-navigation').find('a:nth-child(2)').click();
$('.coral-SelectList-item--option[data-value="DP"]').click();
$('.coral-SelectList-item--option[data-value="Static"]').click();
$('input[name="inputPath"]').focus();
$('input[name="pageTitle"]').val('New Task Title')

*/
