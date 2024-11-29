<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Popup from "./Popup.vue";
import Settings from "./Settings.vue";
import { ref } from "vue";

const isSettingsOpen = ref(false);

const toggleSetting = (isOpen: boolean) => {
  isSettingsOpen.value = isOpen;
};
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
      <button class="p-2 rounded-md hover:bg-primary hover:bg-opacity-5 hover:text-primary">
        <Icon icon="material-symbols:share-outline" class="text-2xl" />
      </button>
      <button
        @click="isSettingsOpen = !isSettingsOpen"
        class="p-2 rounded-md hover:bg-primary hover:bg-opacity-5 hover:text-primary"
      >
        <Icon icon="hugeicons:setting-07" class="text-2xl" />
      </button>
    </div>
    <Popup title="Settings" :toggle="toggleSetting" v-if="isSettingsOpen">
      <Settings></Settings>
    </Popup>
  </div>
</template>
