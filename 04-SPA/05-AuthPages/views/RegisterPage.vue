<template>
  <form @submit.prevent="submitForm" class="form">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model="user.email" type="email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input v-model="user.fullName" type="text" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="user.password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input v-model="user.passwordConfirmation" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"
        ><input v-model="user.agreement" type="checkbox" /> Я согласен с
        условиями <span></span
      ></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт? <router-link to="/login">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

const errorTypes = {
  invalidPassword: 'Требуется ввести пароль',
  invalidEmail: 'Требуется ввести Email',
  invalidFullName: 'Требуется ввести полное имя',
  invalidPasswordsComparison: 'Пароли не совпадают',
  invalidAgreement: 'Требуется согласиться с условиями',
};

export default {
  name: 'RegisterPage',

  data() {
    return {
      user: {
        password: '',
        email: '',
        fullName: '',
        passwordConfirmation: '',
        agreement: false,
      },
      error_message: null,
    };
  },

  computed: {
    errorMessage() {
      if (!this.user.email) {
        return errorTypes['invalidEmail'];
      } else if (!this.user.fullName) {
        return errorTypes['invalidFullName'];
      } else if (!this.user.password) {
        return errorTypes['invalidPassword'];
      } else if (this.user.password !== this.user.passwordConfirmation) {
        return errorTypes['invalidPasswordsComparison'];
      } else if (!this.user.agreement) {
        return errorTypes['invalidAgreement'];
      } else {
        return '';
      }
    },
  },

  methods: {
    submitForm() {
      if (this.errorMessage.length < 1) {
        this.registerUser();
      } else {
        alert(this.errorMessage);
      }
    },

    registerUser() {
      register(this.user.email, this.user.fullName, this.user.password).then(
        (data) => {
          if (data.id !== undefined) {
            alert(data.id);
          } else {
            alert(data.message);
          }
        },
      );
    },
  },
};
</script>

<style scoped></style>
