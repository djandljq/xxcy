const app = {
  state: {
    orderPay: {
      order_id: '',
      order_sn: '',
      order_type: '',
      wx_order_no: ''
    }
  },
  mutations: {
    createOrderPay (state, order) {
      state.orderPay = {
        order_id: order.id,
        order_sn: order.order_sn,
        order_type: order.type,
        wx_order_no: order.wx_order_no
      };
    },
    clearOrderPay (state) {
      state.orderPay = {
        order_id: '',
        order_sn: '',
        order_type: '',
        wx_order_no: ''
      };
    }
  }
};

export default app;
