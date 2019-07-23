1. react组件的生命周期相关
react组件生命周期最好的提现是使用es5 的编码方式，
其中生命线大概分为两条路线，分别为`getDefaultProps、getInitialState、componentWillMount、render、componentDidMount、（Running），`然后分为两路，`componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、render、componentDidUpdate以及componentWillUumount`。

> 我们一般在getInitialState中初始化组件的状态数据，在componentDidMount或者componentWillMount中进行获取API请求操作等，在shouldComponentUpdate中进行组件的优化。其中可以展开如何优化以及官方推荐的PureRenderMixin等实现方式。以及别的方面扩展结合自己的开发经验。

2. setState是同步的还是异步的
通常我们的写法都是异步的，但是真正想要我们回答的是当给setState传入函数的时候，其实表现的为同步的。

3. 子组件的componentDidMount和父组件的componentDidMount哪一个先执行？
必然是子组件的componentDidMount限制性，可以从react组件的生命周期进行分析扩展。

4. react的DIFF算法和virtual dom了解多少？
* React的render函数返回的是一个DOM描述，结果仅仅是轻量级的js对象，reactjs在调用setState的时候会更新DOM，而且是先更新virtual dom，然后和实际dom比较，最后更新dom。
* React厉害的地方不是说他比真实的dom速度快，而是你不管数据怎么变化，我都以最小的代价来更新视图。> 方法就是我在内存当中使用新的数据来构建一个virtual dom，然后和旧DOM进行比较，找出差异，然后更新到DOM节点上。
* 当我们修改dom上的一个节点对应的state，react会立即将他标记为“脏状态”，在事件循环的最后才重新渲染所有的脏节点。
* 在实际的代码中，会对新旧两棵树进行一次深度优先遍历，这样每一个节点都会有一个唯一的标记，没遍历到一个节点，就把该节点和新的树进行比较，如果有差异就记录到一个对象中，最后把差异应用到真正的DOM树上。
> 算法实现步骤为：用js对象模拟DOM树，比较两颗虚拟DOM的差异，把差异应用到真正的DOM树上，DOM DIFF采用的是增量更新的方式，类似于打补丁。React需要为节点添加key来保证算法的效率。Key属性可以帮助react定位到正确的节点进行比较。从而大幅度减少DOM操作，提高性能。

5. MVC和MVVM了解么？可以大致说一下双向绑定的实现方式么？
+ Modal层代表数据模型，可以再modal层定义修改和操作数据的逻辑，
+ view代表UI层，负责将数据转换成UI展现出来，
+ viewModal是同步view和modal的对象。用户操作view层，view数据变化会同步到modal上，modal数据变化会立即反应到view中，viewModal通过实现双向绑定来将view和modal连接到一起。
> 而双向绑定，我们可以从脏检查到标记更新来回答。

6. 前端路由的实现方式
> 从react当中我们可以说说react router的使用和原理，以及h5中的historyAPI，pushState和replaceState来回答。

7. a组件是b组件的父组件，b组件是c组件的父组件，如何让渲染后的b和c在同级
通过react16中不返回容器组件可以实现，也可以通过“曲线救国”的方式来实现。

8. react SSR了解么
react ssr有很多种实现方式，但是原理不变，目的就是为了减少首屏白屏时间以及有好的SEO。
> 对于实现方式我们可以从next.js以及webpack-isomorphic-tools来说实现。




