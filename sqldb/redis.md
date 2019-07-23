### redis
[mac上安装使用redis](https://www.jianshu.com/p/2123bfbb1139)


### 安装
Centos7
建议安装在	/usr/local    下
第一步：下载redis安装包
wget http://download.redis.io/releases/redis-stable.tar.gz
第二步：解压压缩包
tar -zxvf redis-stable.tar.gz
第三步：yum安装gcc依赖
yum install gcc
第四步：跳转到redis解压目录下
cd redis-stable
第五步：编译安装
make MALLOC=libc　　
cd src && make install      (将/usr/local/redis-stable/src目录下的文件加到/usr/local/bin目录)


### 启动
启动redis的三种方式
先切换到redis-stable/src目录下
1、直接启动redis
`./redis-server`
redis启动成功，但是这种启动方式需要一直打开窗口，不能进行其他操作，不太方便
按 ctrl + c可以关闭窗口。

2、以后台进程方式启动redis
第一步：修改redis.conf文件
将  daemonize no    修改为    daemonize yes
第二步：指定redis.conf文件启动
./redis-server /usr/redis-stable/redis.conf
第三步：关闭redis进程
首先使用ps -aux | grep redis查看redis进程
[root@iZwz991stxdwj560bfmadtZ src]# ps -aux | grep redis
root     18714  0.0  0.1 141752  2008 ?        Ssl  13:07   0:00 ./redis-server 127.0.0.1:6379
root     18719  0.0  0.0 112644   968 pts/0    R+   13:09   0:00 grep --color=auto redis

使用kill命令杀死进程
kill -9 18714

3、设置redis开机自启动
1、在/etc目录下新建redis目录
mkdir redis
2、将/usr/local/redis-stable/redis.conf 文件复制一份到/etc/redis目录下，并命名为6379.conf　　
cp /usr/local/redis-stable/redis.conf /etc/redis/6379.conf

3、将redis的启动脚本复制一份放到/etc/init.d目录下
cp /usr/local/redis-stable/utils/redis_init_script /etc/init.d/redisd

4、设置redis开机自启动
先切换到/etc/init.d目录下
然后执行自启命令
[root@iZwz991stxdwj560bfmadtZ init.d]# chkconfig redisd on
service redisd does not support chkconfig　
看结果是redisd不支持chkconfig
解决方法：
使用vim编辑redisd文件，在第一行加入如下两行注释，保存退出
# chkconfig:   2345 90 10
# description:  Redis is a persistent key-value database
注释的意思是，redis服务必须在运行级2，3，4，5下被启动或关闭，启动的优先级是90，关闭的优先级是10。
再次执行开机自启命令，成功
[root@iZwz991stxdwj560bfmadtZ init.d]# chkconfig redisd on
启动：
service redisd start　
关闭：
service redisd stop


redis开启远程访问
redis默认只允许本地访问，要使redis可以远程访问可以修改redis.conf
解决办法：注释掉bind 127.0.0.1可以使所有的ip访问redis
在redis3.2之后，redis增加了protected-mode，在这个模式下，即使注释掉了bind 127.0.0.1，再访问redisd时候还是报错，如下
修改：protected-mode yes 修改：protected-mode no


Redis连接时报错：Could not connect to Redis at 127.0.0.1:6379: Connection refused
在安装好redis扩展 尝试连接redis时，客户端打不开，原因是需要先开启服务端，这需要先配置——
https://www.cnblogs.com/Gnnnny/p/7851147.html


### 使用


set  oahcoaykey king       ===> ok
get  oahcoaykey                ===> “king”
del   oahcoaykey                ===> (integer) 1

* Redis hash 
hmset oahckey name "oahcoay" description "yaochao is a king" links 20 visitors 23000       (Redis hash 是一个string类型的field和value的映射表，hash特别适合用于存储对象。)                      ===> ok
127.0.0.1:6379> hgetall oahckey
1) "name"
2) "oahcoay"
3) "description"
4) "yaochao is a king"
5) "links"
6) "20"
7) "visitors"
8) "23000"


* Redis list
   
> Redis列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）
LPUSH 将一个或多个值插入到列表头部
LPUSH sqldbkey redis
LPUSH sqldbkey mongoldb.      
LRANGE key start stop    获取列表指定范围内的元素
LRANGE  sqldbkey 0 10
RPUSH   在列表中添加一个或多个值
RPUSHX  为已存在的列表添加值

RPOP  移除列表的最后一个元素，返回值为移除的元素。
RPOP sqldbkey
LLEN sqldbkey.  获取列表长度
LPOP 移出并获取列表的第一个元素
LPOP sqldbkey


