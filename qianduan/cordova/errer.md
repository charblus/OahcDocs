
* 01
➜  Demo cordova build ios
CordovaError: Promise rejected with non-error: 'xcode-select: error: tool \'xcodebuild\' requires Xcode, but active developer directory \'/Library/Developer/CommandLineTools\' is a command line tools instance\n'
    at cli.catch.err (/Users/macbookpro/.nvm/versions/node/v10.16.0/lib/node_modules/cordova/bin/cordova:29:15)
    at process._tickCallback (internal/process/next_tick.js:68:7)

解决这个问题

1. 已经安装了Xcode --- 可到appStore中查找XCode，点击安装
2. 命令行工具  -- 到 https://developer.apple.com/download/more/ 搜索下载与appStore版本相关

> 首先确保你已经安装了Xcode和命令行工具如果你已经安装了Xcode，请检查版本和你的mac版本以下载正确的命令行工具。在此处下载命令行工具命令行工具 安装后，运行此命令以修复xcode-select路径
`sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`

之后再次运行命令,即可



* 02
```
ld: symbol(s) not found for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)

** BUILD FAILED **


The following build commands failed:
	Ld /Users/macbookpro/Downloads/workspace/appProj/Demo/platforms/ios/build/emulator/HelloWorld.app/HelloWorld normal x86_64
(1 failure)
xcodebuild: Command failed with exit code 65

```

在构建机器上需要一个开发配置概要文件。应用程序可以在没有配置文件的模拟器上运行，但必须在实际设备上运行。
如果您在Xcode中打开项目，它可能会自动设置配置为你。否则，您将必须创建转到iOS开发人员中心并创建一个配置文件。

这里使用cordova 创建的项目，build faild后，删除项目，重新创建后build success

