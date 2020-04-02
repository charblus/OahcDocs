
> wxs 可拿来做过滤器指令使用

### 详情添加视频---过滤产品详情数据，获取视频url,赋值给video tag

1. 同组件或单页面目录下create 以.wxs为后缀名文件 如： info.wxs

2. 文件内 编辑函数并exports导出

  ```js
  function getUrl(event) {
      var regExp = getRegExp("<source src=\"(.*)\" type=\"video/mp4\"", "img");
      var regExp_res = regExp.exec(event);
      if (regExp_res && regExp_res[1]){
        return regExp_res[1];
      }  
    }
    module.exports = {
      getUrl: getUrl
    }
  ```

3. 在info.wxml 中引用  （可随便放位置）

  ```<wxs module="wxs" src="./info.wxs"></wxs>```

4. 即info.wxs中 export出的方法就可以在当前页面中使用

  ```html
    <view wx:if="{{wxs.getUrl(product.description) && is_description == 0}}">
      <video src="{{wxs.getUrl(product.description)}}" style='width:100%'></video>
    </view>
  ```

### 保留俩位有效数字---code写在当前目录wxml中，故不用引用

```
<!-- 該模板接受一個數字,保留兩位有效數字,一般用於價格計算 -->
<template name="tofixed">
	<text>{{fn.toFixed(value)}}</text>
	<wxs module="fn">
    module.exports = {
    	toFixed: function (value) {
  			return value.toFixed(2);
			}
    }
  </wxs>
</template>

```


### [wxs语法参考](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/)
> WXS（WeiXin Script）是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构。 WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致。

WXS 模块
变量
注释
运算符
语句
数据类型
基础类库
