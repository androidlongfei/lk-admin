# 项目中遇到的bug

## 1.Error info (eslint linebreak-style)

```
Expected linebreaks to be 'LF' but found 'CRLF' linebreak-style in Eslint
```

**错误原因:**

这是eslint在检测js语法时发现的错误.根本原因是在windows系统中使用了unix的linebreak-style语法规则.

**解决方法:**

在不同的操作系统使用不同的linebreak-style。

**代码:**

```javascript
//获取操作系统的类型 [Windows_NT,linux,Darwin]
const currentOsType = require('os').type()
//根据不同的系统设置linebreak-style
"linebreak-style": currentOsType === 'Windows_NT' ? [0, "windows"] : [2, "unix"],
```

**备注:**

不同操作系统的linebreak-style(换行符)

```
CRLF->Windows-style
LF->Unix Style
CR->Mac Style
```

> CRLF:Carriage-Return Line-Feed 回车换行

> LF表示表示句尾，只使用换行.

> CR表示只使用回车.
