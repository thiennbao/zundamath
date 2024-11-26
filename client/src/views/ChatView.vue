<script setup lang="ts">
import ChatBox from "../components/ChatBox.vue";
import ChatHeader from "../components/ChatHeader.vue";
import ChatSidebar from "../components/ChatSidebar.vue";
</script>

<template>
  <main class="flex">
    <ChatSidebar />
    <div
      class="flex-grow h-screen flex flex-col overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-primary"
    >
      <ChatHeader />
      <ChatBox class="flex-grow mb-16" />
    </div>
  </main>
</template>
