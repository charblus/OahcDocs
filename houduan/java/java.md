## java

###brew 安装java
1. 搜索版本
```
# 输入下列命令
 brew tap caskroom/versions
# 当成功后，检测java的版本
brew search java
```
2. 安装
```
brew cask install java
# 结束的时候记得查看一下java的版本有没有装成功
java -version
# 卸载的时候可以使用，其他工具同理
brew cask uninstall java
```
3. 切换java版本(多版本使用)

* 修改环境变量
```

# java 配置
# JDK 11
export JAVA_11_HOME="/Library/Java/JavaVirtualMachines/openjdk-11.0.2.jdk/Contents/Home"
# JDK 12
export JAVA_12_HOME="/Library/Java/JavaVirtualMachines/openjdk-12.0.1.jdk/Contents/Home"
#默认JDK 11
export JAVA_HOME=$JAVA_11_HOME

#alias命令动态切换JDK版本  
alias jdk11="export JAVA_HOME=$JAVA_11_HOME"    
alias jdk12="export JAVA_HOME=$JAVA_12_HOME"  

```

* 更新配置
```
➜  ~ source ~/.zshrc
```

切换版本

```
➜  ~ jdk11
➜  ~ java -version
openjdk version "11.0.2" 2019-01-15
OpenJDK Runtime Environment 18.9 (build 11.0.2+9)
OpenJDK 64-Bit Server VM 18.9 (build 11.0.2+9, mixed mode)
➜  ~ jdk12
➜  ~ java -version
openjdk version "12.0.1" 2019-04-16
OpenJDK Runtime Environment (build 12.0.1+12)
OpenJDK 64-Bit Server VM (build 12.0.1+12, mixed mode, sharing)

```


### 安装包安装

1. 下载  下载链接如下
https://www.oracle.com/technetwork/java/javase/downloads/index.html

2. pkg 双击安装
3. 配置
```

##env

export JAVA_8_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_221.jdk/Contents/Home
export JAVA_12_HOME=/Library/Java/JavaVirtualMachines/jdk-12.0.2.jdk/Contents/Home

# 默认为JDK8
JAVA_HOME=$JAVA_8_HOME

#alias命令动态切换JDK版本  
alias jdk8="export JAVA_HOME=$JAVA_8_HOME"    
alias jdk12="export JAVA_HOME=$JAVA_12_HOME" 

PATH="$JAVA_HOME/bin:$PATH"
CLASSPATH=".:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar"

export JAVA_HOME PATH CLASSPATH
```