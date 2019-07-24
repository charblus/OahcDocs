1. CSS常用布局
* CSS常用布局为盒模型div+css、其中需要注意IE的怪异盒模型，我们通常通过`box-sizing`解决
* 传统盒模型布局方式中我们可以细分为文档流布局、浮动布局、定位布局。
* 在ie10+中我们可以使用flex布局，其中我们需要理解最为核心的容器和轴的概念。
* 二维布局中，我们可以使用Grid布局。对于三栏布局，除了浮动实现方式，还有双飞翼布局和圣杯布局。其实双飞翼布局就是对圣杯布局的bug修复，一种改造升级。

2. BFC
BFC即为块级格式化上下文。在普通流的Box属于一种formatting box，类型可以为block或者为inline。但是不能同时为这两者。
并且Block boxes在block formatting context里格式化，inline boxes在inline formatting context中格式化，任何被渲染的元素都属于一个box，不是block就是inline。
+ 其一般表现规则分为以下几种情况：
- 在创建了BFC的元素中，其子元素按照文档流一个接着一个放置。垂直方向上他们的起点是一个包含块的顶部，两者相邻元素的垂直距离取决margin特性。
- 在BFC中，每一个元素的左外边与包含块的左边相接触。及时存在浮动也是如此。除非这个元素也创建了一个新的BFC。
- BFC就是页面的一个独立的行政区域。所有浏览器都会将BFC放到浮动元素所在行的剩余空间内。

+ 当HTML满足一下任意一个条件即可产生BFC：
- float不为none、
- overflow不为hidden、
- display为table-cell，table-caption，inline-block中的任何一个。
- Position值不为relative或static。
> 通常我们使用BFC为了不和浮动元素重叠。清除内部浮动元素。解决上下元素相邻时候重叠。

3. 居中方面问题
 > 分别从水平居中垂直居中两方面回答。
 > 水平、垂直居中分为单个元素、多个元素、已知宽高和未知宽高回答

4. session、cookie、sessionStorage、localStorage区别
> 从client和Server中区分回答session是什么以及一般session如何使用注意事项以及安全策略，
> cookie、sessionStorage和localStorage等分别从概念和异同处回答。最后补充项目中的使用情况

5. px/em/rem的区别
* px顾名思义就是我们通常说的像素大小。
* em和rem都是相对大小，不过em是继承父级元素的字体大小，rem是相对于根元素的大小，这个单位可谓是集相对大小和绝对大小为一身。通过它可以做到只修改根元素即可修改所有字体的大小，又可以避免字体大小逐层复合的连锁反应。当rem相对于浏览器进行缩放，1rem默认为16px。

6. animation和transition使用过么
写法：animation：name duration timing-function delay iteration-function direction 
.transition为过渡动画，这种效果可以在事件中触发，并且圆滑的以动画效果改变css的属性值。不同于transform，transform为2D转换（问题非常开放，尽可能多回答你所知道的）

7. css编写注意事项
> 这个考验个人平时编码的总结和约束。问题较为开放，可以结合个人开发体验和团队约束来回答。比如*0后面不带单位、尽量使用简写、使用子选择器、合理使用id等*。


8. css3 新特性

