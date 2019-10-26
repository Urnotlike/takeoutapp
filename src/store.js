import Vue from 'vue';
import Vuex from 'vuex';
import {goodsList} from './apis/api'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        list:[]
    },
    mutations:{
        initList(state,list){
            state.list=list
        },
        getGoodsNum(state,{num,name}){
            for(let obj of state.list){
                for(let item of obj.foods){
                    if(item.name==name)
                    item.num+=num
                }
            }
        }
    },
    actions:{
        initList(context){
            goodsList().then(res=>{
                console.log(res.data.data)
                for(let obj of res.data.data){
                    for(let item of obj.foods){
                        item.num=0
                    }
                }
                context.commit('initList',res.data.data)
            })
        },
      
    },
    getters:{
       getShopCarGoods(state){
           let shopCarArr=[]
        for(let goods of state.list){
            for(let item of goods.foods){
                if(item.num>0){
                    let isrepeat=false
                    for(let oldarr of shopCarArr ){
                        if(oldarr.name==item.name){
                            isrepeat=true
                        }
                    }
                    if(!isrepeat){
                        shopCarArr.push(item)      
                    }
                              
                }
            }
        }
        return shopCarArr
       }
    }
})


