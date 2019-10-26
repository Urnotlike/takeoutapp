<template>
  <div class="container">
    <!-- <h2>商品页面</h2> -->
    <!-- 左边 -->
    <div id="leftScrollDiv" class="left">
      <ul class="content">
        <div
          class="top"
          :class="{selected:selName==item.name}"
          @click="clickTitle(item.name)"
          v-for="item in list"
          :key="item.name"
        >{{ item.name }}</div>
      </ul>
    </div>
    <!-- 右边 -->
    <div class="right" id="rightScrollDiv">
      <ul class="content">
        <div class="rightBox" :id="item.name" v-for="(item,i) in list" :key="i">
          <div class="rightTitle">{{ item.name }}</div>
          <div class="goodsBox" v-for="(value,key) in item.foods" :key="key">
            <div class="imgBox">
              <img :src="value.image" alt />
            </div>
            <div class="goodsIntroduce">
              <div class="goodsName">{{ value.name }}</div>
              <div class="type">{{ value.description }}</div>
              <div class="number">
                <span class="firstSpan">月销{{ value.sellCount}}份</span>
                <span>好评率{{ value.rating }}%</span>
              </div>
              <div class="price">
                <span class="disCountPrice">￥{{ value.price }}</span>
                <span>
                  <del>￥28</del>
                </span>
              </div>
            </div>
            <div class="numberBox">
              <div class="redIcon" v-show="value.num>0" @click="clickNumber(-1,value.name)">-</div>
              <span v-show="value.num>0">{{ value.num }}</span>
              <div class="addIcon" @click="clickNumber(1,value.name)">+</div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { goodsList } from "../apis/api";
import BScroll from "better-scroll";
export default {
  created() {
    this.$store.dispatch("initList");
    // goodsList()
    //   .then(res => {
    //     this.list = res.data.data;
    //     // console.log(res.data.data);
    //     this.$nextTick(()=>{

    //     // console.log(document.getElementById('热销榜').offsetHeight)
    //     var arr=[]
    //     for(let obj of this.list){
    //       arr.push(document.getElementById(obj.name).offsetHeight)
    //     }
    //     let objarr=[];
    //     let boforeHeight=0;
    //     for(let i=0;i<arr.length;i++){
    //       objarr.push({min:boforeHeight,max:boforeHeight+arr[i],tabname:this.list[i].name})
    //       boforeHeight+=arr[i]
    //     }

    //     // console.log(objarr)
    //     // console.log(arr)
    //     this.newarr=objarr

    //     })
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  mounted() {
    var leftScroll = new BScroll("#leftScrollDiv", {
      click: true
    });
    this.rightScroll = new BScroll("#rightScrollDiv", {
      probeType: 3,
      click:true
    });
    this.rightScroll.on("scroll", obj => {
      var _y = Math.abs(obj.y); //[1184, 194, 140, 360, 250, 286, 360, 580, 780]
      for (let obj of this.newarr) {
        if (_y > obj.min && _y < obj.max) {
          this.selName = obj.tabname;
        }
      }
      // console.log(this.newarr)
      // console.log(Math.abs(obj.y))
      // console.log(this.newarr)
      // if(_y>=1184){
      //   this.selName='单人精彩套餐'
      // }
    });
  },
  data() {
    return {
      // list: [],
      foods: [],
      img: "",
      selName: "热销榜",
      number:0
    };
  },
  methods: {
    clickTitle(name) {
      console.log(name);
      this.selName = name;
      this.rightScroll.scrollToElement("#" + name, 500);
    },
    clickNumber(num,name){
      // console.log(num,name)
      this.$store.commit({
        type:'getGoodsNum',
        num,
        name
      })
    }
 
  },
  computed: {
    list() {
      return this.$store.state.list;
    },
    newarr() {
      var arr = [];
      for (let obj of this.list) {
        arr.push(document.getElementById(obj.name).offsetHeight);
      }
      let objarr = [];
      let boforeHeight = 0;
      for (let i = 0; i < arr.length; i++) {
        objarr.push({
          min: boforeHeight,
          max: boforeHeight + arr[i],
          tabname: this.list[i].name
        });
        boforeHeight += arr[i];
      }

      // console.log(objarr)
      // console.log(arr)
      // this.newarr=objarr
      return objarr;
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.selected {
  background-color: #fff;
}
.container {
  display: flex;
  background-color: #eee;
  height: 100%;
  width: 100%;

  .left {
    height: 100%;
    width: 90px;
    border-right: 1px solid #ccc;
    overflow: scroll;
    .top {
      font-size: 16px;
      height: 60px;
      border-bottom: 1px solid #ccc;
      padding: 10px;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    width: 100%;
    overflow: scroll;
    .rightTitle {
      margin-left: 15px;
      line-height: 30px;
    }
    .goodsBox {
      background-color: #fff;
      display: flex;
      padding: 20px;
      position: relative;
      .imgBox {
        width: 70px;
        height: 70px;
        background-color: cadetblue;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goodsIntroduce {
        flex: 1;
        color: #888;
        .goodsName {
          font-size: 16px;
          font-weight: bold;
          color: #000;
        }
        .type {
          font-size: 12px;
        }
        .number {
          .firstSpan {
            margin-right: 5px;
            font-size: 12px;
          }
        }
        .price {
          font-size: 16px;
          font-weight: bold;
          .disCountPrice {
            color: red;
            font-size: 17px;
            margin-right: 10px;
          }
        }
      }
      .numberBox {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 70px;
        height: 30px;
        display: flex;
        justify-content: space-around;
       padding-top: 5px;
        .redIcon{
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