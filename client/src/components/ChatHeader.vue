<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps(["isSidebarOpen", "toggleSidebar", "toggleSetting", "toggleShare", "disableSidebar", "disableShare"]);
</script>

<template>
  <div class="flex justify-between items-center px-6 py-4">
    <div class="flex gap-4 items-center">
      <div class="w-20">
        <div class="flex gap-2">
          <div
            v-if="!isSidebarOpen"
            @click="toggleSidebar(true)"
            class="p-2 rounded-lg cursor-pointer transition hover:bg-primary hover:bg-opacity-5 hover:text-primary"
          >
            <Icon icon="hugeicons:sidebar-left" class="text-xl" />
          </div>
          <RouterLink
            v-if="!isSidebarOpen || disableSidebar"
            to="/chat/new"
            class="p-2 rounded-lg cursor-pointer transition hover:bg-primary hover:bg-opacity-5 hover:text-primary"
          >
            <Icon icon="solar:pen-new-square-broken" class="text-xl" />
          </RouterLink>
        </div>
      </div>
    </div>
    <RouterLink to="/" class="flex items-center gap-2">
      <img src="/logo.svg" class="h-10" />
      <p class="hidden md:block text-2xl bg-gradient-primary text-transparent bg-clip-text">ZundaMath</p>
    </RouterLink>
    <div class="flex gap-2">
      <button
        v-if="!disableShare"
        @click="toggleShare(true)"
        class="p-2 rounded-md hover:bg-primary hover:bg-opacity-5 hover:text-primary"
      >
        <Icon icon="material-symbols:share-outline" class="text-xl" />
      </button>
      <button
        @click="toggleSetting(true)"
        class="p-2 rounded-md hover:bg-primary hover:bg-opacity-5 hover:text-primary"
      >
        <Icon icon="hugeicons:setting-07" class="text-xl" />
      </button>
    </div>
  </div>
</template>
