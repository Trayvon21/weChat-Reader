// pages/books/books.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actived: {
      gender: '',
      type: '',
      major: '',
      minor: '',
      start: ''
    },
    dataList: [],
    navList1: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
    navList2: [],
    total: 0,
  },
  // 初始获取data
  getData() {
    wx.showLoading({
      title: "加载中..."
    });
    api.getCatsBooks(this.data.actived).then(res => {
      if (res.ok) {
        this.setData({
          dataList: res.books,
          total: res.total
        })
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        });
        wx.hideLoading();
      } else {
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err);
      wx.hideLoading();
    })
  },
  //点击导航1
  clickNavTop(e) {
    let actived = this.data.actived
    actived.type = e.currentTarget.dataset.active
    this.setData({
      actived: actived
    })
    this.getData()
  },
  //点击导航2
  clickNavBottom(e) {
    let actived = this.data.actived
    actived.minor = e.currentTarget.dataset.active
    this.setData({
      actived: actived
    })
    this.getData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载时获取上一页传的值
    let arr = JSON.parse(options.min)
    arr.unshift("全部")
    this.setData({
      navList2: arr,
      actived2: arr[0],
    })
    this.setData({
      actived: {
        gender: options.gender,
        type: "hot",
        major: options.name,
        minor: "全部",
        start: 0
      }
    })
    wx.setNavigationBarTitle({
      title: options.name,
    });
    this.getData()
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
    let actived = this.data.actived
    if (this.data.total > actived.start + 20) {
      wx.showLoading({
        title: "加载中..."
      });
      actived.start = actived.start + 20
      api.getCatsBooks(actived).then(res => {
        if (res.ok) {
          let dataList = this.data.dataList
          this.setData({
            dataList: dataList.concat(res.books)
          })
          console.log(dataList);
          wx.hideLoading();
        } else {
          wx.hideLoading();
        }
      }).catch(err => {
        console.log(err);
        wx.hideLoading();
      })
    } else {
      wx.showToast({
        title: '下面没有了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
      });
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})