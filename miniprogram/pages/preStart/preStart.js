// miniprogram/pages/preStart/preStart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // login();
    var that = this;
    setTimeout(function(){
      // that.getData();
      that.login()
    },1000);
  },

  // getData:function(){
  //   const db = wx.cloud.database();
  //   const resultInfos = db.collection('result_info');
  //   console.log('resultinfos = '+ resultInfos)
  //   resultInfos.where({
  //     user_id:'admin'
  //   })
  //   .get({
  //     success:function(res){
  //       console.log( res.data[0].user_id)
  //     }
  //   })
  // },

  login:function(){
    // wx.getUserInfo({
    //   success:function(res){
    //     console.log(res)
    //   }
    // })
  
  },

  getUserInfo:function(res){
    var userInfo = JSON.parse(res.detail.rawData)
    getApp().globalData.userInfo.avar = userInfo.avatarUrl;
    getApp().globalData.userInfo.nickName = userInfo.nickName; 
    console.log(userInfo);
    var that = this;

    wx.cloud.callFunction({
      name:'getOpenId',
      success:function(res){
        console.log('res.openid=' + res.result.OPENID);
        getApp().globalData.userInfo.openId = res.result.OPENID;     // 取得全局变量需要的值
        console.log('setapp openid=' + getApp().globalData.userInfo.openId);
        that.uploadUserData(userInfo, res.result.OPENID)
      }
    })
  },

  uploadUserData: function(userData,openid){
    const db = wx.cloud.database();
    const userColle = db.collection('user_info');
    var existUser = userColle.where({
      _openid:openid
    })
    .get({
      success:function(res){
        console.log(res.data)
        
        if(res.data != null && res.data.length !=0){
          console.log('set')
          userColle.doc(res.data[0]._id)
          .set({
            data:userData,
            success:function(res){
             
            }
          })
        }else{
          console.log('add')
          userColle.add({
            data:userData
          })
        }
      }
    })

    
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

  start:function(){
    wx.navigateTo({
      url: '../../pages/mainCrab/mainCrab',
    })
  },

  topaihang:function(){
    wx.navigateTo({
      url: '../../pages/paihang/paihang',
    })
  }
})