### chrome插件之清除广告

相信大家都会在浏览某些网站时遇到一些烦人的广告，他们总是占据着你的大部分视觉空间，而当你想关闭它时，总能点开一些不可描述的链接。


所以！🤬为了干掉他们，我首先学习的一款插件就是针对它们的，那么我们先来想想看广告一般都是由什么构成的呢

对，一个个dom元素，我们先去访问一些网站找一下规律。不难发现它们的大多构成都是由iframe标签、embed元素嵌套进来，或者是带有特殊id的选择器，由于算法简单，我们无法做到十分精确的识别，但能将大部分广告都`display:none`掉，这样就会呈现出清爽的界面。

这时候你可能会问：如果我要访问的网站有重要信息就是被iframe标签包裹该如何处理？

莫慌！我们需要给自己留条后路

```
 	// 设置黑名单
    banList: [
      "iframe",
      "embed",
      "ads"
    ],
    // 设置白名单
    whiteList: [
      "www.baidu.com",
      "www.google.com"
    ],
```

我们通过分类出自己想要选择的标签和网站，可以进行二次定义，从而有针对性的避除广告。对于特殊网站进行正则筛选匹配，设立是否运行函数的标志，从而达到清除的目的

```
// 判断是否清除
isFlagAd: function () {
      for(var i = 0; i < this.whiteList.length; i++){
        var reg = new RegExp(this.whiteList[i]);
        if (reg.test(window.location.href)) {
          this.state = -1;
        } else {
          if (i == this.whiteList.length - 1) {
            this.state = 1;
          }
        }
      }
      return this.state;
},
```

如果因网速加载过慢或者延迟请求的广告，可以这样做

```
//为防止ajax异步延时加载的广告隔4s再清除一次
      setTimeout(function() {
        handles.clearAd();
      }, 4000)
```

你也可以设置轮询方法，来清除顽劣的弹窗广告！

By: 我是小栗子🕵🏻‍♂️