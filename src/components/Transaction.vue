<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  title: String,
  price: Number,
  isExpense: Boolean
});
</script>

<template>
  <div class="item">
    <div class="part">
      <div class="icon">
        <Icon
          icon="streamline:graph-arrow-decrease"
          class="dec"
          v-if="isExpense"
        />
        <Icon icon="streamline:graph-arrow-increase" class="inc" v-else />
      </div>
      <h6 class="title">{{ title }}</h6>
    </div>
    <div class="part">
      <span class="price"> {{ price }}₸ </span>
    </div>
  </div>
</template>

<style scoped>
.item {
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item:not(:last-child) {
  margin-bottom: 24px;
}

.part:first-child {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
}

.icon svg {
  font-size: 24px;
}

.inc {
  color: var(--green);
}

.dec {
  color: var(--red);
}

.title {
  font-weight: 400;
  font-size: 16px;
}

.price {
  font-weight: 600;
  font-size: 18px;
}
</style>
