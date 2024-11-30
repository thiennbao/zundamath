<script setup lang="ts">
import { Icon } from "@iconify/vue";
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import tokenUtil from "../utils/token";

const router = useRouter();
const route = useRoute();

const data = reactive({ accountId: "", chatId: "", message: "" });
const history = ref<string[]>([]);
onMounted(async () => {
  data.accountId = await tokenUtil.verify();
  data.chatId = route.params.id as string;
  if (route.params.id) {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/chat/${data.chatId}?accountId=${data.accountId || ""}`
      );
      history.value = res.data.chat.messages.map((msg: { content: string }) => msg.content);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }
});
const textarea = ref<HTMLElement | null>(null);
const errorMsg = ref("");

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
  if (data.message) {
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/chat`, data);
      history.value.push(data.message);
      history.value.push(res.data.message);
      if (data.accountId && !data.chatId) {
        data.chatId = res.data.chatId;
        router.push(`/chat/${res.data.chatId}`);
      }
    } catch (error: any) {
      console.error(error.message);
      errorMsg.value = error.message;
    }
  }
  if (textarea.value) {
    data.message = "";
    textarea.value.scroll({ top: 0 });
    textarea.value.style.height = "auto";
  }
};
</script>

<template>
  <div :class="history.length ? 'justify-between' : 'justify-center'" class="flex flex-col gap-12 relative">
    <div class="flex flex-col gap-8">
      <div v-if="!history.length" class="text-4xl text-center bg-gradient-primary text-transparent bg-clip-text">
        Ask me a maths question
      </div>
      <div
        v-for="(msg, index) in history"
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
          v-model.trim="data.message"
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
      <p v-if="history.length" class="text-xs text-center py-2">ZundaMath can make mistakes. Check important info.</p>
    </div>
  </div>
</template>
