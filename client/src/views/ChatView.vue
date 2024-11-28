<script setup lang="ts">
import ChatBox from "../components/ChatBox.vue";
import ChatHeader from "../components/ChatHeader.vue";
import ChatSidebar from "../components/ChatSidebar.vue";
</script>

<template>
  <main class="flex">
    <ChatSidebar class="flex-shrink-0" />
    <div
      class="flex-grow flex flex-col h-screen overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-primary"
    >
      <ChatHeader class="sticky top-0 bg-dark z-10" />
      <ChatBox class="flex-grow w-3/5 m-auto" />
    </div>
  </main>
</template>
