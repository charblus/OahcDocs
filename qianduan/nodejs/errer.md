1. Javascript报错Converting circular structure to JSON 错误排解
* 在运行nodejs程序的时候报出以下的错误：
```
 TypeError: Converting circular structure to JSON
    at Object.stringify (native)
    at stringify (/home/dev/backend/backcode/owner-backend/node_modules/express/lib/response.js:1075:12)
    at ServerResponse.json (/home/dev/backend/backcode/owner-backend/node_modules/express/lib/response.js:249:14)
    at /home/ubuntu/sample/index.js:728:10
    at propagateAslWrapper (/usr/lib/node_modules/pm2/node_modules/async-listener/index.js:421:23)
    at /usr/lib/node_modules/pm2/node_modules/async-listener/index.js:458:70
```

> 错误说明指的是对象存在循环引用，在将对象进行json序列化的时候就会报错。出现该问题的原因是在编写代码的时候没有注意到javascript的语法特性，或者说语法缺陷，也就是缺少块级作用域。

例如
```
var obj  = {a:1, b:2};
var s = [];
var list = ['a','b', 'c','d'];
list.forEach(function(ele, i){
    var obj  = {};
    obj[ele] = i;
    s.push(obj);
});
obj.list = s;
JSON.stringify(obj)
```