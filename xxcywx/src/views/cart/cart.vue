<style scoped lang="less">
    @import "./cart.less";
</style>

<template>
    <div class="cart">
        <!--购物车为空-->
        <div class="cart_nullYe">
            <div class="cart_nullYe_image">
                <img src="../../assets/images/namCart.png" />
            </div>
            <p class="cart_nullYe_null">您的购物车还是空的哦 ～</p>
            <p class="cart_nullYe_stroll">
                <a href="home">去逛逛</a>
            </p>
        </div>
        <!--有商品时显示-->
        <div class="cart_showYe">
            <div class="cart_showYe_address">
                <p>填写收货地址</p>
            </div>
            <yd-cell-group class="cart_showYe_cell">
                <yd-cell-item>
                    <span slot="left">姓名：</span>
                    <input slot="right" type="text">
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">电话：</span>
                    <input slot="right" type="number">
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">收货地址：</span>
                    <input slot="right" type="text">
                </yd-cell-item>
            </yd-cell-group>
            <!--产品详情-->
            <div class="details">
                <yd-checklist v-model="checklist" :label="false" ref="checklistDemo" :callback="change">
                  <div v-for="(item , key) in cartList" :key="key">
                    <yd-checklist-item :val="item.value">
                        <yd-flexbox >
                            <img :src="item.img" style="width:2.85rem;height: 1.66rem;">
                            <yd-flexbox-item align="top">
                                                          {{item.title}}<br>
                                <span class="details_price">¥{{item.price}}</span>
                                <yd-spinner v-model="spinner3" height="0.5rem"></yd-spinner>
                            </yd-flexbox-item>
                        </yd-flexbox>
                    </yd-checklist-item>
                  </div>
                </yd-checklist>
            </div>
            <!--支付方式-->
            <div class="payment">
                <p>支付方式</p>
                <div class="payment_weixin">
                    <yd-checkbox-group v-model="checkbox6" class="payment_weixin_radio">
                      <yd-checkbox val="" shape="circle" ></yd-checkbox>
                    </yd-checkbox-group>
                    <span>微信支付</span>
                </div>
            </div>
        </div>
        <div class="choice">
            <yd-checkbox v-model="isCheckAll" shape="circle" :change="checkAll" >全选 </yd-checkbox>
            <div class="total">合计
                <!--<span >¥115.00</span>-->
                <span class="total_prict">{{spinner3}}</span>
                <span class="total_postage">(邮费：<i>20</i>)</span>
            </div>
            <router-link to="/SelectedTea-order">结算</router-link>
        </div>
        <!--底部导航-->
        <yd-tabbar fixed class="home_tab">
            <yd-tabbar-item title="首页" link="home">
                <yd-icon name="home" slot="icon" size="0.5rem"></yd-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="分类" link="branch">
                <img src="../../assets/images/branch/branch.png" slot="icon" size="0.6rem" />
            </yd-tabbar-item>
            <yd-tabbar-item title="购物车" link="cart" :active="tabActive === 'cart'" style="color:#000" active-color="#000">
                <img src="../../assets/images/navCart.png" alt="" slot="icon" size="0.6rem" />
            </yd-tabbar-item>
            <yd-tabbar-item title="个人中心" link="user">
                <img src="../../assets/images/PersonalCenter.png" slot="icon" size="0.6rem" />
            </yd-tabbar-item>
        </yd-tabbar>
    </div>
</template>

<script>
export default {
  name: 'cart',
  data () {
    return {
      spinner3: 0,
      tabActive: 'cart',
      checklist: [],
      checkbox6: ['1'],
      isCheckAll: false,
      cartList: [
        {
          title: ' 红茶大红袍 红茶系列罐装 60g*1',
          price: 38,
          img: require('../../assets/images/ptimg.png'),
          value: '11'
        },
        {
          title: ' 红茶大红袍 红茶系列罐装 60g*1',
          price: 38,
          img: require('../../assets/images/ptimg.png'),
          value: '22'
        },
        {
          title: ' 红茶大红袍 红茶系列罐装 60g*1',
          price: 38,
          img: require('../../assets/images/ptimg.png'),
          value: '33'
        }
      ]
    };
  },
  methods: {
    change (value, isCheckAll) {
      this.isCheckAll = isCheckAll;
    },
    checkAll () {
      this.isCheckAll = !this.isCheckAll;
      this.$refs.checklistDemo.$emit('ydui.checklist.checkall', this.isCheckAll);
    }
  }
};
</script>

<style>

</style>
