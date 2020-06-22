var map;
var data = [];
var filterData = [];
var markers = [];
var selectedArea = 0;
var selectedCity = 0;
var prevZoom = 0;
var prevProvinceCode = '';
var prevCityCode = '';

$(function() {
    initAMap();
    getMapData();
    $('.amap-toolbar').attr('style',''); // remove tool bar

    // toggle dropdown
    $('.amap_dropdown_menu').on('click',function(){
        $('.amap_dropdown').toggleClass('open');
    });

    // dropdown area select
    $(document).on('click','.amap_dropdown_area', {} ,function(e){
        var e = $(e.currentTarget);
        e.parent().toggleClass('open');
        map.off('zoomchange', reloadAfterChanged);
        $('.amap_dropdown_menu p').text($(this).children('p').text());
        selectedArea = e.data('areaid');
        addMarker(data, 'district');
    })

    // dropdown city select
    $(document).on('click','.amap_dropdown_city', {} ,function(e){
        e.stopPropagation();
        var e = $(e.currentTarget);
        e.parent().parent().parent().toggleClass('open');
        map.off('zoomchange', reloadAfterChanged);
        $('.amap_dropdown_menu p').text($(this).text());
        selectedArea = e.parent().parent().data('areaid');
        selectedCity = e.data('cityid');
        addMarker(data, 'city');
    })

    // reload markers if drag the map / zoom changed
    // map.on('moveend', showInfoDragend);
    map.on('dragend', reloadAfterChanged);
    map.on('zoomchange', reloadAfterChanged);

})

function initAMap() {
    map = new AMap.Map('amap', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        mapStyle: "amap://styles/whitesmoke",
        zoom: 8, //初始化地图层级
        zooms: [5, 18],
        center: [113.264474,23.135024], //初始化地图中心点
        lang: "zh_cn", //可选值：en，zh_en, zh_cn
        scrollWheel: false,
        isHotspot: true
    });

    geocoder = new AMap.Geocoder({
        // radius: 1000 //范围，默认：500
    });
    
    var toolBar = new AMap.ToolBar({visible: true});
    
    map.addControl(toolBar);
        toolBar.hideDirection();
        toolBar.hideRuler();
        toolBar.hideLocation();
    
}

function getMapData() {
    $.ajax({
		type: "GET",
		dataType: "json",
		url: "./js/map.json",
		success: function(mapData) {
            data = mapData;
            addDropdown(data);
            addMarker(data, 'district');
        },
		error: function(data) {
			alert('Error loading data, please check url.');
        }
	});
}

function addDropdown(data) {
    for(area in data) {
        var val = data[area];
        $('ul.amap_dropdown').append("<li class='amap_dropdown_area' data-areaid="+val.id+"><p>"+ val.area +"</p><ul data-menuid="+val.id+" class='sub-menu'></ul>" + "</li>");
        for(var i = 0; i < val.city.length; i++) {
            var city = val.city[i].name;
            var id = val.city[i].id;
            $(`ul.amap_dropdown li ul.sub-menu[data-menuid=${val.id}]`).append("<li class='amap_dropdown_city' data-cityid="+ id +" role='menuitem'>"+ city +"</li>");
        };
    }
}

function addMarker(data, type, currlnglat = 0) {
    map.clearMap();
    if(type === 'city') {
        var data = data[selectedArea].city[selectedCity].sights;
        var infoWindow = new AMap.InfoWindow({
            isCustom: true,
            offset: new AMap.Pixel(0, 0)
        });

        for(var i = 0; i < data.length; i++) {
            // 点标记显示内容，HTML要素字符串
            var markerContent =
            '<div class="custom-content-marker '+ type +'">' +
                '<a href="#">'+
                    '<i class="fas fa-map-marker-alt" data-cate="'+ data[i].cate +'"></i>' +
                '</a>'+
            '</div>';

            var marker = new AMap.Marker({
            position: data[i].lnglat,
            // 将 html 传给 content
            content: markerContent,
            // 以 icon 的 [center bottom] 为原点
            offset: new AMap.Pixel(0, 0),
            });

            marker.content = 
            '<div class="amap_marker_info">'+
                '<img src="'+data[i].img+'" />'+
                '<div>'+
                    'Here is ' + data[i].name +
                '</div>'+
            '</div>';

            AMap.event.addListener(marker, 'click', function(e) {

                if(infoWindow.getIsOpen()) {
                    infoWindow.close();
                } else {
                    infoWindow.setContent(e.target.content);
                    infoWindow.open(map, e.target.getPosition());
                }
            });
            
            // 将 markers 添加到地图
            map.add(marker);
        }
    } else if (type === 'district') {
        var data = data[selectedArea].city;

        for(var i = 0; i < data.length; i++) {
            // 点标记显示内容，HTML要素字符串
            var markerContent =
            '<div class="custom-content-marker '+ type +'" data-cityid="'+data[i].id+'">' +
                '<a href="#">'+
                    '<i class="fas fa-map-marker-alt"></i>' +
                '</a>'+
            '</div>';
            var marker = new AMap.Marker({
            position: data[i].lnglat,
            // 将 html 传给 content
            content: markerContent,
            // 以 icon 的 [center bottom] 为原点
            offset: new AMap.Pixel(0, 0),
            });

            marker.setLabel({
                offset: new AMap.Pixel(0,10),
                content: "<div class='info'>"+ data[i].name +"</div>",
                direction: "top"
            })

            // 将 markers 添加到地图
            map.add(marker);
        }
    }

    // map.setCenter(data.location);
    if (currlnglat === 0) {
        map.setFitView();
        setTimeout(function() {
            map.on('zoomchange', reloadAfterChanged);
        }, 500);
    }
}

