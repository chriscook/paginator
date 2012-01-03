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

+ `itemsPerPage`: How many items appear per page (default `6`; must be any integer greater than `0`).
+ `keyboardNavigation`: Whether the pages can be traversed using the left and right arrow keys (default `true`; must be boolean).
+ `prevButtonContent`: The contents of the previous page `li` element (default `&lt;`; must be a string).
+ `nextButtonContent`: The contents of the next page `li` element (default `&gt;`; must be a string).
+ `pageButtonClass`: A custom class name for page button `li` elements (default `false`; must be boolean `false` or a string).
+ `fadeRate`: The rate at which pages fade in and out (default `0`; must be an integer greater than or equal to `0` or the strings `'fast'` or `'slow'`).
+ `fixedHeight`: Whether or not the page container has a fixed height (default `false`; must be boolean).
+ `heightDivisor`: A number to divide `itemsPerPage` (set above) by before multiplying it with the items' height. This value is used as the height of the container when `fixedHeight` (set above) is `true` (default `1`; must be a number).
    
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