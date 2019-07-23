

### Vue与Angular以及React的区别？
1. 与AngularJS的区别
相同点:
> 都支持指令：内置指令和自定义指令；都支持过滤器：内置过滤器和自定义过滤器；都支持双向数据绑定；都不支持低端浏览器。
不同点:
> AngularJS的学习成本高，比如增加了Dependency Injection(依赖注入)特性; 而Vue.js本身提供的API都比较简单、直观；vue有组件化概念，angular中没有
> 在性能上，AngularJS依赖对数据做脏检查，所以Watcher越多越慢; Vue.js使用基于依赖追踪的观察并且使用异步队列更新，所有的数据都是独立触发的。
> vue中数据放在data对象里面，angular数据绑定在$scope上面


2. 与Angular的区别
相同点:
vue在设计之初参考了很多angular的思想,vue和angular绑定都可以用{{}}, vue指令用v-xxx，angular用ng-xxx, 都有组件化概念
不同点:
vue相比于angular来说更加的简单, vue相当于angular要变得小巧很多，运行速度比angular快；
不同的是angular项目分模块，其次划分组件为核心，为最小单位，源码使用TypeScript，对TypeScript支持友好

`模块 路由 组件 模板 服务 指令 管道` 多了个服务和模块

3. 与React的区别
相同点:
> React采用特殊的JSX语法，Vue.js在组件开发中也推崇编写.vue特殊文件格式，对文件内容都有一些约定，两者都需要编译后使用；React使用JSX渲染页面，Vue使用简单的模板
> 中心思想相同：一切都是组件，组件实例之间可以嵌套；都提供合理的钩子函数，可以让开发者定制化地去处理需求；
> 将注意力集中保持在核心库,都不内置列数AJAX，Route等功能到核心包，而是以插件的方式加载,有配套的路由和负责处理全局状态管理的库；在组件开发中都支持mixins的特性。
不同点:
> React采用的Virtual DOM会对渲染出来的结果做脏检查；
> Vue.js在模板中提供了指令，过滤器等，可以非常方便，快捷地操作Virtual DOM。



> 定位不同：
vue: 适合中小型企业级应用
angular: 适合大型企业级应用
react: 兼容多端