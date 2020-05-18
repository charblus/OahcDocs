```wxml

<view class="stepper">
  <!-- 减号 -->
  <text class="{{quantityInfo.minusStatus}}" bindtap="bindMinus">-</text>
  <!-- 数值 -->
  <input type="number" bindchange="bindManual" value="{{quantityInfo.value}}" />
  <!-- 加号 -->
  <text class="normal" bindtap="bindPlus">+</text>
</view>
```



```scss
  /*累加器主容器*/  
  .stepper {  
    height: 50rpx;  
    /*给主容器设一个边框*/  
    border: 1rpx solid #ccc;  
    border-radius: 6rpx;  
  }  
  /*加号和减号*/  
  .stepper text {  
    width: 50rpx;  
    height: 50rpx;
    line-height: 50rpx;  
    text-align: center;  
    float: left;  
  }  
    /*数值*/  
  .stepper input {  
    width: 68rpx;  
    height: 50rpx;  
    float: left;  
    margin: 0 auto;  
    text-align: center;  
    font-size: 24rpx;  
    /*给中间的input设置左右边框即可*/  
    border-left: 1rpx solid #ccc;  
    border-right: 1rpx solid #ccc;  
  }  

  /*普通样式*/  
  .stepper .normal{  
    color: black;  
  }  

  /*禁用样式*/  
  .stepper .disabled{  
    color: #ccc;  
  }  

```




```js


    quantityInfo: {
      label: '数量',
      type: 'number',
      flag: false,
      value: 1,
      minusStatus: 'disabled' // 禁止
    },



// 数量输入和累计
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.quantityInfo.value;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      [`quantityInfo.value`]: num,
      [`quantityInfo.minusStatus`]: minusStatus
    });
  },
    /* 点击加号 */
  bindPlus: function () {
    var num = this.data.quantityInfo.value;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      [`quantityInfo.value`]: num,
      [`quantityInfo.minusStatus`]: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      [`quantityInfo.value`]: num,
    });
  },

```