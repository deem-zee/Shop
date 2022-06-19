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
        errorStatus:  null

    },

    getters: {
        products(state) {
            return state.products;
        },
        error(state) {
            return state.errorStatus
        }
    },

    actions: {
        getProducts(context){
            Vue.axios.get('https://fakestoreapi.com/products')
           .then((response) => {
               console.log(response.data)
                context.commit("setProducts", response.data)
              })
            .catch(err => {
                if(err.response) {
                    // console.log(err.response.data);
                    console.log(err.response.status);
                    context.commit("getError", err.response.status)
                }
                //     console.log(err.response.headers);
                // } else if (err.request) {
                //     console.log(err.request);
                // } else {
                //     console.log('Error', err.message);
                // }
                // console.log(err.config);
            }) 
        },

        addToCart(context, product) {
            const cartItem = context.state.cart.find(item => item.id === product.id);
            console.log(cartItem);
            context.commit('pushProductToCart', product.id);
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
                quantity: 1
            })
        },
    }

 })