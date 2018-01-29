# Vue

## 一、介绍

Vue.js是当下很火的一个`JavaScript MVVM`库，它是以`数据驱动和组件化`的思想构建的。

相比于Angular.js和react.js，Vue.js提供了更加简洁、更易于理解的API，使得我们能够快速地上手并使用Vue.js。（vue.js是国人尤雨溪开发的,文档相对更友好）。

**数据驱动** 就是当数据发生变化的时候，用户界面发生相应的变化，开发者不需要手动的去修改dom。

**组件化** 页面全是各个组件组成.目的让页面的元素的使用性和复用性更高。

### MVVM模式

MVVM（Model-View-ViewModel）是将`数据模型数据双向绑定`的思想作为核心，因此在View和Model之间没有联系，通过ViewModel进行交互，而且Model和ViewModel之间的交互是双向的，因此视图的数据的变化会同时修改数据源，而数据源数据的变化也会立即反应到View上.

Model:指的是数据部分，对应到前端就是javascript对象

View:指的是视图部分，对应前端就是dom

Viewmodel:就是连接视图与数据的中间件,一般是在html模板中绑定各种指令.

### 渐进式学习曲线

1.声明式渲染:渲染页面上的字段

2.组件系统:抽取公共组件,如head,foot等

3.客户端路由:单页应用使用路由进行界面跳转(vue-router)

4.大规模状态管理:如果项目业务逻辑复杂，大量的使用组件，而且组件的状态难以管理,那么就可以用vuex来进行管理.(vuex)

5.构建系统:通过构建系统来提高工作效率(webpack)

## 二、相关文档

### 1.官网文档

- [中文文档](https://cn.vuejs.org/v2/guide/)
- [英文文档](http://vuejs.org/v2/guide/)
- [github](https://github.com/vuejs/vue)

### 2.社区

- [官方社区](https://www.vue-js.com/)
- [vue生态大指南](https://www.vue-js.com/topic/58750c15a9c1282817afbfb7)
- [参考资料](https://www.vue-js.com/getstart)

### 3.视频讲解

- [视频](https://github.com/bhnddowinf/vuejs-learn)
