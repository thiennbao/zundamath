<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const textarea = ref<HTMLElement | null>(null);

const adjustHeight = () => {
  if (textarea.value) {
    textarea.value.style.height = "auto";
    textarea.value.style.height = `${textarea.value.scrollHeight}px`;
  }
};
</script>

<template>
  <div class="w-1/2 m-auto flex flex-col justify-center gap-8">
    <p class="text-4xl text-center bg-gradient-primary text-transparent bg-clip-text">Ask me a maths question</p>
    <form class="p-2 bg-[#2a2a2a] rounded-2xl overflow-hidden">
      <textarea
        ref="textarea"
        @input="adjustHeight"
        rows="1"
        placeholder="What is 1 + 1"
        class="w-full max-h-60 resize-none p-2 bg-transparent border-none outline-none [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-primary"
      ></textarea>
      <div class="flex justify-end">
        <button class="rounded-md p-2 hover:bg-primary hover:bg-opacity-5 hover:text-primary transition">
          <Icon icon="formkit:submit" class="text-2xl" />
        </button>
      </div>
    </form>
  </div>
</template>
