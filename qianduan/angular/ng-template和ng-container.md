ng-template
ng-container

```html
<h5>Table开发中</h5>
<table class="table">
  <thead>
    <tr>
      <th scope="col">
        <ng-container *ngTemplateOutlet="title"></ng-container>
      </th>
      <th scope="col">
        <ng-container *ngTemplateOutlet="dataIndex; context: columns"></ng-container>
      </th>
      <th scope="col" class="line">
        <ng-container *ngTemplateOutlet="key; context: columns"></ng-container>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

<br />
<ng-template>你会显示吗？？？？？？</ng-template>
<ng-template #title>
  <span>Table1</span>
</ng-template>
<ng-template #dataIndex let-address>
  <span>{{address}}!</span>
</ng-template>
<ng-template #key let-id="key">
  <span>{{id}}!</span>
</ng-template>



<h3>template</h3>
<ng-container *ngTemplateOutlet="greet"></ng-container>
<hr>
<ng-container *ngTemplateOutlet="eng; context: myContext"></ng-container>
<hr>
<ng-container *ngTemplateOutlet="svk; context: myContext"></ng-container>
<hr>
<ng-template #greet><span>Hello</span></ng-template>
<ng-template #eng let-name><span>Hello {{name}}!</span></ng-template>
<ng-template #svk let-person="localSk"><span>Ahoj {{person}}!</span></ng-template>
```

相对应
```css
.line::before {
  content: "$"
}
```


```ts

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-zx-base-table',
  templateUrl: './zx-base-table.component.html',
  styleUrls: ['./zx-base-table.component.scss']
})
export class ZxBaseTableComponent implements OnInit {
  // @Input()
  // private columns: any[];
  // @Input()
  // private data: any[];
  public columns =
    { $implicit: 'Full Name', dataIndex: 'adress', key: 'name' };
  public myContext = {$implicit: 'World', localSk: 'Svet' };
  constructor() { }

  ngOnInit() {
  }

}

```

> 友情提示：若 let 语法未绑定任何属性名，则上下文对象中 $implicit 属性，对应的值将作为默认值。

NgTemplateOutlet 指令作用 
> 该指令用于基于已有的 TemplateRef 对象，插入对应的内嵌视图。在应用 NgTemplateOutlet 指令时，我们可以通过 [ngTemplateOutletContext] 属性来设置 EmbeddedViewRef 的上下文对象。绑定的上下文应该是一个对象，此外可通过 let 语法来声明绑定上下文对象属性名。


https://segmentfault.com/a/1190000009530554


接受数组

```html
<h5>Table开发中</h5>
<table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col" *ngFor="let item of columns; index as key ">
        <ng-container *ngTemplateOutlet="column; context: item" > </ng-container>
      </th>
    </tr>
  </thead>
  <tbody>
      <tr>
          <!-- <th scope="row">1</th> -->
          <td *ngFor="let item of datas; index as key">
            <ng-container *ngTemplateOutlet="dataList; context: item" > </ng-container>
          </td>
        </tr>
  </tbody>
</table>

<br />
<ng-template #column let-theadName="title">
  <span>{{theadName}}</span>
</ng-template>
<br />
<ng-template #dataList let-list="name">
<span>{{list}}</span>
</ng-template>

```


```ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-zx-base-table',
  templateUrl: './zx-base-table.component.html',
  styleUrls: ['./zx-base-table.component.scss']
})
export class ZxBaseTableComponent implements OnInit {
  // @Input()
  // private columns: any[];
  // @Input()
  // private data: any[];
  private columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }];


  public datas = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  }, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }];

  constructor() { }

  ngOnInit() {
  }

}


```


v2.1

```html

<ng-template #otpl let-msg>
  <p>{{msg}}</p>
</ng-template>
<ng-container *ngTemplateOutlet="otpl; context: mycontext"></ng-container>
<ng-template [ngTemplateOutlet]="otpl" [ngTemplateOutletContext]="mycontext"></ng-template>
<div [ngTemplateOutlet]="otpl" [ngTemplateOutletContext]="mycontext"></div>

```

```
  private mycontext = {
    message: 'Bye ngv4 ngOutletContext! ',
    $implicit: 'Hello, Semlinker!'
  };
```


v2.3
<ng-content></ng-content>  
父组件投影到子组件中  一个子组件中写多个的话，使用最后一个 




v2.3

<div *ngIf="opls?.isShow">what?</div>
  public  opls = {
    isShow: true
  };
对象后 点前面追加 便是可选



v2.4

```
  <app-zx-table #basicTale [zxData]="dataSet">
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Address</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let data of basicTale.data">
        <td>{{data.name}}</td>
        <td>{{data.age}}</td>
        <td>{{data.address}}</td>
        <td>
          <a>Action 一 {{data.name}}</a>
          <a><i class="iconfont icon-xuefen header-icon align-middle"></i></a>
        </td>
      </tr>
    </tbody>
  </app-zx-table>

```
可以换成 <tr *ngFor="let data of basicTale.data1">

```
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-zx-table',
  templateUrl: './zx-table.component.html',
  styleUrls: ['./zx-table.component.scss']
})
export class ZxTableComponent implements OnInit {
  rawData: any[] = [];
  data: any[] = [];
  @Input()
  private columns: any[];

  @Input()
  set zxData(data: any[]) {
    if (Array.isArray(data)) {
       console.log(data);
      this.rawData = data;
      this.parseInputData();
    } else {
      console.warn('nzData only accept array');
    }
  }
  private data1: any[] = [
    {
      key: '1',
      name: 'John ',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  parseInputData(): void {
    this.data = this.rawData;
  }

  constructor() { }

  ngOnInit() {
    console.log(this.zxData);
  }

}


```


v2.56
<app-zx-table #scrollTale [zxData]="dataSet" [zxScroll]="{x:'1300px'}">
#scrollTale 一个组件中不可以重复


v2.7
box-shadow: -6px 0 6px 0px rgba(0, 0, 0, .05);
box-shadow: 6px 0 6px 0px rgba(0, 0, 0, .05);


v2.8
ViewChild 用法
```ts
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <button (click)="onPreviousSearchPosition()">Previous</button>
    <div #panel style="overflow-y:scroll; height: 300px; width:100px" >
      <div (click)="questionSelection(log)" *ngFor="let log of arr; let i = index" innerHTML="{{log}}" [id]="i"></div>
    </div>
    <button (click)="onNextSearchPosition()">Next</button>
  `
})
export class AppComponent {

  public arr = Array(1000).fill(0).map((item, index) => ++index);
  @ViewChild('panel', { read: ElementRef }) public panel: ElementRef<any>;

  public onPreviousSearchPosition(): void {
    this.panel.nativeElement.scrollTop -= 100;
  }

  public onNextSearchPosition(): void {
    this.panel.nativeElement.scrollTop += 100;
  }

  questionSelection(question) {
    console.log(question);
  }
}

```


