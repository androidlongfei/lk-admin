# 使用docker 发布应用

- [nginx镜像](https://hub.docker.com/_/nginx/)

## 简单运行

1.下载镜像

```shell
docker pull nginx
```

2.运行

```
cd ./vue_project
npm run build
```

3.启动镜像

```shell
docker run --name health \
-v /Users/helongfei/coding_public/vue_project/dist/:/usr/share/nginx/html:ro \
-p 8080:80 -d nginx
```

> `/Users/helongfei/coding_public/vue_project/dist/`:是静态资源目录

4.访问

```shell
http://localhost:8080/
```

## 打包的形式

1.打包

```shell
docker build -t health_record .
```

2.运行

```
docker run -it -p 3300:80 health_record
```
