

1. js对比

```js
typeof {} === 'object'
// true
typeof [] === 'object'
// true
[5, 9, 1] === [5, 9, 1]
// false
[1, 9, 1] === [3, 9, 1]
// false
{} === {}
// false
{a: 1} === {a: 1}
// false
```

2. JavaScript闭包了解么
闭包即为函数，但是我们通常所说的闭包是指有权访问并操作别的函数作用域中变量的函数。
一般表现形式为函数中返回函数。通常我们开发中就会有很多的闭包比如定时器、事件监听、IIFE等。
> 此题是一个借题发挥涨分的题目，我们可以谈谈闭包的高级用法，比如单例模式中的使用、js的节流和防抖甚至可以谈一谈js的运行机制，gc机制。


+ “你了解闭包，能不能写段代码应用一下”
```js
var myModule = (function (window, undefined) {
  let name = "echo";

  function getName() {
      return name;
  }
  return {
      name,
      getName
  }
})(window);

// myModule = null;  // 将其指向的对象释放 防止内存泄露
```

+ 简单写一个常见的关于闭包的面试题

```js
for( var i = 0; i < 5; i++ ) {
  setTimeout(() => {
      console.log( i );
  }, 1000 * i)
}
// 每秒钟输出一个5，一共输出5次
```
+ 思考，那么如何做到每秒钟输出一个数：0，1，2，3，4
解决方案一：
（可用闭包实现）
```js
for( var i = 0; i < 5; i++ ) {
  ((j) => {
      setTimeout(() => {
          console.log( j );
      }, 1000 * j)
  })(i)   
}

```
> "setTimeout"方法里应用了闭包，使其内部能够记住每次循环所在的词法作用域和作用域链。

>总结：  由于setTimeout中的回调函数会在当前任务队列的尾部进行执行，因此上面第一个例子中每次循环中的setTimeout回调函数记住的i的值是for循环作用域中的值，此时都是5，而第二个例子记住的i的数为setTimeout的父级作用域自执行函数中的j的值，依次为0，1，2，3，4。



3. 前端跨域都有哪些解决方案
js的前端跨域很多，通常我们给出方案并且应该简述优缺点，比如方式有，`jsonp`、`document.domain+iframe`、`window.name+iframe`、`location.hash+iframe`、`postMessage跨域`、`CORS跨域`、`websocket跨域`、`node代理跨域`以及`NGINX代理`等方式。
其中对于我们常用的可以张开说明，比如CORS跨域中简单请求和非简单请求的`header`字段，`access-control-allow-origin`、`access-control-allow-headers`、`access-control-allow-method`等常规head字段说明。

4. JavaScript中的继承
+ Es6中我们直接可以使用extends关键字去继承，通过重写super完成继承，但是在es5中，才是应该去主要细说的
+ 原型继承的核心为父类的实例作为子类的原型。
- 优点：非常纯粹的继承关系、简单易用、父类新增的原型方法原型属性子类都可以访问到。
- 缺点：要为子类新增属性和方法，必须要放到new Animal（）之后，不能放到构造器中，来自原型对象的引用类型被所有实例共享，创建子类，无法向构造函数传参。
+ 构造函数继承核心：使用父类构造函数来增强子类的实例
- 优点：解决了共享引用类型的问题，可以在构造函数里面传参，可以实现多继承。
- 缺点：实例不是父类实例，只能继承父类的属性和方法，不能继承父类原型的方法和属性、无法实现函数的复用。
+ 组合继承的核心：通过调用父类的构造，继承父类的属性并保留参数的有点，通过父类的实例作为子类原型，实现函数复用。
- 优点：可以继承属性和方法以及原型上的属性和方法、即是子类实例也是父类实例、不存在属性共享的问题、函数可复用。
- 缺点：调用了两次构造函数，生成了两份实例。
+ 寄生组合继承核心：砍掉父类的实例属性，这样，在调用两次父类的构造时候，就不会初始化两次实例方法和属性，避免组合继承的缺点

> es6 extends继承，ES5中的继承，实质上是先创建子类上的this，然后再将父类方法添加到this上，
> es6则是先创建父类的实例方法（必须调用super），然后在用子类构造函数修改this。没有调用super，是没有this的。


5. JavaScript中的节流和防抖
> 防抖的原理为触发事件的n时间后才执行，如果n时间内事件再次被触发，则以新触发的时间为标准，然后n事件后再执行
```js

```

> 节流的原理为在持续触发事件时候，每隔一段时间执行一次。我们可以使用time line或者定时器来实现，或者二者结合实现。

```js

```

6. JavaScript中的事件你了解哪些
> 这种题目一般为开放性的题目，首先我们可以从事件的阶段来回答，事件冒泡、事件捕获、以及目标阶段。同时我们可以说明下事件委托的使用方式以及浏览器兼容性的问题。


