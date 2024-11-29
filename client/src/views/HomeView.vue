<script setup lang="ts">
import { Icon } from "@iconify/vue";
import tokenUtil from "../utils/token";
import { onMounted, ref } from "vue";

const hasLogged = ref(true);
onMounted(async () => {
  hasLogged.value = await tokenUtil.verify();
});
</script>

<template>
  <main class="h-screen flex flex-col">
    <div class="xl:max-w-screen-lg lg:max-w-screen-md w-full m-auto flex">
      <div class="flex-grow flex flex-col justify-center items-center lg:items-start gap-y-4">
        <h1 class="text-6xl md:text-8xl bg-gradient-primary text-transparent bg-clip-text">ZundaMath</h1>
        <p class="md:text-xl">Sensei who helps you with maths</p>
        <div class="flex mt-8 gap-4">
          <RouterLink
            v-if="!hasLogged"
            to="/login"
            class="px-4 py-2 cursor-pointer rounded border-2 border-primary hover:bg-primary hover:text-dark transition"
          >
            <span>Login to save your chats</span>
          </RouterLink>
          <RouterLink
            to="/chat"
            class="px-4 py-2 cursor-pointer rounded border-2 border-primary hover:bg-primary hover:text-dark transition flex items-center gap-1"
          >
            <span>Start chatting</span>
            <Icon icon="fluent:arrow-right-12-filled" />
          </RouterLink>
        </div>
      </div>
      <div class="hidden w-1/3 lg:flex justify-end items-center relative">
        <img src="/logo-large.svg" class="z-10" />
        <div class="absolute w-full aspect-square bg-primary rounded-full blur-3xl"></div>
      </div>
    </div>
    <div class="flex flex-wrap justify-center items-center gap-2 pb-10">
      <span>This website is made with</span>
      <Icon icon="solar:heart-bold" class="text-2xl text-primary" />
      <span>by some random HCMUS students</span>
    </div>
  </main>
</template>
