<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<!-- <template>
  <div class="container">
    <router-view></router-view>
  </div>
</template> -->

<template>
  <div class="layout">
    <Sidebar />
    <div class="main">
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
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
