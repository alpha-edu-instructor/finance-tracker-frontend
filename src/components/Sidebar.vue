<script setup>
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import {
  LOGIN_PAGE_ROUTE,
  DASHBOARD_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE
} from "@/router/routes.js";
import { useAuthStore } from "@/store/authStore";
import logo from "@/assets/logo.svg";

const authStore = useAuthStore();
const router = useRouter();

function logout() {
  authStore.logout();
  router.push(LOGIN_PAGE_ROUTE);
}
</script>

<template>
  <header class="sidebar">
    <nav class="sidebar-container">
      <div class="sidebar-part">
        <div class="sidebar-logo">
          <img :src="logo" alt="Logo" height="40" />
          <h4>FinanceTrackerApp</h4>
        </div>
        <div class="sidebar-links">
          <router-link :to="DASHBOARD_PAGE_ROUTE" class="sidebar-link">
            <Icon icon="mage:dashboard-check-fill" />Мои транзакции
          </router-link>
          <router-link :to="PROFILE_PAGE_ROUTE" class="sidebar-link">
            <Icon icon="bxs:user" />Мой профиль</router-link
          >
        </div>
      </div>
      <div class="sidebar-part">
        <button class="sidebar-link logout" @click="logout">
          <Icon icon="material-symbols:logout-rounded" />Выйти
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.sidebar {
  height: 100vh;
  padding: 40px 0;
  border-right: 1px solid var(--border);
}
.sidebar-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 0 24px;
}
.sidebar-logo h4 {
  font-weight: 700;
  font-size: 20px;
}
.sidebar-links {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
}
.sidebar-link {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 14px;
  width: 100%;
  text-align: left;
  background: var(--white);
  padding: 12px 24px;
  font-weight: 500;
  font-size: 16px;
  color: var(--black);
  transition: 0.2s ease;
}
.sidebar-link:hover {
  cursor: pointer;
  background: #f5f5f5;
  color: var(--green);
}
.sidebar-link svg {
  font-size: 24px;
}
.sidebar-part:last-child {
  width: 100%;
}
.logout:hover {
  color: var(--red);
}
</style>
