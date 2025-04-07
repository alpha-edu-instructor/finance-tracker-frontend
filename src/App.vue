<script setup>
import { onMounted } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import { useAuthStore } from "./store/authStore";

const authStore = useAuthStore();

onMounted(async () => {
  if (!authStore.isAuth) {
    authStore.logout();
  } else {
    await authStore.fetchUserData();
  }
});
</script>

<template>
  <div class="layout" v-if="authStore.isAuth">
    <Sidebar />
    <div class="main">
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>

  <div class="container" v-else>
    <router-view></router-view>
  </div>
</template>

<style>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg);
}
.layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
}
.main {
  width: 100%;
  height: 100%;
  padding: 48px 64px;
  display: flex;
  flex-direction: column;
  background: var(--bg);
}
.wrapper {
  padding: 40px 36px;
  border: 1px solid var(--border);
  border-radius: 24px;
  background: var(--white);
  overflow-y: scroll;
  flex: 1;
}
.wrapper::-webkit-scrollbar {
  display: none;
}
</style>
