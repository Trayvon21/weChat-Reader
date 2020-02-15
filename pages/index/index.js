import api from '../../http/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        editFlag: false,
        books: [],
        animation: ''
    },
    changeEdit() {
        this.setData({
            editFlag: !this.data.editFlag
        })
        if (this.data.editFlag) {
            this.start()
        }
    },
    goTo() {
        wx.navigateTo({
            url: '/pages/help/help',
        });
    },
    start() {
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: 'ease',
            delay: 0
        });
        let timer = setInterval(() => {
            if (this.data.editFlag) {
                animation.rotate(-5).step({ duration: 50 })
                animation.rotate(0).step({ duration: 50 })
                animation.rotate(5).step({ duration: 50 })
                animation.rotate(0).step({ duration: 50 })
                this.setData({ animation: animation.export() })
            } else {
                clearInterval(timer)
                animation.rotate(0).step({ duration: 80 })
                this.setData({ animation: animation.export() })
            }
        }, 200)
    },
    del(e) {
        let arr = this.data.books.filter(item => item._id !== e.currentTarget.dataset.id)
        this.setData({
            books: arr
        })
        wx.setStorageSync("books", JSON.stringify(arr));
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
        wx.getStorageSync('books') ? this.setData({ books: JSON.parse(wx.getStorageSync('books')) }) : ''
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