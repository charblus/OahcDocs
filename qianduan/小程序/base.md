基于mpvue实现动态修改小程序标题

在mpvue项目中一个组件中，首先我们要把main.json里面的navigationBarTitleText设置成空，或者写个加载中
```
{
  "navigationBarTitleText": ""
}

```
通过查看官方api文档发现动态修改页面标题的方法是wx.setNavigationBarTitle(Object object) 详细请参考官方文档然后我们把它放到vue文件的mounted属性里就可以了

```
mounted() {
  wx.setNavigationBarTitle({
    title: '当前页面'
  })
}
```


微信小程序页面在调取到接口数据之前是加载中状态
https://blog.csdn.net/qq_40236722/article/details/89405111

微信小程序的加载状态添加和隐藏
https://blog.csdn.net/liukai6/article/details/80864251  

wx.reLaunch和wx.navigateTo，wx.navigateTo的区别
https://blog.csdn.net/weixin_44217741/article/details/88757767


微信小程序-bug-调用wx.login()无响应的原因和解决方案
https://www.cnblogs.com/minigrasshopper/p/9431136.html
微信小程序-微信登录wx.login（Thinkphp后端代码）
https://blog.csdn.net/qq_33514421/article/details/81706299
微信小程序之登录态维护(十一)
https://www.cnblogs.com/nosqlcoco/p/6242316.html


微信小程序ios系统出现页面可以左右滑动bug解决方法
> 微信小程序开发--宽为百分百，页面仍可左右滑动   在设置 .container{width:100%;} 后发现 手机在横向上虽然页面完全展示了，但是部分手机的页面却可以左右滑动(好像是溢出了一样，页面的右边总有一块白色区域)，这肯定不是我们需要的。

1. 设置宽度100%，溢出隐藏即可
注意：这里必须设置紧邻子元素的父标签才有效
```
.container{
width:100%;
overflow-x:hidden;
}
```
2. 解决办法就是在样式  .container{width:100%;}  类里面添加  `position: fixed;`
微信小程序-解决ios系统宽度为100%，页面可以左右滑动bug
https://blog.csdn.net/ChibiMarukoChan/article/details/89135697


微信小程序背景音乐
小程序背景音乐报错 setBackgroundAudioState:fail title is nil! ？
设置title参数后即可修复 不能为空

微信小程序之间如何跳转,如何跳转到别人的小程序
1. https://blog.csdn.net/Angely_cc/article/details/93204425
2. https://blog.csdn.net/qq_32113629/article/details/86519777
errer: navigator 调试时提示开发版小程序已过期
> 开发版小程序已过期,请在开发者工具重新扫码
```
我这边问题解决了  我用wx.navigateToMiniProgram跳转的

wx.navigateToMiniProgram({
  appId: '',
  path: 'page/index/index?id=123',
  extraData: {
    foo: 'bar'
  },
  // envVersion: 'develop',  
  success(res) {
    // 打开成功
  }})
我跳转的是别人的开发版本  过期应该是指对方的开发版本过期了 去掉了envVersion这参数,  跳转成功 注： 第一此跳转失败后发现微信小程序 最近使用中多了个 对方小程序开发版
```


微信小程序深坑之bindtouchend
https://blog.csdn.net/weixin_40935473/article/details/86636081


### 图片篇

如何给小程序页面加载一张背景图片
https://www.jianshu.com/p/61e6e7390f4a
> pages/index/index.wxss 中的本地资源图片无法通过 WXSS 获取，可以使用网络图片，或者 base64，或者使用<image/>标签。
xss无法调用本地资源图片  https://www.cnblogs.com/cppeterpan/p/7340233.html

mpvue里图片mode的写法
https://blog.csdn.net/xm_law/article/details/84964850


目前为止最全的微信小程序项目实例
https://blog.csdn.net/zuoliangzhu/article/details/53862576