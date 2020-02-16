import api from "../../http/api"

// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotwords: [],
    showList: [],
    value: "",
    books: [],
    start: 0,
    total: 0,
    histories: [],
    dialogShow: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
  },
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    if (e.detail.item.text === "确定") {
      wx.removeStorageSync("histories");
      this.setData({
        histories: [],
        dialogShow: false
      })
      wx.showToast({
        title: '删除成功',
        icon: 'none',
        duration: 1500
      });
    } else {
      this.setData({
        dialogShow: false,
      })
    }

  },
  input(e) {
    this.setData({
      value: e.detail.value,
      start: 0,
    })
  },
  clearValue() {
    this.setData({
      value: "",
      books: [],
      start: 0
    })
  },
  goToDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`
    });
  },
  searchGo() {
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    api.research(this.data.value, this.data.start).then(res => {
      if (res.ok) {
        let books = []
        let histories = this.data.histories
        if (!histories.includes(this.data.value)) {
          histories.push(this.data.value)
        }
        wx.setStorageSync("histories", JSON.stringify(histories));
        this.data.start !== 0 ? books = this.data.books.concat(res.books) : books = res.books
        this.setData({
          books: books,
          total: res.total,
          histories: histories
        })
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err);
      wx.hideLoading();
    })
  },
  pullUp() {
    if (this.data.total > this.data.start + 20) {
      this.setData({
        start: this.data.start + 20
      })
      this.searchGo()
    } else {
      wx.showToast({
        title: '到底了！',
        icon: 'none',
        duration: 1500,
        mask: false,
      });
    }
  },
  changeValue(e) {
    this.setData({
      value: e.currentTarget.dataset.value
    })
    this.searchGo()
  },
  changeShow() {
    let hotwords = this.data.hotwords
    let showList = []
    hotwords.map(item => {
      if (Math.random() > 0.5) {
        showList.push(item)
      }
    })
    this.setData({
      showList: showList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '搜索'
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync("histories")) {
      this.setData({
        histories: JSON.parse(wx.getStorageSync("histories"))
      })
    }
    api.hotWord().then(res => {
      if (res.ok) {
        res.newHotWords.map(item => item.color = `rgb(${Math.ceil(255 * Math.random())},${Math.ceil(255 * Math.random())},${Math.ceil(255 * Math.random())})`)
        this.setData({
          hotwords: res.newHotWords
        })
        this.changeShow();
      }
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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