// component/dialog/commonDialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogTitle:{
      type: String,
      value:'标题'
    },

    dialogText: {
      type: String,
      value: '标题'
    },

    dialogBottom: {
      type: String,
      value: '标题'
    },

    sureText: {
      type: String,
      value: '标题'
    },

    cancleText: {
      type: String,
      value: '标题'
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
    _cancelEvent() {
      //触发取消回调
      this.triggerEvent("cancelEvent")
    },
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent("confirmEvent");
    },
    _bottomContentEvent() {
      //触发成功回调
      this.triggerEvent("bottomContentEvent");
    }
  }
})
