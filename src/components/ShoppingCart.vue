<template>
  <div>
      <div class="cart">
          <h1>Shopping Cart</h1>
        <p v-if="cartProducts.length == 0" class="empty">Ваша корзина пока пуста</p>
       <ul>
          <li v-for="(product, index) in cartProducts" :key="index">
              <h2>{{product.title}}</h2>
              <p>{{product.description}}</p>
              <p>${{product.price}}</p>
              <p><button class="btn">-</button>quantity: {{product.quantity}}<button @click="addToCart" class="btn">+</button></p>
              <button class="btn del">Удалить</button>
          </li>
      </ul>
      <!-- <h3>{{getTotal}}</h3> -->
      <button class="btn" v-if="cartProducts.length > 0">Оформить заказ</button>
      <button v-if="cart.length != 0" @click="clearCart" class="btn clearCart">Очистить корзину</button>
      </div>
      
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"

export default {
    computed: {
        ...mapState(["cart"]),
        ...mapGetters(["cartProducts"])
    },
    methods: {
        ...mapActions(["clearCart", "addToCart"])
    }

    
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro&display=swap');
    .cart {
        min-height: 400px;
        width: 100%;
        background: rgb(236, 234, 234);
        position: relative;
    }

    .cart > p {
        color: blue
    }

    li{
        list-style-type: none;
    }
    .empty {
        position: absolute;
        display: inline-block;
        font-family: 'Be Vietnam Pro', sans-serif;
        font-weight: 500;
        font-size: 40px;
        top: 35%;
        left: 35%;
        
    }
    .clearCart {
        background: rgb(175, 55, 55);
    }
    .clearCart:hover {
        background: rgb(159, 19, 19);
    }
</style>