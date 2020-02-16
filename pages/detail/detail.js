import create from '../../utils/store/create'
import store from '../../store/index'
import api from '../../http/api'
create.Page(store, {
  //使用共享的数据 
  use: ['readInfo'],
  // 指针对store中的数据，不会对组件内部的数据生效
  computed: {

  },
  options: {
    addGlobalClass: true
  },
  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: {},
    star: 0,
    shortReviews: [],
    total: 0,
    actived: '1',
    start: 0,
    readMore: [],
    books: [],
    flag: false,
    showActionsheet: false,
    groups: [
      { text: '立即保存', value: 1 },
    ],
    previewImage: false
  },
  show() {
    this.setData({
      showActionsheet: true
    })
  },
  preview() {
    this.setData({
      previewImage: !this.data.previewImage
    })
  },
  close: function () {
    this.setData({
      showActionsheet: false
    })
  },
  btnClick(e) {
    wx.downloadFile({
      url: `https://statics.zhuishushenqi.com${this.data.bookInfo.cover}`, //仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res1) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 1500
              });
            }
          })
        }
      }
    })
    this.close()
  },
  getData(id) {
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    api.bookInfo(id).then(res => {
      if (res._id) {
        api.shortReviews(id, this.data.start).then(res1 => {
          if (res1.ok) {
            this.setData({
              bookInfo: res,
              star: Math.ceil(res.rating.score / 2 - 1),
              shortReviews: res1.docs,
              total: res1.total,
              flag: this.data.books.some(item => item._id === res._id)
            })
            this.getBooks()
          }
          wx.hideLoading();
        })

      } else {
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err);
      wx.hideLoading();
    })
  },
  getBooks() {
    //获取同类数据，随机保存3个
    api.relatedRecommendedBooks(this.data.bookInfo._id).then(res => {
      let temp = res.books
      let arr = []
      for (let i = 0; i < 3; i++) {
        arr.push(...temp.splice(Math.ceil(temp.length * Math.random() - 1), 1))
      }
      this.setData({
        readMore: arr
      })
    })
  },
  changeActive(e) {
    this.setData({
      actived: e.currentTarget.dataset.active
    })
  },
  goToRead() {
    let readInfo = 0
    if (this.data.flag) {
      this.data.books.map(item => {
        if (item._id === this.data.bookInfo._id) {
          readInfo = item.readInfo
        }
      })
    }
    wx.navigateTo({
      url: `/pages/read/read?id=${this.data.bookInfo._id}&name=${this.data.bookInfo.title}&readInfo=${readInfo}`,
    });
  },
  goToMenu() {
    let arr = ['这个功能，就是不想做', '功能开发中', '下辈子就开发好了', '求你别点']
    let title = arr[Math.ceil(arr.length * Math.random()) - 1]
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1500
    });
  },
  addBookCase() {
    let arr = this.data.books
    let temp = this.data.bookInfo
    temp.readInfo = this.store.data.readInfo
    arr.push(temp)
    wx.setStorage({
      key: 'books',
      data: JSON.stringify(arr),
      success: (result) => {
        if (result.errMsg === "setStorage:ok") {
          this.setData({
            flag: true
          })
        }

      },
      fail: () => { },
      complete: () => { }
    });
  },
  delBookCase() {
    let arr = this.data.books
    arr = arr.filter(item => item._id !== this.data.bookInfo._id)
    wx.setStorageSync('books', JSON.stringify(arr));
    this.setData({
      flag: false
    })
  },
  goToDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`
    });
  },
  pullUp() {
    if (this.data.total > this.data.start + 20) {
      wx.showLoading({
        title: "加载中...",
        mask: true
      });
      api.shortReviews(this.data.bookInfo._id, this.data.start + 20).then(res => {
        if (res.ok) {
          let docs = this.data.shortReviews.concat(res.docs)
          this.setData({
            shortReviews: docs,
            start: this.data.start + 20
          })
        }
        wx.hideLoading();
      })
    } else {
      wx.showToast({
        title: '到底了!',
        icon: 'none',
        duration: 1500,
        mask: false,
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '详情'
    });
    this.getData(options.id)
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
    if (wx.getStorageSync("books")) {
      let books = JSON.parse(wx.getStorageSync("books"))
      this.setData({
        books: books
      })
    } else {
      this.setData({
        books: []
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.store.data.readInfo = 0
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.store.data.readInfo = 0
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
    console.log(1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})