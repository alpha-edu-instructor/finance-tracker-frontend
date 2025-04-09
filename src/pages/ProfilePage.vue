<script setup>
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();
</script>

<template>
  <h1>{{ authStore.user.first_name }} {{ authStore.user.last_name }}</h1>
</template>
