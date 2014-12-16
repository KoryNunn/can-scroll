function canScrollSelf(element){
    var clientHeight = element.clientHeight,
        clientWidth = element.clientWidth,
        scrollTop = element.scrollTop,
        scrollLeft = element.scrollLeft,
        scrollHeight = element.scrollHeight,
        scrollWidth = element.scrollWidth;

    if(element === window){
        clientHeight = element.innerHeight,
        clientWidth = element.innerWidth,
        scrollTop = element.scrollY,
        scrollLeft = element.scrollX,
        scrollHeight = document.documentElement.scrollHeight,
        scrollWidth = document.documentElement.scrollWidth;
    }

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
        var computedStyle;
        if(offsetParent instanceof Element){
            computedStyle = window.getComputedStyle(offsetParent);
        }
        if(!computedStyle || computedStyle.overflow !== 'visible'){
            var parentScroll = canScrollSelf(offsetParent);

            result.up+=parentScroll.up;
            result.down+=parentScroll.down;
            result.left+=parentScroll.left;
            result.right+=parentScroll.right;
        }

        if(offsetParent === window){
            break;
        }

        offsetParent = offsetParent.offsetParent || window;
    }

    return result;
}

module.exports = canScroll;
module.exports.canScrollSelf = canScrollSelf;