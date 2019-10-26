<template>
  <div class="box">
    <div class="singleGoods" v-for="(value,i) in goodsList" :key="i">
        <!-- 左边 -->
        <div class="imgBox">
          <img :src="value.image" alt />
        </div>
        <!-- 右边 -->
        <div class="rightBox">
          <div class="goodsName">{{ value.name }}</div>
          <div class="priceBox">
            <div>￥{{ value.price }}</div>
            <div class="numberBox">
              <div class="redIcon" v-show="value.num>0" @click="clickNumber(-1,value.name)">-</div>
              <span v-show="value.num>0">{{ value.num }}</span>
              <div class="addIcon" @click="clickNumber(1,value.name)">+</div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  computed: {
    goodsList() {
      return this.$store.getters.getShopCarGoods;
    }
  },
  methods: {
    clickNumber(num, name) {
      console.log(num, name);
      this.$store.commit({
        type: "getGoodsNum",
        num,
        name
      });
    }
  },
  mounted(){
       
  }
};
</script>

<style lang="less" scoped>
.singleGoods {
   
  display: flex;
  justify-content: flex-start;
  padding: 15px;
  position: relative;
  background-color: #fff;
  .imgBox {
    width: 70px;
    height: 65px;
    background: chocolate;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .rightBox {
    color: #000;
    .goodsName {
      line-height: 40px;
      font-size: 16px;
    }
    .priceBox {
      // width: 100%;
      // display: flex;
      // justify-content: space-between;
      .numberBox {
        position: absolute;
        bottom: 15px;
        right: 15px;
        width: 70px;
        height: 30px;
        display: flex;
        justify-content: space-around;
        padding-top: 5px;
        .redIcon {
          color: #fff;
          background-color: #ccc;
          width: 20px;
          text-align: center;
          height: 20px;
          line-height: 20px;
          border-radius: 10px;
        }
        .addIcon {
          color: #fff;
          background-color: #009ee0;
          width: 20px;
          text-align: center;
          height: 20px;
          line-height: 20px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>