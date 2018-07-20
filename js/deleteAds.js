//注入页面的脚本文件
;
$(function() {

  var handles = {

    // 设置state
    state: 1,

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

    // 移除dom
    regRule: function (str) {
      $(str).remove();
    },

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

    // 清除操作
    clearAd: function () {
      for(var i = 0; i < this.banList.length; i++){
        this.regRule(this.banList[i]);
      }
    }
}

    var flag = handles.isFlagAd();
    if(flag === 1) {
      handles.clearAd();

      //为防止ajax异步延时加载的广告隔4s再清除一次
      setTimeout(function() {
        handles.clearAd();
      }, 4000)
    }

});
