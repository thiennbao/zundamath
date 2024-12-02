<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <main class="h-screen flex flex-col">
    <div class="xl:max-w-screen-lg lg:max-w-screen-md w-full m-auto flex">
      <div class="flex-grow flex flex-col justify-center items-center lg:items-start gap-y-4">
        <h1 class="text-6xl bg-gradient-primary text-transparent bg-clip-text">404 Not Found</h1>
        <div class="flex mt-8 gap-4">
          <RouterLink
            to="/"
            class="px-4 py-2 cursor-pointer rounded border-2 border-primary hover:bg-primary hover:text-dark transition flex items-center gap-2"
          >
            <span>Go to home page</span>
            <Icon icon="fluent:arrow-right-12-filled" />
          </RouterLink>
        </div>
      </div>
      <div class="hidden w-1/3 lg:flex justify-end items-center relative">
        <img src="/logo-large.svg" class="z-10" />
        <div class="absolute w-full aspect-square bg-primary rounded-full blur-3xl"></div>
      </div>
    </div>
  </main>
</template>
