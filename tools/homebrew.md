##HOMEBREW

### brew
1. 安装Homebrew
终端输入
```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"  
```


### brew cask
> `brew cask`是一个用命令行管理Mac下应用的工具，它是基于homebrew的一个增强工具。
安装软件非常容易，一行代码就可以搞定

安装cask
```
 brew tap caskroom/cask
 brew tap caskroom/versions
 使用它安装其他
 brew cask install java8
```


brew常规故障排除步骤
输出命令 --force --verbose --debug
brew cask install java8 --force --verbose --debug

常规故障排除案例
https://github.com/Homebrew/homebrew-cask/issues/58311
