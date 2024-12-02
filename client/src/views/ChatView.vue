<script setup lang="ts">
import { onMounted, ref } from "vue";
import ChatBox from "../components/ChatBox.vue";
import ChatHeader from "../components/ChatHeader.vue";
import ChatSidebar from "../components/ChatSidebar.vue";
import Popup from "../components/Popup.vue";
import PopupSettings from "../components/PopupSettings.vue";
import PopupShare from "../components/PopupShare.vue";
import tokenUtil from "../utils/token";
import { useRoute } from "vue-router";

const route = useRoute();

const hasLogged = ref(true);
onMounted(async () => {
  hasLogged.value = await tokenUtil.verify();
});

const isSidebarOpen = ref(true);
const isShareOpen = ref(false);
const isSettingsOpen = ref(false);

const toggleSidebar = (isOpen: boolean) => (isSidebarOpen.value = isOpen);
const toggleShare = (isOpen: boolean) => (isShareOpen.value = isOpen);
const toggleSetting = (isOpen: boolean) => (isSettingsOpen.value = isOpen);

const scrollContainer = ref<HTMLElement | null>(null);
const scrollToBottom = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
  }
};
</script>

<template>
  <main class="flex">
    <ChatSidebar v-if="hasLogged" class="flex-shrink-0 z-20" :isOpen="isSidebarOpen" :toggle="toggleSidebar" />
    <div
      ref="scrollContainer"
      class="flex-grow flex flex-col h-screen overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-primary"
    >
      <ChatHeader
        :isSidebarOpen="isSidebarOpen"
        :toggleSidebar="toggleSidebar"
        :toggleShare="toggleShare"
        :toggleSetting="toggleSetting"
        :disableSidebar="!hasLogged"
        :disableShare="!route.params.id"
        class="sticky top-0 bg-dark z-10"
      />
      <ChatBox :scrollToBottom="scrollToBottom" class="flex-grow px-4 w-full lg:w-3/5 max-w-screen-md m-auto" />
    </div>
    <Popup title="Settings" :toggle="toggleSetting" v-if="isSettingsOpen">
      <PopupSettings></PopupSettings>
    </Popup>
    <Popup title="Share this chat" :toggle="toggleShare" v-if="isShareOpen">
      <PopupShare></PopupShare>
    </Popup>
  </main>
</template>
