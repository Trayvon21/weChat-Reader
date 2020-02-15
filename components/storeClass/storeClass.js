// components/bookStore/storeClass/storeClass.js
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
    },
    mins: {
      type: Array,
      value: []
    }
  },
  // 添加全局的样式
 
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goTo(e){
      let min=[]
      let name=e.currentTarget.dataset.name
      this.data.mins.map(item=>{
        if(item.major===name){
          min=JSON.stringify(item.mins)
        }
      })
      let gender=''
      this.data.title==='男生'?gender='male':this.data.title==='女生'?gender='female':gender='press'
      wx.navigateTo({
        url: `/pages/books/books?name=${e.currentTarget.dataset.name}&gender=${gender}&min=${min}`
      });
        
    }
  }
})