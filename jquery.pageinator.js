(function ($) {
    
    "use strict";
    
    $.fn.pageinator = function (options) {
        
        var settings = $.extend({
            'itemsPerPage'    : 6
        }, options),
            $itemContainer    = this,
            $items            = $itemContainer.children(),
            numberOfItems     = $items.length,
            numberOfPages     = Math.ceil(numberOfItems / settings.itemsPerPage),
            currentPage,
            destinationPage,
            $pageList;
        
        if (numberOfPages > 1) {
            for (var i = 1; i <= numberOfPages; i++) {
                $pageList.append('<span id="page_' + i + '" data-page="' + i + '">' + i + '</span>');
            }
        }
        
        /**
         * Goes to a specified page.
         * @param {integer}                      The page number to go to.
         * @return {bool}                        Whether the supplied page number was valid or not.
         */
        function showPage(pageNumber) {
            if (pageNumber > 0 && pageNumber <= numberOfPages) {
                currentPage = pageNumber;
                $pageList.children().removeClass('.pgn-picker-current');
                $pageList.children('#page_' + pageNumber).addClass('.pgn-picker-current');
                $items.hide();
                // TODO show prev+next buttons AND set their data-page values correctly.
                var lastItemToDisplay = pageNumber * settings.itemPerPage,
                    firstItemToDisplay = lastItemToDisplay - settings.itemPerPage +  1;
                $.each($items, function(itemNumber, item) {
                    itemNumber++;
                    if (itemNumber >= firstItemToDisplay && itemNumber <= lastItemToDisplay) {
                        $(item).show();
                    }
                }
                return true;
            } else {
                return false;
            }
        }
        
        showPage(1);
        
        $pageList.click(function () {
            showPage($(this).attr('data-page'));
        });
        
        $(document).keyup(function (e) {
            if (e.keyCode == '37') {
                showPage(currentPage - 1);
            } else if (e.keyCode == '39') {
                showPage(currentPage + 1);
            }
        });
        
        return this;
        
    };
    
})(jQuery);