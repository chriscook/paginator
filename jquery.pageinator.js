(function ($) {
    
    'use strict';
    
    $.fn.pageinator = function (options) {
        
        var settings = $.extend({
            itemsPerPage       : 2,
            keyboardNavigation : false,
            prevButtonContent  : '&lt;',
            nextButtonContent  : '&gt;',
            pageButtonClass    : false,
            fadeRate           : 0,
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
            if (pageNumber > 0 && pageNumber <= numberOfPages && pageNumber !== currentPage) {
                currentPage = pageNumber;
                location.hash = '#' + pageNumber;
                if (numberOfPages > 1) {
                    $previousPageLink.removeClass('pgn-page-picker-disabled');
                    $nextPageLink.removeClass('pgn-page-picker-disabled');
                    $pageList.children().removeClass('pgn-page-picker-current');
                    $pageList.children('#pgn-page-picker-' + pageNumber).addClass('pgn-page-picker-current');
                    $previousPageLink.attr('data-page', parseInt(pageNumber, 10) - 1);
                    $nextPageLink.attr('data-page', parseInt(pageNumber, 10) + 1);
                    if (pageNumber == 1) {
                        $previousPageLink.addClass('pgn-page-picker-disabled');
                    }
                    if (pageNumber == numberOfPages) {
                        $nextPageLink.addClass('pgn-page-picker-disabled');
                    }
                }
                var lastItemToDisplay = pageNumber * settings.itemsPerPage,
                    firstItemToDisplay = lastItemToDisplay - settings.itemsPerPage +  1;
                $items.fadeOut(settings.fadeRate).promise().done(function() {
                    $items.each(function(index, item) {
                        index++;
                        if (index >= firstItemToDisplay && index <= lastItemToDisplay) {
                            $(item).fadeIn(settings.fadeRate);
                        }
                    });
                });
            }
        }
        
        // Set up keyboard navigation
        if (settings.keyboardNavigation) {
            $(document).keyup(function(e) {
                if (e.keyCode === 37) {
                    showPage(parseInt(currentPage, 10) - 1);
                } else if (e.keyCode === 39) {
                    showPage(parseInt(currentPage, 10) + 1);
                }
            });
        }
        
        // Set up the container's height
        if (settings.fixedHeight) {
            $itemContainer.height($items.outerHeight() * (settings.itemsPerPage / settings.heightDivisor));
        }
        
        // Set up the page picker
        if (numberOfPages > 1) {
            $itemContainer.after('<ul id="pgn-page-list"><li id="pgn-page-picker-previous">' + settings.prevButtonContent + '</li></ul>');
            $pageList = $('#pgn-page-list');
            $previousPageLink = $('#pgn-page-picker-previous');
            for (i = 1; i <= numberOfPages; i++) {
                $pageList.append('<li id="pgn-page-picker-' + i + '" data-page="' + i + '">' + i + '</li>');
            }
            $pageList.append('<li id="pgn-page-picker-next">' + settings.nextButtonContent + '</li>');
            $nextPageLink = $('#pgn-page-picker-next');
            if (settings.pageButtonClass) {
                $pageList.children().addClass(settings.pageButtonClass);
            }
        }
        
        // Load the initial page
        if (pageFromURL !== '') {
            showPage(pageFromURL.substring(1));
        } else {
            showPage(1);
        }
        
        // Show a different page when the hash changes
        $(window).hashchange(function() {
            showPage(location.hash.substring(1));
        });
        
        // Show a different page when the user clicks a page number
        $pageList.on('click', 'li', function() {
            showPage($(this).attr('data-page'));
        });
        
        return this;
        
    };
    
})(jQuery);