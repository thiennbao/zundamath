import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ChatView from "../views/ChatView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";

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

export default router;
