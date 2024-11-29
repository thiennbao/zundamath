import { createRouter, createWebHistory } from "vue-router";
import Cookies from "universal-cookie";
import HomeView from "../views/HomeView.vue";
import ChatView from "../views/ChatView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import axios from "axios";

const cookies = new Cookies();

const routes = [
  { path: "/", component: HomeView },
  { path: "/chat", component: ChatView },
  { path: "/login", component: LoginView },
  { path: "/signup", component: SignupView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  if (to.path === "/login" || to.path === "/signup") {
    try {
      const token = cookies.get("token");
      if (token) {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`, { token });
        if (res.data.verified) {
          next("/chat");
          return;
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
  next();
});

export default router;
