
### 路由实现：hash模式 和 history模式
+ hash模式：
- 概述
> 在浏览器中符号“#”，#以及#后面的字符称之为hash，用window.location.hash读取；

- 特点：
> hash虽然在URL中，但不被包括在HTTP请求中；用来指导浏览器动作，对服务端安全无用，hash不会重加载页面。

- 注意：
> hash 模式下，仅 hash 符号之前的内容会被包含在请求中，如 http://www.xxx.com，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。

+ history模式
- 概述
> history采用HTML5的新特性；且提供了两个新方法api：pushState（），replaceState（）可以对浏览器历史记录栈进行修改，以及popState事件的监听到状态变更。通过这两个api完成URL跳转不会重新加载页面

- 注意：
> history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，如 http://www.xxx.com/items/id。后端如果缺少对 /items/id 的路由处理，将返回 404 错误。
> 同时history模式解决了hash模式存在的问题. hash的传参是基于URL的, 如果要传递复杂的数据, 会有体积限制, 而history模式不仅可以在URL里传参, 也可以将数据存放到一个特定的对象中

**vue 不内置router核心包，以插件形式加载**

### vue路由的钩子函数
> 首页可以控制导航跳转，beforeEach，afterEach等，一般用于页面title的修改。一些需要登录才能调整页面的重定向功能。
+ beforeEach主要有3个参数to，from，next：

- to：route即将进入的目标路由对象，
- from：route当前导航正要离开的路由
- next：function一定要调用该方法resolve这个钩子。执行效果依赖next方法的调用参数。可以控制网页的跳转。


### route和router的区别
route是'路由信息对象'，包括path、params、 hash、 query、 fullPath、 matched、 name等路由信息参数;
而router是“路由实例”对象包括了路由的跳转方法，钩子函数等。


### 路由守卫
分三种： 全局守卫、路由独享守卫、组件内守卫
1. 全局守卫
* 方法
```
router.beforeEach((to,from,next)=>{})

// 全局后置钩子
router.afterEach((to,from)=>{})
```
+ beforeEach回调函数中的参数，
- to：进入到哪个路由去，
- from：从哪个路由离开，
- next：函数，决定是否展示你要看到的路由页面。

+ afterEach 只有两个参数:
- to：进入到哪个路由去，
- from：从哪个路由离。


* 例如：main.js中设置全局守卫
- 在main.js中，有一个路由实例化对象router。在main.js中设置守卫已是全局守卫。
- 如下，判断to.path当前将要进入的路径是否为登录或注册，如果是就执行next()，展示当前界面。如果不是，就弹出alert，然后移至登录界面。
- 这样就可实现以下功能

```js
/*01用户在未登录状态下，展示的一直是登录界面。*/
router.beforeEach((to,from,next)=>{
  if(to.path == '/login' || to.path == '/register'){
    next();
  }else{
    // 判断store.gettes.isLogin === false 是否登录(vuex)
    alert('您还没有登录，请先登录');
    next('/login');
  }
})

/*02每次切换路由时，都会弹出alert，点击确定后，展示当前页面。*/
router.afterEach((to,from)=>{
  alert("after each");
})

```


2. 路由独享守卫
* 方法

```
beforeEnter:(to,from,next)=>{}
```

> 用法与全局守卫一致。只是，将其写进其中一个路由对象中，只在这个路由下起作用。

```js
const routes = [
  {path: '/', name:'home', component: Home},
  {path: '/admin', name:'admin', component: Admin, beforeEnter: (to, from, next) => {
    alert('非登录状态，不能访问此页面')；
    next('/login');
  }},
]

```

3. 组件内的守卫
* 方法一 （到达这个组件时）
`beforeRouteEnter:(to,from,next)=>{}`
> 在Admin.vue文件中，点击转到admin路由时，执行beforeRouteEnter函数;  to，from参数与上面使用方法一致。next回调函数略有不同。

```html
<script>
export default {
    data(){
        return{
            name:"NewYork"
        }
    },
    beforeRouteEnter:(to,from,next)=>{
        next(vm=>{
            alert("hello" + vm.name);
        })
    }
}
</script>

```

> 如上例，组件内守卫有特殊情况，如果我们直接以
`beforeRouteEnter:(to,from,next)=>{ alert("hello" + this.name);}`进行访问admin页面，会发现alert输出hello undefined。
> 这是因为，现在访问不到我们的data属性，执行顺序是不一致，这与的声明周期有关。
> 在执行完之前，data数据还未渲染。所以这里，next()会给一个对应的回调，帮助完成。



* 方法二  （离开这个组件时）

`beforeRouteLeave:(to,from,next)=>{}`
点击其他组件时，判断是否确认离开。确认执行next()；取消执行next(false)，留在当前页面。
```js
beforeRouteLeave:(to,from,next)=>{
  if(confirm("确定离开此页面吗？") == true){
    next();
  }else{
    next(false);
  }
}
```


### 报错系统

vue-router报错：`RangeError: Maximum call stack size exceeded`
[参考](https://blog.csdn.net/flting1017/article/details/80533308)
错误直译过来就是“栈溢出”，出现这个错误的原因是因为我进行了递归运算，但是忘记添加判断条件，导致递归无线循环下去。。
一般是路由问题。没事路由死循环。我这里出问题 是嵌套路由 但没有rouer-view


[vue-router] Named Route 'classwrap' has a default child route. When navigating to this named route (:to="{name: 'classwrap'"), the default child route will not be rendered. Remove the name from this route and use the name of the default child route for named links instead.
注： Vue router 中 name的属性值要保证一致性 唯一性