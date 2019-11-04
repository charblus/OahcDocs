[TOC]

* angular和vue 、react 比较，前者更像是一个框架 后两者较倾向视图view的轻量型 ，angular是一站式开发，从模块、服务、组件、路由、表单、响应式编程，是一个开箱即用，不需要太过依赖第三方类库；
从集成上来看，对ts比其他更友好，虽然说其他已支持ts,但angular最早使用，也是用ts开发的，ts已成为现在前端框架的标配
* 大型项目项目需要处理非常复杂的逻辑，而这些逻辑大部分都是异步操作的，angular 深度集成了rxjs ,用rxjs来支持对逻*辑和异步的响应式编程，这种响应式编程使得对逻辑和异步非常自然；
* 大型项目中表单处理，对字段的约束和验证是复杂的，ng 提供很好机制
* 大型项目需要好的文件结构和编码规范，ng已从框架层做的很好了

生态： 背后google和microsoft (ts和rxjs)，目前linKin 使用

#### 架构
模块的基本功能架构
||
\/
模块中的组件 模块中的服务 指令


#### 绑定
* 属性绑定
DOM属性：当前值[property]="value"，可变，优先使用；可以使用插值表达式双花括号替换
```html
<!-- 模板代码 -->
<h4>插值表达式</h4>
<img src="{{imgUrl}}" alt="">

<h4>DOM属性绑定</h4>
<img [src]="imgUrl" alt="">
```

```ts
// ts代码
export class BindComponent implements OnInit {
  imgUrl: string = "http://via.placeholder.com/300x100"
}

```

* HTML绑定
> 初始值[attr.Attribute]="value"，不可变，有的HTML属性没有对应的DOM属性，比如colspan，当没有DON属性的时候可使用；

* CSS类绑定
> 全替换[class]="classValue"，部分替换[class.className]="classValue"
```html
<h4>class属性全绑定</h4>
<div [class]="allClass">黑玛鱼</div>

<h4>class属性部分绑定</h4>
<div class="aa" [class.bb]="bbValue">黑玛鱼</div>
```

```css
.aa {color: red;}
.bb {font-weight: bold;}
.cc {font-size: 50px;}
```

```ts
  // 字符串类型
  allClass: string = 'aa bb cc';
  // 布尔类型
  bbValue: boolean = true;
```

* 样式绑定 (angular中样式的绑定)

1. <div [class.className] = "条件表达式">...<div>
   class.className 对于单个样式的条件绑定最为合适
2. <div [ngClass] = "{'One': true, 'Two': true, 'Three': false }">...<div>
    ngClass 是自由度和扩展性最强的样式绑定方式
3. <div [ngStyle] = "{'color': someColor, 'font-size': fontSize}">...<div>
  ngStyle 由于是嵌入式样式，它会覆盖掉其他样式，使用是要谨慎


假如一个样式，你想让他在点击的时候显示，再次点击的时候消失，你就可以用样式绑定

<p [class.bgc]="choose.show" (click)="shenfen(choose)">{{choose.duty}}</p>

如上：你可以控制choose.show的true/false来实现bgc这个类的显示和消失。
```ts
  shenfen(choose) {
    choose.show = !choose.show;
  }
```
这就ok了

