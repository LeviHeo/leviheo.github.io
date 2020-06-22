var map;
var data = [];
var filterData = [];
var prevFilterData = [];
var selectedArea = 0;
var selectedCity = 0;
var currZoom = 0;
var prevZoom = 0;
var prevProvinceCode = '';
var prevCityCode = '';
var customPanel = false;
var prevWinSize;
var swiper;
var currSlide = 0;

$(function() {
    // check url parameter
    if (window.location.search) {
        var region = getURLParameter('region');
        var city = getURLParameter('city');
        var sight = getURLParameter('sight');
        if (region) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "./data/hotspot.json",
                success: function(data) {
                    map.setZoomAndCenter(8, data[region-1].LngLat);
                    selectedArea = region;
                },
                error: function(data) {
                    alert('Error loading data, please check url.');
                }
            });
        }
        if (city && sight) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "./data/hotspot.json",
                success: function(data) {
                    var cityArray = data[region-1].City;
                    var cityIndex = cityArray.findIndex(x => x.CityId == city);
                    var hotspotArray = cityArray[cityIndex].Hotspot;
                    var hotspotIndex = hotspotArray.findIndex(x => x.HotspotId == sight);
                    map.setZoomAndCenter(13, hotspotArray[hotspotIndex].HotspotLngLat);
                    var tpl =
                    '<a href="javascript:void(0);" data-hotspotid="'+ hotspotArray[hotspotIndex].HotspotId +'">'+
                    '<p>'+ hotspotArray[hotspotIndex].Title +'</p>'+
                    '</a>';
                    var infoWindow = new AMap.InfoWindow({
                        position: hotspotArray[hotspotIndex].HotspotLngLat,
                        offset: new AMap.Pixel(10, -35),
                        content: tpl
                    });
                    $('.modal-body').empty().append(modalTpl(hotspotArray[hotspotIndex]));
                    $('#myModal').modal({backdrop: 'static',show: true});
                    // window.location.hash = '#c'+ city + 's' + sight;
                    setTimeout(function(){
                        infoWindow.open(map);
                    }, 1000)
                },
                error: function(data) {
                    alert('Error loading data, please check url.');
                }
            });
        }
    };

    getMapData();
    initAMap();
    $('.amap-toolbar').attr('style',''); // remove tool bar

    // keyup event
    $('.search_bar input').on('input', function() {
        // console.log($(this).val());
        var searchArray = [];
        if ($(this).val() !== '') {
            $('.search_result').html('').show();
            for (var a=0;a < data.length;a++) {
                var city = data[a].City;
                for (var b=0;b < city.length;b++) {
                    var hotspot = city[b].Hotspot;
                    for (var c=0; c < hotspot.length;c++) {
                        var target = hotspot[c].Title;
                        if (target.includes($(this).val())) {
                            searchArray.push(hotspot[c]);
                            $('.search_result').append(
                                '<div class="search_result_item" data-area="'+ (a+1) +'" data-city="'+ (b+1) +'" data-hotspot="'+ hotspot[c].HotspotId +'">'+ target +'</div>'
                            )
                        }
                    }
                }
            }
        }
    });

    $(document).on('click', '.search_result_item', {}, function(e) {
        var area = $(this).data('area');
        var city = $(this).data('city');
        var hotspot = $(this).data('hotspot');
        selectedArea = area;
        changeURLregion()
        setTimeout(function() {
            getOneOverlay(area, city, hotspot);
            $('.search_result').hide();
        },300)
    })

    // toggle dropdown
    $('.amap_dropdown_menu').on('click',function(){
        $('.amap_dropdown').toggleClass('open');
    });

    // dropdown area select
    $(document).on('click','.amap_dropdown_area .amap_dropdown_areaLebal', {} ,function(e){
        var e = $(e.currentTarget);
        e.parent().parent().toggleClass('open');
        // map.off('zoomchange', reloadAfterChanged);
        $('.amap_dropdown_menu p').text($(this).text());
        selectedArea = e.parent().data('areaid');
        changeURLregion();
        // addMarker(data, 'district');
        // map.setZoomAndCenter(7, data.find(x => x.RegionID === selectedArea).LngLat);
        setTimeout(function() {
            map.setZoomAndCenter(7, data[selectedArea-1].LngLat);
        },300);
    })

    // dropdown city select
    $(document).on('click','.amap_dropdown_city', {},function(e){
        e.stopPropagation();
        var e = $(e.currentTarget);
        e.parent().parent().parent().toggleClass('open');
        map.off('zoomchange', reloadAfterChanged);
        $('.amap_dropdown_menu p').text($(this).text());
        selectedArea = e.data('areaid');
        selectedCity = e.data('cityid');
        changeURLregion();
        setTimeout(function() {
            filterSightData();
            map.on('zoomchange', reloadAfterChanged);
            setTimeout(function() {
                map.setFitView();
            }, 300);
        },300);
        
    })

    // mobile dropdown select
    $(document).on('click', '.overlay_btn', {}, function(e) {
        e.stopPropagation();

       $('.overlay_btn').not(this).next().next().slideUp();
       $(this).next().next().slideToggle();
    });

    // click area marker
    $(document).on('click','.custom-content-marker.district', {}, function(e){
        e.preventDefault();
        var e = $(e.currentTarget);
        selectedArea = e.data('areaid');
        selectedCity = e.data('cityid');
        changeURLregion();
        setTimeout(function() {
            filterSightData();
            setTimeout(function() {
                map.setFitView();
            }, 300);
        },300)
    })

    // add url parameter after the sight modal opened.
    $(document).on('click', '.amap-info-content a', {} ,function(e){
        e.preventDefault();
        // var url = $(this).data('href');
        var city = $(this).data('cityid');
        var sight = $(this).data('hotspotid');

        var index = filterData.findIndex(x => x.HotspotId == sight);
                $('.modal-body').empty().append(modalTpl(filterData[index]));
                $('#myModal').modal({backdrop: 'static',show: true});
                let url = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search + '&city=' + city + '&sight=' + sight;
                window.history.pushState({path: url}, '', url);
    });

    $(document).on('click', 'li.swiper-slide-active.selected', {} ,function(e){
        var city = $(this).children('.list_content').data('cityid');
        var sight = $(this).children('.list_content').data('hotspotid');

        if (window.innerWidth < 789) {
            if ($(this).hasClass('open')) {
                var index = filterData.findIndex(x => x.HotspotId == sight);
                        $('.modal-body').empty().append(modalTpl(filterData[index]));
                        $('#myModal').modal({backdrop: 'static',show: true});
                        let url = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search + '&city=' + city + '&sight=' + sight;
                        window.history.pushState({path: url}, '', url);
            } else {
                $('.swiper-slide').removeClass('open');
                $(this).addClass('open');
            }
        }
    });

    // clear url parameter after sight modal closed.
    $('#myModal').on('hidden.bs.modal', function (e) {
        // let url = window.location.protocol + "//" + window.location.host + window.location.pathname;
        var removeSight = removeURLParameter('sight', window.location.href);
        var removeCity = removeURLParameter('city', removeSight);
        window.history.replaceState({}, document.title, removeCity);
    })

    // marker list toggle function
    $(document).on('click', '#panel .panel_toggle', {}, function(e){
        customPanel = !customPanel;
        panelToggle(currZoom, customPanel);
    })

    $(window).on('resize', function(){
        var win = $(this);
        function device(size) {
            if (size < 789) {
                return 'mobile';
            } else {
                return 'desktop';
            }
        }

        if (device(win.width()) !== device(prevWinSize)) {
            // simpleCityMarkerList(filterData, 'city', 'amap_mobile_markers_list');
            // simpleCityMarkerList(filterData, 'city', 'amap_markers_list');
            if (win.width() < 789) {
                simpleCityMarkerList(filterData, 'city', 'amap_mobile_markers_list');
            } else {
                simpleCityMarkerList(filterData, 'city', 'amap_markers_list');
            }
        }
        prevWinSize = win.width();
    });

    // reload markers if drag the map / zoom level changed
    map.on('zoomchange', reloadAfterChanged);
    // map.on('moveend', checkMoveChanged);
    map.on('dragend', reloadAfterChanged);
})

