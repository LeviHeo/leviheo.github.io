/*
       __          __               _           
  ____/ /___  ____/ /___  _____    (_)____      
 / __  / __ \/ __  / __ \/ ___/   / / ___/      
/ /_/ / /_/ / /_/ / /_/ /__  /   / /__  /       
\__,_/\____/\__,_/\____/____(_)_/ /____/  ______
                             /___/       /_____/

    Vesion: 1.0.0
    Author: Levi Heo
    Website: http://leviheo.github.io
    Docs: http://leviheo.github.io/dodos
    Repo: http://github.com/leviheo/dodos
    Issues: http://github.com/leviheo/dodos/issues
*/
; (function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    var Dodos = window.Dodos || {};
    
    Dodos = (function () {
        function Dodos(element, settings) {
            var _ = this, dataSettings;

            _.defaults = {
                rows: 1,
                initialDos: 0,
                mobileFirst: false,
                respondTo: 'window',
                responsive: null,
            }
            _.initials = {
            }

            $.extend(_, _.initials);

            _.$body = $('body');
            _.$wrap = $(element);   
            _.activeBreakpoint = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.windowWidth = 0;
            _.respondTo = null;
            _.rowCount = 1;
            _.rowDiv = '<div class="dodos-row"></div>';
            
            dataSettings = $(element).data('dodos') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);
            _.originalSettings = _.options;
            _.init(true);
        }
        return Dodos;
    }());

    Dodos.prototype.setClass = function () {
        var _ = this;
        _.$body.addClass('js-dodos');
        _.$wrap.addClass('dodos');
        
        if (_.$wrap.data('dds') == null) {
            _.$wrap.attr({
                'data-dds': 0,
                'tabindex': 1,
            })
        }
        if (_.$wrap.data('dds-depth') == null) {
            _.$wrap.attr({
                'data-dds-depth': 0,
            })
        }
    }

    Dodos.prototype.buildRows = function() {
        var _ = this,
            row = _.options.rows,
            items = _.$wrap.find('> *');
            
        if (_.options.rows > 0) {
            //$('#check').html("row: " + _.options.rows + ", 1depth item: " + items.length);
            for (var i = 0; i < items.length; i += row) {
                items.slice(i, i+row).wrapAll(_.rowDiv);
            }
        }

        _.$wrap.find('*').each(function (i) {
            var _ = $(this);
            _.attr({
                'tabindex': 0
            });
        });
        
        var rowWrap = _.$wrap.find('> .dodos-row');
        var rowChild = function (ts, i) {
            var x = ts.parent().data('dds'),
                d = ts.parent().data('dds-depth');
            ts.attr({
                'data-dds': x + "_" + (i + 1),
                'data-dds-depth': d + 1,
            });
        } 
        rowWrap.each(function (i) {
            var _ = $(this);
            rowChild(_, i);
            _.children().each(function (i) {
                var _ = $(this);
                rowChild(_, i);
                _.children().each(function (i) {
                    var _ = $(this);
                    rowChild(_, i);
                });
            });
        });
    };

    Dodos.prototype.initializeEvents = function () {
        var _ = this;
        $(window).on('resize.dodos', $.proxy(_.resize, _));
    }

    Dodos.prototype.checkResponsive = function(initial, forceUpdate) {
        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var wrapWidth = _.$wrap.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'dodos') {
            respondToWidth = wrapWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, wrapWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];   
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'undos') {
                            _.undos(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialDos;
                            }
                            _.refresh(initial);
                            
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'undos') {
                        _.undos(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialDos;
                        }
                        _.refresh(initial);
                        
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialDos;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            if( !initial && triggerBreakpoint !== false ) {
                _.$wrap.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }
    };

    Dodos.prototype.setOption =
    Dodos.prototype.dodosSetOption = function() {
        var _ = this, l, item, option, value, refresh = false, type;
        if( $.type( arguments[0] ) === 'object' ) {
            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';
        } else if ( $.type( arguments[0] ) === 'string' ) {
            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];
            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {
                type = 'responsive';
            } else if ( typeof arguments[1] !== 'undefined' ) {
                type = 'single';
            }
        }
        if ( type === 'single' ) {
            _.options[option] = value;
        } else if ( type === 'multiple' ) {
            $.each( option , function( opt, val ) {
                _.options[opt] = val;
            });
        } else if ( type === 'responsive' ) {
            for ( item in value ) {
                if( $.type( _.options.responsive ) !== 'array' ) {
                    _.options.responsive = [ value[item] ];
                } else {
                    l = _.options.responsive.length-1;
                    while( l >= 0 ) {
                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {
                            _.options.responsive.splice(l,1);
                        }
                        l--;
                    }
                    _.options.responsive.push( value[item] );
                }
            }
        }
        if ( refresh ) {
            _.reinit();
        }
    };
    
    Dodos.prototype.destroy = function(refresh) {
        var _ = this;
        _.$wrap.find('> .dodos-row').contents().unwrap();
        if(!refresh) {
            _.$wrap.trigger('destroy', [_]);
        }
    };

    Dodos.prototype.init = function (creation) {
        var _ = this;
        _.setClass();
        _.initializeEvents();
        _.registerBreakpoints();
        _.checkResponsive(true);
        if (creation) {
            _.$wrap.trigger('init', [_]);
            _.buildRows();
        }
    }

    Dodos.prototype.undos = function(fromBreakpoint) {
        var _ = this;
        _.$wrap.trigger('undos', [_, fromBreakpoint]);
        _.destroy();
    };

    Dodos.prototype.refresh = function(initial) {
        var _ = this;
        _.destroy(true);
        _.init();
        if (!initial) {
            _.buildRows();
        }
    };

    Dodos.prototype.registerBreakpoints = function() {
        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {
            _.respondTo = _.options.respondTo || 'window';
            for ( breakpoint in responsiveSettings ) {
                l = _.breakpoints.length-1;
                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }
                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
                }
            }
            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });
        }
    };

    Dodos.prototype.reinit = function() {
        var _ = this;
        _.checkResponsive(false, true);
        _.buildRows();
        _.$wrap.trigger('reInit', [_]);
    };

    Dodos.prototype.resize = function () {
        var _ = this;
        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
            }, 50);
        }
    };

    $.fn.dodos = function () {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].dodos = new Dodos(_[i], opt);
            else
                ret = _[i].dodos[opt].apply(_[i].dodos, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

    // Key Control
    $(document).ready(function () {
        $('[data-dds=0]').focus();

        // Loading Animation
        var loadingTxt = 'Loading···';
        var i = 0;
        setInterval(function () { 
            i++;
            var loading = ['/', '-','·', '\\', '|'];
            $("#loading").html(loadingTxt + loading[i]);
            if(i == loading.length)
            {
                $("#loading").html(loadingTxt + loading[0]);
                i = 0;
            }
        }, 200);
    });

    $(document).on('keydown', function (event) {
        var focus = $(document.activeElement),
            block = focus.data('dds'),
            depth = focus.data('dds-depth'),
            arrow;
        
        if (block == undefined || depth == undefined) {
            $('[data-dds=0]').focus();
            block = 0;
            depth = 0;
        } 
        
        if (event.keyCode == 37) {
            console.log('left');

            if (block.length > 1) {
                var num = block.split('_').pop(-1) - 1,
                    target;
            }

            arrow = "left";
        }

        else if (event.keyCode == 38) {

            console.log('up');
            arrow = "up";
        }
        
        else if (event.keyCode == 39) {

            console.log('right');
            arrow = "right";
        }
        
        else if (event.keyCode == 40) {

            console.log('down');
            arrow = "down";
        }

        $('#check').html("Press: " + arrow + "<br/><br/>Prev: " + block + ", " + depth + "<br/><br/> ⇣ <br/><br/>Now: " + target + ", " + depth);
    });

}));