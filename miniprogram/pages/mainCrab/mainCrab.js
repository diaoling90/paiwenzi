// miniprogram/pages/mainCrab/mainCrab.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    crap_left:10,
    crap_top:100,
    hide:true,
    count_down_text:15,
    dialog_hide:false,
    paidao_count:0,
    paizi_left:0,
    paizi_top:0,
    paizi_hide:true,
    xue_hide:true,
    result_count:0,
    dialog_title:'点击开始拍蚊子',
    dialog_content:'看看你的手速有多快',
    dialog_sure:'开始',
    dialog_share:'分享',
    dialogBottom:'查看排行榜 >',
    xue_left:0,
    xue_top:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // var that = this
    // // 获取系统信息
    // wx.getSystemInfo({
    //   success: function (res) {
    //     // 可使用窗口宽度、高度
    //     console.log('height=' + res.windowHeight);
    //     console.log('width=' + res.windowWidth);
    //     // 计算主体部分高度,单位为px
    //     that.setData({
    //       windowHeight: res.windowHeight,
    //       windowWidth: res.windowWidth
    //     })
    //   }
    // })
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
    this.setData({
      dialog_hide: false
    })
  },

  changeView: function(){
    var that = this;
    var count = 0;
    
    var inter = setInterval(function () {
      count++;
      var left = Math.round(Math.random() * 750) - 100;
      var top = Math.round(Math.random() * 750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight)-100;
      left = left<0?0:left;
      top = top<0?0:top;
      
      if(!that.data.hide) count = 2;
      that.setData({
        crap_left: left,
        crap_top: top,
        hide:count<2?that.data.hide : !that.data.hide
      })
      // console.log('left = ' + left + ';top = ' + top);
      if(count == 2) count = 0;
    }, 500);

    var interTime = setInterval(function(){
      that.setData({
        count_down_text:that.data.count_down_text-1
      })
    },1000);    

    setTimeout(function () {
      clearInterval(inter);
      clearInterval(interTime);
      that.setData({
        dialog_hide:false,
        hide: true,
        count_down_text: 15,
        dialog_title:'继续拍蚊子',
        dialog_content:'厉害了，你一共拍到了'+that.data.paidao_count+"个蚊子",
        dialog_sure:'继续'
      })

      var app = getApp()
      var userInfo = app.globalData.userInfo;
      const db = wx.cloud.database();
      const resultColle = db.collection('result_info');
      console.log('getApp().globalData.openId = ' + userInfo.openId)
      resultColle.where({
        _openid: userInfo.openId
      })
      .get({
        success:function(res){
          if (res.data != null && res.data.length != 0) {
            console.log('setresult ,result = ' + userInfo.avar + "   " + userInfo.nickName)
            resultColle.doc(res.data[0]._id)
              .set({
                data: {
                  avar: userInfo.avar,
                  nickName: userInfo.nickName,
                  countLatest: that.data.paidao_count,
                  morestCount: res.data[0].morestCount < that.data.paidao_count ? that.data.paidao_count : res.data[0].morestCount
                },
                success: function (res) {
                  console.log('res_setresult = ' + res)
                }
              })
          } else {
            console.log('addresult')
            resultColle.add({
              data: {
                avar:userInfo.avar,
                nickName: userInfo.nickName,
                countLatest: that.data.paidao_count,
                morestCount: that.data.paidao_count
              }
            })
          }
        }
      })
    }, 15000)
    
  },

  paidao: function(){
    console.log('paidaocount = '+this.data.paidao_count)
    this.setData({
      paidao_count: this.data.paidao_count+1,
      xue_hide: false
    });
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
    return {
      title: '看看你的手速有多快',
      path: 'pages/mainCrab/mainCrab'
    }
  },

  bottomContentEvent:function(){
    wx.navigateTo({
      url: '../../pages/paihang/paihang',
    })
  },

  //取消事件
  _cancelEvent() {
    // console.log('你点击了取消');
    // wx.navigateBack();
    wx.showShareMenu({
      
    })
  },
  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.setData({
      dialog_hide: true,
      paidao_count:0
    });
    this.changeView();
  },

  touchstartFn:function(event){
    // console.log('event = ' +  + '  ' + )
    var left = Math.round(event.changedTouches[0].pageX * 750 / wx.getSystemInfoSync().windowWidth) - 100;
    var top = Math.round(event.changedTouches[0].pageY * 750 / wx.getSystemInfoSync().windowWidth) - 100;
    this.setData({
      paizi_left: left,
      paizi_top:top,
      paizi_hide:false,
      xue_left:left+80,
      xue_top:top+50
    })

    var that = this;
    setTimeout(function(){
      that.setData({
        paizi_hide: true,
      })
    },250);
    setTimeout(function () {
      that.setData({
        xue_hide: true,
      })
    }, 500);
  }
})