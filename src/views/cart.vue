<template>
  <div>
    <table border="0px">
      <thead>
        <tr>
          <th>
            <input type="checkbox" v-model="checked" @click="all"/>全选
          </th>
          <th>商品名称</th>
          <th>单价</th>
          <th>数量</th>
          <th>小计</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in cartList" :key="index">
          <td>
            <input type="checkbox" v-model="item.checked" />
          </td>
          <td>
            <img :src="item.productImage" alt />
            <span>{{item.productName}}</span>
          </td>
          <td>￥{{ item.salePrice }}</td>
          <td>
            <button @click="decor(index)">-</button>
            <input type="text" v-model="item.num" style="width:50px" />
            <button @click="item.num++">+</button>
          </td>
          <td>￥{{ item.num*item.salePrice }}</td>
          <td>
            <i class="el-icon-delete" @click="remove(index)"></i>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="1"></td>
          <td colspan="5" class="submit">
            <span style="color:red;margin-right:20px">总价：￥{{ allPrice }}</span>
            <el-button type="danger" @click="goShop">继续购物</el-button>
            <el-button type="danger">结算</el-button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartList: [],
      checked: true
    };
  },
  created() {},
  mounted() {
    this.cartList = this.$store.state.cartList;
    console.log(this.cartList);
  },
  methods: {
    all() {
        this.cartList.forEach((item) => {
          if (this.checked == true) {
             item.checked = false
          }else{
              item.checked = true
          }
        });
    },
    decor(i){
        if(this.cartList[i].num <=1){
            alert('不能再减了')
            return false;
        }
        this.cartList[i].num--
    },
    remove(i){
       this.cartList.splice(i,1)
       alert('删除成功')
    },
    goShop(){
        this.$router.push('/')
    }
  },
  computed: {
    allPrice() {
      let num = 0;
      let length = 0;
      this.cartList.forEach((item) => {
        if (item.checked) {
          num += item.num * item.salePrice;
          length++;
        }
      });
      if (this.cartList.length == length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
      if (this.cartList != "") {
        this.$store.commit("update", this.cartList);
      }

      return num;
    },
  },
};
</script>

<style scoped lang='scss'>
table {
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
  text-align: center;
  border: 1px solid #ccc;
  td {
    height: 50px;
  }
  img {
    width: 50px;
  }
  .submit {
    text-align: right;
  }
}
</style>
