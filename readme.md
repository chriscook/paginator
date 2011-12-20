Pageinator
=============

Version 0.1.0
-----------

### Introduction

__Pageinator__ is a _jQuery_ plug-in to pageinate a number of items.

### How to use it

1. Add the files (`jquery.pageinator.js` and `pageinator.css`) to your project, along with _jQuery_.
2. Add your items to your page, with a container element.
3. Add the following _jQuery_ to your page, to be executed on load:

    $('#pgn-container').pageinator();

...where `#pgn-container` is a selector for the item container.

A demo is available in demo.html.

### Additional settings

Additional settings can be used to customise ___Pageinator___, and should be added as a parameter within curly braces:

+ `itemsPerPage` sets how many items appear per page (default `6`).

An example of these in practice:

    $('#pgn-container').pageinator({
        'itemsPerPage'     : 4
    });

### Where does it work?

Tested in:

+ Firefox 9

### Author and Acknowledgements

+ Written by [Chris Cook](http://chris-cook.co.uk)