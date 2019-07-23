
eval 采用eval加密的js进行解密
> 打开谷歌或者火狐浏览器，然后按 F12，接着把这代码复制进去，
来源 `http://www.1kkk.com/vol1-30996/#ipg2`
```js
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('0 8=\'\';0 5=\'\'+\'6\'+\'4\'+\'d\'+\'9\'+\'9\'+\'1\'+\'f\'+\'b\'+\'3\'+\'b\'+\'3\'+\'c\'+\'2\'+\'7\'+\'c\'+\'1\';$("#a").e(5);',16,16,'var|||||hihu76h|||guidkey||dm5_key||||val|'.split('|'),0,{}))
```