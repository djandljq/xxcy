import axios from 'axios';
import config from '../config.json';
import ath from './ath';

let crm = {
  instance: axios.create({
    baseURL: config.crm_host,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
  })
};

crm.instance.interceptors.request.use(function (config) {
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

crm.userList = function () {
  let url = '/api/user?';
  let page = arguments[0] ? arguments[0] : 1;
  let filter = arguments[1] ? arguments[1] : null;
  if (filter) {
    let search = 'search=';
    for (let key in filter) {
      if (filter[key]) {
        search += key + ':' + filter[key] + ';';
      }
    }
    search = search.replace(/;$/gi, '');
    url += search + '&searchJoin=and&page=' + page;
  } else {
    url += 'page=' + page;
  }
  return crm.instance.get(url).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

crm.userInfo = function () {
  return crm.instance.get('/api/info').then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

crm.userInfoById = function (id) {
  return crm.instance.get('/api/user/' + id).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

crm.createUser = function (user) {
  return crm.instance.post('/api/user', {
    'avatar': user.avatar,
    'username': user.username,
    'email': user.email,
    'telephone': user.telephone,
    'nickname': user.nickname,
    'password': user.password,
    'sex': user.sex,
    'attributes': user.attributes,
    'addresses': user.addresses,
    'carts': user.carts
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

crm.updateUser = function (id, user) {
  return crm.instance.post('/api/user/' + id, {
    'avatar': user.avatar,
    'username': user.username,
    'email': user.email,
    'telephone': user.telephone,
    'nickname': user.nickname,
    'password': user.password,
    'sex': user.sex,
    'attributes': user.attributes,
    'addresses': user.addresses,
    'carts': user.carts
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

export default crm;
