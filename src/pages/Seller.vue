<template>
  <div class="shops">
    <div class="header">
      <div class="headerTop">
        <div>
          <div class="title">{{ list.name }}</div>
          <div class="starBox">
            <div class="imgBox">
              <img src="../assets/images/star24_on@2x.png" alt />
              <img src="../assets/images/star24_on@2x.png" alt />
              <img src="../assets/images/star24_on@2x.png" alt />
              <img src="../assets/images/star24_on@2x.png" alt />
              <img src="../assets/images/star24_on@2x.png" alt />
            </div>
            <div class="numBox">
              <span class="num">(661)</span>
              <span>月销{{ list.sellCount }}单</span>
            </div>
          </div>
        </div>
        <div class="collect" @click="clickCollect">
          <img :src="collect_img" alt />
          <div>{{ collect_txt }}</div>
        </div>
      </div>
      <div class="headerBottom">
        <div class="singleBox"> 
          <div>起送价</div>
          <div class="price">
            {{list.minPrice}}
            <span>元</span>
          </div>
        </div>
        <div class="singleBox">
          <div>商家配送</div>
          <div class="price">
            {{ list.deliveryPrice }}
            <span>元</span>
          </div>
        </div>
        <div class="singleBox last">
          <div>平均配送时间</div>
          <div class="price">
            {{ list.deliveryTime }}
            <span>分钟</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 公告与活动 下面内容 -->
    <div class="active">
      <div class="contentTxt">
        <div class="headTitle">公告与活动</div>
        <div
          class="txt"
        >{{ list.bulletin }}</div>
      </div>

      <!-- 下面内容 -->
      <div class="activeBox">
        <div class="single" v-for="(item,i) in list.supports" :key="i">
          <img :src="activeIcon" alt />
          <div>{{item.description }}</div>
        </div>
        <!-- <div class="single">
          <img :src="activeIcon" alt />
          <div>在线支付满28减5，满50减10</div>
        </div>
        <div class="single">
          <img :src="activeIcon" alt />
          <div>在线支付满28减5，满50减10</div>
        </div>
        <div class="single">
          <img :src="activeIcon" alt />
          <div>在线支付满28减5，满50减10</div>
        </div>
        <div class="single">
          <img :src="activeIcon" alt />
          <div>在线支付满28减5，满50减10</div>
        </div>
        <div class="single">
          <img :src="activeIcon" alt />
          <div>在线支付满28减5，满50减10</div>
        </div> -->
      </div>
    </div>

    <!-- 商家实景 -->
    <div class="picture">
      <div class="picName">商家实景</div>
      <div class="picBox">
        <div class="singlePic" v-for="(pic,i) in list.pics" :key="i">
          <img :src="pic" alt />
        </div>
        <!-- <div class="singlePic">
          <img src alt />
        </div>
        <div class="singlePic">
          <img src alt />
        </div> -->
      </div>
    </div>

    <!-- 商家信息 -->
    <div class="message">
      <div class="msgTitle">商家信息</div>
      <div class="singleMsg" v-for="(msg,index) in list.infos" :key="index">{{ msg }}</div>
      <!-- <div class="singleMsg">品类：<span>其他菜系</span></div>
      <div class="singleMsg">地址：<span>其他菜系</span></div>
      <div class="singleMsg">营业地址：<span>其他菜系</span></div> -->
    </div>
  </div>
</template>

<script>
import {shopsMsg} from '../apis/api'
export default {
  data() {
    return {
      activeIcon: require("../assets/images/decrease_3@2x.png"),
      list:[],
      collect_img:require("../assets/images/aixin.png"),
      collect_txt:"已收藏",

    }
  },
  methods:{
    clickCollect(){
      this.collect_img=this.collect_img==require("../assets/images/aixin.png")?require("../assets/images/aixin (1).png"):require("../assets/images/aixin.png")
      this.collect_txt=this.collect_txt=="已收藏"?"收藏":"已收藏"
    }
  },
  created(){
      shopsMsg().then(res=>{
          console.log(res.data.data)
          this.list=res.data.data
      })
      .catch(err=>{
          console.log(err)
      })
  }
};
</script>

<style lang="less" scoped>
.shops {
  width: 100%;
  height: 100%;
  background-color: #f4f5f7;
  overflow-y: scroll;
  .header {
    padding: 15px;
    border-bottom: 1px solid #e6e7e9;
    background-color: #fff;
    .headerTop {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e6e7e9;
      padding-bottom: 15px;
      .title {
        color: #000;
        font-size: 16px;
        margin-bottom: 5px;
      }
      .starBox {
        display: flex;
        .imgBox {
          margin-right: 5px;
        }
        .numBox {
          .num {
            margin-right: 10px;
          }
        }
      }
      .collect {
        width: 55px;
        text-align: center;
        img{
          width: 25px;
          height: 25px;
        }
      }
    }
    .headerBottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
      text-align: center;
      padding-top: 15px;
      .singleBox {
        width: 30%;
        border-right: 1px solid #e6e7e9;
        .price {
          color: #000;
          font-size: 28px;
          span {
            font-size: 14px;
          }
        }
      }
      .last {
        border-right: none;
      }
    }
  }
  .active {
    background-color: #fff;
    padding: 0 15px;
    border-bottom: 1px solid #e6e7e9;
    margin-top: 20px;
    .contentTxt {
      border-bottom: 1px solid #e6e7e9;
      padding-bottom: 15px;
      .headTitle {
        color: #000;
        font-size: 18px;
        line-height: 40px;
      }
      .txt {
        padding: 0 20px;
        color: #f41118;
      }
    }
    .activeBox {
      .single {
        display: flex;
        padding: 20px 0;
        border-bottom: 1px solid #e6e7e9;
        color: #000;
        font-size: 16px;
        img {
          margin: 0 10px;
        }
      }
      //   :last-child{
      //          border-bottom:none;
      //          color: red;
      //     }
    }
  }
  .picture {
    margin-top: 20px;
    background-color: #fff;
    padding: 0 15px;
    border-bottom: 1px solid #e6e7e9;
    padding-bottom: 15px;
    .picName {
      font-size: 20px;
      color: #000;
      line-height: 50px;
    }
    .picBox {
      display: flex;
      justify-content: space-between;
      .singlePic {
        width: 30%;
        height: 80px;
        background-color: cadetblue;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .message {
    margin-top: 20px;
    background-color: #fff;
    padding: 0 15px;
    .msgTitle {
      font-size: 20px;
      color: #000;
      line-height: 50px;
      border-bottom: 1px solid #e6e7e9;
    }
    .singleMsg{
        width: 100%;
        color: #081118;
        font-size: 16px;
        line-height: 70px;
        border-bottom: 1px solid #e6e7e9;
        padding: 0 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
  }
}
</style>