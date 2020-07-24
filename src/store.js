import Vue from 'vue'
import Vuex from 'vuex'
import vuexPersist from 'vuex-persist'

const vuexLocal = new vuexPersist({
  storage:window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
       cartList:[],
       user:""
  },
  mutations: { 
       forCart(state,payload){
           let index = state.cartList.findIndex(item=>{
              return item._id == payload._id
           })
           console.log(index)
           if(index != -1){
              state.cartList[index].num++
           }else{
            payload.num = 1;
            payload.checked = true;
            state.cartList.push(payload);
           }
           
       },
       update(state,payload){
         state.cartList = payload
       },
       login(state,payload){
            state.user = payload
       },
       tui(state){
          state.user = ""
       }
  },
  actions: {

  },
  plugins:[vuexLocal.plugin]
})
