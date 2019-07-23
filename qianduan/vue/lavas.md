### Lavas
> vue pwa 解决方案

Unhandled rejection Error: Cannot find module '@babel/preset-env' from '/Users/macbookpro/Downloads/workspace/jbcm/lavas-pwa-co'

问题产生的原因
babel-loader和babel-core版本不对应所产生的，
* babel-loader 8.x对应babel-core 7.x
* babel-loader 7.x对应babel-core 6.x
https://www.jianshu.com/p/74cb6203c39f
https://www.jianshu.com/p/a3e779c22dde

