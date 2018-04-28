import axios from 'axios';
import config from '../config.json';
import ath from './ath';

let omc = {
  instance: axios.create({
    baseURL: config.omc_host,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
  })
};

omc.instance.interceptors.request.use(function (config) {
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

omc.orderCreate = function (order) {
  return omc.instance.post('/api/orders', {
    'type': order.type,
    'source': order.source,
    'pay_type': order.pay_type,
    'state': order.state,
    'title': order.title,
    'image': order.image,
    'buyer_username': order.buyer_username,
    'seller_username': order.seller_username,
    'total_amount': order.total_amount,
    'pay_amount': order.pay_amount,
    'discount_amount': order.discount_amount,
    'users': order.users,
    'products': order.products,
    'amounts': order.amounts,
    'discounts': order.discounts,
    'refunds': order.refunds,
    'remarks': order.remarks,
    'invoices': order.invoices,
    'attributes': order.attributes
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

omc.orderUpdate = function (id, order) {
  return omc.instance.post('/api/orders/' + id, {
    'type': order.type,
    'form': order.form,
    'state': order.state,
    'title': order.title,
    'image': order.image,
    'buyer_username': order.buyer_username,
    'seller_username': order.seller_username,
    'total_amount': order.total_amount,
    'pay_amount': order.pay_amount,
    'discount_amount': order.discount_amount,
    'users': order.users,
    'products': order.products,
    'amounts': order.amounts,
    'discounts': order.discounts,
    'refunds': order.refunds,
    'remarks': order.remarks,
    'invoices': order.invoices,
    'attributes': order.attributes
  }).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

omc.orderInfo = function (id) {
  return omc.instance.get('/api/orders/' + id).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

omc.orderInfoBySn = function (sn) {
  return omc.instance.get('/api/order/sn/' + sn).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

omc.orderList = function () {
  let url = '/api/orders?';
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
  return omc.instance.get(url).then(res => {
    let { error, message, data } = res.data;
    if (error) return Promise.reject(message);
    return Promise.resolve(data);
  }).catch(error => {
    return Promise.reject(error);
  });
};

export default omc;
