### ES6

1. 数组比较常用的方法
.forEach
.map
.every
.filter            
以上可链式调用
```
Arr.every(v=>v>0)  ==== ture|false
Arr.filter(v=>v<=3) ==== new array


new Set(arr)  ——> Set 去重 （利用本身没有重复元素）然后 扩展展开下变成数组
console.log( [ … new Set(arr) ])

合并数组
1.   arr1.concat(arr2)
2.  [ …new Set( […arr1, …arr2] ) ]

> 淘宝首页到底用了多少种标签

```
new Set([...document.querySelectorAll('*')].map(v => v.nodeName)).size
```
> 基础的dom查询。 数组展开符去重  map映射
`document.querySelectorAll('*')  `  得到nodeList对象。然后转数组


2. 探讨 for in && Object.keys

import * as custom from './utils/filter'
for (let key in custom) {
  Vue.filter(key, custom[key])
}

import * as custom from './common/filters/custom'
// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
 

3. es6 新特性
1. 变量声明const和let
2. 模板对象与模板字符串
3. 箭头函数
4. 类的支持
5. 参数默认值，不定参数，拓展参数
6. Spread Operator 展开运算符
7. import 和 export
8. Promise