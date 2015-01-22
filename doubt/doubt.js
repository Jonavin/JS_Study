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


//打印1-10000之间的所有对称数 （121,11,22,1221）  涉及到回文判断


var myArray = new Array();
for (var i = 0; i < 10000; i++) {
	myArray[i] = (i + 1).toString();
}
var duichenArray = new Array();
for (var i = 0; i < 10000; i++) { //遍历所有的数组元素
	var k = myArray[i].length;
	if (k == 2) {//2位数对称数
		myArray[i][0] == myArray[i][k - 1] ? duichenArray.push(myArray[i]) : "";
	} else if (k == 3) {//3位数
		myArray[i][0] == myArray[i][k - 1] ? duichenArray.push(myArray[i]) : "";
	} else if (k > 3) {//三位数以上
		if (myArray[i][0] == myArray[i][k - 1]) {
			for (var j = 1; j < k - 1; j++) {
				if (myArray[i][1] == myArray[i][j + 1]) {
					duichenArray.push(myArray[i])
				}
			}
		}
	}
}
//正确答案
var arr = [];
for(var i= 1;i <=9;i++){      
    for(var j = 0 ;j<=9;j++){
      if(i==j){
        arr.push(i*10+j);
      }
      arr.push(i*100+j*10+i);
      arr.push(i*1000+j*100+j*10+i);
    }                   
                            
}
alert(arr);
