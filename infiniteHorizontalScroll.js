(function($) {
    $.fn.infiniteHorizontalScroll = function(options) {
        var defaults = {
            speed: 6000,
            childSelector: 'span'
        };

        var settings = $.extend( {}, defaults, options );

        return this.each(function(key, index) {
            var speed         = settings.speed,
                childSelector = settings.childSelector,
                $this         = $(index),
                $slide        = $this.find(childSelector+':first-child'),
                elWidth       = $slide.outerWidth(),
                $cloned;

            // Generate our wrapper element, clone element
            function _generateWrapper(){
                var newTemplate = '<div class="infinite-scroll-wrapper"></div>';
                $cloned         = $slide.clone();

                $this.html('');
                $this.html(newTemplate);
            }

            // Inject our cloned element
            function _injectClone($cloned){
                var $newThis         = $('.infinite-scroll-wrapper'),
                    templateClone    = $cloned.html(),
                    newTemplateClone = '<span>'+templateClone+'</span>';

                $newThis.append(newTemplateClone);
                $newThis.append(newTemplateClone);
            }

            // Run our animation
            function _runAnimation(){
                var $newThis = $('.infinite-scroll-wrapper');

                $newThis.animate(
                    {marginLeft: -elWidth},
                    speed,
                    'linear',
                    function(){
                        var $this = $(this);

                        $this.css({marginLeft:0}).find("span:last-child").after($this.find("span:first-child"));
                    }
                );

                requestAnimationFrame(_runAnimation);
            }

            function _init(){
                _generateWrapper();
                _injectClone($cloned);
                _runAnimation();
            }

            return _init();
        });
    };
}( jQuery ));
