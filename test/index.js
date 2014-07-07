var canScroll = require('../'),
    test = require('grape');

GLOBAL.window = {
    getComputedStyle: function() {
        return {
            overflow: 'auto'
        };
    }
}
test('can not scroll', function(t){
    t.plan(1);

    var testElement = {
        clientHeight: 10,
        clientWidth: 10,
        scrollHeight: 10,
        scrollWidth: 10,
        scrollTop: 0,
        scrollLeft: 0
    };

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

    var testElement = {
        clientHeight: 10,
        clientWidth: 10,
        scrollHeight: 20,
        scrollWidth: 10,
        scrollTop: 0,
        scrollLeft: 0
    };

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

    var parentElement = {
        clientHeight: 10,
        clientWidth: 10,
        scrollHeight: 20,
        scrollWidth: 10,
        scrollTop: 0,
        scrollLeft: 0
    };
    var testElement = {
        clientHeight: 10,
        clientWidth: 10,
        scrollHeight: 10,
        scrollWidth: 10,
        scrollTop: 0,
        scrollLeft: 0,
        offsetParent: parentElement
    };

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

    var parentElement = {
        clientHeight: 10,
        clientWidth: 10,
        scrollHeight: 20,
        scrollWidth: 10,
        scrollTop: 0,
        scrollLeft: 0
    };
    var testElement = {
        clientHeight: 10,
        clientWidth: 10,
        scrollHeight: 20,
        scrollWidth: 10,
        scrollTop: 10,
        scrollLeft: 0,
        offsetParent: parentElement
    };

    var scroll = canScroll(testElement);

    t.deepEqual(scroll, {
        up:10,
        down:10,
        left:0,
        right:0
    });
});