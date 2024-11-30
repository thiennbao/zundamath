<script setup lang="ts">
import { Icon } from "@iconify/vue";
import axios from "axios";
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import tokenUtil from "../utils/token";

const router = useRouter();

const data = reactive({ username: "", password: "" });
const errMsg = reactive({ username: "", password: "" });
const loading = ref(false);

const handleSubmit = async () => {
  for (let key in data) {
    if (!data[key as keyof typeof data]) {
      errMsg[key as keyof typeof errMsg] = "Please fill out this field";
      return;
    }
  }
  try {
    loading.value = true;
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, data);
    tokenUtil.sign(res.data.token);
    router.push("/chat");
  } catch (error: any) {
    console.error(error.response.data.message);
    if (error.status === 404) {
      errMsg.username = error.response.data.message;
    } else if (error.status === 401) {
      errMsg.password = error.response.data.message;
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main class="h-screen flex flex-col justify-center items-center relative overflow-hidden">
    <p
      class="text-3xl sm:text-4xl sm:leading-relaxed text-center bg-gradient-primary text-transparent bg-clip-text mb-16"
    >
      Log in to your account
    </p>
    <form @submit.prevent="handleSubmit" method="post" class="w-full px-4 md:px-0 md:w-1/2 xl:w-1/3 *:mb-4">
      <div>
        <input
          v-model="data.username"
          placeholder="Username"
          @focus="errMsg.username = ''"
          :class="errMsg.username ? 'border-red-400' : 'border-transparent'"
          class="w-full p-4 bg-form rounded-md outline-none border-2 focus:border-primary transition"
        />
        <span class="text-sm text-red-400 px-2">{{ errMsg.username }}</span>
      </div>
      <div>
        <input
          v-model="data.password"
          type="password"
          placeholder="Password"
          @focus="errMsg.password = ''"
          :class="errMsg.password ? 'border-red-400' : 'border-transparent'"
          class="w-full p-4 bg-form rounded-md outline-none border-2 focus:border-primary transition"
        />
        <span class="text-sm text-red-400 px-2">{{ errMsg.password }}</span>
      </div>
      <button
        class="w-full p-4 flex justify-between items-center font-bold bg-gradient-primary text-dark rounded-md transition"
      >
        <span>Log in to your account</span>
        <Icon v-if="loading" icon="eos-icons:bubble-loading" class="text-xl" />
        <Icon v-else icon="fluent:arrow-right-12-filled" class="text-xl" />
      </button>
    </form>
    <div class="mt-8 px-4 text-center flex flex-wrap justify-center items-center">
      <RouterLink to="/" class="text-primary">Back to home</RouterLink>
      <Icon icon="bi:dot" />
      <p class="text-center">
        <span>New to ZundaMath?</span>
        <RouterLink to="/signup" class="text-primary"> Sign up </RouterLink>
        <span>a new account</span>
      </p>
    </div>
    <div
      class="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-64 aspect-square bg-gradient-primary rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-64 aspect-square bg-gradient-primary rounded-full blur-3xl"
    ></div>
  </main>
</template>
