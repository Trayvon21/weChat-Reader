// components/storeRank/storeRank.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goTo(e) {
      console.log(e);
      wx.navigateTo({
        url: `/pages/ranks/ranks?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`
      });
    }
  }
})
