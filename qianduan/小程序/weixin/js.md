1. js文件code结构组成
<!-- 引用插件 -->
const util = require('../util.js); 
Page({
  <!-- 初始化数据 -->
  data: {},
  <!-- 声明周期 -->
  onload: function(){},
  onReady: function(){},
  onShow: function(){},
  onHide: function () {},
  onUnload: function () {},
  事件函数: function(){},
  onPullDownRefresh: function(){},
})

2. js 文件中功能语法
- 修改数据
```
  this.setData({
    index: this.data.index+1
  })
```

3. 消息提示 
[显示消息提示框](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html)

```js
     wx.showToast({
        title: '',
        icon: 'loading', // "success", "loading", "none"
        duration: 1500,
        mask: true,
      })

      wx.hideToast({})  // 隐藏消息提示框

```

4. [显示模态对话框](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showModal.html)

```js
wx.showModal({
  title: '提示',
  content: '这是一个模态弹窗',
  success (res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})

```

5.  loading 提示框
> 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框

```js
wx.showLoading({
  title: '加载中',
  // mask: true
})

setTimeout(function () {
  wx.hideLoading()
}, 2000)

```

注意：
* wx.showLoading 和 wx.showToast 同时只能显示一个
* wx.showLoading 应与 wx.hideLoading 配对使用


6. 显示操作菜单

```
wx.showActionSheet({
  itemList: ['A', 'B', 'C'],
  success (res) {
    console.log(res.tapIndex)
  },
  fail (res) {
    console.log(res.errMsg)
  }
})

```

