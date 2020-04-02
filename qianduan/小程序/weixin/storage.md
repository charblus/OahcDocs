### 存储
每个微信小程序都可以有自己的本地缓存，可以通过
wx.setStorage/wx.setStorageSync、
wx.getStorage/wx.getStorageSync、
wx.clearStorage/wx.clearStorageSync，
wx.removeStorage/wx.removeStorageSync 对本地缓存进行读写和清理。

> 隔离策略 ---- 同一个微信用户，同一个小程序 storage 上限为 10MB。storage 以用户维度隔离，同一台设备上，A 用户无法读取到 B 用户的数据；不同小程序之间也无法互相读写数据。

> 清理策略 ---- 本地缓存的清理时机跟代码包一样，只有在代码包被清理的时候本地缓存才会被清理。


1. wx.setStorage/wx.setStorageSync

> 将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。

```
wx.setStorage({
  key:"key",
  data:"value"
})

try {
  wx.setStorageSync('key', 'value')
} catch (e) { }

```
> value -- 需要存储的内容。只支持原生类型、Date、及能够通过JSON.stringify序列化的对象。


2. wx.getStorage/wx.getStorageSync

> 从本地缓存中异步/同步获取指定 key 的内容

```js
wx.getStorage({
  key: 'key',
  success (res) {
    console.log(res.data)
  }
})


try {
  var value = wx.getStorageSync('key')
  if (value) {
    // Do something with return value
  }
} catch (e) {
  // Do something when catch error
}
```

3. wx.clearStorage/wx.clearStorageSync

> 清理本地数据缓存 wx.clearStorageSync() 是同步的，没有回调；如果需要回调，采用 wx.clearStorage()

```js
wx.clearStorage()

wx.clearStorage({
  success: ()=> {},
  fail: ()=> {},
  complete: ()=> {}
})

try {
  wx.clearStorageSync()
} catch(e) {
  // Do something when catch error
}
```

4. wx.removeStorage/wx.removeStorageSync

> 从本地缓存中移除指定 key

```js
wx.removeStorage({
  key: 'key',
  success (res) {
    console.log(res)
  }
})


try {
  wx.removeStorageSync('key')
} catch (e) {
  // Do something when catch error
}
```

5. wx.getStorageInfo/wx.getStrageInfoSync
> 异步/同步获取当前storage的相关信息

```js
wx.getStorageInfo({
  success (res) {
    console.log(res.keys)
    console.log(res.currentSize)
    console.log(res.limitSize)
  }
})


try {
  const res = wx.getStorageInfoSync()
  console.log(res.keys)
  console.log(res.currentSize)
  console.log(res.limitSize)
} catch (e) {
  // Do something when catch error
}

```