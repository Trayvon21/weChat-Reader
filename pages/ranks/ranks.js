import api from "../../http/api"

// pages/ranks/ranks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: ["周榜", "月榜", "总榜"],
    weekRank: "",
    monthRank: "",
    totalRank: "",
    rankList: [],
    actived: "周榜"
  },
  clickNav(e) {
    let rankId = ''
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    e.currentTarget.dataset.active === '周榜' ? rankId = this.data.weekRank :
      e.currentTarget.dataset.active === '月榜' ? rankId = this.data.monthRank : rankId = this.data.totalRank
    api.rankInfo(rankId).then(res => {
      if (res.ok) {
        this.setData({
          rankList: res.ranking.books,
          actived: e.currentTarget.dataset.active
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    wx.setNavigationBarTitle({
      title: options.title
    });
    api.rankInfo(options.id).then(res => {
      if (res.ok) {
        this.setData({
          weekRank: options.id,
          monthRank: res.ranking.monthRank,
          totalRank: res.ranking.totalRank,
          rankList: res.ranking.books
        })
        wx.hideLoading();
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