* [Angular 动态修改样式](https://blog.csdn.net/qq_36279445/article/details/78553802)

* 指令绑定
1. ngFor：循环指令

```html
<h4>ngFor</h4>
<ul>
  <li *ngFor="let item of list;let i = index">
    第{{i+1}}条：{{item}}
  </li>
</ul>
```

```ts
// 数组类型
  list: string[] = ['我的前半生','精彩绝伦','我的后半生','依然绚烂']
```
 
* 扩展
- `<li *ngFor="let item of list;let i = index; let f = first; let l = last; let even = even; let odd = odd">`
首末和奇偶  都是布尔值
- 性能提升，索引性能： trackBy 后面可以是（函数|表达式），量级比较大时候使用

2. ngIf：是否渲染dom元素

```html
<h4>ngIf</h4>
<div>
  <span *ngIf="show">我是显式的</span>
  <span *ngIf="!show">我是隐式的</span>
</div>
```

```ts
 // 布尔类型
  show:boolean = true;
```

3. ngClass：多类名显示

```html
<h4>ngClass</h4>
<div  class="aa" [ngClass]="{bb: bbValue}">Angular指令</div>
```

* 事件绑定
```html
<h4>事件绑定</h4>
<button (click)="todoClick()">点我</button>
```

```ts
    // 事件
  todoClick(){
    alert('点我干嘛？')
  }
```

* 双向绑定
> [(ngModel)]：常用于表单组件
```html
<h4>双向绑定</h4>
<input type="text" [(ngModel)]="name">
<span>{{name}}</span>
```
> 这里注意，需要在`app.module.ts`引入表单模块FormsModule

####管道
* 管道(过滤)：负责将原始值转成显示值

名称	效果
date	日期的转换：date:'yyyy-MM-dd HH:mm:ss'
number	数字的转换：number:'2.1-4'，保留2位整数，最少1个，最多4个
async	异步流
自定义	ng g pipe ...

```html
<h4>管道</h4>
<span>今天是：{{today | date:"yyyy-MM-dd"}}</span>
```

```ts
 today: object = new Date()
```

####投影
> 相当于vue的插槽slot，在ng中使用`ng-content`指令
* 单个投影

```html
<!-- 父组件模板 -->
<app-child>
    <span>
      两个人在一起 进步快的那个人总是会甩掉原地踏步的那个人 因为人的本能都是希望更多地探求生命生活的外延和内涵
    </span>
</app-child>

```

```html
<!-- app-child组件模板 -->
<h4>单个投影</h4>
<ng-content></ng-content>
```

* 多个投影
> 使用类class命名，使用select定位

```html
<!-- 父组件模板 -->
<app-child>
    <div class="ask">“下次见到她，你会怎么做？”</div>
    <div class="answer">“打个招呼，或者，带她看大海”</div>
</app-child>
```

```html
<!-- app-solt组件模板 -->
<h4>多个投影</h4>
朋友问：<ng-content select=".ask"></ng-content>
他说：<ng-content select=".answer"></ng-content>
```

####生命周期

方法	作用
ngOnChanges 	    父组件在初始化或者在修改子组件的输入属性时被调用。引用类型改变，不触发，初始化输入属性
ngDoCheck	        数变更检测(zone.js) 发生的时候被调用，很频繁的被调用，只要视图有变化都会触发
ngAfterViewInit	  模板初始化时调用（一次）
ngAfterViewChecked	模板变化检测
ngAfterContentInit	插槽值初始化时调用（一次）
ngAfterContentChecked	对插槽内容的初始化和变更检测，在视图初始化之前调用。此时可以更改值
ngDestory	        路由切换的时候，前一个组件销毁，后一个组件创建

####父子组件通讯
组件创建：ng直接使用` ng g component `的命令创建组件，会自动生成组件所需的文件，方便快捷。
```
// 父组件
ng g component parent
// 子组件
ng g component parent/child
```

父->子（@Input()）
使用 @Input() 让子组件知道哪个是输入的属性，对应vue中的props。
```html
<h4>我是父组件</h4>
<input type="text" [(ngModel)]="tellchild">
<app-child [message]="tellchild"></app-child>
```

```html
<h4>我是子组件</h4>
<div>父组件传来的数据是：{{message}}</div>
```

```ts
// 子组件ts，告诉组件，message是父组件传进来的
@Input() public message: string;
```

子->父 （@Output()）
依赖`EventEmitter`事件发射器，将信息发射emit给子组件
```html
<h4>我是子组件</h4>
<div>父组件传来的数据是：{{message}}</div>
<input type="text" [formControl]="childmessage">
```

```ts
// 使用FormControl对象，响应式表单需要引入ReactiveFormsModule模块
  childmessage: FormControl = new FormControl();

  // 输出属性，需要定义成事件
  @Output() childtellEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.childmessage.valueChanges.subscribe(msg => {
      // 通过emit将信息发射出去
      this.childtellEvent.emit(msg);
    })
  }

```

```html
<h4>我是父组件</h4>
<input type="text" [(ngModel)]="tellchild">
<div>子组件传来的数据是：{{childmessage}}</div>
<!-- 事件绑定获取数据 -->
<app-child [message]="tellchild" (childtellEvent)="tellResult($event)"></app-child>
```


#### 响应式编程
> 可观察对象 Angular集成了 参考：Rxjs，它使用 Observable 对象来创建流，主要是用于监听一组值或者事件的集合

```ts
// 创建流
// 值的创建
Observable.of([1,2,3,4]);
// 事件的创建
var button = document.querySelector('button');
Observable.fromEvent(button,'click')
```

观察者
不是对象，而是一个回调函数集合，它知道如何监听被 Observable 发送的值。通过订阅`subscribe`的方式观察可观察对象，取消订阅`unsubscribe()`

```ts
// 订阅流
Observable.from([1,2,3,4]).map(item =>{
    item * item
}).subscribe(
    // next检测
  res => console.log(res),

  // error检测
  err => console.log(err),

  // complete检测
  () => console.log('it`s over')
)
```

#### 父子组件通信

* 父组件向子组件传入数据

例如将父组件的user对象传入子组件additem中
```<app-additem [user]=”user" #additem></app-additem>```
1、将父组件的user对象传入子组件additem中，组件模板中绑定属性[user]
2、子组件中类中先导入user对象，之后就可以在组件中直接使用该对象
@Input () user;


* 父组件访问子组件的方法和数据
方法一：
<button (click)="additem.add()" nz-button type="primary">添加</button>
<app-addItem [user]=“user #additem></app-addItem>
通过在子组件标签上加上属性#<name>，那么在组件模板中就可以直接通过该名称调用子组件里的方法和属性。但是这种写法有局限性，只能在html模板中使用，父组件本身的ts代码中并不能使用

方法二：
父组件ts代码中调用子组件的方法和属性。
首先导入模块ViewChild。
import {ViewChild } from '@angular/core';
在父组件的类中将子组件作为viewChild注入到父组件中
@ViewChild(AdditemComponent) 
private additem: AdditemComponent
在父组件的方法中就可以通过this.additem[方法/属性名]来调用子组件的方法或属性数据


* 子组件调用父组件的方法

子组件导出 EventEmitter 属性，通过emits方法，触发父组件中绑定的该属性的事件。
具体用法：
子组件中引入EventEmitter和Output 模块
import { EventEmitter, Output } from '@angular/core';
定义输出：
@Output() addItem = new EventEmitter();

触发：
this.addItem.emit(this.user);
父组件定义addItem事件
<app-addItem (addItem)="onAdditem($event)"></app-addItem>
当子组件emit触发父组件的自定义事件addItem时，会触发父组件的onAdditem方法


