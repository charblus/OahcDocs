angular6开发不完全笔记（一） -- ng-cli


### 新建项目

请在终端/控制台窗口中运行  `ng -v` 命令。 确定您已安装@angular/cli
if没有执行 `npm install -g @angular/cli` 全局安装 Angular CLI。

```
ng new project-name 
```
就具体项目开发前调研技术栈追加相关参数

* 样式style 如 ` --style=scss `  value值可以是（css | scss | sass | less | stylus ）等

* 项目中使用路由routing 如 `--routing` 生成routing module

* 前缀 prefix 如 `--prefix` 或 `-p`  默认为app,参数自定义  比如 `--prefix=wn`

后话
> angular.json 文件中 `"prefix": "app"`, 会更改为`"prefix": "wn"`
>  tslint验证规则 项目中所有的组件前缀都改为`wn`开头的 index.html文件`<app-root></app-root>`变为`<wn-root><wn-root>` 
> 所有 `ng g c component-name` 生成的组件 prefix默认时使用`<app-componet-name></app-componet-name>` 自定义前缀后 `<wn-componet-name></wn-componet-name>`
#####综合上述 `ng new project-name --style=scss --routing --prefix=wn`

更多参数参考 [ng new](https://github.com/angular/angular-cli/wiki/new)


### 启动项目
`ng serve` 或者 `npm run start`

* 开发环境项目如开始对接接口需要配置本地代理 
1. 一般在根目录下添加proxy.config.json文件
```
{
  "/api": {
    "target": "http://xxx.xxx.com",
    "secure": false,
    // "logLevel":"debug",
    "changeOrigin": true,
    "pathRewrite":{
      "^/api":""
    }
  }
}
```
2. 文件package.json中scripts 下 start的value值`ng serve --proxy-config proxy.config.json `   或者在angular.json 中  serve下 options添加属性 ` "proxyConfig"："proxy.config.json"`

> ng serve 其他参数
* 接口默认4200 `--port 4201`
* 启动时自动打开浏览器 `--open` 简写`-o`
* 用host指定运行主机 `--host 0.0.0.0 ` 或`--public-host 192.168.1.111` 指定浏览器客户端将使用的URL
* 正在生成的应用程序的基URL `--base-href /admin/`或者 `--base-href http://www.example.com/`  相当于index.html添加<base>html标签  属性href规定页面中所有相对链接的基准 URL。 如 `<base href="http://www.example.com/">` 注：参数值后面一定要多个 `/` 结尾，否则无效

#####综合上述1（未对接） `ng serve --port 4201 --open`
#####综合上述2 `ng serve --proxy-config proxy.config.json --host 0.0.0.0 --port 4201 --open`

更多参数参考 [ng serve](https://github.com/angular/angular-cli/wiki/serve)


### 项目开发

1. 生成组件 （component-name 是驼峰形式componentName，生成为component-name.ts）
+ `ng g c component-name` 生成在src下全局组件
+ `ng g c module-name/component-name` 组件生成在某模块下src下，并声明注册该模块
+ `ng g c path/component-name` 组件生成在项目path路径下，默认注册父模块，由父模块决定是否是全局组件还是某模块组件；

[禁止生成spec.ts文件](https://www.itsvse.com/thread-5196-1-1.html)  --    ` --no-spec `

2. 生成模块 `ng g m module-name` 同上
其他参数
+  `--routing` 生成路由模块。  
+ `--module` 允许指定声明模块
####综上： `ng g m module-name --routing --module module-name`

3. 生成服务 `ng g s service-name` 同上

4. 生成管道(原1.x中过滤器) `ng g p pipe-name`

5. 生成指令 `ng g d directive-name`
   指令分 属性型指令和结构型指令

6. 生成class `ng g cl class-name` class-mame一般首字母大写，驼峰

7. 生成接口interface `ng g i interface-name` 接口为ts特性 类型检查 声明参数类型

更多参数参考 [ng generate](https://github.com/angular/angular-cli/wiki/generate)


### 编译项目
`ng build` 或 `npm run build`

参数
* `--base-href /myUrl/ ` 相当于在index.html中添加<base href="/myUrl/">，默认<base href="/">

* `--prod` 通过UglifyJS 删除更多未使用的代码，使项目编译后更小体积

* `--output-hashing all ` 编译后输出文件名以哈希模式，便于缓存

* `--stats-json` 生成一个“stats.json”文件，可以使用诸如：webpack bundle analyzer'或https://webpack.github.io/analyse.等工具进行前端分析。

* `--aot` 启用aot预编译
* `--build-optimizer` 使用“aot”选项时启用@angular-devkit/build-optimizer 优化。

更多参数参考 [ng build](https://github.com/angular/angular-cli/wiki/build)