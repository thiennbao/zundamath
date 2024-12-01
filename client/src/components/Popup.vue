<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps(["title", "toggle"]);
</script>

<template>
  <div @click="toggle(false)" class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 z-10"></div>
  <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 max-w-full w-[48rem] p-4">
    <div class="max-h-full min-h-[28rem] bg-dark rounded-2xl divide-y divide-form flex flex-col">
      <div class="p-6 text-lg font-bold flex justify-between items-center">
        <div>{{ title }}</div>
        <div
          @click="toggle(false)"
          class="p-2 cursor-pointer rounded-md hover:bg-primary hover:bg-opacity-5 hover:text-primary transition"
        >
          <Icon icon="iconamoon:close-bold" class="text-xl" />
        </div>
      </div>
      <div class="flex-grow flex *:w-full p-6 text-sm">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
