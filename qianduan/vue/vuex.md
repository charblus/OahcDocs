##vuex

1. 基本用法
+ `store.js`
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      code: '11223344'
    },
    // 定义 getters
    getters: {
      code(state) {
        return state.code
      },
    },
    mutations: {
      SET_CODE(state, code) {
        state.code = code
      },
    },
    actions: {
      setCode({ commit }, code) {
        commit('SET_CODE', code)
      },
    }
})

```
> 推荐mutations用全大写,以示区别于actions

+ 应用 `src/main.js`
```js
import store from './store'

// console.log('获取', store.getters.code);
// store.commit('SET_CODE', '665444332211')
// store.dispatch('setCode', '11223344556677889900')
// console.log('更改后获取', store.getters.code);
```


2. 推荐用法
+ 目录结构
```
./store
├── modules
│   ├── course.js
│   ├── detail.js
│   ├── meta.js
│   └── user.js
└── index.js
```

+ `store/index.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 第三方插件
import createLogger from 'vuex/dist/logger'
// modules
import users from './modules/user'
import course from './modules/course'
import detail from './modules/detail'
import meta from './modules/meta'



// 导出 store 对象
export default new Vuex.Store({
    modules:{
        users,
        course,
        detail,
        meta
    },
    plugins: [createLogger()]
})
```

+ `modules/meta.js`

```js

export default {
  state: {
    metaInfo: {
      title: '嘉宾大学',
      keywords: '嘉宾大学',
      description: '嘉宾大学'
    }
  },
  // 定义 getters  
  getters: {
    metaInfo(state) {
      return state.metaInfo
    },
  },
  mutations: {
    CHANGE_META_INFO(state, metaInfo) {
      state.metaInfo = metaInfo
    },
  },
  actions: {
    changeMetaInfo({ commit }, metaInfo) {
      commit('CHANGE_META_INFO', metaInfo)
    },
  },
}

```

+ 应用 `src/main.js`

```js

import store from './store/index'

// store
// store.commit('CHANGE_META_INFO', {
        //   title: '超级大学',
      //   keywords: '这不是一般的大学',
      //   description: '你知道吗'
// });
// store.dispatch('changeMetaInfo', {
      //   title: '超级大学',
      //   keywords: '这不是一般的大学',
      //   description: '你知道吗'
      // })
// console.log('获取', store.getters.metaInfo);

```
> 组件中可以 用`this.$store.getters.metaInfo`

+ 升级用法 -- (映射)
```js
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

  methods: {
    ...mapActions([
      "changeMetaInfo"
    ]),
    initMetaInfo() {
      // this.$store.dispatch("changeMetaInfo", {
      //   title: "缤纷多彩",
      //   keywords: "缤纷多彩",
      //   description: "缤纷多彩"
      // });
      this.changeMetaInfo({
        title: "缤纷多彩",
        keywords: "缤纷多彩",
        description: "缤纷多彩"
      })

    }
}
```



[官方文档  Vuex学习](https://www.jianshu.com/p/5ad4154db508)