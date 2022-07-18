<template>
  <div class="container">
    <h1>Ваша корзина:</h1>
    <p class="empty emptyShoppingCart" v-if="cartProducts.length == 0">Ваша корзина пока пуста</p>
    <div v-if="clear" class="clearCart">
        <p>Вы действительно хотите удалить все товары из корзины?</p>
        <button @click="cancelClearCart" class="clearCart_cansel">Нет</button>
        <button @click="multiClick" class="clearCart_confirm">Да</button>
    </div>
          
       <div class="ShoppingCartContainer" :class="{ShoppingCartList__Blur: isBlur}"> 
        <ul>
            <li v-for="(product, index) in cartProducts" :key="index">
                <div class="ShoppingCartList">
                <div class="ShoppingCartList__ProductImg"><img :src="product.img" alt=""></div>
                
                <div class="ShoppingCartList__TextBlock">
                <h2 class="prodTitle">{{product.title}}</h2>
                <p class="prodDescription">{{product.description}}</p>
                
                <div class="ShoppingCartList__PriceBlock">
                    <p>Цена: ${{product.price * product.quantity}}</p>
                    <div>
                        <button @click="decrementItem(product)" class="ShoppingCartList__PriceBlock__QuantityBtn">-</button>
                        кол-во: {{product.quantity}} шт.<button @click="addToCart(product)" class="ShoppingCartList__PriceBlock__QuantityBtn">+</button>
                    </div>
                    <button @click="deleteFromCart(product)" class="ShoppingCartList__PriceBlock__del"></button>
                </div>

                </div>
                </div>
            </li>
        </ul>
      
      
        <div v-if="cartProducts.length != 0" class="ShoppingCartCheckout">
            <button v-if="cart.length != 0" @click="clearAll" class="ShoppingCartCheckout__clearCart">Очистить корзину</button>
            <hr>
            <p>К оплате: ${{getTotal}}</p>
            <router-link to="/autho"><button class="ShoppingCartCheckout__Buy" v-if="cartProducts.length > 0">Оформить заказ</button></router-link>
        </div>
      </div>
    </div>

    
 
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"

