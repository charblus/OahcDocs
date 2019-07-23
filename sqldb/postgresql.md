Postgresql 命令

 pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start   启动数据库

createuser charblus -P   创建用户
createdb zx-internal-db -O charblus -E UTF8 -e   创建数据库

Mac 下 PostgreSQL 的安装与使用
  https://www.cnblogs.com/shineqiujuan/p/4703304.html

➜ go run main.go 
➜  src curl 127.0.0.1:9901
404 page not found%      启动服务后报404 因为没有路由


POSTGRESQL 数据库导入导出

1. 导入整个数据库 psql -U postgres(用户名)  数据库名(缺省时同用户名) < /data/dum.sql                                                                           例如      psql -U  charblus  zx-internal-db < ~/desktop/dum.sql
2.  导出整个数据库 pg_dump -h localhost -U postgres(用户名) 数据库名(缺省时同用户名)   >/data/dum.sql
3.  导出某个表 pg_dump -h localhost -U postgres(用户名) 数据库名(缺省时同用户名)  -t table(表名) >/data/dum.sql
4.  压缩方法 一般用dump导出数据会比较大，推荐使用xz压缩 压缩方法  xz dum.sql 会生成 dum.sql.xz 的文件
5.  xz压缩数据倒数数据库方法 xzcat /data/dum.sql.xz | psql -h localhost -U postgres(用户名) 数据库名(缺省时同用户名) 
