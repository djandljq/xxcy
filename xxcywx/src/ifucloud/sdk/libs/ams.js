import axios from 'axios';
import config from '../config.json';
import ath from './ath';

let ams = {
  instance: axios.create({
    baseURL: config.ams_host,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
  })
};

ams.instance.interceptors.request.use(function (config) {
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

ams.articleList = function () {
  let url = '/api/article?';
  let filter = arguments[0] ? arguments[0] : null;
  let page = arguments[1] ? arguments[1] : 1;
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
  return ams.instance.get(url, {}).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(res => {
    return Promise.reject(res);
  });
};

ams.articleCreate = function (article) {
  return ams.instance.post('/api/article', {
    'title': article.title,
    'content': article.content
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

ams.articleInfo = function (id) {
  return ams.instance.get('/api/article/' + id).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

ams.articleUpdate = function (id, article) {
  return ams.instance.post('/api/article/' + id, {
    'title': article.title,
    'content': article.content
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

ams.commentList = function () {
  let url = '/api/comment?';
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
  return ams.instance.get(url).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

ams.commentCreate = function (comment) {
  return ams.instance.post('/api/comment', {
    'article_id': comment.article_id,
    'user_id': comment.user_id,
    'content': comment.content
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

ams.commentInfo = function (id) {
  return ams.instance.get('/api/comment/' + id).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

ams.commentUpdate = function (id, comment) {
  return ams.instance.post('/api/comment/' + id, {
    'article_id': comment.article_id,
    'user_id': comment.user_id,
    'content': comment.content
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

ams.bulletinList = function () {
  let url = '/api/bulletin?';
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
  return ams.instance.get(url).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

ams.bulletinCreate = function (bulletin) {
  return ams.instance.post('/api/bulletin', {
    'title': bulletin.title,
    'content': bulletin.content
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

ams.bulletinInfo = function (id) {
  return ams.instance.get('/api/bulletin/' + id).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

ams.bulletinUpdate = function (id, bulletin) {
  return ams.instance.post('/api/bulletin/' + id, {
    'title': bulletin.title,
    'content': bulletin.content
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

export default ams;
