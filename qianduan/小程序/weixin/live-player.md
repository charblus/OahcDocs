### 直播
[小程序直播-接入和使用方法](https://developers.weixin.qq.com/miniprogram/dev/framework/liveplayer/live-player-plugin.html)

1. 组件引入
* 主包引入
```json
   "plugins": {
        "live-player-plugin": {
            "version": "1.0.2", // 注意填写该直播组件最新版本号，微信开发者工具调试时可获取最新版本号
            "provider": "wx2b03c6e691cd7370" // 必须填该直播组件appid，该示例值即为直播组件appid
        }
    }

```
* 分包引入
```json
    "subpackages": [
        {
            "plugins": {
                "live-player-plugin": {
                    "version": "1.0.2", // 注意该直播组件最新版本号，微信开发者工具调试时可获取最新版本号
                    "provider": "wx2b03c6e691cd7370" // 必须填该直播组件appid，该示例值即为直播组件appid
                }
            }
        }
    ]
````

2. 组件使用

> 按第1步的方法把组件代码包配置引入后，即可直接通过链接地址跳转到直播组件页面（即为进直播间页面）链接地址需要带上直播房间 id；房间 id 可通过下面【获取直播房间列表】 API 获取。

* 使用 navigator 组件跳转进入直播间
```js
   let roomId = [直播房间id] // 房间号
    let customParams = { pid: 1 } // 开发者在直播间页面路径上携带自定义参数，后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节
    this.setData({
        roomId,
        customParams: encodeURIComponent(JSON.stringify(customParams))
    })
```

```wxml
    <navigator url="plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id={{roomId}}&custom_params={{customParams}}"></navigator>
    // 其中wx2b03c6e691cd7370是直播组件appid不能修改
```

* 使用 navigateTo 方法跳转进入直播间

```js
let roomId = [直播房间id] // 房间号
    let customParams = { pid: 1 } // 开发者在直播间页面路径上携带自定义参数，后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节
    wx.navigateTo({
        url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${encodeURIComponent(JSON.stringify(customParams))}`
    })
	// 其中wx2b03c6e691cd7370是直播组件appid不能修改
```


3. [其他相关组件、接口和携带参数](https://developers.weixin.qq.com/miniprogram/dev/framework/liveplayer/live-player-plugin.html)
+ 订阅组件： subscribe
+ 获取直播状态API： getLiveStatus
+ 获取直播间相关参数及开发者自定义参数API： getLiveParams
+ 直播间到商详页面携带参数： openid + room_id + scene + custom_params
+ 从群分享卡片返回直播间时携带参数： shareTicket
+ 后台获取直播房间列表 API
+ 后台获取回放源视频 API

> 注：以上 2 个后台调用的接口总上限 500 次/天
