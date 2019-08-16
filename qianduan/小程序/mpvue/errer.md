mpvue编译时出现 “未找到入口 app.json 文件，或者文件读取失败，请检查后重新编译。”错误
https://blog.csdn.net/wscfan/article/details/82978654#comments

 1. 改变根目录project.config.json文件的miniprogramRoot属性，改为dist/wx/2. mpvue1.1.1以上app.json跟原生小程序一样，单独json配置，1.1.1以下版本在main.js entry入口文件中配置 参考官网 http://mpvue.com/build/mpvue-loader/#appjsonpagejson


 mpvue菜鸟踩坑吃鸡篇一
 http://www.bslxx.com/a/vue/kaiyuankuangjia/2018/0316/1824.html