// 获取全局应用程序实例对象
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: [
      { key: 'in_theaters' },
      { key: 'coming_soon' },
      { key: 'new_movies' },
      { key: 'top250' }
    ],
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '加载中...' })
    const tasks = this.data.movieList.map(item => {
      return app.douban.find(item.key, 1, 8)
        .then(d => {
          item.title = d.title
          item.movies = d.subjects
          return item
        })
    })

    Promise.all(tasks).then(movieList => {
      this.setData({ movieList: movieList, loading: false })
      wx.hideLoading()
    })
  },

  showInput: function () {
    this.setData({
      inputShowed: false
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  searchData: function(e) {
    wx.navigateTo({
      url: 'searchDataPage/searchDataPage'
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

  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movieDetail/movieDetail?id=' + movieId
    })
  }
})