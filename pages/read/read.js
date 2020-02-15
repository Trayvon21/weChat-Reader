import WxParse from "../../components/wxParse/wxParse"
import create from '../../utils/store/create'
import store from '../../store/index'
import api from '../../http/api'
create.Page(store, {
  //使用共享的数据 
  use: ['readInfo'],
  // 指针对store中的数据，不会对组件内部的数据生效
  computed: {

  },
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    chapters: [],
    index: 0,
    show: false,
    menuShow: false,
    setColor: ['#ffffff', '#e3d8be', '#e2e9e0', '#949494', '#cbe6c5'],
    bgColor: '',
    changeFlag: false,
    descSize: 32,
    book: ''
  },
  changeSize(e) {
    let size = this.data.descSize
    e.currentTarget.dataset.size === "small" ? size = size - 4 : size = size + 4
    if (size < 32 || size > 64) return
    wx.setStorageSync("descSize", size);
    this.setData({
      descSize: size
    })
  },
  changeChapter(e) {
    let index = this.data.index
    e.currentTarget.dataset.set === "last" ? index-- : e.currentTarget.dataset.set === "next" ? index++ : index = e.currentTarget.dataset.set
    if (index < 0) {
      wx.showToast({
        title: '这是第一章',
        icon: 'none',
        duration: 1500,
      });
      return;
    } else if (index === this.data.chapters.length) {
      wx.showToast({
        title: '这是最后一章',
        icon: 'none',
        duration: 1500,
      });
      return;
    }
    this.getChapter(index)
  },
  getChapter(index) {
    api.chapterContent(this.data.chapters[index].link).then(res => {
      if (res.ok) {
        let article = res.chapter.body
        var that = this;
        WxParse.wxParse('article', 'md', article, that, 5);
        this.setData({
          title: this.data.chapters[index].title,
          index: index,
          menuShow: false
        })
        wx.hideLoading();
      }
    })
  },
  showBottom() {
    this.setData({
      show: !this.data.show,
      changeFlag: false
    })
  },
  changeBg() {
    this.setData({
      changeFlag: true
    })
  },
  clickMenu() {
    this.setData({
      menuShow: !this.data.menuShow
    })

  },
  changeColor(e) {
    wx.setStorageSync("bgColor", e.currentTarget.dataset.color);
    this.setData({
      changeFlag: false,
      bgColor: e.currentTarget.dataset.color
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorageSync("bgColor") ? this.setData({ bgColor: wx.getStorageSync("bgColor") }) : ''
    wx.getStorageSync("descSize") ? this.setData({ descSize: wx.getStorageSync("descSize") }) : ''
    wx.setNavigationBarTitle({
      title: options.name,
      index: options.readInfo
    });
    let article = "", index = options.readInfo
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    api.bookChaptersBookId(options.id).then(res => {
      if (res.ok) {
        if (options.chapter) {
          index = chapter
        }
        api.chapterContent(res.mixToc.chapters[index].link).then(res1 => {
          if (res1.ok) {
            article = res1.chapter.body
            var that = this;
            WxParse.wxParse('article', 'md', article, that, 5);
            this.setData({
              title: res.mixToc.chapters[index].title,
              chapters: res.mixToc.chapters,
              index: index,
              book: res.mixToc.book
            })
            wx.hideLoading();
          }
        })
      }

    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log(2);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let arr = []
    wx.getStorageSync('books') ? arr = JSON.parse(wx.getStorageSync('books')) : ''
    if (arr.some(item => item._id === this.data.book)) {
      arr.map(item => {
        if (item._id === this.data.book) {
          item.readInfo = this.data.index
        }
      })
      wx.setStorageSync('books', JSON.stringify(arr));
      this.store.data.readInfo = 0
    } else {
      this.store.data.readInfo = this.data.index
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})