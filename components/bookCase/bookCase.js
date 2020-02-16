// components/bookCase/bookCase.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    readInfo: {
      type: Number,
      value: 0
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
    goToDetail() {
      wx.navigateTo({
        url: `/pages/read/read?id=${this.properties.item._id}&name=${this.properties.item.title}&readInfo=${this.properties.item.readInfo}`,
      });
    }
  }
})
