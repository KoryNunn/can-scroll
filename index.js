function canScrollSelf(element){
    var clientHeight = element.clientHeight,
        clientWidth = element.clientWidth,
        scrollTop = element.scrollTop,
        scrollLeft = element.scrollLeft,
        scrollHeight = element.scrollHeight,
        scrollWidth = element.scrollWidth;

    return {
        up: scrollTop,
        down: Math.max(scrollHeight - clientHeight - scrollTop, 0),
        left: scrollLeft,
        right: Math.max(scrollWidth - clientWidth - scrollLeft, 0)
    };
}

function canScroll(element){
    var result = canScrollSelf(element),
        offsetParent = element.offsetParent;

    while(offsetParent){
        if(window.getComputedStyle(offsetParent).overflow !== 'visible'){
            var parentScroll = canScrollSelf(offsetParent);

            result.up+=parentScroll.up;
            result.down+=parentScroll.down;
            result.left+=parentScroll.left;
            result.right+=parentScroll.right;
        }

        offsetParent = offsetParent.offsetParent;
    }

    return result;
}

module.exports = canScroll;
module.exports.canScrollSelf = canScrollSelf;