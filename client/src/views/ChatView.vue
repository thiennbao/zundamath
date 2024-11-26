<script setup lang="ts">
import ChatHeader from "../components/ChatHeader.vue";
import ChatSidebar from "../components/ChatSidebar.vue";
</script>

<template>
  <main class="h-screen flex">
    <ChatSidebar />
    <div class="flex-grow">
      <ChatHeader />
      <div>Chat</div>
    </div>
  </main>
</template>
