<template>
  <div class="productListTemplate">
    <!-- Блок выбранного товара с подробным описанием товара -->
    <div v-if="showCard" class="singleProductCard">
      <div class="singleProductCard__product">
        <img :src="`${singleCard.imgUrl}`" alt="" class="singleProductCard__img">
        <div class="singleProductCard__text">
          <h2>{{singleCard.title}}</h2>
          <p>{{singleCard.description}}</p>
          <p class="singleProductCard__price">Цена: ${{singleCard.price}}</p>
        </div>
      </div>
      <button class="btn addBtn singleProductCard__add" @click="addToCart(singleCard)">В корзину</button>
      <button @click="closeSingleProduct" class="singleProductCard__close">x</button>
    </div>
    <!-- Блок всех товаров -->
    <input type="text" v-model="search" @keyup="searchItems" class="search" placeholder="Искать" >
    <div class="productListContainer" :class="{blur: showCard}">
      <ul v-if="search !== ''" class="container">
        <li v-for="product of productsShow[this.currentPage - 1]" :key="product.id" class="productListContainer__products">
          <div @click="showSingleProduct(product)">
            <h3>{{product.title}}</h3>
            <img :src='product.image' alt="">
            <p class="price">Price: ${{product.price}}</p>
          </div>
            <button class="btn addBtn" @click="addToCart(product)">В корзину</button>
        </li>
    </ul>
    <!-- Выдача резульатов поиска -->
    <ul  v-if="search == ''" class="container">
        <li  v-for="product in productsShow[this.currentPage - 1]" :key="product.id" class="productListContainer__products">
            <div @click="showSingleProduct(product)">
              <h3>{{product.title}}</h3>
              <img :src='product.image' alt="">
              <p class="price">Цена: ${{product.price}}</p>
            </div>
            <button class="btn addBtn" @click="addToCart(product)">В корзину</button>
            
            
        </li>
    </ul>
    <!-- переключение страниц -->
    <div class="page-block">
            <button v-bind:disabled = "isFirst" @click="toFirstPage" class="btnFirst">На первую</button>
            <button v-bind:disabled = "isFirst" @click="previousPage" class="btnPrev">Предыдущая</button>
            <span>{{currentPage}}/{{totalPages}}</span>
            <button v-bind:disabled = "isLast" @click="nextPage" class="btnFwd">Следующая</button>
            <button v-bind:disabled = "isLast" @click="toLastPage" class="btnLast">На последнюю</button>
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
      if (this.showCard == true) {
        this.showCard = false;
        this.singleCard.title = '';
        this.singleCard.description = '';
        this.singleCard.imgUrl = '';
        this.singleCard.price = '';
        this.singleCard.id = '';
      }
      
    }
  },
  created() {
    this.getProducts();
  },
}
</script>

<style scope>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro&family=Comfortaa:wght@300;400;500;600&family=Inter&family=Noto+Sans+Display&family=Roboto:ital,wght@0,300;0,400;1,100&family=Ubuntu:wght@300&display=swap');
@media screen and (min-width: 340px) {
  .productListTemplate {
    width: 340px;
    background: rgb(177, 174, 174);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    margin: 0 auto;

  }

  .singleProductCard {
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    width: 90%;
    z-index: 1;
    background: white;
    padding: 10px 0;
    font-family: 'Roboto', sans-serif;
    margin: 0 auto;
    
  }

  .singleProductCard__img {
    width: 200px;
    height: 200px;
  } 

  .singleProductCard__price {
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
  }
  .singleProductCard__close {
    width:30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    font-size: 20px;
    position: absolute;
    top: 5px;
    left: 88%;
  }
  .container {
    margin: 0 auto;
    padding: 0; 
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
  }

  .productListContainer {
    width: 340px;
    background: rgb(177, 174, 174);
    margin: 10px auto;
  }

  .productListContainer img {
    width: 200px;
    height: 200px;
  }
  .productListContainer__products {
  background: white;
  margin: 0 auto;
  list-style: none;
  width: 320px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  margin: 10px auto;
  padding: 10px;
  box-sizing: border-box;

}

.price {
  font-weight: 600;
}

.addBtn {
  width: 150px;
  height: 40px;
  background: rgb(85, 235, 118);
  border: none;
  border-radius: 8px;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  margin: 0 auto;
}

.addBtn:active {
  opacity: 0.4;
  
}
.search {
  height: 50px;
  font-size: 24px;
  font-family: 'Roboto', sans-serif;
}

.page-block {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  background: white;
  width: 93%;
  margin: 0 auto;
  padding: 10px 0;
  font-family: 'Roboto', sans-serif;
}

.page-block span {
  position: relative;
  top: 25px;
  background: white;
  font-family: 'Roboto', sans-serif;
  order: 2;
  margin: 2px 4px;
  font-size: 20px;
  font-weight: 600;
}

.page-block button {
  margin: 2px 4px;
  width: 100px;
  height: 40px;
  font-family: 'Roboto', sans-serif;
  border-radius: 5px;
  border: none;
  font-size: 16px;
}

.btnPrev {
  order: 1;
}

.btnFwd {
  order: 3;
}

.btnFirst {
  order: 4;
}

.btnLast {
  order: 5;
  margin: 2px 4px;
}

.blur {
  filter: blur(5px);
}

}



</style>
