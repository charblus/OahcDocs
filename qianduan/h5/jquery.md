
1. “你说熟悉JQuery插件开发，那解释一下$.fn是什么”
- `$.` 和 `$.fn`,这前者是绑定在页面元素上的插件，后者是 绑定在jquery上的插件
- 例如

```html
<div id="myDiv"></div>
```

```js
(function($){
  $.fn.extend({
    test:function(){
       alert($(this).attr('id'));
    }
})
})(jQuery)
 
$('#myDiv').test();  // 打印出 : myDiv
 
(function($){
$.extend({
test:function(){
alert('111');
}
})
})(jQuery)
$.test();  // 打印出：111
```
- $.fn是指jquery的命名空间，加上fn上的方法及属性，会对jquery实例每一个有效。 如扩展$.fn.abc(),即$.fn.abc()是对jquery扩展了一个abc方法,那么后面你的每一个jquery实例都可以引用这个方法了. 
那么你可以这样子：`$("#div").abc(); `

+ 扩展 
*jQuery为开发插件提拱了两个方法，分别是：*
- jQuery.fn.extend(object);给jQuery对象添加方法。 
- jQuery.extend(object);为扩展jQuery类本身.为类添加新的方法。 


查看jQuery代码， 不难发现fn是什么，原来` jQuery.fn =jQuery.prototype`代码如下：
```
jQuery.fn = jQuery.prototype ={ 
　　　init: function( selector, context ){//....　 
　　　//...... 
}; 
```
- jQuery.extend(object);　为jQuery类添加添加类方法，可以理解为添加静态方法。如：
```
$.extend({ 
　　add:function(a,b){returna+b;} 
}); 
```
> 便为　jQuery　添加一个为add　的　“静态方法”，之后便可以在引入 jQuery　的地方，使用这个方法了， `$.add(3,4); //return 7 `

- jQuery.fn.extend(object);对jQuery.prototype进得扩展，就是为jQuery类添加“成员函数”。jQuery类的实例可以使用这个“成员函数”。 

简单插件开发：
> 比如我们要开发一个插件，做一个特殊的编辑框，当它被点击时，便alert当前编辑框里的内容。可以这么做：

```js
$.fn.extend({ 

  alertWhileClick: function(){ 

    $(this).click(function(){ 
      alert($(this).val()); 
    }); 
    
  } 

}); 

```
