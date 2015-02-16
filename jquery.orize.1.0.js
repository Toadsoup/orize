/*
 * jQuery orize Plugin 1.0
 * by Todd Richardson
 * Copyright 2015, TDOG
 * 
 * Based off or Raptorize plugin by ZURB
 * Copyright 2010, ZURB
 * 
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {
    $.fn.orize = function (options) {

        //Yo' defaults
        var defaults = {
            enterOn: 'click', //timer, konami-code, click
            delayTime: 5000, //time before raptor attacks on timer mode
            orizer: 'hodorize'
        };

        //Extend those options
        var options = $.extend(defaults, options);

        console.log("We're now orizing. " + options.orizer);

        return this.each(function () {

            var _this = $(this);
            var audioSupported = false;
            //Stupid Browser Checking which should be in jQuery Support
            if ($.browser.mozilla && $.browser.version.substr(0, 5) >= "1.9.2" || $.browser.webkit) {
                audioSupported = true;
            }

            //Raptor Vars
            var raptorImageMarkup = '<img id="el' + options.orizer +'" style="display: none" src="kit/' + options.orizer + '/picture.png" />'
            var raptorAudioMarkup = '<audio id="el' + options.orizer +'Shriek" preload="auto"><source src="kit/' + options.orizer + '/sound.mp3" /><source src="kit/' + options.orizer + '/sound.ogg" /></audio>';
            var locked = false;

            //Append Raptor and Style
            $('body').append(raptorImageMarkup);
            if (audioSupported) {
                $('body').append(raptorAudioMarkup);
            }
            var raptor = $('#el' + options.orizer).css({
                "position": "fixed",
                "bottom": "-700px",
                "right": "0",
                "display": "block"
            })

            // Animating Code
            function init() {
                locked = true;
                //Sound Hilarity
                if (audioSupported) {
                    function playSound() {
                        document.getElementById('el' + options.orizer +'Shriek').play();
                    }
                    playSound();
                }
                // Movement Hilarity	
                raptor.animate({
                    "bottom": "0"
                }, function () {
                    $(this).animate({
                        "bottom": "-130px"
                    }, 100, function () {
                        var offset = (($(this).position().left) + 600);
                        $(this).delay(300).animate({
                            "right": offset
                        }, 2200, function () {
                            raptor = $('#el' + options.orizer).css({
                                "bottom": "-700px",
                                "right": "0"
                            })
                            locked = false;
                        })
                    });
                });
            }

            //Determine Entrance
            if (options.enterOn == 'timer') {
                setTimeout(init, options.delayTime);
            } else if (options.enterOn == 'click') {
                _this.bind('click', function (e) {
                    e.preventDefault();
                    if (!locked) {
                        init();
                    }
                })
            } else if (options.enterOn == 'konami-code') {
                var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
                $(window).bind("keydown.raptorz", function (e) {
                    kkeys.push(e.keyCode);
                    if (kkeys.toString().indexOf(konami) >= 0) {
                        init();
                        $(window).unbind('keydown.raptorz');
                    }
                }, true);
            }
        });//each call
    }//orbit plugin call
})(jQuery);

