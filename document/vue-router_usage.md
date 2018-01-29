# vue-router

相关文档

- [官方:中文文档](https://router.vuejs.org/zh-cn/essentials/getting-started.html)

## 问题

### 1.router-link跳转页面时,第一次跳转很慢,之后就正常了

原因是使用了组件的懒加载，所以每次第一次切换路由的时候，都要去加载相应的组件的js文件，需要等文件加载完之后，路由才能切换过去；后面切换的话js都下载过了，所以切换就不卡了
