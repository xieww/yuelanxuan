// 获取全局应用程序实例对象
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: '',
    page: 1,
    size: 20,
    movies: [],
    loading: false,
    hasMore: false,
    searchHistory: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var searchData = wx.getStorageSync('searchKey');
    this.setData({
      loading: true,
      searchHistory: wx.getStorageSync('searchKey')
    })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    // wx.showLoading({ title: '加载中...' });
    this.setData({
      inputVal: "",
      inputShowed: false,
      movies: []
    });
    // setTimeout(() => {
    //   wx.hideLoading();
    // }, 3000)
    wx.navigateBack({
      delta: 1
    })
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      movies: []
    });
  },
  inputTyping: function (e) {
    // this.searchMovieData(e.detail.value);
    this.setData({
      inputVal: e.detail.value
    });
  },
  searchDataList: function (e) {
    this.searchMovieData(e.detail.value);
  },
  setSearchKey: function (e) {
    var historykey = e.currentTarget.dataset.historykey;
    // console.log(historykey);
    // this.data.inputVal = historykey;
    this.setData({
      inputVal: historykey,
      inputShowed: true
    });
    this.searchMovieData(historykey);
  },
  clearHistory: function (e) {
    wx.removeStorageSync('searchKey');
    wx.showLoading({ title: '加载中...' });
    this.setData({
      searchHistory: []
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 3000)
  },

  /**
   * 搜索电影信息
   */
  searchMovieData: function (searchKey) {
    // 展示本地存储能力
    app.douban.find('search', this.data.page++, this.data.size, searchKey)
      .then(d => {
        // console.log('搜索', d);
        wx.showLoading({ title: '加载中...' });
        if (d.subjects.length) {
          this.setData({
            movies: d.subjects,
            loading: false
          })
          wx.hideLoading();
        } else {
          this.setData({
            hasMore: false,
            loading: false
          })
        }
      })
      .catch(e => {
        this.setData({
          loading: false
        })
      });

    var searchData = wx.getStorageSync('searchKey') || [];
    if (searchData.includes(searchKey)) {
      return;
    } else {
      searchData.unshift(searchKey);
      wx.setStorageSync('searchKey', searchData);
    }

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