7. setTimeout设置为0发生了什么
这主要考察js的执行机制，可以从`event loop`来回答，包括js的单线程以及task queue microtask queue等。


8. 原生ajax请求了解么
```js

```

9. js判断数据类型的几种方法

- 最常见的typeof，返回的String格式。能够判断function，但是判断Object比较烦
- 判断已知数据类型可以用instanceof，注意instanceof后面一定是对象类型，并且大小写不能错。
- constructor方式。但是在实现继承的时候回出现错误，需要手动修改。
- 通用但是很繁琐的方法为prototype：`Object.prototype.toString.call(a)`

10. this指向问题
+ 常规为题，从默认绑定、隐含绑定、明确绑定以及new绑定来回答。
+ 扩展es6中的箭头函数，以及call、apply和bind的区别。

11. 你如何看待JavaScript这门语言
> 开放新问题，可以从参考《JavaScript语言精粹》，谈谈自己开发中遇到的各种问题，最重要的不是吐槽而是对鸡肋的解决办法，比如继承的实现、块级作用域、变量提升等。

12. es6用过么？说说promise的实现
> 关于es6的知识点这里不再赘述。Promise的实现主要是pub-sub模式。状态和行为相分离的难点。

13. JavaScript运行
[原文链接](http://www.jianshu.com/p/80350c9ec398)
1. GUI渲染线程
2. JS引擎线程
3. 定时器触发线程
4. 事件触发线程
5. 异步HTTP请求线程


jS中将一个值转换为字符串的3种方法
1.value.toString()

2."" + value

3.String(value)

第一种方法存在的问题是,它不能把null和undefined转换为字符串.还有第二种和第三种方法,这两种方法的效果基本一样.

""+value: 使用加法运算符配合一个空字符串可以把任意值转换为字符串,我觉得这种方法代码的可读性很差,但相对String(value)来,还是有一些人更喜欢用这种转换方式.

String(value): 这种方法可读性更好,唯一的问题是,这种函数调用可能会迷惑一些人,尤其是那些熟悉Java的程序员,因为String同时也是一个构造函数.要注意的是它作为普通函数和作为构造函数时的表现完全不同

其他：

a. 要把一个数字转换为字符串，只要给它添加一个空的字符串即可：
var n = 100;
var n_as_string = n + "";

b. 要让数字更加显式地转换为字符串,可以使用String()函数:
var string_value = String(number);

c. 使用toString()方法:
string_value = number.toString();
Number对象的（基本的数字转换为Number对象，以便可以调用这个方法）toString()方法有一个可选的参数，该参数用来指定转换的基数。如果不指定这个参数，转换会以10为基数进行。然而，也可以按照其他的基数（2到36之间的数）来转换数字。
var n = 17;
binary_string = n.toString(2); // Evaluates to "10001"
octal_string = "0" + n.toString(8); // Evaluates to "021"
hex_string = "0x" + n.toString(16); // Evaluates to "0x11"

d. toFixed()方法把一个数字转换为字符串，并且显示小数点后的指定的位数。它不使用指数表示法。
var n = 123456.789;
n.toFixed(0); // "123457"
n.toFixed(1); // "123456.8"

e. toExponential()使用指数表示法把一个数字转换为字符串，小数点前面有1位数，而小数点后面有特定的位数。
var n = 123456.789;
n.toExponential(1); // "1.2e+5"
n.toExponential(3); // "1.235e+5"

f. toPrecision()使用指定的有意义的位数来显示一个数字，如果有意义的位数还不够显示数字的整个整数部分，它就使用指数表示法。
var n = 123456.789;
n.toPrecision(4); // "1.235e+5"
n.toPrecision(7); // "123456.8"




14. JS遍历性能比较（for与for...in以及for...of）
https://blog.csdn.net/garrettzxd/article/details/80628866
由结果可以看到性能高低为;

for > for...of > for...in

而且for循环本身比较稳定

原因是for...in需要穷举对象的所有属性，包括自定义的添加的属性也能遍历到

且for...in的key是String类型，有转换过程，开销比较大

但是for循环的i是Number类型，开销较小

抛开业务场景和使用便利性，单纯谈性能和效率是没有意义的。


ES6新增的诸多数组的方法确实极大的方便了前端开发，使得以往复杂或者冗长的代码，可以变得易读而且精炼，而好的for循环写法，在大数据量的情况下，确实也有着更好的兼容和多环境运行表现

随着浏览器的更新，这些方法的孰优孰劣也可能成为玄学。目前发现在Chrome Canary 70.0.3513.0下for of 会明显比Chrome 68.0.3440.84快。

