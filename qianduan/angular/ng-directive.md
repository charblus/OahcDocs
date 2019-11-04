
```
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  numberOfClicks = 0;
  @HostListener('click', ['$event.target'])
  onClick(btn: HTMLElement) {
    console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
  }

}
```

`ng g d mydirective ` 会声明declarations到  `app.modules.ts`中 其他模块调用   如下
我把mydirective 声明declarations到shared modules中并export 导出，然后在自己模块中导入这个分享模块 ，
总结 ； 其他模块使用模块中组件 模块间沟通 import



v1.2
```ts
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
    // el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}


```



v1.4

```html
<p appHighlight [highlightColor]="color">Highlighted with parent component's color</p>
```

```ts
private color = 'red';
```

```ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
    // el.nativeElement.style.backgroundColor = 'yellow';
  }
  @Input() highlightColor: string;
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

```

v1.6

```html
<p  [appHighlight]="color">Highlighted with parent component's color</p>

```

```ts
private color = 'red';
```


```ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
    // el.nativeElement.style.backgroundColor = 'yellow';
  }
  @Input('appHighlight') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'pink');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

```

> `  @Input('appHighlight') highlightColor: string;` 可以编译运行；ok 此处写法tslint  推荐 `@Input() highlightColor: string;`   以上v1.4的版本，



[中文官方例子](https://angular.cn/guide/attribute-directives)


v2.1

```
<h4>Pick a highlight color</h4>
<div>
  <input type="radio" name="colors" (click)="color='lightgreen'">Green
  <input type="radio" name="colors" (click)="color='yellow'">Yellow
  <input type="radio" name="colors" (click)="color='cyan'">Cyan
</div>
<p [appHighlight]="color">Highlight me!</p>
```

```
export class AppComponent {
  color: string;
}
```


v2.3

>  接受第二个参数
```
<p  [appHighlight]="color" defaultColor ="violet" >Highlighted with parent component's color</p>

```



```ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
    // el.nativeElement.style.backgroundColor = 'yellow';
  }
  @Input() defaultColor: string;
  @Input('appHighlight') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.defaultColor || this.highlightColor || 'pink');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}


```
