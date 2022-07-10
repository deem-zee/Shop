import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

export const store = new Vuex.Store({
     state: {
        products: [],
        cart: [],
        error: false,
        errorStatus:  null,
        total: 0,

    },

    getters: {
        products(state) {
            return state.products;
        },
        error(state) {
            return state.errorStatus;
        },
        cartProducts(state) {
            return state.cart.map(cartItem => { 
                const product = state.products.find(product =>  product.id === cartItem.id)
                   
                    return {
                        title: product.title,
                        price: product.price,
                        description: product.description,
                        quantity: cartItem.quantity
                    }

            })
        },
    },

    actions: {
        getProducts(context){
            Vue.axios.get('https://fakestoreapi.com/products')
           .then((response) => {
                context.commit("setProducts", response.data)
              })
            .catch(err => {
                if(err.response) {

                    console.log(err.response.status);
                    context.commit("getError", err.response.status)
                }
            }) 
        },

        addToCart(context, product) {
            const cartItem = context.state.cart.find(item => item.id === product.id);
            if (!cartItem) {
                context.commit('pushProductToCart', product.id)
               } else {
                context.commit('incrementItemQuantity', cartItem)
               }
               context.commit('decrementProductInventory', product)
        },
        clearCart(context) {
            context.commit('deleteAllFromCart');
        }

    },

    mutations: {
        setProducts(state, products) {
            state.products = products
        },
        getError(state, status) {
            state.error = true;
            state.errorStatus = status;
        },
        pushProductToCart(state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1,
            })
        },
        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },

        decrementProductInventory(state, product) {
            product.inventory--
        },
        deleteAllFromCart(state) {
            state.cart = [];
        },

    }

 })