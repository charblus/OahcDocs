### MVVM vs MVC
首先，两者都是一种架构思想。都是从后端演变而来。
具体的演变流程：`传统MVC ——> MVP ——> MVVM`
复杂的软件必须有清晰合理的架构，否则无法开发和维护
MVC、MVP和MVVM是用来解决界面呈现和逻辑代码分离而出现的模式
通俗的讲：就是方便大多数人开发和维护出现的代码分离模式
1. 什么是mvvm？
MVVM分为Model、View、ViewModel三者。
* Model 代表数据模型，数据和业务逻辑都在Model层中定义；
* View 代表UI视图，负责数据的展示, 专注于界面的显示和渲染；
* ViewModel 负责监听 Model 中数据的改变并且控制视图的更新，处理用户交互操作；

>  Model 和 View 并无直接关联，而是通过 ViewModel 来进行联系的，Model 和 ViewModel 之间有着双向数据绑定的联系。

> 这种模式实现了 Model 和 View 的数据自动同步，因此开发者只需要专注对数据的维护操作即可，而不需要自己操作 dom。

2. 什么是MVC？
* M - Model  数据：数据实体,用来保存页面要展示的数据。比如ajax获取的数据。
* V - View 视图，显示数据的页面，一般为html。
* C - Controller 控制器： 控制整个业务逻辑,负责处理数据,比如数据的获取,以及数据的过滤，进而影响数据在视图上的展示。

> 从依赖关系看，Model不依赖View和Controller，而View和Controller依赖Model。
> View 传送指令到 Controller, Controller 完成业务逻辑后，要求 Model 改变状态,Model 将新的数据发送到 View，用户得到反馈

+ 一个典型的Web MVC流程
- Controller截获用户发出的请求
- Controller调用Model完成状态的读写操作
- Controller把数据传递给View
- View渲染最终结果并呈献给用户
> 在Web MVC中，Controller变成了中继者，主要工作是协调Model和View

+ AngularJs应用解析：
- AngularJS 应用程序由 ng-app 定义。应用程序在 <div> 内运行。
- 首先在script中用module创建了一个angular的模块。
- 在模块里，每一个controller都是一个简单的MVC的结构。
- myCtrl就是MVC中的C，$scope 就是MVC中的M，而div就是MVC中的V。
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <link rel="stylesheet" href="demo.css" media="screen" title="no title" charset="utf-8">
    </head>
    <body>
        <div ng-app="app">
            <div ng-controller="myCtrl">
                <input type="text" ng-model="msg">
                <h1>{{msg}}</h1>
            </div>
        </div>
    </body>
    <script src="http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
    <script type="text/javascript">
        angular.module('app',[]).controller('myCtrl',function ($scope) {
            $scope.msg="angular";
        })
    </script>
</html>
```

3. MVP
MVP 是从经典的模式MVC演变而来，
它们的基本思想有相通的地方：
Controller/Presenter负责逻辑的处理，
Model提供数据，
View负责显示。
作为一种新的模式，MVP与MVC有着一个重大的区别：在MVP中View并不直接使用Model，它们之间的通信是通过Presenter (MVC中的Controller)来进行的，所有的交互都发生在Presenter内部，而在MVC中View会从直接Model中读取数据而不是通过 Controller。


### MVC的 FQA
1.  什么是MVC (模型 视图 控制器)?
MVC是一个架构模式，它分离了表现与交互。它被分为三个核心部件：模型、视图、控制器。
下面是每一个部件的分工：
+ 视图是用户看到并与之交互的界面。
+ 模型表示业务数据，并提供数据给视图。
+ 控制器接受用户的输入并调用模型和视图去完成用户的需求。

2. 你能解释下MVC的完整流程吗？
下面是MVC（模型、视图、控制器）架构的控制流程：
+ 所有的终端用户请求被发送到控制器。
+ 控制器依赖请求去选择加载哪个模型，并把模型附加到对应的视图。
+ 附加了模型数据的最终视图做为响应发送给终端用户。

3. 使用MVC有哪些好处?
分离了关注点。后台代码被移到单独的类文件，我们可以最大限度的重复利用代码。
自动化UI测试成为可能，因为后台代码移到了.NET类。这让我们更容易做单元测试和自动化测试。

4. MVC的缺点？
> MVC的缺点是由于它没有明确的定义，所以完全理解MVC并不是很容易。使用MVC需要精心的计划，由于它的内部原理比较复杂，所以需要花费一些时间去思考。
> 你将不得不花费相当可观的时间去考虑如何将MVC运用到你的应用程序，同时由于模型和视图要严格的分离，这样也给调试应用程序带来了一定的困难。每个构件在使用之前都需要经过彻底的测试。一旦你的构件经过了测试，你就可以毫无顾忌的重用它们了。
> 根据开发者经验，由于开发者将一个应用程序分成了三个部件，所以使用MVC同时也意味着你将要管理比以前更多的文件，这一点是显而易见的。这样好像我们的工作量增加了，但是请记住这比起它所能带给我们的好处是不值一提
> MVC并不适合小型甚至中等规模的应用程序，花费大量时间将MVC应用到规模并不是很大的应用程序通常会得不偿失。


[angular是MVC模式也还是MVVM架构模式](https://www.jianshu.com/p/11c89d58d5d5)