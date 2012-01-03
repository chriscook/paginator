Pageinator
=============

Version 0.1.0
-----------

### Introduction

__Pageinator__ is a _jQuery_ plug-in to pageinate a number of items.

## Dependencies

+ _hashchange_

### How to use it

1. Add `jquery.pageinator.js` to your project, along with _jQuery_ and _hashchange_.
2. Add your items to your page, with a container element.
3. Add the following _jQuery_ to your page, to be executed on load:

    $('#pgn-container').pageinator();

...where `#pgn-container` is a selector for the item container.

A demo is available in demo.html.

### Additional settings

Additional settings can be used to customise __Pageinator__, and should be added as a parameter within curly braces:

+ `itemsPerPage` sets how many items appear per page (default `6`).
+ `keyboardNavigation` toggles whether or not the user can use the left and right arrow keys to move through pages (default `false`).
+ `prevButtonContent` allows you to change the content of the previous page button (default `&lt;`).
+ `nextButtonContent` allows you to change the content of the next page button (default `&gt;`).
+ `pageButtonClass` allows you to set a custom class for page buttons (default `false`).
+ `fadeRate` sets the speed at which pages fade in and out (default `0`).
+ `fixedHeight` toggles whether or not the container should have a fixed height (default `false`).
+ `heightDivisor` sets a number to divide the itemsPerPage value by before multiplying it with the items' height when setting a fixed height for the container (only active when `fixedHeight` is `true`; default `1`).
    
An example of these in practice:

    $('#pgn-container').pageinator({
        'itemsPerPage'     : 4
    });

__Pageinator__ adds the page picker elements as `li` elements within a `ul`. You can easily customise it using rules for `ul#pgn-page-list` (items within this list are named `li#pgn-page-picker-previous`, `li#pgn-page-picker-next` and `li#pgn-page-picker-x`, where `x` is the page number).

### Where does it work?

Tested in:

+ Firefox 9

### Author and Acknowledgements

+ Written by [Chris Cook](http://chris-cook.co.uk)