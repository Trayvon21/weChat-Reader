# 书城项目总结

## 使用工具

1. 微信开发者工具

2. VScode

3. 相关插件

   1. omix（小程序全局状态管理框架，类 vuex）

      <https://github.com/Tencent/omi/tree/master/packages/omix>

   2. flyio（http 请求库）

      <https://github.com/wendux/fly>

   3. weui（微信小程序官方扩展组件）

      <https://developers.weixin.qq.com/miniprogram/dev/extended/weui/>

   4. wxParse（微信小程序富文本解析自定义组件 ）

      <https://github.com/icindy/wxParse>

## 功能实现

- [x] 书籍收藏/取消收藏（保存阅读章节、编辑抖动动画）
- [x] 书籍搜索（随机推荐书籍、搜索记录存储）
- [x] 书籍分类及排行（大小类跳转）
- [x] 书籍详细信息（同类书籍推荐、书籍评论）
- [x] 阅读书籍内容（章节查看及跳转）
- [x] 阅读器设置（背景颜色、文字大小）

## 关键点

1. tabBar 使用

    App.json 中设置 tabBar。

    ```js
     "tabBar": {
            "color": "#8a8a8a",//字体颜色
            "selectedColor": "#d81e06",//选中时字体颜色
            "backgroundColor": "white",//背景
            "position": "bottom",//组件位置
            "borderStyle": "black",//分割线样式
            "list": [{
                    "pagePath": "pages/index/index",//路由
                    "text": "书架",//标题
                    "iconPath": "./assets/images/index.png",//图标
                    "selectedIconPath": "./assets/images/index-active.png"//选中时的图表
                }
                     ...
        },
    ```

2. omix 操作

    在需要使用的路由/组件中引入：

    ```js
    import create from "../../utils/store/create";
    import store from "../../store/index";
    ```

    修改顶部代码：

    ```js
    create.Page(store, {
      //使用共享的数据
      use: ['readInfo'],
      // 指针对store中的数据，不会对组件内部的数据生效
      computed: {

      },
      #引入成功之后就能直接使用this.store.data.readInfo进行读写操作；页面中使用$.readInfo使用
    ```

3. 请求数据方法

    封装 fly 后，创建接口文件 api.js，在需要调取接口的地方引入该 api.js 即可。

4. 小程序生命周期使用

    onLoad：中能够从回调中获取到路由跳转传值的内容，用来实现向详情页跳转的功能；

    onReady：小程序存在页面缓存，即可将需要调取接口但不用二次修改的页面再此处调取数据进行页面渲染；

    onShow：每次打开页面都会触发，用于书架页面的内容更新；

    onHide：跳转页面或切到后台时会触发；

    onUnload：返回页面时触发，用来保存当前阅读的章节；

    onReachBottom：上拉加载，用于评论和书籍列表的分段获取；

    ...

5. 点击事件控制当前项

    小程序点击事件无法传递参数，只能为需要操控的 html 元素绑定响应的 data-xxx 值或者 id，用事件的回调 events 中的内容获取进行识别操控；

6. 组件拆分与使用；

    在父组件的 json 文件中绑定需要引入的插件名称和路径，使用的方法同 vue；

7. 数据本地存储的方法

    wx.getStorageSync('xxxx') ...等同于 localStorage.get('xxxx')

8. weui 组件使用

    在小程序官方下载相关组件，保存至项目，引入方法同其他自定义组件；

9. 小程序图片保存本地的方法

    首先使用 downloadFile 将图片保存至本地缓存，再用 saveImageToPhotosAlbum 将图片存入手机相册；

    ```js
    wx.downloadFile({
      url: "图片路劲",
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res1) {
              wx.showToast({
                title: "保存成功",
                icon: "success",
                duration: 1500
              });
            }
          });
        }
      }
    });
    ```

10. 随机从数组中获取数据

    1. 随机获取 3 个

    ```js
    let temp = 获取到的数组;
    let arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(...temp.splice(Math.ceil(temp.length * Math.random() - 1), 1));
    }
    ```

    2. 随机获取 N 个
    
    ```js
    hotwords.map(item => {
          if (Math.random() > 0.5) {
            showList.push(item)
          }
        })
    ```
    
11. wxParse使用方法

     在需要使用wxParse的组件中引入wxParse.js

     ```js
     let article = 需要解析的文本内容
     let that = this;
             WxParse.wxParse('article', 'md', article, that, 5);
     ```

     
