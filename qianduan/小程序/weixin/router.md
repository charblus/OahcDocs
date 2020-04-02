1. wx.switchTab  -----  跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面  
2. wx.reLaunch ----- 关闭所有页面，打开到应用内的某个页面
3. wx.redirectTo ---- 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
4. wx.navigateTo ---- 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层
5. wx.navigateBack ---- 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层

6. EventChannel

* EventChannel.emit(string eventName, any args) ---- 触发一个事件
* EventChannel.on(string eventName, EventCallback fn) ---- 持续监听一个事件
* EventChannel.once(string eventName, EventCallback fn) ---- 监听一个事件一次，触发后失效
* EventChannel.off(string eventName, EventCallback fn) ---- 取消监听一个事件。给出第二个参数时，只取消给出的监听函数，否则取消所有监听函数

[微信官方API中的 eventChannel.once如何使用？](https://developers.weixin.qq.com/community/develop/doc/00048c241c02706752a9ba66453400)