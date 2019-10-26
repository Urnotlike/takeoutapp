import axios from 'axios'

const IP='http://127.0.0.1:3333'

// 商家信息
export function shopsMsg(){
   return axios.get(IP+'/api/seller')
}

// 商品列表
export function goodsList(){
    return axios.get(IP+'/api/goods')
}

// 商家评论
export function evaluate(){
    return axios.get(IP+'/api/ratings')
}

