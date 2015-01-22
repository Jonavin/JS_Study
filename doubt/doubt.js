var ary = Array(10);

var ary2 = Array.apply(null,ary);

var ary3 = Array.apply(null,{length:10});

console.log(ary);
console.log(ary2);
console.log(ary3);

console.log(Object.keys(ary))//空
console.log(Object.keys(ary2));//0到9
console.log(Object.keys(ary3))//0到9

var ary4 = [,,,,,,,,,];
var ary5 = Array.apply(null,ary4);

console.log(ary4);
console.log(ary5);//,,,,,,,,,
