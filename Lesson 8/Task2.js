"use strict";

// выражение ниже выведет undefined
if (!("a" in window)) {
    var a = 1;
}
alert(a);


// выражение ниже выведет undefined
var b = function a(x) {
    x && a(--x);
};
alert(a);

// выражение ниже выведет функцию а(х)
function a(x) {
    return x * 2;
}
var a;
alert(a);

// выражение ниже выведет 10
function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);

// выражение ниже выведет window
function a() {
    alert(this);
}
a.call(null);