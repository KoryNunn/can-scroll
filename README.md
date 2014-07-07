# can-scroll

Return the number of pixels an element can be scrolled by in all directions

## usage

canScroll(element) will recurse up the DOM tree of an element and add up the scrollable distance on all of its offsetParents

    canScroll(someElement);

    // -> {up: 10, down: 20, left: 0, right: 0}

If you only care about the scrollability of the target element, you can use canScroll.canScrollSelf(element), which does not recurse.