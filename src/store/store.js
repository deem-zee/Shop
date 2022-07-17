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
                        img: product.image,
                        quantity: cartItem.quantity,
                        id: cartItem.id
                    }

            })
        },
        getTotal(state) {
            let total = 0;
            (state.cart.map(cartItem => {
                const prod = state.products.find(product => product.id === cartItem.id)
                return total += prod.price * cartItem.quantity;
            }));

            return  total;
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
            console.log(product)
            const cartItem = context.state.cart.find(item => item.id === product.id);
            if (!cartItem) {
                context.commit('pushProductToCart', product.id)
               } else {
                context.commit('incrementItemQuantity', cartItem)
               }
        },
        clearCart(context) {
            context.commit('deleteAllFromCart');
        },
        deleteFromCart(context, product) {
            const cartItem = context.state.cart.find(item => (item.id === product.id));
            context.commit('deleteItemFromCart', cartItem)
        },
        addItemQuantity(context) {
            const cartItem = context.state.cart.find(item => (item.id));
            context.commit('incrementItemQuantity', cartItem)
        },
        decrementItem(context, product) {
            // const cartItem = context.state.cart.find(item => (item.id));
            // console.log(product.id)
            const cartItem = context.state.cart.find(item => item.id === product.id);
            context.commit('decrementItemQuantity', cartItem)
        },
        showId(context, product) {
            console.log('showID:', product)
            const singleItem = context.state.products.find(item =>(item.id))
            return singleItem;
        },
        // pushItemToCart(context, product) {
        //     const cartItem = context.state.cart.find(item => item.id === product.id);
        //     if (!cartItem) {
        //         context.commit('pushProductToCart', product.id)
        //        } else {
        //         context.commit('incrementItemQuantity', cartItem)
        //        }

              
        // }
        

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

        decrementItemQuantity(state, cartItem) {
            console.log(cartItem)
            if(cartItem.quantity > 1) {
               cartItem.quantity-- 
            }
            
        },
        deleteAllFromCart(state) {
            state.cart = [];
        },
        deleteItemFromCart(state, cartItem) {
            const index = state.cart.indexOf(cartItem);
            state.cart.splice(index, 1)
        }
    }

 })