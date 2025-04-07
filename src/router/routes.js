import DashboardPage from "@/pages/DashboardPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";

export const LOGIN_PAGE_ROUTE = "/login";
export const REGISTER_PAGE_ROUTE = "/register";
export const DASHBOARD_PAGE_ROUTE = "/dashboard";

export const routes = [
  {
    path: "/",
    redirect: DASHBOARD_PAGE_ROUTE
  },
  {
    path: LOGIN_PAGE_ROUTE,
    component: LoginPage
  },
  {
    path: REGISTER_PAGE_ROUTE,
    component: RegisterPage
  },
  {
    path: DASHBOARD_PAGE_ROUTE,
    component: DashboardPage
  }
];
