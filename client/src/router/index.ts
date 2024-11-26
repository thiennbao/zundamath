import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ChatView from "../views/ChatView.vue";
import AuthView from "../views/AuthView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/chat", name: "chat", component: ChatView },
  { path: "/auth", name: "auth", component: AuthView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