function reloadAfterChanged() {
    var zoom = map.getZoom();
    var currCenter = map.getCenter();
    var currlnglat = [currCenter.lng,currCenter.lat];
    var cityCode = '';

    map.getCity(function(info){
        cityCode = info.citycode;
    });
    
    geocoder.getAddress(currlnglat, function(status, result) {
        if (status === 'complete'&&result.regeocode) {
            var res = result.regeocode.addressComponent.adcode.slice(0,2);;
            var provinceCode = res+'0000';
            var checkZoomLevel = ((zoom < 11 && prevZoom >= 11) || (zoom >= 11 && prevZoom < 11));

            if (checkZoomLevel || provinceCode !== prevProvinceCode || cityCode !== prevCityCode) { FIXME: //checking logic fail
                for (var i = 0; i < data.length; i++) {
                    if (data[i].province.includes(provinceCode)) {
                        if ((zoom < 11 && provinceCode !== prevProvinceCode) || checkZoomLevel) {
                            $('.amap_dropdown_menu p').text(data[i].area);
                            selectedArea = data[i].id;
                            addMarker(data, 'district', currlnglat);
                        } else if ((zoom >= 11 && cityCode !== prevCityCode) || checkZoomLevel){
                            selectedArea = data[i].id;
                            for (var a = 0; a < data[i].city.length; a++) {
                                if (data[i].city[a].citycode === cityCode) {
                                    $('.amap_dropdown_menu p').text(data[i].city[a].name);
                                    selectedCity = data[i].city[a].id;
                                    addMarker(data, 'city', currlnglat);
                                }
                            }
                        }
                    }
                }
                prevZoom = zoom;
                prevProvinceCode = provinceCode;
                prevCityCode = cityCode;
            }
        }else{
            console.log('out of areas');
        }
    });
}

function cityMarkers(data, type) {
    var infoWindow = new AMap.InfoWindow({
        isCustom: true,
        offset: new AMap.Pixel(20, 0),
        closeWhenClickMap: true,
        showShadow: true
    });
    
    $('ul#amap_markers_list').html('');

    for(var i = 0; i < filterData.length; i++) {
        // 点标记显示内容，HTML要素字符串
        var markerContent =
        '<div class="custom-content-marker '+ type +'" data-hotspotid="'+ data[i].HotspotId +'" data-cate="'+ data[i].Category +'">' +
            '<i></i>' +
            // '<i class="fas fa-map-marker-alt"></i>' +
        '</div>';

        var marker = new AMap.Marker({
        position: data[i].LngLat,
        // 将 html 传给 content
        content: markerContent,
        // 以 icon 的 [center bottom] 为原点
        offset: new AMap.Pixel(0, 0),
        });

        marker.content = 
        '<div class="amap_marker_info">'+
            '<img src="'+data[i].Image+'" />'+
            '<div>'+
                'Here is ' + data[i].Title +
            '</div>'+
        '</div>';

        AMap.event.addListener(marker, 'click', function(e) {
            var lng = e.target.getPosition().lng;
            var lat = e.target.getPosition().lat;
            infoWindow.setContent(e.target.content);
            if(infoWindow.getIsOpen()) {
                infoWindow.close();
            } else {
                infoWindow.open(map, [lng,lat]);
            }
        });
        
        // 将 markers 添加到地图
        map.add(sightMarkers);

        var listContent =
        '<li data-hotspotid="'+ data[i].HotspotId +'">'+ data[i].Title +'</li>';

        $('ul#amap_markers_list').append(listContent);
    }
}

var svg = 'class="fas fa-map-marker-alt"';