export default {
    data() {
        return {
            clear: false,
            isBlur: false,
        }
    },
    computed: {
        ...mapState(["cart"]),
        ...mapGetters(["cartProducts", "getTotal"]),
        
      
    },
    methods: {
        ...mapActions(["clearCart", "addToCart", "deleteFromCart", "addItemQuantity", "decrementItem"]),
        multiClick() {
            this.clearCart()
            this.cancelClearCart()
        },
        clearAll() {
            this.clear = true;
            this.isBlur = true;
        },
        cancelClearCart() {
            this.clear = false;
            this.isBlur = false;
        }
    }

    
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro&display=swap');
    
    @media screen and (min-width: 360px) {
        .container {
            display:flex;
            flex-direction: column;
            justify-content: center;
            width: 340px;
            margin: 0 auto;
            box-sizing: border-box;
            /* background: grey; */
            
        }
        .ShoppingCartContainer ul {
            padding: 0 5px;

        }

        .ShoppingCartContainer li {
            list-style:  none;
            margin: 15px 0;
            background: white;
            padding:10px 0;
        }

       .ShoppingCartList {
        display: flex;
        flex-direction: column;
        justify-content: center;
       }
        .ShoppingCartList__ProductImg img{
            width: 200px;
            height: 200px;
        }
        .ShoppingCartList__PriceBlock__QuantityBtn {
            height: 25px;
            width: 25px;
            border-radius: 50%;
            border: none;
            text-align: center;
            margin: 0 10px;
            font-size: 18px;
            font-weight: 600;
        }
        
        .ShoppingCartList__PriceBlock__QuantityBtn:active {
            opacity: 0.8;
        }
        .ShoppingCartList__PriceBlock__del {
        width: 30px;
        height: 30px;
        border: none;
        border-radius: 5px;
        background-image: url('https://img.icons8.com/wired/344/trash.png');
        background-repeat: no-repeat;
        background-size: contain;
        position: relative;
        top: -30px;
        left: 120px;
        
    }
    
    .ShoppingCartList__PriceBlock p {
        font-weight: bold;
    }

     .ShoppingCartCheckout {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: white;
        padding-bottom: 20px;
    }
  .ShoppingCartCheckout__clearCart {
        order: 4;
        width: 160px;
        height: 40px;
        background: rgb(230, 95, 95);
        color: white;
        border: none;
        border-radius: 15px;
        margin: 10px 0;
        align-self: center;
        font-size: 18px;
        padding: 5px 0;
    }
    .ShoppingCartCheckout__clearCart:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    .ShoppingCartCheckout__Buy {
        background: rgb(85, 235, 118);
        color: white;
        width: 160px;
        height: 40px;
        border: none;
        border-radius: 15px;
        font-size: 18px;
        padding: 5px 0;
        
        
    }
    .ShoppingCartCheckout__Buy:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    .ShoppingCartList__Blur {
        filter: blur(5px);
    }

    .clearCart {
        position: fixed;
        top: 50%;
        width: 300px;
        height: 300px;
        background: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5em;
        color: #000;
        z-index: 1;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .clearCart_confirm {
        background: rgb(230, 95, 95);
        color: white;
        width: 150px;
        height: 30px;
        margin: 10px 0;
        border-radius: 10px;
        font-size: 20px;
        border: none;
    }
    .clearCart_cansel {
        background: rgb(85, 235, 118);
        color: white;
        width: 150px;
        height: 30px;
        margin: 10px 0;
        border-radius: 10px;
        font-size: 20px;
        border: none;
    }
    
    }

/* screen min-width 768 */
    
    @media screen and (min-width: 768px) {
        .container {
            display:flex;
            flex-direction: column;
            justify-content: center;
            width: 760px;
            margin:auto;
            box-sizing: border-box;
            
        }

        .container > h1 {
            margin: 0 auto;
            background: white;
            width: 750px;
        }
        .ShoppingCartContainer ul {
            padding: 0 5px;
            margin: 0;

        }

        .ShoppingCartContainer li {
            list-style:  none;
            background: white;
            padding: 10px 0;
        }
        .prodDescription {
            font-size: 24px;
            padding: 0 20px;
        }
       .ShoppingCartList {
        display: flex;
        flex-direction: column;
        justify-content: center;
       }
        .ShoppingCartList__ProductImg img{
            width: 200px;
            height: 200px;
        }
        .ShoppingCartList__PriceBlock__QuantityBtn {
            height: 25px;
            width: 25px;
            border-radius: 50%;
            border: none;
            text-align: center;
            margin: 0 10px;
            font-size: 18px;
            font-weight: 600;
            transform: scale(1.5)
        }

        .ShoppingCartList__PriceBlock__QuantityBtn:hover {
            cursor: pointer;
        }
        
        .ShoppingCartList__PriceBlock__QuantityBtn:active {
            opacity: 0.8;
        }
        .ShoppingCartList__PriceBlock__del {
        width: 30px;
        height: 30px;
        border: none;
        border-radius: 5px;
        background-image: url('https://img.icons8.com/wired/344/trash.png');
        background-repeat: no-repeat;
        background-size: contain;
        position: relative;
        top: -30px;
        left: 120px;
        
    }
    
    .ShoppingCartList__PriceBlock p {
        font-weight: bold;
        font-size: 26px;;
    }

     .ShoppingCartCheckout {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: white;
        width: 750px;
        margin: 0 auto;
        padding-bottom: 20px;
    }
    .ShoppingCartCheckout__clearCart {
        order: 4;
        width: 160px;
        height: 40px;
        background: rgb(230, 95, 95);
        color: white;
        border: none;
        border-radius: 15px;
        margin: 10px 0;
        align-self: center;
        font-size: 18px;
        padding: 5px 0;
    }
    .ShoppingCartCheckout__clearCart:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    .ShoppingCartCheckout__Buy {
        background: rgb(85, 235, 118);
        color: white;
        width: 160px;
        height: 40px;
        border: none;
        border-radius: 15px;
        font-size: 18px;
        padding: 5px 0;
        
        
    }
    .ShoppingCartCheckout__Buy:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    .ShoppingCartCheckout p {
        font-size: 34px;
    }
    .ShoppingCartList__Blur {
        filter: blur(5px);
    }

    .clearCart {
        position: fixed;
        top: 50%;
        width: 300px;
        height: 300px;
        background: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5em;
        color: #000;
        z-index: 1;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .clearCart_confirm {
        background: rgb(230, 95, 95);
        color: white;
        width: 150px;
        height: 30px;
        margin: 10px 0;
        border-radius: 10px;
        font-size: 20px;
        border: none;
    }
    .clearCart_cansel {
        background: rgb(85, 235, 118);
        color: white;
        width: 150px;
        height: 30px;
        margin: 10px 0;
        border-radius: 10px;
        font-size: 20px;
        border: none;
    }
    
    .emptyShoppingCart {
        font-size: 40px;
        background: white;
        width: 750px;
        margin: 0 auto;
        padding: 50px 0;
    }

    }
     

</style>