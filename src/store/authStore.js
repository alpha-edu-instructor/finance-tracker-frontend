import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "@/services/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: null
  }),
  getters: {
    isAuth: (state) => {
      if (!state.token) {
        return false;
      }
      try {
        const decoded = jwtDecode(state.token);
        const expires = decoded.exp;
        const current = Math.round(Date.now() / 1000);
        console.log("Exp:" + expires);
        console.log("Now:" + current);
        return expires > current;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    logout() {
      this.token = "";
      this.user - null;
      localStorage.removeItem("token");
    },
    async fetchUserData() {
      try {
        const { data } = await axiosInstance.get("/user/me", {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.user = data;
      } catch (error) {
        console.log(error);
      }
    }
  }
});
