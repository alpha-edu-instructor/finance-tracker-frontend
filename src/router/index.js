import { createWebHistory, createRouter } from "vue-router";
import { DASHBOARD_PAGE_ROUTE, LOGIN_PAGE_ROUTE, routes } from "./routes";
import { useAuthStore } from "@/store/authStore";

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isAuth && to.meta.requiresAuth) {
    next(LOGIN_PAGE_ROUTE);
  } else if (authStore.isAuth && to.meta.guestOnly) {
    next(DASHBOARD_PAGE_ROUTE);
  } else {
    next();
  }
});

export default router;
