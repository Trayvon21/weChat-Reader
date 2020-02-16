import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editFlag: false,
    books: [],
    animation: '',
    buttons: [{ text: '取消' }, { text: '确定' }],
    dialogShow: false,
    temp: ''
  },
  openDialog(e) {
    this.setData({
      dialogShow: true,
      temp: e.currentTarget.dataset.id
    })
    console.log(this.data.temp);
  },
  changeEdit() {
    if (this.data.books.length > 0) {
      this.setData({
        editFlag: !this.data.editFlag
      })
      if (this.data.editFlag) {
        this.start()
      }
    }

  },
  goTo() {
    wx.navigateTo({
      url: '/pages/help/help',
    });
  },
  start() {
    var animation = wx.createAnimation({
      duration: 900,
      timingFunction: 'linear',
      delay: 0
    });
    let timer = setInterval(() => {
      if (this.data.editFlag) {
        animation.rotate(-1).step({
          duration: 150
        })
        animation.rotate(2).step({
          duration: 300
        })
        animation.rotate(-2).step({
          duration: 300
        })
        animation.rotate(1).step({
          duration: 150
        })
        this.setData({
          animation: animation.export()
        })
      } else {
        clearInterval(timer)
        this.setData({
          animation: animation.export()
        })
      }
    }, 900)
  },
  del(e) {
    if (e.detail.item.text === '确定') {
      let arr = this.data.books.filter(item => item._id !== this.data.temp)
      this.setData({
        books: arr,
        dialogShow: false,
      })
      wx.setStorageSync("books", JSON.stringify(arr));
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 1500
      });
    } else {
      this.setData({
        dialogShow: false,
      })
    }
  },
  reload() {
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    let arr = this.data.books
    arr.map(item => {
      console.log(1);
      api.bookInfo(item._id).then(res => {
        if (res) {
          if (item.chaptersCount !== res.chaptersCount) {
            item.update = true
          } else {
            item.update = false
          }
          console.log(item.update);
        }
      })
    })
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('books')) {
      JSON.parse(wx.getStorageSync('books')).length > 0 ? this.setData({
        books: JSON.parse(wx.getStorageSync('books'))
      }) : this.setData({
        editFlag: true
      })
    } else {
      this.setData({
        editFlag: true
      })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      editFlag: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      editFlag: false
    })
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