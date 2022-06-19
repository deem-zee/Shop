<template>
  <div>
    <h1>Products List</h1>
    <ul class="container">
        <li v-for="(product, index) in products" :key="index" class="container-prod">
            <h3>{{product.title}}</h3>
            <img :src='product.image' alt="">
            <p>Price: ${{product.price}}</p>
            <button class="btn add" @click="addToCart(product)">Add</button>
        </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import { mapActions, mapGetters } from "vuex";

Vue.use(VueAxios, axios)

export default {
    // data() {
    //     return {
    //         products: []
    //     }
    // },
    // created() {
    //        this.$http.get("https://fakestoreapi.com/products").then((response) => {
    //             this.products = response.data
    //         })
    // }
  computed: {
    ...mapGetters(["products", "error"]),
  },
  methods: {
    ...mapActions(["getProducts", "addToCart"]),
  },
  created() {
    this.getProducts();
  },
}
</script>

<style scope>
.container {
    /* width: 1200px; */
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}

.container-prod {
    list-style-type: none;
    width: 30%;
    border: 1px solid black;
    margin: 10px;
    padding: 5px;
    border-radius: 0.75rem;
    box-shadow:  6px 6px 2px 1px rgba(0, 0, 255, .2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container-prod img {
    width: 200px;
    height: 200px;
}

.container-prod h3 {
    height: 50px;
    width: 400px;
}

.error {
  height: 100%;
  color: black;
  background: rgb(75, 2, 186);
  text-align: center;
  font-size: 148px;
}

.error .container, h1 {
  display: none;
}

.btn {
  width: 80px;
  height: 40px;
  background: rgb(27, 167, 116);
  border-radius: 0.5rem;
}

.btn:hover {
  cursor: pointer;
}

</style>
