![](./textbus.png)

# 为什么要开发 TextBus？

众所周知，富文本编辑器一直是前端开发领域的一个天坑。但同时市面上的富文本编辑器却又数不胜数，那为什么我还要另起炉灶呢？

1. 目前大多数富文本内容都太脏了，比如，加粗一段文字，可能是一个 strong 标签，也有可能是多个，如果这段文字同时还有其它格式，那么就更热闹了，基本处于一个不可控的状态。能把显示状态和编辑处理成正常的，就算很不错的编辑器，基本不会管内容脏不脏的问题。
2. 目前比较新的编辑器，基本都有自己的一套抽象数据结构来描述富文本，这同时又引起了另一个问题，即这一数据结构对有的富文本内容描述不了，导致要扩展特定的格式不能实现。
3. 部分富文本编辑器依赖特定的框架或库，造成使用上的限制。
4. 扩展困难，不能方便的扩展格式、组件和模板，也不方便定制特定的编辑行为。
5. 实时的代码高亮，这个对程序员写文档来说，是一个比较重要的功能。
6. 对于粘贴进来的内容，要么粗爆的只是提取文本内容，导致格式丢失。要么就直接扔进页面，产生非常多的脏数据（如粘贴 word 的内容），虽然有的编辑器做了过滤，但基本不能做到完全剔除脏数据。
7. 粘贴进来的资源不能触发上传行为。


对于以上所列举的只是部分问题，有问题虽然不好，但也不完全是坏事，这时就需要 TextBus 来解决这些问题。针对上面的问题，TextBus 解决如下：

1. TextBus 输出非常干净，没有冗余的标签及样式。
2. TextBus 没有定义一个标准的数据结构，只抽象出了 Formatter（格式） 和 Component（组件）两个维度的数据来格式化富文本的 Content（内容）。现在大家日常基本都是组件化开发，TextBus 也有自己的组件，你可以像写 Vue/React/Angular 组件一样，来写 TextBus 的组件，只要你愿意，没有什么效果是实现不了的。
3. TextBus 不依赖特定的库，开箱即用。
4. TextBus 扩展真的很简单，如果你使用 Typescript 开发的话，IDE 会给你非常好的代码提示，你只需要实现对应的接口，其它的就交给 TextBus 帮你处理。
5. 实时代码高亮，在 TextBus 里真的不是问题。
6. 由于 TextBus 的架构设计天然的支持过滤脏内容，所以，当粘贴进 TextBus 不认识的数据时，会自动忽略掉，而不会遗留在最终的结果里。
7. 粘贴进来的资源上传，目前正在开发中。


当然，除了上述列举的问题，其实大家可能还有更多的需求亟待解决，这里就不一一阐述了，欢迎大家试用，并给出评价。更欢迎提出问题，要是能一起来完善 TextBus，那就更好了！


## 安装

通过 npm 安装 TextBus：
```bash
npm install @tanbo/textbus
```

在 html 中准备一个空的元素
```html
<body>
  <div id="editor"></div>
</body>

```

通过 css 选择器，或直接传入一个 DOM 元素初始化 TextBus。
```typescript
import { createEditor } from '@tanbo/textbus';
import { Observable } from 'rxjs';

const editor = createEditor('#editor', {
  uploader(type: string): string | Promise<string> | Observable<string> {
    // switch (type) {
    //   case 'video':
    //     console.log('上传视频');
    //     break;
    //   case 'image':
    //     console.log('上传视频');
    //     break;
    //   case 'audio':
    //     console.log('上传音频');
    //     break;
    // }
    return Promise.resolve().then(() => {
      return '/test'
    })
  },
  content: `<p>欢迎你使用&nbsp;<strong>TextBus</strong> 富文本编辑器...<br></p>`
});

editor.onChange.subscribe(() => {
  console.log(editor.getContents());
});
```
## 官网地址
[TextBus 官网](https://textbus.tanboui.com)
