import Vue from 'vue'
import Vuex from 'vuex'
import {goodsList} from '../src/apis/api'

Vue.use(Vuex)

var store=new Vuex.Store({
    state:{
        name:'张三',
        list:[],
        people:[{id:'1',age:12},{id:'2',age:18},{id:'3',age:22},{id:'4',age:32},{id:'5',age:45}]
    },
    mutations:{
        changeName(state,value){
            state.name=value.name
        },
        initList(state,newlist){
            state.list=newlist
        }
    },
    actions:{
        initList(context){
            goodsList().then(res=>{               
                context.commit('initList',res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    getters:{
        getPeople(state){
            return  state.people.filter((obj)=>{
               return obj.age>=18
            })
        }
    }
})
store.dispatch('initList')

// store.commit('changeName','王二')
store.commit({
    type:'changeName',
    name:'王二'
})
// console.log(store)
// console.log(store.getters.getPeople)
// console.log(store.state.list)
export default store
