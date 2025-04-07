import DashboardPage from "@/pages/DashboardPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";

export const LOGIN_PAGE_ROUTE = "/login";
export const REGISTER_PAGE_ROUTE = "/register";
export const DASHBOARD_PAGE_ROUTE = "/dashboard";

export const routes = [
  {
    path: "/",
    redirect: LOGIN_PAGE_ROUTE
  },
  {
    path: LOGIN_PAGE_ROUTE,
    component: LoginPage,
    meta: { guestOnly: true }
  },
  {
    path: REGISTER_PAGE_ROUTE,
    component: RegisterPage,
    meta: { guestOnly: true }
  },
  {
    path: DASHBOARD_PAGE_ROUTE,
    component: DashboardPage,
    meta: { requiresAuth: true }
  }
];
