* 周期性更新/数据预拉取
1. 配置数据下载地址
登录小程序 MP 管理后台，进入设置 -> 开发设置 -> 数据周期性更新/数据预加载，点击开启，填写数据下载地址。
前者每隔12h,client向后台拉取；后者小程序冷启动，通过微信后台提前向第三方服务器拉取业务数据
2. 配置token
第一次启动小程序时，调用 wx.setBackgroundFetchToken() 设置一个 TOKEN 字符串，可以跟用户态相关，会在后续微信客户端向开发者服务器请求时带上，便于给后者校验请求合法性。

wx.setBackgroundFetchToken ---- 设置自定义登录态，在周期性拉取数据时带上，便于第三方服务器验证请求合法性
wx.onBackgroundFetchData ---收到 backgroundFetch 数据时的回调
wx.getBackgroundFetchToken ---- 获取设置过的自定义登录态。若无，则返回 fail。
wx.getBackgroundFetchData  ---- 拉取 backgroundFetch 客户端缓存数据

3. 微信客户端定期拉取数据/微信客户端提前拉取数据
前者 -- 微信客户端会在一定的网络条件下，每隔 12 小时（以上一次成功更新的时间为准）向配置的数据下载地址发起一个 HTTP GET 请求，其中包含的 query 参数如下，数据获取到后会将整个 HTTP body 缓存到本地
后者-- 当用户打开小程序时，微信服务器将向开发者服务器（上面配置的数据下载地址）发起一个 HTTP GET 请求，其中包含的 query 参数如下，数据获取到后会将整个 HTTP body 缓存到本地。

4 连接
[周期性更新](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/background-fetch.html)
[数据预拉取](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/pre-fetch.html)