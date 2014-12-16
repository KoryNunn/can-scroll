var canScroll = require('../'),
    test = require('tape');

GLOBAL.document = {
    documentElement:{
        scrollHeight: 50,
        scrollWidth: 50
    }
};
GLOBAL.window = {
    innerHeight: 50,
    innerWidth: 50,
    scrollX: 0,
    scrollY: 0,
    getComputedStyle: function() {
        return {
            overflow: 'auto'
        };
    },
    document: GLOBAL.document
};
GLOBAL.Element = function(settings){
    for(var key in settings){
        this[key] = settings[key];
    }
}


test('can not scroll', function(t){
    t.plan(1);

    var testElement = new Element({
        clientHeight: 10,
        clientWidth: 10,
        scrollHeight: 10,
        scrollWidth: 10,
        scrollTop: 0,
        scrollLeft: 0
    });

    var selfScroll = canScroll.canScrollSelf(testElement);

    t.deepEqual(selfScroll, {
        up:0,
        down:0,
        left:0,
        right:0
    });
});

test('can self scroll', function(t){
    t.plan(1);

    var testElement = new Element({
        clientHeight: 10,
        clientWidth: 10,
        scrollHeight: 20,
        scrollWidth: 10,
        scrollTop: 0,
        scrollLeft: 0
    });

    var selfScroll = canScroll.canScrollSelf(testElement);

    t.deepEqual(selfScroll, {
        up:0,
        down:10,
        left:0,
        right:0
    });
});

test('can parent scroll', function(t){
    t.plan(1);

    var parentElement = new Element({
        clientHeight: 10,
        clientWidth: 10,
        scrollHeight: 20,
        scrollWidth: 10,
        scrollTop: 0,
        scrollLeft: 0
    });
    var testElement = new Element({
        clientHeight: 10,
        clientWidth: 10,
        scrollHeight: 10,
        scrollWidth: 10,
        scrollTop: 0,
        scrollLeft: 0,
        offsetParent: parentElement
    });

    var scroll = canScroll(testElement);

    t.deepEqual(scroll, {
        up:0,
        down:10,
        left:0,
        right:0
    });
});

test('opposite scroll', function(t){
    t.plan(1);

    var parentElement = new Element({
        clientHeight: 10,
        clientWidth: 10,
        scrollHeight: 20,
        scrollWidth: 10,
        scrollTop: 0,
        scrollLeft: 0
    });
    var testElement = new Element({
        clientHeight: 10,
        clientWidth: 10,
        scrollHeight: 20,
        scrollWidth: 10,
        scrollTop: 10,
        scrollLeft: 0,
        offsetParent: parentElement
    });

    var scroll = canScroll(testElement);

    t.deepEqual(scroll, {
        up:10,
        down:10,
        left:0,
        right:0
    });
});