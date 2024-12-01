<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import tokenUtil from "../utils/token";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();

const token = ref();
const isShared = ref(false);
const loadingShare = ref(false);
const loading = ref(false);
const href = ref("");
const hasCopied = ref(false);

onMounted(async () => {
  token.value = tokenUtil.get();
  href.value = window.location.href;
  try {
    loadingShare.value = true;
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/chat/${route.params.id}?token=${token.value}`);
    isShared.value = res.data.chat.shared;
  } catch (error: any) {
    console.log(error.response.data.message);
  } finally {
    loadingShare.value = false;
  }
});

const changeShare = async (tobeShared: boolean) => {
  try {
    loading.value = true;
    const res = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/chat/${route.params.id}/share`, {
      token: token.value,
      tobeShared,
    });
    isShared.value = res.data.shared;
  } catch (error: any) {
    console.log(error.response.data.message);
  } finally {
    loading.value = false;
  }
};

const handleCopy = () => {
  hasCopied.value = true;
  navigator.clipboard.writeText(href.value);
};
</script>

<template>
  <div v-if="loadingShare" class="w-full flex justify-center items-center">
    <Icon icon="eos-icons:bubble-loading" class="text-2xl" />
  </div>
  <div v-else>
    <div class="flex justify-between items-center mb-4">
      <p>{{ isShared ? "Unshare this chat" : "Share this chat" }}</p>
      <button
        @click="changeShare(!isShared)"
        class="px-4 py-2 rounded-xl border border-form hover:bg-form transition flex items-center gap-4"
      >
        {{ isShared ? "Unshare" : "Share" }}
        <Icon v-if="loading" icon="eos-icons:bubble-loading" class="text-xl" />
      </button>
    </div>
    <div v-if="isShared" class="w-full flex items-center p-2 rounded-md bg-[#101010] text-md">
      <div class="flex-grow">{{ href }}</div>
      <button @click="handleCopy" class="flex items-center gap-2 rounded hover:bg-form p-2 transition">
        <Icon icon="iconoir:copy" width="24" height="24" />
        <span>{{ hasCopied ? "Copied" : "Copy" }}</span>
      </button>
    </div>
    <div v-if="isShared" class="text-center p-1">Share is on, everyone can access the chat with this link</div>
  </div>
</template>
