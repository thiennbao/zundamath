import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ChatView from "../views/ChatView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import tokenUtil from "../utils/token";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/chat", component: ChatView },
  { path: "/chat/:id", component: ChatView },
  { path: "/login", component: LoginView },
  { path: "/signup", component: SignupView },
  { path: "/:catchAll(.*)", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  if (to.path === "/login" || to.path === "/signup") {
    const hasLogged = await tokenUtil.verify();
    if (hasLogged) {
      next("/chat");
      return;
    }
  }
  next();
});

export default router;
