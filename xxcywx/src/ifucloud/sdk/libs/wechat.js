import axios from 'axios';
import config from '../config.json';
import ath from './ath';

let wechat = {
  instance: axios.create({
    baseURL: config.wechat_host,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
  })
};

wechat.instance.interceptors.request.use(function (config) {
  if (!localStorage.oauthToken) {
    ath.authToken().then(data => {
      localStorage.oauthToken = data.oauth_token;
      config.headers['Authorization'] = localStorage.oauthToken;
      return config;
    });
  } else {
    config.headers['Authorization'] = localStorage.oauthToken;
    return config;
  }
}, function (error) {
  ath.authToken().then(data => {
    localStorage.oauthToken = data.oauth_token;
  });
  return Promise.reject(error);
});

wechat.userLogin = function () {
  ath.authToken().then(data => {
    localStorage.oauthToken = data.oauth_token;
    window.location.href = config.wechat_host + '/api/wechat/oauth/oauth?token=' + localStorage.oauthToken;
  });
};

wechat.jsSdkConfig = function (api) {
  return wechat.instance.post('/api/wechat/jssdk/config', {
    'api': api
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

wechat.createOrder = function (order) {
  return wechat.instance.post('/api/wechat/pay/order', {
    'body': order.body,
    'out_trade_no': order.out_trade_no,
    'total_fee': order.total_fee,
    'trade_type': order.trade_type,
    'openid': order.openid
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

wechat.jsSdkPay = function (pay) {
  return wechat.instance.post('/api/wechat/pay/jssdk', {
    'type': pay.type,
    'prepay_id': pay.prepay_id
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

export default wechat;
