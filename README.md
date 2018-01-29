# 项目说明

## 项目运行

安装依赖

```
npm install
```

浏览器测试

```shell
npm run dev
```

发布

```shell
npm run build
```

单元测试

```shell
npm run unit
```

自动化测试

```shell
npm run e2e
```

所有测试

```shell
npm test
```

## 通过http-server部署应用

http-server 是一个简单的零配置命令行HTTP服务器, 基于 nodeJs.

**1.全局安装http-server**

```shell
npm install -g http-server
```

**2.build应用**

```shell
npm run build
```

> 在dist目录下生成资源文件

**3.部署**

```
cd dist

http-server
```

显示结果如下:

```
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8081
  http://192.168.0.107:8081
```

**4.访问**

<http://127.0.0.1:8081>

## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + fetch + sass

## 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── dist                                        // 上线项目文件，放在服务器即可正常访问
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   ├── footer
│   │   │   └── foot.vue                        // 底部公共组件
│   │   └── header
│   │       └── head.vue                        // 头部公共组件
│   ├── config                                  // 基本配置
│   │   ├── env.js                              // 环境切换配置
│   │   ├── fetch.js                            // 获取数据
│   │   ├── mUtils.js                           // 常用的js方法
│   ├── images                                  // 公共图片
│   ├── page
│   │   ├── about
│   │   │   ├── components                      // about模块自己的组件
│   │   │   ├── model                           // store module,管理about状态
│   │   │   │   ├── actions.js                  // 配置actions
│   │   │   │   ├── getters.js                  // 配置getters
│   │   │   │   ├── index.js                    // store module入口
│   │   │   │   ├── mutations_types.js          // 配置mutations_types
│   │   │   │   ├── mutations.js                // 配置mutations
│   │   │   └── about.vue                       // 关于页
│   │   ├── home
│   │   │   ├── home.vue                        // 主页
│   │   ├── login
│   │   │   └── login.vue                       // 登录页
│   │   ├── test
│   │   │   ├── children
│   │   │   │   ├── vBindTest.vue               // 测试Bind指令
│   │   │   │   ├── vuexTest.vue                // 测试vuex
│   │   │   └── test.vue                        // 测试页
│   │   ├── user
│   │   │   ├── components                      // user模块自己的组件
│   │   │   ├── model                           // store module,管理user状态
│   │   │   │   ├── actions.js                  // 配置actions
│   │   │   │   ├── getters.js                  // 配置getters
│   │   │   │   ├── index.js                    // store module入口
│   │   │   │   ├── mutations_types.js          // 配置mutations_types
│   │   │   │   ├── mutations.js                // 配置mutations
│   │   │   └── user.vue                        // 用户页
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── User.js                             // 与用户相关的接口
│   ├── store                                   // vuex的状态管理
│   │   ├── config                              // store module,管理config状态
│   │   |   ├── actions.js                      // 配置actions
│   │   |   ├── getters.js                      // 配置getters
│   │   |   ├── index.js                        // config入口
│   │   |   ├── mutations_types.js              // 配置mutations_types
│   │   |   ├── mutations.js                    // 配置mutations
│   │   ├── index.js                            // vuex的核心，创建一个store
│   └── style
│       ├── common.scss                         // 公共样式文件
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── test                                        // 测试
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
.
```
