<script setup>
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import { axiosInstance } from "@/services/axios";
import Transaction from "@/components/Transaction.vue";
import Loader from "@/components/Loader.vue";

const title = ref("");
const price = ref(0);
const isExpense = ref(false);

const transactions = ref([]);
const isLoading = ref(false);
const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

async function fetchTransactions() {
  try {
    isLoading.value = true;
    const { data } = await axiosInstance.get("/transaction", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    transactions.value = data;
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

async function addTransaction() {
  try {
    isLoading.value = true;
    console.log(isExpense.value);
    await axiosInstance.post(
      "/transaction",
      {
        type: isExpense ? "expense" : "income",
        title: title.value,
        amount: +price.value,
        date: new Date().toISOString()
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    await fetchTransactions();
    title.value = "";
    price.value = 0;
    isExpense.value = false;
    isModalOpen.value = false;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchTransactions();
});

const groupedTransactions = computed(() => {
  const groups = {};
  transactions.value.forEach((item) => {
    const date = new Date(item.date);
    const key = date.toISOString().split("T")[0];

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);
  });

  return Object.entries(groups).sort((a, b) => new Date(b[0]) - new Date(a[0]));
});

const totalIncome = computed(() =>
  transactions.value
    .filter((t) => t.type === "income")
    .reduce((sum, tr) => sum + +tr.amount, 0)
);

const totalExpense = computed(() =>
  transactions.value
    .filter((t) => t.type === "expense")
    .reduce((sum, tr) => sum + +tr.amount, 0)
);
</script>

<template>
  <Loader v-if="isLoading" />
  <div class="modal" v-if="isModalOpen" @click.self="closeModal">
    <div class="modal-container">
      <form class="form" @submit.prevent="addTransaction">
        <h2 class="form-title">Добавить транзакцию</h2>
        <label class="checkbox">
          <input type="checkbox" v-model="isExpense" />
          Это расход?
        </label>
        <input
          type="text"
          v-model="title"
          class="input"
          placeholder="Название"
        />
        <input
          type="number"
          v-model.number="price"
          class="input"
          placeholder="Сумма"
        />
        <input type="submit" value="Добавить" class="submit" />
      </form>
    </div>
  </div>
  <div class="header">
    <h1 class="title">Мои транзакции</h1>
    <button class="add" @click="openModal">
      <Icon icon="mdi:pen-add" />Добавить транзакцию
    </button>
  </div>

  <div class="total">
    За этот месяц:
    <span class="total-income">заработано {{ totalIncome }}₸</span> и
    <span class="total-expense">потрачено {{ totalExpense }}₸</span>
  </div>

  <div class="transactions">
    <div
      class="transactions-item"
      v-for="[date, trs] in groupedTransactions"
      :key="date"
    >
      <h3 class="transactions-date">
        {{
          new Date(date).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "long",
            year: "2-digit"
          })
        }}
      </h3>
      <div>
        <Transaction
          v-for="tr in trs"
          :key="tr.id"
          :title="tr.title"
          :price="tr.amount"
          :is-expense="tr.type === 'expense'"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
.add {
  padding: 8px 16px;
  border: 2px solid var(--green);
  border-radius: 8px;
  background: var(--green);
  color: var(--white);
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  transition: 0.3s ease;
}
.add svg {
  font-size: 18px;
}
.add:hover {
  cursor: pointer;
  background: var(--white);
  color: var(--green);
}
.form {
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
.transactions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px 40px;
}

.transactions-date {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}
.modal {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  padding: 24px 40px;
  background: var(--white);
  width: 800px;
  border-radius: 24px;
}
.total {
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 40px;
}
.total-income {
  color: var(--green);
  font-weight: 600;
}
.total-expense {
  color: var(--red);
  font-weight: 600;
}
</style>
