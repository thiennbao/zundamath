<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <main class="h-screen flex flex-col">
    <div class="xl:max-w-screen-lg lg:max-w-screen-md w-full m-auto flex">
      <div class="flex-grow flex flex-col justify-center items-center lg:items-start gap-y-4">
        <h1 class="text-6xl md:text-8xl bg-gradient-primary text-transparent bg-clip-text">ZundaMath</h1>
        <p class="md:text-xl">Anime sensei who teach you maths</p>
        <div class="flex mt-8 gap-4">
          <a
            href="/auth"
            class="px-4 py-2 cursor-pointer rounded border-2 border-primary hover:bg-primary hover:text-black transition"
          >
            <span>Sign in to save chats</span>
          </a>
          <a
            href="/chat"
            class="px-4 py-2 cursor-pointer rounded border-2 border-primary hover:bg-primary hover:text-black transition flex items-center gap-1"
          >
            <span>Get started</span>
            <Icon icon="fluent:arrow-right-12-filled" />
          </a>
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
