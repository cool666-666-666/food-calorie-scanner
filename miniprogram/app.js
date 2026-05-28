App({
  onLaunch() {
    wx.cloud.init({
      env: 'cloud1-4gooq8uib59576fe',  // 你的环境ID
      traceUser: true,
    })
  }
})