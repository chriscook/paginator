(function ($) {
    
    "use strict";
    
    $.fn.pageinator = function (options) {
        
        var settings = $.extend({
            'itemsPerPage'    : 6
        }, options),
            $items            = this;
        
        
        
        return this;
        
    };
    
})(jQuery);