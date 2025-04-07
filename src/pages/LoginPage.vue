<script setup>
import { REGISTER_PAGE_ROUTE } from "@/router/routes.js";
</script>

<template>
  <form class="form">
    <h1 class="title form-title">Вход</h1>
    <input type="text" placeholder="Ваш email" class="input" />
    <input type="password" placeholder="Ваш пароль" class="input" />
    <input type="submit" value="Войти" class="submit" />
    <p class="link">
      Нет аккаунта?
      <router-link :to="REGISTER_PAGE_ROUTE">Регистрация</router-link>
    </p>
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
</style>
