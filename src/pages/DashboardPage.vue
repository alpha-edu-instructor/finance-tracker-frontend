<script setup>
import { ref } from "vue";

const title = ref("");
const price = ref(0);
const isExpense = ref(false);
</script>

<template>
  <h1 class="title">Мои транзакции</h1>
  <form class="form">
    <h2 class="form-title">Добавить транзакцию</h2>
    <label class="checkbox">
      <input type="checkbox" :v-model="isExpense" />
      Это расход?
    </label>
    <input type="text" :v-model="title" class="input" placeholder="Название" />
    <input type="number" :v-model="price" class="input" placeholder="Сумма" />
    <input type="submit" value="Добавить" class="submit" />
  </form>
</template>

<style scoped>
.form {
  padding: 16px 24px;
  border: 1px solid var(--border);
  border-radius: 16px;
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.form-title {
  text-align: center;
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  margin-bottom: 12px;
}
.checkbox {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
}
.checkbox input {
  width: 24px;
  height: 24px;
  accent-color: var(--green);
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
</style>
