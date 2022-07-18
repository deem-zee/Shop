<template>
    <nav>
        <ul>
            <li><router-link to="/" exact>Товары</router-link></li>
            <li><router-link to="/cart" exact> <img class="cartImg" >Корзина</router-link></li>
            <li><router-link to="/autho" exact>Войти</router-link></li>
        </ul>
    </nav>
</template>

<script>


export default ({
   
})
</script>

<style scoped>

@media screen and (min-width: 340px) {
ul{
    list-style-type: none;
    text-align: center;
    margin: 0;
    display: flex;
    justify-content: space-between;
}
li{
    display: inline-block;
    margin: 0 10px;
}
a{
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
    font-size: 20px;
}
nav{
    background: #444;
    padding: 14px 0;
    margin-bottom: 40px;
    position: sticky;
    top: 0;
    z-index: 1;
}
.router-link-active{
    background: #eee;
    color: #444;
}
}

@media screen and (min-width: 768px) {
  ul{
    list-style-type: none;
    text-align: center;
    margin: 0;
    display: flex;
    justify-content: space-between;
}
li{
    display: inline-block;
    margin: 0 10px;
}
a{
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
    font-size: 26px;
}
nav{
    background: #444;
    padding: 14px 0;
    margin: 0 auto;
    /* margin-bottom: 40px; */
    position: sticky;
    top: 0;
    width: 750px;
}
.router-link-active{
    background: #eee;
    color: #444;
}  
}




</style>