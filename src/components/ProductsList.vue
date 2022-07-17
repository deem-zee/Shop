<template>
  <div>
    <h1>Products List</h1>
    <input type="text" v-model="search" @keyup="searchItems" class="search" placeholder="Искать" >
    <div v-if="showCard" class="singleProductCard">
        <img :src="`${singleCard.imgUrl}`" alt="">
        <h2>{{singleCard.title}}</h2>
        <p>{{singleCard.description}}</p>
        <p>{{singleCard.price}}</p>
        <button class="btn add" @click="pushItemToCart(singleCard)">В корзину</button>
        <button @click="closeSingleProduct" class="singleProductCard__close">x</button>
    </div>
    <div>
      <ul v-if="search !== ''" class="container">
        <li v-for="product of productsShow[this.currentPage - 1]" :key="product.id" class="container-prod">
            <h3>{{product.title}}</h3>
            <img :src='product.image' alt="">
            <p class="price">Price: ${{product.price}}</p>
            <button class="btn add" @click="addToCart(product)">В корзину</button>
        </li>
    </ul>
    <ul  v-if="search == ''" class="container">
        <li  v-for="product in productsShow[this.currentPage - 1]" :key="product.id" class="container-prod">
            <div @click="showSingleProduct(product)">
              <h3>{{product.title}}</h3>
              <img :src='product.image' alt="">
              <p class="price">Price: ${{product.price}}</p>
            </div>
            <button class="btn add" @click="addToCart(product)">В корзину</button>
            
            
        </li>
    </ul>
    <div id="page-block">
            <button v-bind:disabled = "isFirst" @click="toFirstPage" class="btn">На первую</button>
            <button v-bind:disabled = "isFirst" @click="previousPage" class="btn">Предыдущая</button>
            <span>{{currentPage}}/{{totalPages}}</span>
            <button v-bind:disabled = "isLast" @click="nextPage" class="btn">Следующая</button>
            <button v-bind:disabled = "isLast" @click="toLastPage" class="btn">На последнюю</button>
    </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import { mapActions, mapGetters } from "vuex";
import _ from 'lodash';

Vue.use(VueAxios, axios)

export default {
    data() {
        return {
            currentPage: 1,
            search: '',
            searchResult: [],
            isPageLast: false,
            isPageFirst: true,
            showCard: false,
            singleCard: {
              title: '',
              description: '',
              imgUrl: '',
              price: '',
              id: '',
            }
        }
    },
   
  computed: {
    ...mapGetters(["products", "error"]),
    productsShow() {
      if (this.search !== '') {
        console.log(_.chunk(this.searchResult, 4))
        return _.chunk(this.searchResult, 4);
      }
         return _.chunk(this.products, 4);
      },

      isLast() {
        if (this.currentPage == Math.floor(this.products.length/4) ) {
          return true;
        }
        return false;
      },
      isFirst() {
        if(this.currentPage == 1) {
          return true;
        }
        return false;
      },
      totalPages() {
        return this.productsShow.length;
      }
    //   
  },
  methods: {
    ...mapActions(["getProducts", "addToCart", "showId", "pushItemToCart"]),
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    },
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    },
    toFirstPage() {
        this.currentPage = 1;
    },
    toLastPage() {
        this.currentPage = this.totalPages;
    },
    searchItems() {
      console.log(this.search, this.products);
      let goal = this.search;
      if(this.search !== '') {
        this.searchResult = this.products.filter(item => {
        return item.title.toLowerCase().match(goal);
      });
      }
    },
    showSingleProduct(product) {
      this.showId(product)
      .then(result => {
        let target = this.products.find(item => item.id == product.id);
        console.log(result)
        this.singleCard.title = target.title;
        this.singleCard.description = target.description;
        this.singleCard.imgUrl = target.image;
        this.singleCard.price = target.price;
        this.singleCard.id = target.id;
      });
      this.showCard = true;
      
      
    },
    closeSingleProduct() {
      this.showCard = false;
      this.singleCard.title = '';
      this.singleCard.description = '';
      this.singleCard.imgUrl = '';
      this.singleCard.price = '';
      this.singleCard.id = '';
    }
  },
  created() {
    this.getProducts();
  },
}
</script>

<style scope>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro&display=swap');
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


.singleProductCard img{
  width: 150px;
  height: 150px;
},

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
  align-items: center;
    background-color: #005bff;
    border-radius: 6px;
    box-sizing: border-box;
    color: #fff;
    display: inline-flex;
    font-family: 'Be Vietnam Pro', sans-serif;
    font-size: 20px;
    font-weight: 600;
    justify-content: center;
    line-height: 18px;
    min-height: 40px;
    min-width: 120px;
    padding: 0 12px;
    text-align: center;
    margin: 0 10px;
}

.btn:hover {
  cursor: pointer;
  background-color: #0b43a9;
}

.price {
  font-family: 'Be Vietnam Pro', sans-serif;
  font-style: normal;
  letter-spacing: normal;
  text-decoration: none;
  text-transform: none;
  word-spacing: normal;
  font-weight: 800;
  font-size: 20px;
}

.search {
  width: 50%;
  height: 35px;
  border-radius: 10px;
  border: 1px solid #0b43a9;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-style: normal;
  letter-spacing: normal;
  text-decoration: none;
  text-transform: none;
  word-spacing: normal;
  font-weight: 600;
  font-size: 20px;
  padding: 10px;
}
input:focus {

  border-radius: 10px;
  border: 1px solid #0b43a9;
}

.singleProductCard__close {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 1em;
  /* transform: rotateZ(45deg) */
}

.singleProductCard__close:hover {
  opacity: 0.8;
  cursor: pointer;
}

</style>
