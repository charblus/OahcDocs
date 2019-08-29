```js
  countDown () {
      // 目标日期时间戳
       const end = Date.parse(new Date('2019-8-7 12:10:00').replace(/-/g, '/'))
      // 当前时间戳
       const now = Date.parse(new Date())
      // 相差的毫秒数
       const msec = end - now
      const msec = this.countDownDate
      let hr = parseInt(msec / 1000 / 60 / 60 % 24)
      let min = parseInt(msec / 1000 / 60 % 60)
      let sec = parseInt(msec / 1000 % 60)
      this.wsTime.hr = hr > 9 ? hr : '0' + hr
      this.wsTime.min = min > 9 ? min : '0' + min
      this.wsTime.sec = sec > 9 ? sec : '0' + sec
      const that = this
      setTimeout(function () {
        that.countDown()
      }, 1000)
    },
```

> ` replace(/-/g, '/') ` 解决ios 上new Date  不识别 ‘-’