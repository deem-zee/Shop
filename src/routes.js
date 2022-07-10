import ProductsList from "./components/ProductsList"
import ShoppingCart from "./components/ShoppingCart"
import AuthorisationForm from "./components/AuthorisationForm"

export default [
    {path: '/', component: ProductsList},
    {path: '/cart', component: ShoppingCart},
    {path: '/autho', component: AuthorisationForm},
] 