function getMapData(level) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "./data/details.json",
        success: function(getJson) {
            data = getJson;
            addDropdown(data);
            addMarker(data, 'district');
        },
        error: function(data) {
            alert('Error loading data, please check url.');
        }
    });
}

function initAMap() {
    map = new AMap.Map('amap', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        mapStyle: "amap://styles/whitesmoke",
        zoom: 9, //初始化地图层级
        zooms: [8, 13],
        center: [114.082038,22.55944], //初始化地图中心点
        lang: "zh_cn", //可选值：en，zh_en, zh_cn
        // scrollWheel: false
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

function addDropdown(data) {
    for(RegionName in data) {
        var val = data[RegionName];
        $('ul.amap_dropdown').append("<li class='amap_dropdown_area' data-areaid="+val.RegionId+"><div class='overlay_btn'></div><div class='amap_dropdown_areaLebal'>"+ val.RegionName +"</div><ul data-menuid="+val.RegionId+" class='sub-menu'></ul>" + "</li>");
        for(var i = 0; i < val.City.length; i++) {
            var city = val.City[i].CityName;
            var id = val.City[i].CityId;
            $(`ul.amap_dropdown li ul.sub-menu[data-menuid=${val.RegionId}]`).append("<li class='amap_dropdown_city' data-areaid="+ val.RegionId +" data-cityid="+ id +">"+ city +"</li>");
        }
    }
}

function filterSightData() {
    prevFilterData = filterData;
    // var newArray = data.filter(function(el) {
    //     return el.CityId === selectedCity;
    // });
    var currCity = data[selectedArea-1].City;
    var arrayIndex = currCity.findIndex(x => x.CityId === selectedCity);

    var newArray = currCity[arrayIndex].Hotspot;
    filterData = newArray.sort(function(a,b) {
        return a.Title.localeCompare(b.Title, "zh-TW");
    });
    addMarker(filterData, 'city');
}

function reloadAfterChanged() {
    var zoom = map.getZoom();
    var currCenter = map.getCenter();
    var currlnglat = [currCenter.lng,currCenter.lat];
    var cityCode = '';

    currZoom = zoom;

    map.getCity(function(info){
        if (info.citycode === '') {
            cityCode = prevCityCode;
        } else {
            cityCode = info.citycode;
        }
    });
    
    geocoder.getAddress(currlnglat, function(status, result) {
        if (status === 'complete' || result.regeocode) {
            var res = result.regeocode.addressComponent.adcode.slice(0,2);;
            var provinceCode = res+'0000';

            panelToggle(zoom, customPanel);

            if (zoom < 11) {
                filterData = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Province.includes(provinceCode)) {
                        if (prevZoom >= 11) {
                            if (swiper) {
                                swiper.destroy();
                            }
                            addMarker(data, 'district', currlnglat);
                        }
                        if(provinceCode !== prevProvinceCode && prevProvinceCode !== '') {
                            $('.amap_dropdown_menu p').text(data[i].RegionName);
                            selectedArea = data[i].RegionId;
                            changeURLregion();
                        }
                    }
                }
                prevZoom = zoom;
                prevProvinceCode = provinceCode;
                // prevCityCode = cityCode;
            } else if (zoom >= 11) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Province.includes(provinceCode)) {
                        if (cityCode !== prevCityCode) {
                            for (var a = 0; a < data[i].City.length; a++) {
                                if (data[i].City[a].CityCode === cityCode) {
                                    if (swiper) {
                                        swiper.destroy();
                                    }
                                    $('.amap_dropdown_menu p').text(data[i].City[a].CityName);
                                    selectedCity = data[i].City[a].CityId;
                                    filterSightData();
                                    // getMapData('city');
                                    // addMarker(filterData, 'city', currlnglat);
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
            // console.log('out of areas');
        }
    });
}

function panelToggle(zoomLevel, custom) {
    if (zoomLevel < 11) {
        $('.amap_marker_guide').hide();
        $('#amap_wrap').removeClass('panel_enable');
        $("#amap_wrap .panel_toggle").hide();
    } else if (zoomLevel >= 11) {
        $('.amap_marker_guide').show();
        if(!custom) {
            $('#amap_wrap').addClass('panel_enable');
        } else {
            $('#amap_wrap').removeClass('panel_enable');
        }
        $("#amap_wrap .panel_toggle").show();
    }
}

function addMarker(data, type, currlnglat = 0) {
    map.clearMap();
    if(type === 'city') {
        // cityMarkers(data, type);
        // cityMarkersList(data, type);
        if (window.innerWidth < 789) {
            simpleCityMarkerList(data, type, 'amap_mobile_markers_list');
        } else {
            simpleCityMarkerList(data, type, 'amap_markers_list');
        }
    } else if (type === 'district') {
        // var data = data[selectedArea-1].City;
        districtMarkers(data, type);
        // map.setFitView();
    }

    // map.setCenter(data.location);
    if (currlnglat === 0) {
        // map.setFitView();
        setTimeout(function() {
            map.on('zoomchange', reloadAfterChanged);
        }, 500);
    }
}

function districtMarkers(data, type) {
    for(var i = 0; i < data.length; i++) {
        data[i].City.forEach(e => {
            // 点标记显示内容，HTML要素字符串
            var markerContent =
            '<div class="custom-content-marker '+ type +'" data-areaid="'+ data[i].RegionId +'" data-cityid="'+ e.CityId +'">' +
                '<a href="#">'+
                    '<i>' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="35.469" height="53.56" viewBox="0 0 35.469 53.56">' +
                            '<defs>' +
                            '<style>' +
                                '.cls-1 {' +
                                    'fill: #f05e23;' +
                                    'fill-rule: evenodd;' +
                                '}' +
                            '</style>' +
                            '</defs>' +
                            '<path id="Shape_1_copy_12" data-name="Shape 1 copy 12" class="cls-1" d="M985.263,1060.73a17.808,17.808,0,0,0-17.722,17.85,18.007,18.007,0,0,0,2.128,8.49l14.625,26.64a1.109,1.109,0,0,0,1.938,0l14.628-26.65A17.87,17.87,0,0,0,985.263,1060.73Zm0,26.78a8.925,8.925,0,1,1,8.861-8.93A8.908,8.908,0,0,1,985.263,1087.51Z" transform="translate(-967.531 -1060.72)"/>' +
                        '</svg>' +
                    '</i>' +
                '</a>'+
            '</div>';
            var marker = new AMap.Marker({
            position: e.CityLngLat,
            // 将 html 传给 content
            content: markerContent,
            // 以 icon 的 [center bottom] 为原点
            offset: new AMap.Pixel(0, 0),
            });

            marker.setLabel({
                offset: new AMap.Pixel(0,10),
                content: "<div class='info'>"+ e.CityName +"</div>",
                direction: "top"
            })
            
            // 将 markers 添加到地图
            map.add(marker);
        });
    }
}

function simpleCityMarkerList(data, type, container) {
    AMapUI.loadUI(['misc/MarkerList'], function(MarkerList) {

        map.clearMap();

        var markerList = new MarkerList({
            // bind map
            map: map,

            // marker list id in DOM
            listContainer: container,

            // add class which is selected by marker or list 选中状态（通过点击列表或者marker）时在Marker和列表节点上添加的class，可以借此编写css控制选中时的展示效果
            selectedClassNames: 'selected',

            onSelected: null,
            // marker list event listener 列表节点上监听的事件
            // listElementEvents: ['click', 'mouseenter', 'mouseleave'],
            // markerEvents: ['click', 'mouseover', 'mouseout'],
            // makeSelectedEvents:false,
            // selectedClassNames: 'selected',
            autoSetFitView: false,

            //返回数据项的Id
            getDataId: function(dataItem, index) {
                //index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
                return dataItem.HotspotId;
            },
            //返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
            getPosition: function(dataItem) {
                return dataItem.HotspotLngLat;
            },
            //返回数据项对应的Marker
            getMarker: function(dataItem, context, recycledMarker) {

                var markerContent =
                '<div class="custom-content-marker '+ type +'" data-hotspotid="'+ dataItem.HotspotId +'" data-cate="'+ dataItem.Category +'">' +
                    '<i>' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="35.469" height="53.56" viewBox="0 0 35.469 53.56">' +
                            '<defs>' +
                                '<style>' +
                                    '.cls-1 {' +
                                        'fill: #f05e23;' +
                                        'fill-rule: evenodd;' +
                                    '}' +
                                '</style>' +
                            '</defs>' +
                            '<path id="Shape_1_copy_12" data-name="Shape 1 copy 12" class="cls-1" d="M985.263,1060.73a17.808,17.808,0,0,0-17.722,17.85,18.007,18.007,0,0,0,2.128,8.49l14.625,26.64a1.109,1.109,0,0,0,1.938,0l14.628-26.65A17.87,17.87,0,0,0,985.263,1060.73Zm0,26.78a8.925,8.925,0,1,1,8.861-8.93A8.908,8.908,0,0,1,985.263,1087.51Z" transform="translate(-967.531 -1060.72)"/>' +
                            '<path id="Shape_1_copy_15" data-name="Shape 1 copy 15" class="cls-1" d="M985.266,1073.56a4.905,4.905,0,1,1-4.891,4.91A4.9,4.9,0,0,1,985.266,1073.56Zm0-12.83a17.808,17.808,0,0,0-17.722,17.85,18.007,18.007,0,0,0,2.128,8.49l14.625,26.64a1.109,1.109,0,0,0,1.938,0l14.628-26.65A17.87,17.87,0,0,0,985.263,1060.73Zm0,26.78a8.925,8.925,0,1,1,8.861-8.93A8.908,8.908,0,0,1,985.263,1087.51Z" transform="translate(-967.531 -1060.72)"/>' +
                        '</svg>' +
                    '</i>' +
                '</div>';

                //marker的标注内容
                var content = dataItem.markerLabel;

                var label = {
                    offset: new AMap.Pixel(16, 18), //修改label相对于marker的位置
                    content: content
                };

                //返回一个新的Marker
                return new AMap.Marker({
                    position: dataItem.LngLat,
                    // 将 html 传给 content
                    content: markerContent,
                });
            },
            //返回数据项对应的infoWindow
            getInfoWindow: function(dataItem, context, recycledInfoWindow) {

                var tpl =
                    '<a href="javascript:void(0);" data-href="http://dev.mtr-api.com/api/mtr?CityId='+ selectedCity +'" data-cityid="'+ selectedCity +'" data-hotspotid="'+ dataItem.HotspotId +'">'+
                        '<div class="info_content">'+
                            '<div class="info_img"></div>'+
                            '<div class="info_title">'+ dataItem.Title +'</div>'+
                        '</div>'+
                    '</a>';

                //MarkerList.utils.template支持underscore语法的模板
                var content = MarkerList.utils.template(infoWindowTpl(dataItem), {
                    dataItem: dataItem,
                    dataIndex: context.index
                });

                if (recycledInfoWindow) {
                    //存在可回收利用的infoWindow, 直接更新内容返回
                    recycledInfoWindow.setContent(content);
                    return recycledInfoWindow;
                }

                //返回一个新的InfoWindow
                return new AMap.InfoWindow({
                    offset: new AMap.Pixel(5, -32),
                    content: content
                });
            },
            // marker list 返回数据项对应的列表节点
            getListElement: function(dataItem, context, recycledListElement) {
                var cateType = ['購物', '飲食', '玩樂', '觀光'];

                var tpl = '<div class="list_content" data-cityid="'+ dataItem.CityId +'" data-hotspotid="'+ dataItem.HotspotId +'">'+
                    '<div class="list_img"></div>'+
                    '<div class="list_content_details">'+
                        '<div class="list_content_type" data-cate="'+ dataItem.Category +'">'+
                            '<i>' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="13.56" height="20.375" viewBox="0 0 13.56 20.375">' +
                                    '<defs>' +
                                        '<style>' +
                                            '.cls-1 {' +
                                                'fill: #f05e23;' +
                                                'fill-rule: evenodd;' +
                                            '}' +
                                        '</style>' +
                                    '</defs>' +
                                    '<path id="Shape_1_copy_16" data-name="Shape 1 copy 16" class="cls-1" d="M1734.06,746.514a6.781,6.781,0,0,0-5.97,10.014l5.6,10.131a0.409,0.409,0,0,0,.37.219,0.432,0.432,0,0,0,.37-0.219l5.6-10.135A6.778,6.778,0,0,0,1734.06,746.514Zm0,10.182a3.394,3.394,0,1,1,3.39-3.394A3.4,3.4,0,0,1,1734.06,756.7Z" transform="translate(-1727.28 -746.5)"/>' +
                                '</svg>' +
                            '</i>' +
                            '<div class="list_content_type_name">'+ cateType[dataItem.Category-1] +'</div>'+
                        '</div>'+
                        '<div class="list_content_name">'+ dataItem.Title +'</div>'+
                    '</div>'+
                '</div>';

                var content = MarkerList.utils.template(tpl, {
                    dataItem: dataItem,
                    dataIndex: context.index
                });

                if (recycledListElement) {
                    //存在可回收利用的listElement, 直接更新内容返回
                    recycledListElement.innerHTML = content;
                    return recycledListElement;
                }

                //返回一段html，MarkerList将利用此html构建一个新的dom节点
                return '<li class="swiper-slide" data-index="'+ context.index +'">' + content + '</li>';
            },
        });

        markerList.on('renderComplete', function(event, records) {
            if (window.innerWidth >= 789) {
                if (currSlide !== 0) {
                    setTimeout(function() {
                        var selectedMarker = $(`.swiper-slide:nth-child(${currSlide+1})`);
                        selectedMarker.trigger('click');
                        $('#panel').animate({
                            scrollTop: selectedMarker.offset().top
                        }, 300);
                    },300)
                }
            } else {
                swiper = new Swiper('.swiper-container', {
                    initialSlide: currSlide,
                    on: {
                        init: function() {
                            if (this.initialSlide !== 0) {
                                setTimeout(function() {
                                    $('.swiper-slide-active').trigger('click');
                                },300)
                            }
                        }
                    },
                    centeredSlides: true,
                    centerInsufficientSlides: true,
                    passiveListeners: false,
                    observer: true,
                });
                swiper.on('slideChangeTransitionEnd', function () {
                    var active = $('.swiper-slide-active .list_content');
                    $('.swiper-slide-active').trigger('click');
                    currSlide = $('.swiper-slide-active').data('index');
                });

                return swiper;
            }
        })

        // marker list event listener | 监听选中改变
        markerList.on('selectedChanged', function(event, info) {
            // if (info.selectAgain) {
            //     this.clearSelected();
            //     return;
            // }

            var selected = info.selected,
                unSelected = info.unSelected;

            if (selected) {
                map.panTo(selected.marker.getPosition());
            }
        });

        // marker and marker list click event | 监听Marker和ListElement上的点击
        markerList.on('markerClick listElementClick', function(event, record) {
            if (window.innerWidth >= 789) {
                currSlide = record.index;
                this.openInfoWindowOnRecord(record);
            }
        });
        
        // render data | 展示该数据
        $('ul#amap_markers_list').html('');
        $('ul#amap_mobile_markers_list').html('');
        markerList.render(data);
    });
}

function getOneOverlay(area, city, hotspot) {
    var targetId = hotspot;
    var targetMarker;
    var markers = data[area-1].City[city-1].Hotspot;

    for(var i = 0; i < markers.length; i++){
        // 获取存在每个 extData 中的 id
        var id = markers[i].HotspotId;

        if(id === targetId){
            targetMarker = markers[i];
            break;
        }
    }

    var position = targetMarker.HotspotLngLat;

    var infoWindow = new AMap.InfoWindow({
        position: position,
        offset: new AMap.Pixel(0, -35),
        content: infoWindowTpl(targetMarker)
    });

    map.setZoomAndCenter(15, position);
    setTimeout(function() {
        reloadAfterChanged();
        setTimeout(function() {
            infoWindow.open(map);
        },500)
    }, 1500);
}

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i= 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function removeURLParameter(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

function changeURLregion() {
    let regionURL = window.location.protocol + "//" + window.location.host + window.location.pathname + '?region=' + selectedArea;
    window.history.pushState({path: regionURL}, '', regionURL);
}

function modalTpl(data) {
    return '<div class="modal_content_container">'+
                '<div class="img_container">'+

                '</div>'+
                '<div class="desc_container">'+
                    '<div class="title_container">'+
                        '<div>'+ data.Title +'</div>'+
                        '<span>'+ data.CityName +'</span>'+
                    '</div>'+
                    '<div class="content">'+
                        '<div class="content_section">城市簡介</div>'+
                        '<div class="content_details">'+ data.CityDescription +'</div>'+
                    '</div>'+
                    '<div class="content">'+
                        '<div class="content_section">景點簡介</div>'+
                        '<div class="content_details">'+ data.HotspotDescription +'</div>'+
                    '</div>'+
                    '<div class="content">'+
                        '<div class="content_section">地址</div>'+
                        '<div class="content_details">'+ data.Location +'</div>'+
                    '</div>'+
                    '<div class="content">'+
                        '<div class="content_section">前往方法</div>'+
                        '<div class="content_details">'+ data.HowToGo +'</div>'+
                    '</div>'+
                    '<div class="content">'+
                        '<div class="content_section">網址</div>'+
                        '<a class="content_details target="_blank" href="https://'+ data.Site +'">'+ data.Site +'</a>'+
                    '</div>'+
                '</div>'+
           '</div>'
}

function infoWindowTpl(data) {
    return '<a href="javascript:void(0);" data-cityid="'+ selectedCity +'" data-hotspotid="'+ data.HotspotId +'">'+
                '<div class="info_content">'+
                    '<div class="info_img"></div>'+
                    '<div class="info_title">'+ data.Title +'</div>'+
                '</div>'+
            '</a>';
}