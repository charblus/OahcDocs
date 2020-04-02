1. 分包
2. 查询dom

let id = "#textareawrap";
        let query = wx.createSelectorQuery();//创建查询对象
        query.select(id).boundingClientRect();//获取view的边界及位置信息
        query.exec(function (res) {
          that.setData({
            height: res[0].height + "px"
          });
        });

3. 数组中对象属性setData
let _obj = `aaa[0].val`
this.setData({
  [_obj]: "tengxun"
})

5. 微信小程序 之各种数字键盘集锦\
https://www.jianshu.com/p/86d7c16008dd
http://www.okeydown.com/html/2018/12-18/1012.html
text：不必解释
number：数字键盘（无小数点）
idcard：数字键盘（无小数点、有个 X 键）
digit：数字键盘（有小数点）
注意：number 是无小数点的，digit 是有小数点的


6/微信小程序购物车 数量加减功能
https://www.jianshu.com/p/a0c2c8712dab


8. setData

    let _edit = `billOptions[0].edit`
    this.setData({
      [_edit]: false,
      [`priceInfo.flag`]: false
    })



9. <view bind:tap="selectOpts" data-index="{{index}}" data-indexs="{{index}}"></view>
点击事件 多个参数 data-index 应该在 其他参数之前 之后的话 获取不到其他参数