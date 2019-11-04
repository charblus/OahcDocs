没有过滤器或不使用过滤器 可以可使用计算属性


```
  computed: {
    publishTime () {
      let date = this.newsDetail.publish_time
      let hr = parseInt(date / 1000 / 60 / 60 % 24)
      let min = parseInt(date / 1000 / 60 % 60)
      this.ptTime.hr = hr > 9 ? hr : '0' + hr
      this.ptTime.min = min > 9 ? min : '0' + min
      return this.ptTime.hr + ':' + this.ptTime.min
    }
  },

```