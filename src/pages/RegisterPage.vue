<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { LOGIN_PAGE_ROUTE } from "@/router/routes.js";
import { axiosInstance } from "@/services/axios";
import Loader from "@/components/Loader.vue";

const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

async function handleRegister() {
  try {
    errorMessage.value = "";
    isLoading.value = true;
    await axiosInstance.post("/auth/register", {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    });
    router.push(LOGIN_PAGE_ROUTE);
  } catch (error) {
    console.log(error);
    errorMessage.value = error.response.data.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <Loader v-if="isLoading" />
  <form class="form" @submit.prevent="handleRegister">
    <h1 class="title form-title">Регистрация</h1>
    <input
      type="text"
      placeholder="Ваше имя"
      class="input"
      v-model="firstName"
    />
    <input
      type="text"
      placeholder="Ваша фамилия"
      class="input"
      v-model="lastName"
    />
    <input type="text" placeholder="Ваш e-mail" class="input" v-model="email" />
    <input
      type="password"
      placeholder="Ваш пароль"
      class="input"
      v-model="password"
    />
    <input type="submit" value="Регистрация" class="submit" />
    <p class="link">
      Уже есть аккаунт?
      <router-link :to="LOGIN_PAGE_ROUTE">Вход</router-link>
    </p>
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>

<style scoped>
.form {
  padding: 32px 24px;
  border: 1px solid var(--border);
  border-radius: 24px;
  width: 600px;
  background: var(--white);
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.form-title {
  text-align: center;
}
.input {
  padding: 8px 16px;
  outline: 2px solid var(--green);
  border-radius: 8px;
  width: 100%;
}
.submit {
  padding: 8px 16px;
  border: 2px solid var(--green);
  border-radius: 8px;
  background: var(--green);
  color: var(--white);
  font-weight: 700;
  transition: 0.3s ease;
}
.submit:hover {
  cursor: pointer;
  background: var(--white);
  color: var(--green);
}
.link {
  font-size: 14px;
}
.link a {
  font-weight: 700;
  color: var(--green);
}
.error {
  color: var(--red);
  font-size: 14px;
}
</style>
