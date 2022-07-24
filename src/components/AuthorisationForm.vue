<template>
  <div class="container">
    <div v-if='authorisation' class="authorisation">
      <p class="authorisation__header">Авторизация</p>
      <input class="authorisation__login" type="text" placeholder="Логин">
      <input class="authorisation__paswd" type="password" placeholder="Пароль">
      <button class="btn authorisation__forget">Забыли пароль?</button>
      <button @click='authorise' :class="{active:authorisation}" class="btn authorisation__submit">Войти</button>
      <button @click='reg' :class="{active:registration}" class="btn authorisation__reg">Регистрация</button>
    </div>

    <div v-if='registration' class="registration">
      <input class="regForm" v-model="name" type="text" placeholder="Введите имя">
      <input class="regForm" v-model="lastName" type="text" placeholder="Введите фамилию">
      <input class="regForm" v-model="email" type="email" placeholder="Введите свой email">
      <input class="regForm" v-model="tel" type="tel" placeholder="Введите свой телефон">
      <button @click="validate" :class="{active:registration}" class="btn registration__createAcc">Создать аккаунт</button>
      <button @click='autho' class="btn authorisation__submit">Авторизация</button>
      </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        authorisation: true,
        registration: false,
        name: '',
        lastName: '',
        email: '',
        tel: ''
      }
    },
    methods: {
      reg() {
        this.registration = true;
        this.authorisation = false;
      },
      autho() {
        this.registration = false;
        this.authorisation = true;
      },
      validate() {
        if(this.name.match(/^\S[a-zа-я0-9_]+/i) &&
         this.lastName.match(/^\S[a-zа-я0-9_]+/i) &&
         this.tel.match(/^\+?[78][-\\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/) &&
         this.email.match(/.+@.+\..+/i)) {alert('Регистрация прошла успешно')
         } else {
          alert('Данные введены неверно')
         }
      },
      authorise() {
        alert('сервер не отвечает, попробуйте войти позже')
        }
    }
}
</script>

<style scoped>
@media screen and (min-width: 360px) {
  .container {
    display: flex;
    justify-content: center;
  }
  .authorisation, .registration {
    width: 340px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .authorisation__header {
    font-size: 24px;
  }

  .authorisation .authorisation__login, .authorisation__paswd, .authorisation__forget, .authorisation__submit, .authorisation__reg, .regForm,.registration__createAcc {
    height: 40px;
    width: 250px;
    margin: 20px 0;
    font-size: 22px;
    border-radius: 5px;
  }
  .authorisation__forget {
    border: none;
    font-style: italic;
    background: white;
  }
  .authorisation__submit, .authorisation__reg, .registration__createAcc {
    background: rgb(14, 81, 239);
    color: white;
    border: none;
  }

  .authorisation__submit:active, .authorisation__reg:active, .registration__createAcc:active {
    opacity: 0.8;
  }

  
}


@media screen and (min-width: 768px) {
 .container {
    display: flex;
    justify-content: center;
  }
  .authorisation, .registration {
    width: 340px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .authorisation__header {
    font-size: 24px;
  }

  .authorisation .authorisation__login, .authorisation__paswd, .authorisation__forget, .authorisation__submit, .authorisation__reg, .regForm,.registration__createAcc {
    height: 50px;
    width: 450px;
    margin: 20px 0;
    font-size: 22px;
    border-radius: 5px;
  }
  .authorisation__forget {
    border: none;
    font-style: italic;
    background: rgb(220, 217, 217);
  }
  .authorisation__submit, .authorisation__reg, .registration__createAcc {
    background: rgb(14, 81, 239);
    color: white;
    border: none;
  }

  .authorisation__submit:active, .authorisation__reg:active, .registration__createAcc:active {
    opacity: 0.8;
  }
}

</style>

