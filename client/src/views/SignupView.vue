<script setup lang="ts">
import { Icon } from "@iconify/vue";
import axios from "axios";
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";

console.log(document.cookie)

const data = reactive({
  username: "",
  password: "",
  confirm: "",
});
const errMsg = reactive({
  username: "",
  password: "",
  confirm: "",
});
const loading = ref(false);

const handleSubmit = async () => {
  for (let key in data) {
    if (!data[key as keyof typeof data]) {
      errMsg[key as keyof typeof errMsg] = "Please fill out this field";
      return;
    }
  }
  if (data.password != data.confirm) {
    errMsg.confirm = "Confirm password is not matched";
    return;
  }
  try {
    loading.value = true;
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, data);
    console.log(res.data);
  } catch (error: any) {
    console.error(error.response.data.message);
    errMsg.username = error.response.data.message;
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
      Sign up a new account
    </p>
    <form @submit.prevent="handleSubmit" method="post" class="w-full px-4 md:px-0 md:w-1/2 xl:w-1/3 *:mb-4">
      <div>
        <input
          v-model="data.username"
          placeholder="Username"
          @focus="errMsg.username = ''"
          :class="errMsg.username && 'border-red-400'"
          class="w-full p-4 bg-form rounded-md outline-none border-2 border-transparent focus:border-primary transition"
        />
        <span class="text-sm text-red-400 px-2">{{ errMsg.username }}</span>
      </div>
      <div>
        <input
          v-model="data.password"
          placeholder="Password"
          @focus="errMsg.password = ''"
          :class="errMsg.password && 'border-red-400'"
          class="w-full p-4 bg-form rounded-md outline-none border-2 border-transparent focus:border-primary transition"
        />
        <span class="text-sm text-red-400 px-2">{{ errMsg.password }}</span>
      </div>
      <div>
        <input
          v-model="data.confirm"
          placeholder="Confirm password"
          @focus="errMsg.confirm = ''"
          :class="errMsg.confirm && 'border-red-400'"
          class="w-full p-4 bg-form rounded-md outline-none border-2 border-transparent focus:border-primary transition"
        />
        <span class="text-sm text-red-400 px-2">{{ errMsg.confirm }}</span>
      </div>
      <button
        class="w-full p-4 flex justify-between items-center font-bold bg-gradient-primary text-dark rounded-md transition"
      >
        <span>Sign up a new account</span>
        <Icon v-if="loading" icon="eos-icons:bubble-loading" class="text-xl" />
        <Icon v-else icon="fluent:arrow-right-12-filled" class="text-xl" />
      </button>
    </form>
    <div class="mt-8 px-4 flex flex-wrap justify-center items-center">
      <RouterLink to="/" class="text-primary">Back to home</RouterLink>
      <Icon icon="bi:dot" />
      <p class="text-center">
        <span>Already have an account?</span>
        <RouterLink to="/login" class="text-primary"> Log in </RouterLink>
        <span>to your account</span>
      </p>
    </div>
    <div
      class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 aspect-square bg-gradient-primary rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 aspect-square bg-gradient-primary rounded-full blur-3xl"
    ></div>
  </main>
</template>
