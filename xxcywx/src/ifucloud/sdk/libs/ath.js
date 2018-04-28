import axios from 'axios';
import config from '../config.json';

let ath = {
  instance: axios.create({
    baseURL: config.oauth_host,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
  })
};

ath.instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

ath.rolesList = function () {
  ath.instance.defaults.headers.common['Authorization'] = localStorage.oauthToken;
  return ath.instance.get('/api/roles').then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

ath.authToken = function () {
  return ath.instance.post('/api/application/auth', {
    'app_code': config.app_code,
    'app_secret': config.app_secret
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

export default ath;
