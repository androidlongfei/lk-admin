# Vuex

相关文档

- [官方:中文文档](https://vuex.vuejs.org/zh-cn/intro.html)
- [github](https://github.com/vuejs/vuex)

项目demo文档

- [记事本](https://github.com/lin-xin/notepad)
- [俄罗斯方块](https://github.com/Binaryify/vue-tetris)

## Vuex是什么

Vuex是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化.

可以把它简单理解为一个存储器对象,存储了所有组件的状态, 并且是响应式的。

## Vuex的使用场景

在vue里，组件之间的作用域是独立的，父组件跟子组件之间的通讯可以通过prop属性来传参，但是在兄弟组件之间通讯就比较麻烦了。比如A组件要告诉一件事给B组件，那么A就要先告诉他们的父组件，然后父组件再告诉B。当组件比较多，要互相通讯的事情很多的话，父组件要管他们那么多事，很累的。vuex正是为了解决这个问题，让多个子组件之间可以方便的通讯

## Vuex和单纯的全局对象有以下两点不同

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新

2. 你不能直接改变store中的状态。改变store中的状态的唯一途径就是显式地提交(commit) mutations.主要是为了方便调试.
