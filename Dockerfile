FROM nginx

MAINTAINER micro-helix.com
#拷贝项目目录
COPY ./dist/ /usr/share/nginx/html
COPY ./site/template.conf /etc/nginx/conf.d/default.conf
#切换工作目录
#导出端口
# EXPOSE  3300
CMD nginx -g 'daemon off;'
