<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="flex justify-between items-center px-6 py-4">
    <div class="flex gap-4">
      <div class="hidden">
        <div class="p-2 rounded-lg cursor-pointer transition hover:bg-primary hover:bg-opacity-5 hover:text-primary">
          <Icon icon="hugeicons:sidebar-left" class="text-xl" />
        </div>
        <div class="p-2 rounded-lg cursor-pointer transition hover:bg-primary hover:bg-opacity-5 hover:text-primary">
          <Icon icon="solar:pen-new-square-broken" class="text-xl" />
        </div>
      </div>
      <RouterLink to="/">
        <img src="/logo.svg" class="h-8" />
      </RouterLink>
    </div>
    <div class="flex gap-2">
      <div class="p-2 cursor-pointer rounded-md hover:bg-primary hover:bg-opacity-5 hover:text-primary">
        <Icon icon="material-symbols:share-outline" class="text-2xl" />
      </div>
      <div class="p-2 cursor-pointer rounded-md hover:bg-primary hover:bg-opacity-5 hover:text-primary">
        <Icon icon="hugeicons:setting-07" class="text-2xl" />
      </div>
    </div>
  </div>
</template>
