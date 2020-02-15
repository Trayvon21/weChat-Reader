// components/common/bookBox/bookBox.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    bookData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tagColor: ['#ff8002', '#00c7cb', '#ff3c01','#f99384']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goTo() {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${this.properties.bookData._id}`
      });
    }
  }
})
