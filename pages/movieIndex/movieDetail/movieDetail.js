import * as MovieModel from '../../../utils/movieModel.js';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    title: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '加载中...' })
    app.douban.findOne(options.id)
      .then(res => {
        let movie = MovieModel.createMovieModel(res);
        console.log(movie);
        this.setData({ 
          title: res.title, 
          movie: movie
          });
        wx.setNavigationBarTitle({ title: res.title })
        wx.hideLoading()
      })
      .catch(e => {
        this.setData({ title: '获取数据异常', movie: {} })
        console.error(e)
        wx.hideLoading()
      })
  },

  /*查看图片*/
  viewMoviePostImg: function (e) {
    console.log(e.currentTarget.dataset);
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
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