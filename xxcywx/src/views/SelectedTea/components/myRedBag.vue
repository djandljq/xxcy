<style scoped lang="less">
    @import './myRedBag.less';
</style>

<template>
    <div class="myRedBag">
        <ul class="myRedBag_myRedList">
            <li v-for="(item, index) in list" :key="index">
                <div class="details">
                    <div class="details_image">
                        <img :src="item.img" />
                    </div>
                    <div class="details_right">
                        <h3>{{item.title}}</h3>
                    <div class="details_right_prict">
                        <div class="details_right_prict_list">
                            <span>有效期至：{{item.time}}</span>
                        </div>
                        <div class="details_right_prict_num">
                            <a href="#" class="tuikuan">{{item.refund}}</a>
                        </div>
                    </div>
                        <div class="send" >
                            <span>{{item.send}}</span>
                        </div>
                    </div>
                    <div class="details_miaoshu">
                        <div class="consignee">收货人：{{item.name}}
                             <span>{{item.telephone}}</span>
                        </div>
                        <div class="address">收货地址:<span>{{item.address}}</span></div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="reminder">
                              温馨提示：间领红包还需要您在平台内任意购买一款商品才能领取 成功！
        </div>
    </div>
</template>

<script>
export default {
  name: 'myRedBag',
  data () {
    return {
      checkto: 1,
      list: [{
        id: '1',
        state: 'stay',
        img: require('../../../assets/images/ptimg.png'),
        title: '红茶大红袍 红茶系列罐装 60g*1',
        send: '待派送',
        time: '2018-10-11',
        refund: '直接领红包',
        name: '胡羲格',
        telephone: '13984842424',
        address: '贵州省贵阳市花果园购物中心斜对面金融街一号楼35楼2501'
      },
      {
        id: '2',
        state: 'stay2',
        img: require('../../../assets/images/ptimg.png'),
        title: '红茶大红袍 红茶系列罐装 60g*1',
        send: '已派送',
        time: '2018-10-11',
        refund: '间接领红包',
        name: '胡羲格',
        telephone: '13984842424',
        address: '贵州省贵阳市花果园购物中心斜对面金融街一号楼35楼2501'
      }
      ]
    };
  }
};
</script>

<style>

</style>
