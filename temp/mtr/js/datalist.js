var LOAD_STATUS = false;
var DATA_PATH   = './data/';
let topmenu, footmenu, banners, aside, language, agency ;
$.getJSON(DATA_PATH+'menu.json').then(function(data){topmenu = data}.bind(this));
$.getJSON(DATA_PATH+'menu-footer.json').then(function(data){footmenu = data}.bind(this));
$.getJSON(DATA_PATH+'banners.json').then(function(data){banners = data}.bind(this));
$.getJSON(DATA_PATH+'aside.json').then(function(data){aside = data}.bind(this));
$.getJSON(DATA_PATH+'agency.json').then(function(data){agency = data}.bind(this));