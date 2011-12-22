(function ($) {
    
    'use strict';
    
    $.fn.pageinator = function (options) {
        
        var settings = $.extend({
            itemsPerPage       : 2,
            keyboardNavigation : false,
            prevButtonContent  : '&lt;',
            nextButtonContent  : '&gt;',
            pageButtonClass    : false,
            fixedHeight        : false,
            heightDivisor      : 1
        }, options),
            $itemContainer     = this,
            $items             = $itemContainer.children(),
            numberOfItems      = $items.length,
            numberOfPages      = Math.ceil(numberOfItems / settings.itemsPerPage),
            currentPage,
            $pageList,
            $previousPageLink,
            $nextPageLink,
            pageFromURL        = location.hash,
            i                  = 0;
        
        /**
         * Goes to a specified page.
         * @param {integer}                      The page number to go to.
         */
        function showPage(pageNumber) {
            if (pageNumber > 0 && pageNumber <= numberOfPages) {
                currentPage = pageNumber;
                location.hash = '#' + pageNumber;
                if (numberOfPages > 1) {
                    $previousPageLink.show();
                    $nextPageLink.show();
                    $pageList.children().removeClass('pgn-page-picker-current');
                    $pageList.children('#pgn-page-picker-' + pageNumber).addClass('pgn-page-picker-current');
                    $previousPageLink.attr('data-page', parseInt(pageNumber, 10) - 1);
                    $nextPageLink.attr('data-page', parseInt(pageNumber, 10) + 1);
                    if (pageNumber == 1) {
                        $previousPageLink.hide();
                    }
                    if (pageNumber == numberOfPages) {
                        $nextPageLink.hide();
                    }
                }
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
        
        if (settings.keyboardNavigation) {
            $(document).keyup(function(e) {
                if (e.keyCode === 37) {
                    showPage(parseInt(currentPage, 10) - 1);
                } else if (e.keyCode === 39) {
                    showPage(parseInt(currentPage, 10) + 1);
                }
            });
        }
        
        if (settings.fixedHeight) {
            $itemContainer.height($items.outerHeight() * (settings.itemsPerPage / settings.heightDivisor));
        }
        
        if (numberOfPages > 1) {
            $itemContainer.after('<ul id="pgn-page-list"><li id="pgn-page-picker-previous">' + settings.prevButtonContent + '</li><li id="pgn-page-picker-next">' + settings.nextButtonContent + '</li></ul>');
            $pageList = $('#pgn-page-list');
            $previousPageLink = $('#pgn-page-picker-previous');
            $nextPageLink = $('#pgn-page-picker-next');
            for (i = 1; i <= numberOfPages; i++) {
                $pageList.append('<li id="pgn-page-picker-' + i + '" data-page="' + i + '">' + i + '</li>');
            }
            if (settings.pageButtonClass) {
                $pageList.children().addClass(settings.pageButtonClass);
            }
        }
        
        if (pageFromURL !== '') {
            showPage(pageFromURL.substring(1));
        } else {
            showPage(1);
        }
        
        $(window).hashchange(function() {
            showPage(location.hash.substring(1));
        });
        
        $pageList.on('click', 'li', function() {
            showPage($(this).attr('data-page'));
        });
        
        return this;
        
    };
    
})(jQuery);