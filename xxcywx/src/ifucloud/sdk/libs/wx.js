import wechat from './wechat';
let wx = require('weixin-js-sdk');

wechat.jsSdkConfig(['chooseWXPay']).then(data => {
  data.jsApiList = [
    'chooseWXPay'
  ];
  wx.config(data);
});

export default wx;
