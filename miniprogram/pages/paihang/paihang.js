// miniprogram/pages/paihang/paihang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    freinds:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    const resultColle = db.collection('result_info');
    var that = this
    resultColle
      .limit(15)
      .orderBy('morestCount', 'desc')
      .get({
        success:function(res){
          console.log('res.data = ' + res.data.length)
          that.handleResult(res.data)
        }
    })
  },

  handleResult: function(datas){
    var freinds = []
    for (var i = 0; i < datas.length; ++i) {
      console.log('res.data = ' +i + datas.length)
      var result = datas[i];
      var info = {};
      info.headUrl = result.avar;
      info.name = result.nickName;
      info.count = result.morestCount
      freinds.push(info);

    }
    this.setData({
      freinds: freinds
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