import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      title: '主页',
      component: () => import('@/views/home/home.vue')
    },
    {
      path: '/branch',
      name: 'branch',
      title: '分类',
      component: () => import('@/views/branch/branch.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      title: '购物车',
      component: () => import('@/views/cart/cart.vue')
    },
    {
      path: '/user',
      name: 'user',
      title: '个人中心',
      component: () => import('@/views/user/user.vue')
    },
    {
      path: '/order/pay/:sn',
      name: 'order-pay',
      title: '订单支付',
      component: () => import('@/views/order-pay/index.vue')
    },
    {
      path: '/cartOrder-null',
      name: 'cartOrder-null',
      title: '没有订单',
      component: () => import('@/views/user/components/cartOrder-null.vue')
    },
    {
      path: '/pending',
      name: 'pending',
      title: '没有订单',
      component: () => import('@/views/user/components/pending.vue')
    },
    {
      path: '/refund',
      name: 'refund',
      title: '申请退款',
      component: () => import('@/views/user/components/refund.vue')
    },
    {
      path: '/refunds',
      name: 'refunds',
      title: '退款成功',
      component: () => import('@/views/user/components/refunds.vue')
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      title: '评价',
      component: () => import('@/views/user/components/evaluate.vue')
    },
    {
      path: '/evaluates',
      name: 'evaluates',
      title: '评价成功',
      component: () => import('@/views/user/components/evaluates.vue')
    },
    {
      path: '/branch-order',
      name: 'branch-order',
      title: '分类例表',
      component: () => import('@/views/branch/components/branch-order.vue')
    },
    {
      path: '/branch-info',
      name: 'branch-info',
      title: '分类例表',
      component: () => import('@/views/branch/components/branch-info.vue')
    },
    {
      path: '/SelectedTea',
      name: 'SelectedTea',
      title: '拼团',
      component: () => import('@/views/SelectedTea/SelectedTea.vue')
    },
    {
      path: '/SelectedTea-info',
      name: 'SelectedTea-info',
      title: '拼团详情',
      component: () => import('@/views/SelectedTea/components/SelectedTea-info.vue')
    },
    {
      path: '/SelectedTea-buy',
      name: 'SelectedTea-buy',
      title: '立即拼团',
      component: () => import('@/views/SelectedTea/components/SelectedTea-buy.vue')
    },
    {
      path: '/SelectedTea-order',
      name: 'SelectedTea-order',
      title: '拼团成功',
      component: () => import('@/views/SelectedTea/components/SelectedTea-order.vue')
    },
    {
      path: '/business',
      name: 'business',
      title: '商家',
      component: () => import('@/views/SelectedTea/components/business.vue')
    },
    {
      path: '/myRedBag',
      name: 'myRedBag',
      title: '红包列表',
      component: () => import('@/views/SelectedTea/components/myRedBag.vue')
    },
    {
      path: '/finish',
      name: 'finish',
      title: '精选茶叶',
      component: () => import('@/views/finish/finish.vue')
    },
    {
      path: '/redPacket',
      name: 'redPacket',
      title: '实物红包',
      component: () => import('@/views/redPacket/redPacket.vue')
    },
    {
      path: '/redPacket-order',
      name: 'redPacket-order',
      title: '抢红包',
      component: () => import('@/views/redPacket/components/redPacket-order.vue')
    },
    {
      path: '/redPacket-info',
      name: 'redPacket-info',
      title: '领取成功',
      component: () => import('@/views/redPacket/components/redPacket-info.vue')
    },
    {
      path: '/redPacket-buy',
      name: 'redPacket-buy',
      title: '领取失败',
      component: () => import('@/views/redPacket/components/redPacket-buy.vue')
    }
  ]
});
