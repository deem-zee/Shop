<template>
  <div>
      <div class="cart">
          <h1>Shopping Cart</h1>
        <p v-if="cartProducts.length == 0">Ваша корзина пока пуста</p>
       <ul>
          <li v-for="(product, index) in cartProducts" :key="index">
              <h2>{{product.title}}</h2>
              <p>{{product.description}}</p>
              <p>${{product.price}}</p>
              <button class="btn del">Удалить</button>
          </li>
      </ul>
      <!-- <h3>{{getTotal}}</h3> -->
      <button class="btn" v-if="cartProducts.length > 0">Оформить заказ</button>
      <!-- <p>Total: {{total | currency}}</p>
      <button @click="$store.dispatch('checkout')">Checkout</button>
      <p v-if="$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p> --> 
      </div>
      
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
    computed: {
        ...mapState(["cart"]),
        ...mapGetters(["cartProducts"])
    },


    
}
</script>

<style scoped>
    .cart {
        min-height: 400px;
        width: 100%;
        background: rgb(236, 234, 234);
    }

    .cart > p {
        color: blue
    }

    li{
        list-style-type: none;
    }
</style>