import axios from 'axios';
import config from '../config.json';
import ath from './ath';

let brm = {
  instance: axios.create({
    baseURL: config.brm_host,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
  })
};

brm.instance.interceptors.request.use(function (config) {
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
  return Promise.reject(error);
});

brm.userLogin = function (username, password) {
  return brm.instance.post('/api/login', {
    'username': username,
    'password': password
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(err => {
    return Promise.reject(err);
  });
};

brm.userLogout = function () {
  return brm.instance.post('/api/logout').then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

brm.userList = function () {
  let url = '/api/business?';
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
  return brm.instance.get(url).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

brm.userInfo = function (id) {
  return brm.instance.get('/api/business/' + id).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

brm.createUser = function (user) {
  return brm.instance.post('/api/business', {
    'username': user.username,
    'email': user.email,
    'telephone': user.telephone,
    'nickname': user.nickname,
    'password': user.password,
    'roles': user.roles
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

brm.updateUser = function (id, user) {
  return brm.instance.post('/api/business/' + id, {
    'username': user.username,
    'email': user.email,
    'telephone': user.telephone,
    'nickname': user.nickname,
    'password': user.password,
    'roles': user.roles
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

export default brm;
