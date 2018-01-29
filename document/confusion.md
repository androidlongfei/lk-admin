# 疑惑

## 为什么vue中data动态增加的属性是非响应式的

```
这是因为动态增加的熟悉没有被Object.defineProperty初始化, 导致该属性没有set和get方法.
从而导致该属性没有被watcher到.结果就无法响应式
```

> `响应式`:数据改变 -> 视图改变

备注:

- Object.defineProperty用法:`./technical.md`
- 响应式原理图:`./responsive.png`

## Vue执行DOM更新是异步的.

Vue观察到数据变化，将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会一次推入到队列中.

因为DOM更新是异步的,如果想在DOM更新之后做某些操作需要用到`Vue.nextTick(callback)`。

例如:

```javascript
data() {
  return {
    message: 'not updated'
  }
},
methods: {
  updateMessage() {
    this.message = 'updated'
    console.log(this.$el.textContent) // => 'not updated'
    this.$nextTick(() => {
      console.log(this.$el.textContent) // => 'updated' =>做某些操作
    })
  }
}
```

## CSS中scoped的作用

scoped属性会自动添加一个唯一的属性（比如 data-v-21e5b78）为组件内CSS 指定作用域，编译的时候 .list-container:hover 会被编译成类似 .list-container[data-v-21e5b78]:hover

```html
<style scoped>
  @media (min-width: 250px) {
    .list-container:hover {
      background: orange;
    }
  }
</style>
```

> `scoped`:的作用是使CSS只在当前组件中起作用

## 页面刷新后,vuex中的数据就不存在了

首先,JavaScript代码是运行在内存中的，代码运行时的所有变量，函数，也都是保存在内存中的。 刷新页面，以前申请的内存被释放，重新加载脚本代码，变量重新赋值，所以这些数据要想储存就必须储存在外部. 例如：Local Storage, Session Storage, IndexDB等。 这些是浏览器提供的API，让你可以将数据储存在硬盘上，做持久化储存。具体选择哪一个就根据你实际的需求来决定。

其次,要清楚vuex的作用，vuex主要用在`父子组件通信`或者`兄弟组件间通信`，如果不用vuex通信就得通过复杂的事件触发完成。一般开发都存在组件里面套组件的情况，所以vuex用起来比较方便，如果组件数目比较少，不用vuex完全可以的.

## IOS浏览器,首先进入主页(有滚动条),再进入子页面，然后直接按返回主页出现空白情况

这是由于IOS浏览器兼容性问题,解决方法是返回到主页时，将滚动条滚动到Y抽指定位置(就是路由跳转前的位置)或者滚动到顶部

```javascript
const scrollYPosition = function (position) {
    let scrollPosition = 0
    if (position) {
        scrollPosition = position
    }
    setTimeout(() => {
        console.log('scrollPosition', scrollPosition)
        document.body.scrollTop = scrollPosition
        // 兼容google chrome
        document.documentElement.scrollTop = scrollPosition
    }, 5)
}
```

> `scrollPosition`:就是滚动条Y抽的值,值可以是0(就是滚动到顶部)

> `备注`:必须在dom渲染完成(mounted生命周期)后调用才有效，否则dom没有渲染完成,body高度不够，没有滚动条，此方法无效。如果有异步请求(ajax)，可以在异步请求后在调用。

## 使用vue-router的路由参数在组件中进行传递参数时，又需要go(-1)进行返回时，最好使用 $route.query来进行传递,这样在返回时，上一级的页面参数不会丢失。

```
this.$router.push({
    'name': 'pressure',
    query: {
        highCode: item.quotaCode.split('/')[0],
        lowCode: item.quotaCode.split('/')[1]
    }
})
```

## Vue 实例中的选项对象，添加对应属性，如何更新视图, 使用this.$set(obj, '属性名','属性初始值')

```
主要用于当对象中某个属性值动态生成时处理方式
this.$set(this.ecgList[i], 'isChecked', false)
```

## IE9以下使用axios跨域设置请求头无效（例如在header中带token，服务器无法获取到）

IE9以下，如果需要跨域设置请求头需要用IE指定ajax库`XDomainRequest`

- [XDomainRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XDomainRequest)
- [示例](https://www.jianshu.com/p/4f04013b8b91)

## Vue资源加载机制(js,css,html,img)

vue资源加载分为两部分,首页会将公共的css样式,js库加载进来，其他页面会按需加载自己的组件资源。

**首页加载的静态资源如下:**

1. app.css
2. manifest.js
3. vendor.js
4. app.js
5. home.js

> `app.css` 是项目中用到样式文件

> `vendor.js` 将所有从node_modules/里require(import)的依赖都打包到这里

> `manifest.js` 配置了需要异步加载的组件（就是按需加载路由组件）

> `app.js` 是项目入口文件，主要配置路由等 home.js 首页对应的js

> `home.js` 首页对应的js

如果需要优化首页加载速度，尽量缩小vendor.js

千万不要把js的组件分的颗粒度很小，js文件多了也会影响效率，浏览器加载js的线程一般为4-5个

**其它路由页面按需加载**

例如,从首页进入到指标页只会加载indicators.js(指标对应的js)
