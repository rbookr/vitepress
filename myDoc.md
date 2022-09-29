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
      pattern: 'https://github.com/vuejs/vitepress/blob/main/:path',
      text: 'GitHub上打开这个文件'
    },
  }
```

2. 在md页面上使用

```
<toGitLink file="myfile.cpp" />
```
