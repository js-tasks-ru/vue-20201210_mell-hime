<template>
  <form @submit.prevent="submitForm" class="form">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          v-model="user.email"
          type="email"
          placeholder="demo@email"
          class="form-control"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          v-model="user.password"
          type="password"
          placeholder="password"
          class="form-control"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта? <router-link to="/register">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

const errorTypes = {
  invalidPassword: 'Требуется ввести пароль',
  invalidEmail: 'Требуется ввести Email',
};

export default {
  name: 'LoginPage',

  data() {
    return {
      user: {},
      error_message: null,
    };
  },

  computed: {
    errorMessage() {
      if (!this.user.email) {
        return errorTypes['invalidEmail'];
      } else if (!this.user.password) {
        return errorTypes['invalidPassword'];
      } else {
        return '';
      }
    },
  },

  methods: {
    submitForm() {
      if (this.errorMessage.length < 1) {
        this.loginUser();
      } else {
        alert(this.errorMessage);
      }
    },

    loginUser() {
      login(this.user.email, this.user.password).then((data) => {
        if (data.id !== undefined) {
          alert(data.fullname);
        } else {
          alert(data.message);
        }
      });
    },
  },
};
</script>

<style scoped></style>
