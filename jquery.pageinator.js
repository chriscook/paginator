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
            $pageList,
            $previousPageLink,
            $nextPageLink,
            pageFromURL       = location.hash;
        
        if (numberOfPages > 1) {
            $itemContainer.after('<div id="pgn-page-list"><span id="pgn-page-picker-previous">&lt;</span><span id="pgn-page-picker-next">&gt;</span></div>');
            $pageList = $('div#pgn-page-list');
            $previousPageLink = $('span#pgn-page-picker-previous');
            $nextPageLink = $('span#pgn-page-picker-next');
            for (var i = 1; i <= numberOfPages; i++) {
                $pageList.append('<span id="pgn-page-picker-' + i + '" data-page="' + i + '">' + i + '</span>');
            }
        }
        
        $itemContainer.height($items.outerHeight() * (settings.itemsPerPage / 1.6));
        
        /**
         * Goes to a specified page.
         * @param {integer}                      The page number to go to.
         */
        function showPage(pageNumber) {
            if (pageNumber > 0 && pageNumber <= numberOfPages) {
                currentPage = pageNumber;
                location.hash = '#' + pageNumber;
                $pageList.children().removeClass('pgn-page-picker-current');
                $pageList.children('#pgn-page-picker-' + pageNumber).addClass('pgn-page-picker-current');
                $previousPageLink.attr('data-page', parseInt(pageNumber) - 1);
                $nextPageLink.attr('data-page', parseInt(pageNumber) + 1);
                $items.hide();
                var lastItemToDisplay = pageNumber * settings.itemsPerPage,
                    firstItemToDisplay = lastItemToDisplay - settings.itemsPerPage +  1;
                $.each($items, function(itemNumber, item) {
                    itemNumber++;
                    if (itemNumber >= firstItemToDisplay && itemNumber <= lastItemToDisplay) {
                        $(item).show();
                    }
                });
            }
        }
        
        if (pageFromURL !== '') {
            showPage(pageFromURL.substring(1));
        } else {
            showPage(1);
        }
        
        $(window).hashchange(function(e) {
            e.preventDefault();
        });
        
        $pageList.on('click', 'span', function() {
            showPage($(this).attr('data-page'));
        });
        
        $(document).keyup(function(e) {
            if (e.keyCode == '37') {
                showPage(parseInt(currentPage) - 1);
            } else if (e.keyCode == '39') {
                showPage(parseInt(currentPage) + 1);
            }
        });
        
        return this;
        
    };
    
})(jQuery);