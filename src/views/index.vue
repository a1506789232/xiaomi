<template>
  <div class="box">
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <p>
          Sort by :
          <span style="color:red" v-show="login" @click="deng">login</span>
          <span style="color:red" v-show="!login" @click="tui">
               hello{{ this.$store.state.user.user }}
          </span>
          <span style="marginRight:20px"><i class="el-icon-shopping-cart-2" @click="jump"></i></span>
          <span>
            Price
            <i :class="sort?'el-icon-bottom':'el-icon-top'" @click="sort = ! sort;"></i>
          </span>
        </p>
      </el-header>
      <el-container class="container">
        <el-aside width="200px" class="container-left">
          <p>PRICE:</p>
          <ul>
            <li
              v-for="(item,index) in arr"
              :key="index"
              :style="{background:ItemL==index?'white':'',borderLeft:ItemL==index?'2px solid red':''}"
              @click="moneySort(item,index)"
            >{{ item }}</li>
          </ul>
        </el-aside>
        <el-main class="container-right">
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <img :src="item.productImage" alt />
              <div>
                <p>{{ item.productName }}</p>
                <p style="color:red">￥{{ item.salePrice }}</p>
                <el-button @click="forCart_shop(item)">加入购物车</el-button>
              </div>
            </li>
          </ul>
        </el-main>
      </el-container>
    </el-container>
    <!-- loading -->
    <el-main class="main" v-loading="loading1" element-loading-text="拼命加载中" />
  </div>
</template>

<script>
import "@/assets/css/zishi.css";
export default {
  data() {
    return {
      // 上下排序
      sort: true,
      //价格分区
      arr: [
        "All",
        "0-100",
        "100.00-500.00",
        "500.00-1000.00",
        "1000.00-2000.00"
      ],
      //高亮
      ItemL: 0,
      goodsList: [],
      //最小价钱，最大价钱
      minprice: 0,
      maxprice: 0,
      //滚动加载的json数据数字
      num: 2,
      loading: true, //是否继续加载
      loading1: false,
      login:true,
      na:""
    };
  },
  created() {},
  mounted() {
    this.goodsGet();
    window.addEventListener("scroll", this.mouseScroll);
    if(this.$store.state.user != ""){
         this.na = this.$store.state.user.name
         this.login = false
    }
  },
  methods: {
    goodsGet() {
      this.$axios("/json/data.json").then(res => {
        //请求初始化数据
        this.goodsList = res.data.result.list;
      });
    },
    moneySort(item, index) {
      this.ItemL = index;
      if (item == "All") {
        return false;
      }
      this.minprice = item.split("-")[0]; //字符串截取
      this.maxprice = item.split("-")[1];
    },
    mouseScroll() {
      //鼠標滾動加載
      if (this.num > 3 || this.loading == false) {
        return false;
      }
      this.loading = false;
      this.loading1 = true;
      setTimeout(() => {
        this.$axios(`/json/data${this.num}.json`).then(res => {
          this.goodsList.push(...res.data.result.list);
          this.num++;
          this.loading = true;
          this.loading1 = false
        });
      }, 1000);
    },
    jump(){    //加入购物车
      this.$router.push('/cart')
    },
    forCart_shop(item){
        if(this.login){
          alert('请登录')
          return false;
        }
        this.$store.commit('forCart',item)
    },
    deng(){
      this.login = false
      this.$store.commit('login',{user:"徐海峰",token:"152323200102220015"})
    },
    tui(){
       this.login = true
       this.$store.commit('tui')
    }
  },
  computed: {
    list() {
      let arr = this.goodsList;
      arr.sort((a, b) => {
        //排序
        if (this.sort) {
          return b.salePrice - a.salePrice;
        } else if (this.sort == false) {
          return a.salePrice - b.salePrice;
        }
      });

      if (this.ItemL != 0) {
        arr = this.goodsList.filter(item => {
          return (
            item.salePrice > this.minprice && item.salePrice < this.maxprice
          );
        });
      }

      return arr;
    }
  }
};
</script>

<style scoped>
</style>
