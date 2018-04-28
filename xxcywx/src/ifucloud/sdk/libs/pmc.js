import axios from 'axios';
import config from '../config.json';
import ath from './ath';

let pmc = {
  instance: axios.create({
    baseURL: config.pmc_host,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
  })
};

pmc.instance.interceptors.request.use(function (config) {
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

pmc.productCreate = function (product) {
  return pmc.instance.post('/api/products', {
    'sku': product.sku,
    'name': product.name,
    'state': product.state,
    'sell_status': product.sell_status,
    'build_state': product.build_state,
    'price': product.price,
    'desc': product.desc,
    'prices': product.prices,
    'attributes': product.attributes,
    'images': product.images
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

pmc.productUpdate = function (id, product) {
  return pmc.instance.post('/api/products/' + id, {
    'sku': product.sku,
    'name': product.name,
    'state': product.state,
    'sell_status': product.sell_status,
    'build_state': product.build_state,
    'price': product.price,
    'desc': product.desc,
    'prices': product.prices,
    'attributes': product.attributes,
    'images': product.images
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

pmc.productInfo = function (id) {
  return pmc.instance.get('/api/products/' + id).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

pmc.productList = function () {
  let url = '/api/products?';
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
  return pmc.instance.get(url).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

export default pmc;
