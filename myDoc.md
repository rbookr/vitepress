我的组件的使用


fenc_extend

hook fenc的渲染

- dot
- markmap

## class container 

可以加css class的container

```

\`\`\`class class_name1 class_name1

```

## style container

可以加css style的container

```

\`\`\`style background:#fff;top:2px

```

## toGitLink

增加了一个内置的组件`toGitLink`

使用如下

1. 先在`.vitepress/config.js` 添加配置
```

  themeConfig: {
    toGitLink: {
      pattern: 'https://github.com/vuejs/vitepress/:type/:branch/:path',
      text: 'GitHub上打开这个文件'
    },
  }
```

2. 在md页面上使用

```
<toGitLink file="myfile.cpp" />
```

不同的类型会得到不同的地址

```
## type = blob branch = master
https://github.com/Rainboylvx/blogData/blob/master/1.cpp

## type = tree branch = master
https://github.com/Rainboylvx/blogData/tree/master/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/tinyasync/code_first
```

## 设置属性

### ejsdata

设置ejs渲染时的数据

```plaintext
  markdown: {
    ejsdata: {
        host:'https://rbook.roj.ac.cn/'
    }
  },
```

那么在markdown就可以使用

```
<%= host %>
```
