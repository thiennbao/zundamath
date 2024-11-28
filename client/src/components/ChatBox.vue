<script setup lang="ts">
import { Icon } from "@iconify/vue";
import axios from "axios";
import { ref } from "vue";

const textarea = ref<HTMLElement | null>(null);
const message = ref("");
const errorMsg = ref("");
const chat = ref<string[]>([]);

const adjustHeight = () => {
  if (textarea.value) {
    textarea.value.style.height = `${textarea.value.scrollHeight}px`;
  }
};
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleSubmit();
  }
};
const handleSubmit = async () => {
  if (!message.value) return;
  const chatId = "67474e82150691aaebc70644"; // Just for test, change later
  try {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/chat`, { message: message.value, chatId });
    chat.value.push(message.value);
    chat.value.push(res.data.message);
    // Clear input
    if (textarea.value) {
      message.value = "";
      textarea.value.style.height = "auto";
    }
  } catch (error: any) {
    console.error(error.message);
    errorMsg.value = error.message;
  }
};
</script>

<template>
  <div :class="chat.length ? 'justify-between' : 'justify-center'" class="flex flex-col gap-12 relative">
    <div class="flex flex-col gap-8">
      <div v-if="!chat.length" class="text-4xl text-center bg-gradient-primary text-transparent bg-clip-text">
        Ask me a maths question
      </div>
      <div
        v-for="(msg, index) in chat"
        :class="index % 2 == 0 && 'ml-auto'"
        class="w-4/5 max-w-fit bg-form px-4 py-2 rounded-xl whitespace-pre-wrap"
      >
        {{ msg }}
      </div>
    </div>
    <div class="sticky bottom-0 bg-dark">
      <form class="p-2 bg-form rounded-2xl">
        <textarea
          ref="textarea"
          @input="adjustHeight"
          @keydown="handleKeydown"
          v-model="message"
          rows="1"
          placeholder="What is 1 + 1"
          class="w-full max-h-40 resize-none p-2 bg-transparent border-none outline-none [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-primary"
        ></textarea>
        <div class="flex justify-end">
          <button
            type="button"
            @click="handleSubmit"
            class="rounded-md p-2 hover:bg-primary hover:bg-opacity-5 hover:text-primary transition"
          >
            <Icon icon="formkit:submit" class="text-2xl" />
          </button>
        </div>
      </form>
      <p v-if="chat.length" class="text-xs text-center py-2">ZundaMath can make mistakes. Check important info.</p>
    </div>
  </div>
</template>
