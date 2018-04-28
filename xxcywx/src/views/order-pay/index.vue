<style scoped lang="less">
</style>

<template>
  <div>订单：{{order_sn}} 正在支付</div>
</template>

<script>
/* eslint-disable */
import {
  wxJsSdkPay,
  orderUpdate
} from '../../ifucloud/sdk';
import wx from '../../ifucloud/sdk/libs/wx';
export default {
  name: 'order-pay',
  data () {
    return {
      wx_type: 'bridge',
      order_id: '',
      order_sn: '',
      order_type: '',
      wx_order_no: ''
    };
  },
  methods: {
    init () {
      let tmp = JSON.parse(sessionStorage.tmp);
      this.order_id = tmp.id;
      this.order_sn = tmp.order_sn;
      this.order_type = tmp.type;
      this.order_type = tmp.type;
      this.wx_order_no = tmp.wx_order_no;
      this.pay();
    },
    pay () {
      let that = this;
      wxJsSdkPay({
        type: this.wx_type,
        prepay_id: this.wx_order_no
      }).then(data => {
        if (this.wx_type === 'jssdk') {
          wx.chooseWXPay({
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success: function (res) {
              orderUpdate(that.order_id, {
                state: 'paid'
              }).then(resp => {
                let name = that.order_type + '-order';
                let argu = { sn: that.order_sn };
                that.$router.push({
                  name: name,
                  params: argu
                });
              }).catch(err => {
                that.$dialog.toast({
                  mes: err,
                  timeout: 1500,
                  icon: 'error'
                });
              });
            }
          });
        } else {
          if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
          } else {
            onBridgeReady();
          }
        }
        function onBridgeReady () {
          WeixinJSBridge.invoke('getBrandWCPayRequest', data, function (res) {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              orderUpdate(that.order_id, {
                state: 'paid'
              }).then(resp => {
                let name = that.order_type + '-order';
                let argu = { sn: that.order_sn };
                that.$router.push({
                  name: name,
                  params: argu
                });
              }).catch(err => {
                that.$dialog.toast({
                  mes: err,
                  timeout: 1500,
                  icon: 'error'
                });
              });
            }
          });
        }
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    }
  },
  mounted () {
    this.init();
  },
  activated () {
    this.init();
  }
};
</script>
