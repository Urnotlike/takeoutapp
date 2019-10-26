<template>
  <div class="bigBox">
    <div class="header" :style="{ backgroundImage:`url(${src})` }">
      <div class="headerBox">
        <div class="imgBox">
          <img :src="src" alt />
        </div>
        <div class="shopsNameBox">
          <div class="bigTitle">
            <div class="brandBox">
              <img :src="brandimg" alt />
            </div>

            <span>{{ name }}</span>
          </div>
          <div>
            <span>{{ description }}</span>/
            <span>{{ deliveryTime }}</span>分钟送达
          </div>
          <div class="discountTxt">
            <div>
              <img :src="discountImg" alt />
            </div>

            <span>{{ active }}</span>
          </div>
        </div>

        <div class="num">5个></div>
      </div>

      <div class="notice">
        <div class="noticeImg">
          <img :src="notice" alt />
        </div>
        <div class="noticeTxt">{{ bulletin }}</div>
      </div>
    </div>
    <div class="mask"></div>

    <div class="navbox">
      <span :class="{selected:sel=='/'}" @click="clickTitle('/')">商品</span>
      <span :class="{selected:sel=='/evaluate'}" @click="clickTitle('/evaluate')">评价</span>
      <span :class="{selected:sel=='/seller'}" @click="clickTitle('/seller')">商家</span>
    </div>

    <div class="router">
      <router-view></router-view>
    </div>

    <div class="shopCar" @click="clickShow">
      <div class="imgbox">
        <img :src="caricon" alt />
        <div class="smallNum" v-show="shopListNumber>0">{{ shopListNumber  }}</div>
      </div>
      <div class="totalPrice">总价：￥{{ totalPrice }}</div>
      <div class="account" :style="{color:mycolor}">{{ account }}</div>
    </div>
    <transition name="slide-fade">
      <div class="panel" v-show="ishow">
           <ShopCar />            
      </div>
    </transition>
  </div>
</template>

<script>
import ShopCar from "./ShopCar";
import BScroll from 'better-scroll'
import { shopsMsg } from "../apis/api";
export default {
  components: {
    ShopCar
  },
  created() {
    shopsMsg()
      .then(res => {
        this.name = res.data.data.name;
        this.description = res.data.data.description;
        this.deliveryTime = res.data.data.deliveryTime;
        this.src = res.data.data.avatar;
        this.bulletin = res.data.data.bulletin;
        this.supports = res.data.data.supports;
        // console.log('data',res.data.data)
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      sel: "/",
      brandimg: require("../assets/images/brand@2x.png"),
      discountImg: require("../assets/images/decrease_1@2x.png"),
      notice: require("../assets/images/bulletin@2x.png"),
      src: "",
      name: "",
      description: "",
      deliveryTime: 0,
      bulletin: "",
      supports: "",
      // caricon: require("../assets/images/shop-cart-2.png"),
      ishow: false,
      account:'去结算',
      mycolor:"#85878B"
    };
  },
  methods: {
    clickTitle(path) {
      this.sel = path;
      this.$router.history.push(path);
    },
    clickShow() {
      this.ishow = !this.ishow;
    }
  },
  computed: {
    active() {
      var str = "";
      for (let item of this.supports) {
        str += item.description + " ";
      }
      return str;
    },
    caricon() {
      if (this.$store.getters.getShopCarGoods.length > 0){
        this.mycolor='#E8E02A'
        return require("../assets/images/shop-cart-2 (1).png")
            
        };
        return require("../assets/images/shop-cart-2.png");
    },
    totalPrice() {
      let alltotal = 0;
      for (let item of this.$store.getters.getShopCarGoods) {
        alltotal += item.price * item.num;
      }
      return alltotal;
    },
    shopListNumber(){
      let number=0;
      for(let item of this.$store.getters.getShopCarGoods){
        number+=item.num
      }
      return number
      
    }
  },
};
</script>

<style lang="less" scoped>
.selected {
  color: red;
}
.bigBox {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.router {
  flex: 1;
  display: flex;
  height: 100%;
}
.header {
  background-color: rgba(0, 0, 0, 0.5);
  .headerBox {
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    position: relative;
    .imgBox {
      width: 100px;
      height: 80px;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .shopsNameBox {
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .bigTitle {
        display: flex;
        font-size: 18px;
        font-weight: bold;
        .brandBox {
          width: 50px;
          height: 30px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        span {
          display: inline-block;
          margin-top: 2px;
          margin-left: 5px;
        }
      }
      .discountTxt {
        font-size: 13px;
        display: flex;
        span {
          display: inline-block;
          width: 70%;
          margin-top: 2px;
          margin-left: 5px;
        }
      }
    }
    .num {
      position: absolute;
      right: 10px;
      bottom: 5px;
      background-color: #666;
      color: #fff;
      width: 50px;
      text-align: center;
      border-radius: 10px;
    }
  }

  .notice {
    display: flex;
    background-color: #666;
    color: #fff;
    padding: 10px 10px;
    width: 100%;

    .noticeImg {
      margin-right: 5px;
    }
    .noticeTxt {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-top: 5px;
    }
  }
}

.navbox {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
}

.shopCar {
  display: flex;
  // position: fixed;
  position: relative;
  width: 100%;
  height: 50px;
  bottom: 0;
  background-color: #131D26;
  z-index: 9999;
  .totalPrice {
    margin-left: 90px;
    margin-top: 12px;
    font-size: 18px;
    color: #fff;
  }
  .imgbox {
    width: 50px;
    height: 50px;
    background-color: #2b343d;
    border-radius: 25px;
    text-align: center;
    position: absolute;
    top: -10px;
    left: 20px;
    img {
      width: 30px;
      height: 30px;
      margin-top: 10px;
    }
  }
  .account{
    width: 100px;
    height: 50px;
    background-color: #2B343B;
    position: absolute;
    right: 0;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
  }
  .smallNum {
    position: absolute;
    top: 0;
    left: 35px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: red;
    color: #fff;
  }
}
.panel {
  width: 100%;
  height: 200px;
  overflow-y: scroll;
  // background-color: cadetblue;
  position: fixed;
  bottom: 50px;
  background-color: #fff;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100px);
  opacity: 0;
}
</style>