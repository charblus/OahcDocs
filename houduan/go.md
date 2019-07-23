Go学习笔记

Go（又称Golang）是Google开发的一种静态强类型、编译型、并发型，并具有垃圾回收功能的编程语言。

## go 命令

go run main.go  启动go

下载。   https://studygolang.com/dl

Golang的安装. https://studygolang.com/articles/5172

Mac OS X下go的安装，使用，删除
 https://www.jianshu.com/p/40e08c85f9e3

GVM - Go 的多版本管理工具，使用介绍.  https://dryyun.com/2018/11/28/how-to-use-gvm/

* Mac OS X（也称为 Darwin）

Package
“fmt”包实现了格式化 IO（输入/输出）的函数。fmt.Println(...) 
"encoding/json”.将结构体序列化为JSON,    json.Marshal
"net/http”.  http服务


注意： 需要注意的是 { 不能单独放在一行，所以以下代码在运行时会产生错误：
        省略 var, 注意 := 左侧如果没有声明新的变量，就产生编译错误，格式 v_name := value.      这种不带声明格式的只能在函数体中出现

Go微服务 - 构建我们的第一个http服务
https://segmentfault.com/a/1190000014895034


dep是Go的依赖管理工具。它需要Go 1.9或更新版本才能编译。Go工具链
brew install dep


go 依赖管理利器 -- govendor
https://blog.csdn.net/yeasy/article/details/65935864
