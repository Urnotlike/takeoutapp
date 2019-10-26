<template>
  <div class="container">
    <!-- 评价星星 -->
    <div class="star">
      <!-- 左边 -->
      <div class="allScore">
        <div>3.9</div>
        <div class="scrolltxt">综合评分</div>
        <div>高于周边商家69.2%</div>
      </div>
      <!-- 右边 -->
      <div class="singleScore">
        <div class="starBox">
          <span>服务态度</span>
          <div>
            <img :src="onstar" alt />
            <img :src="onstar" alt />
            <img :src="onstar" alt />
            <img :src="onstar" alt />
            <img :src="offstar" alt />
          </div>
          <span class="score">3.9</span>
        </div>
        <div class="starBox">
          <span>服务态度</span>
          <div>
            <img :src="onstar" alt />
            <img :src="onstar" alt />
            <img :src="onstar" alt />
            <img :src="onstar" alt />
            <img :src="offstar" alt />
          </div>
          <span class="score">3.9</span>
        </div>
        <div class="timeBox">
          <span>送达时间</span>
          <span class="time">44分钟</span>
        </div>
      </div>
    </div>

    <!-- 下面评价 -->
    <div class="evaluate">
      <div class="chooseBox">
        <div class="classTxtBox">
          <div>全部57</div>
          <div class="satisfied">满意47</div>
          <div class="nosatisfied">不满意10</div>
        </div>
        <div class="check">
          <input type="checkbox" />只看有内容的评价
        </div>
      </div>
      <div class="contentTxt">
        <div class="singleBox" v-for="(item,i) in this.list" :key="i">
          <div class="headimg">
            <img :src="item.avatar" alt />
          </div>
          <div class="rightBox">
            <div class="shopsTime">
              <span>{{ item.username }}</span>
              <span>{{ item.rateTime | dateformat('YYYY-MM-DD hh:mm:ss') }}</span>
            </div>
            <div class="starTime">
              <div v-for="(star,index) in 5" :key="index">
                <img :src="item.score>=index?onstar:offstar" alt />
              </div>
              <span>{{ item.deliveryTime }}分钟送达</span>
            </div>

            <div class="evaTxt">{{ item.text }}</div>
            <div class="special">
              <div class="goodBox">
                <img :src="goodimg" alt />
              </div>
              <div class="rightTxt">
                <div class="food" v-for="(food,i) in item.recommend" :key="i">{{ food }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { evaluate } from "../apis/api";

export default {
  data() {
    return {
      onstar: require("../assets/images/star24_on@2x.png"),
      offstar: require("../assets/images/star24_off@2x.png"),
      list: [],
      goodimg: require("../assets/images/dianzan.png")
    };
  },
  created() {
    evaluate()
      .then(res => {
        this.list = res.data.data;
        // console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f4f5f7;
  overflow-y: scroll;
  .star {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    color: #9699a0;
    border-bottom: 1px solid #e6e7e9;
    .allScore {
      width: 40%;
      text-align: center;
      border-right: 1px solid #ccc;
      line-height: 25px;
      div:first-child {
        font-size: 24px;
        color: #f99d0e;
      }
      .scrolltxt {
        color: #000;
      }
    }
    .singleScore {
      width: 60%;
      color: #000;
      font-size: 14px;
      padding: 0 15px;
      .starBox {
        display: flex;
        justify-content: space-between;
        .score {
          color: #f99d0e;
        }
      }
      .timeBox {
        .time {
          color: #9699a0;
          margin-left: 12px;
        }
      }
    }
  }
  .evaluate {
    margin-top: 15px;
    border-top: 1px solid #e6e7e9;
    background-color: #fff;
    .chooseBox {
      padding: 15px;
      border-bottom: 2px solid #e6e7e9;
      .classTxtBox {
        display: flex;
        justify-content: flex-start;
        padding-bottom: 20px;
        border-bottom: 1px solid #e6e7e9;
        div {
          padding: 10px;
          background-color: #00a0dc;
          color: #fff;
          margin-right: 10px;
        }
        .satisfied {
          background-color: #ccecf7;
          color: #4c535d;
        }
        .nosatisfied {
          background-color: #eaebed;
          color: #4c535d;
        }
      }
      .check {
        padding-top: 15px;
        input {
          margin-right: 5px;
        }
      }
    }
    .contentTxt {
      padding: 0 15px;

      .singleBox {
        padding: 15px 0;
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid #e6e7e9;
        .headimg {
          width: 40px;
          height: 40px;
          background-color: cadetblue;
          border-radius: 20px;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 20px;
          }
        }
        .rightBox {
          flex: 1;
          color: #000;
          // overflow: hidden;
          width: 80%;

          .shopsTime {
            display: flex;
            justify-content: space-between;
            span:last-child {
              color: #bec2c5;
            }
          }
          .starTime {
            display: flex;
            span {
              margin-left: 5px;
              color: #bec2c5;
            }
          }
          .evaTxt {
            width: 100%;
          }
          .special {
            display: flex;
            margin-top: 10px;
            width: 100%;
            .goodBox {
              width: 20px;
              height: 20px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .rightTxt {
              display: flex;
              flex: 1;
              overflow: hidden;
            }
            .food {
              width: 90px;
              text-align: center;
              height: 25px;
              line-height: 25px;
              border: 1px solid #e5e5e5;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>