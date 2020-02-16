// pages/bookStore/bookStore.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: ["分类", "排行"],
    actived: '分类',
    classList: {
      female: [],
      male: [],
      picture: [],
      press: [],
      rankList: []
    },
    mins: []
  },
  clickNav(e) {
    this.setData({
      actived: e.currentTarget.dataset.active
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
      title: '书城'
    });
    wx.showLoading({
      title: '加载中',
    })
    api.getCats().then(res1 => {
      if (res1.ok) {
        api.getMinor().then(res2 => {
          if (res2.ok) {
            api.rankCategory().then(res => {
              if (res.ok) {
                this.setData({
                  classList: res1,
                  mins: res2,
                  rankList: res
                })
              }
            })
            wx.hideLoading()
          }

        })

      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

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