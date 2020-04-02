### 视图组件

cover-image -- 覆盖在原生组件之上的图片视图 [链接](https://developers.weixin.qq.com/miniprogram/dev/component/cover-image.html)
cover-view -- 覆盖在原生组件之上的文本视图。[链接](https://developers.weixin.qq.com/miniprogram/dev/component/cover-view.html)
movable-area
movable-view 
scroll-view -- 可滚动视图区域。使用竖向滚动时，需要给scroll-view一个固定高度，通过 WXSS 设置 height [链接](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html)
swiper  -- 滑块视图容器。其中只可放置`swiper-item`组件，否则会导致未定义的行为。
swiper-item 
view  -- 视图容器


### 基础内容
icon  -- 图标
progress -- 进度条
rich-text -- 富文本
text  -- 文本

### 表单组件
button -- 按钮
checkbox  -- 多选项目
checkbox-group -- 多项选择器，内部由多个checkbox组成
editor  -- 富文本编辑器，可以对图片、文字进行编辑。
form  --表单;当点击 form 表单中 form-type 为 submit 的 button 组件时，会将表单组件中的 value 值进行提交，需要在表单组件中加上 name 来作为 key。
input  -- 输入框
label
picker -- 从底部弹起的滚动选择器。
picker-view --- 嵌入页面的滚动选择器。其中只可放置 picker-view-column组件，其它节点不会显示。
picker-view-column -- 滚动选择器子项。仅可放置于picker-view中，其孩子节点的高度会自动设置成与picker-view的选中框的高度一致
radio -- 单选项目
radio-group  -- 单项选择器，内部由多个 radio 组成。
slider  -- 滑动选择器。
switch -- 开关选择器
textarea --- 多行输入框。


### 导航
functional-page-navigator --- 仅在插件中有效，用于跳转到插件功能页。
navigator -- 页面链接

### 媒体组件
audio
camera
image -- 图片
live-player
live-pusher
video

### 地图
map [地图](https://developers.weixin.qq.com/miniprogram/dev/component/map.html)

### 画布
canvas  [画布链接](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html
)
### 开放能力
ad       ---  Banner 广告。
official-account  -- 公众号关注组件
open-data --- 用于展示微信开放的数据
web-view --- 承载网页的容器。会自动铺满整个小程序页面 [相关接口api](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)


### native-component -- 原生组件
1. 小程序中的部分组件是由客户端创建的原生组件，这些组件有：
camera
canvas
input（仅在focus时表现为原生组件）
live-player
live-pusher
map
textarea
video

2. 使用限制
+ 原生组件的层级是最高的
+ 原生组件还无法在 picker-view 中使用
+ 部分CSS样式无法应用于原生组件
  - 无法对原生组件设置 CSS 动画
  - 无法定义原生组件为 position: fixed
  - 不能在父级节点使用 overflow: hidden 来裁剪原生组件的显示区域
+ 原生组件的事件监听不能使用 bind:eventname 的写法，只支持 bindeventname。原生组件也不支持 catch 和 capture 的事件绑定方式
+ 原生组件会遮挡 vConsole 弹出的调试面板

3. cover-view 与 cover-image
为了解决原生组件层级最高的限制。小程序专门提供了 cover-view 和 cover-image 组件，可以覆盖在部分原生组件上面。这两个组件也是原生组件，但是使用限制与其他原生组件有所不同。
4. 原生组件同层渲染
同层渲染是为了解决原生组件的层级问题，在支持同层渲染后，原生组件与其它组件可以随意叠加，有关层级的限制将不再存在。但需要注意的是，组件内部仍由原生渲染，样式一般还是对原生组件内部无效。当前 video, map, live-player, live-pusher, canvas(2d) 组件已支持同层渲染。
5. 原生组件相对层级
为了可以调整原生组件之间的相对层级位置，小程序在 v2.7.0 及以上版本支持在样式中声明 z-index 来指定原生组件的层级。该 z-index 仅调整原生组件之间的层级顺序，其层级仍高于其他非原生组件