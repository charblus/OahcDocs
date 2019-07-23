### Nginx

1. 安装nginx

brew安装nginx `brew install nginx `
> 选择依赖Homebrew安装nginx可以减少很多麻烦,细心的你会发现nginx安装过程中下了很多东西.

2. 验证 `brew services start nginx` 然后查看 `http://localhost:8080`,可以看到nginx启始页面

3. 测试nginx
> nginx默认安装到 `/usr/local/` 目录下
```
cd /usr/local/Cellar/nginx 
open ./
```
> 点击版本号文件夹进入html文件夹,里面有index.html和50x.html两个文件,我的全目录是` /usr/local/Cellar/nginx/1.15.12/html`

* 在html文件夹里新建test.json文件,随便输入点内容
```
{
  "name":"charblus",
  "age":"26",
}
```
然后浏览器输入`http://localhost:8080/test.json `, 就能看到你刚创建的文件了



### 本地项目使用配置

一、配置文件 `/usr/local/etc/nginx/servers`
> nginx自带的配置文件`/usr/local/etc/nginx/nginx.conf` 一般不动 同时 `cp /usr/local/etc/nginx/nginx.conf /usr/local/etc/nginx/nginx.conf.bak` 备份下
> 因为  `/usr/local/etc/nginx/nginx.conf`  中 ` include servers/*; `,所以我把本地项目文件配置放入`/usr/local/etc/nginx/servers`下，创建`nginx.conf`
例如：本地使用nginx 测试服务器
项目根目录为开发项目下构建后dist, api 为 接口api
```
server {
  listen       7070;
  server_name  localhost;

  location / {
      root   /Users/macbookpro/Downloads/workspace/jbcm/jbcmVideo/dist;
      index  index.html index.htm;
  }
  location /api/ {
    proxy_pass   https://www.ijiabin.com;
  }

  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
      root   html;
  }
}

server {
  listen       7071;
  server_name  localhost;

  location / {
      root   /Users/macbookpro/Downloads/workspace/jbcm/jbcnh5/dist;
      index  index.html index.htm;
  }
  location /api/ {
    proxy_pass   https://www.ijiabin.com;
  }

  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
      root   html;
  }
}

```

二、启动

在终端中输入 `ps -ef|grep nginx`
如果执行的结果是

```
501 15800 1 0 12:17上午 ?? 0:00.00 nginx: master process /usr/local/Cellar/nginx/1.15.12/bin/nginx -c /usr/local/etc/nginx/nginx.conf
501 15801 15800 0 12:17上午 ?? 0:00.00 nginx: worker process
501 15848 15716 0 12:21上午 ttys000 0:00.00 grep nginx
```

表示已启动成功，如果不是上图结果，在终端中执行

```
/usr/local/Cellar/nginx/1.15.12/bin/nginx -c /usr/local/etc/nginx/nginx.conf

```
命令即可启动nginx。  这时候如果成功访问`localhost:8080`，说明成功安装和启动好了。

三、停止
在终端中输入` ps -ef|grep nginx` 获取到nginx的进程号，注意是找到“nginx:master”的那个进程号，如下面的进程好是` 15800`

```
501 15800 1 0 12:17上午 ?? 0:00.00 nginx: master process /usr/local/Cellar/nginx/1.15.12/bin/nginx -c /usr/local/etc/nginx/nginx.conf
501 15801 15800 0 12:17上午 ?? 0:00.00 nginx: worker process
501 15848 15716 0 12:21上午 ttys000 0:00.00 grep nginx

```

在终端中输入以下几种命令都可以停止

- `kill -QUIT 15800` (从容的停止，即不会立刻停止)
- `kill -TERM 15800` （立刻停止）
- `Kill -INT 15800` （和上面一样，也是立刻停止）


四、重启

如果配置文件错误，则将启动失败，所以在启动nginx之前，需要先验证在配置文件的正确性，如下表示配置文件正确

```
$ /usr/local/Cellar/nginx/1.15.12/bin/nginx -t -c /usr/local/etc/nginx/nginx.conf

nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful
```
重启有两种方法  1）在终端输入输入如下命令即可重启
```
$ cd /usr/local/Cellar/nginx/1.15.12/bin/
$ ./nginx -s reload
```
2）根据进程号重启，执行命令 kill -HUP 进程号
```
启动：sudo nginx
停止：sudo nginx -s stop
```

### 报错
在Mac上用brew安装Nginx，然后修改Nginx配置文件，再重启时报出如下错误：
```
nginx: [error] invalid PID number "" in "/usr/local/var/run/nginx/nginx.pid"
```
解决办法：
```
$ sudo nginx -c /usr/local/etc/nginx/nginx.conf
$ sudo nginx -s reload
```