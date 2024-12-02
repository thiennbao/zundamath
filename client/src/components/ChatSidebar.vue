<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onMounted, reactive, ref, watch } from "vue";
import tokenUtil from "../utils/token";
import axios from "axios";
import datetimeUtil, { timeCategory } from "../utils/datetime";
import { useRoute, useRouter } from "vue-router";

defineProps(["isOpen", "toggle"]);

const router = useRouter();
const route = useRoute();
const id = ref("");

type Chat = { id: string; title: string; datetime: string };
const history = reactive<{ [key in timeCategory]: Chat[] }>({
  Today: [],
  "Previous 7 days": [],
  "Previous 30 days": [],
  "More than 30 days": [],
});

const getHistory = async () => {
  id.value = route.params.id as string;
  try {
    const token = tokenUtil.get();
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/chat?token=${token}`);
    Object.keys(history).forEach((key) => {
      history[key as timeCategory] = [];
    });
    res.data.chats.forEach((chat: Chat) => {
      const timeCategory = datetimeUtil.getTimeCategory(chat.datetime);
      history[timeCategory].push(chat);
    });
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};
onMounted(getHistory);
watch(() => route.params.id, getHistory);

const handleDelete = async (id: string) => {
  try {
    const token = tokenUtil.get();
    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/chat/${id}?token=${token}`);
    if (id === route.params.id) {
      router.push("/chat/new");
    } else {
      getHistory();
    }
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};
</script>

<template>
  <div :class="{ 'w-72': isOpen, 'w-0': !isOpen }" class="fixed lg:static transition-all duration-700">
    <div
      v-if="isOpen"
      @click="toggle(false)"
      class="block lg:hidden fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90"
    ></div>
    <div
      :class="{ 'w-72 px-4': isOpen, 'w-0 px-0': !isOpen }"
      class="z-10 max-w-[80vw] fixed h-screen py-4 bg-[#101010] transition-all duration-700 overflow-y-scroll [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-thumb]:bg-primary"
    >
      <div class="flex justify-between mb-8">
        <div
          @click="toggle(!isOpen)"
          class="p-2 rounded-lg cursor-pointer transition hover:bg-primary hover:bg-opacity-5 hover:text-primary"
        >
          <Icon icon="hugeicons:sidebar-left" class="text-xl" />
        </div>
        <RouterLink
          to="/chat/new"
          class="p-2 rounded-lg cursor-pointer transition hover:bg-primary hover:bg-opacity-5 hover:text-primary"
        >
          <Icon icon="solar:pen-new-square-broken" class="text-xl" />
        </RouterLink>
      </div>
      <div class="flex flex-col gap-4 mb-20">
        <div v-for="time in Object.keys(history)" :key="time" class="*:cursor-pointer">
          <p v-if="history[time as timeCategory].length" class="mb-2 text-xs text-primary font-bold">{{ time }}</p>
          <div
            v-for="item in history[time as timeCategory]"
            :key="item.id"
            :class="item.id === id && 'text-primary bg-primary bg-opacity-5'"
            class="mb-1 text-sm rounded-lg hover:bg-primary hover:bg-opacity-5 hover:text-primary transition flex justify-between items-center group"
          >
            <RouterLink
              :to="`/chat/${item.id}`"
              class="p-2 text-nowrap text-ellipsis overflow-hidden w-full first-letter:uppercase"
              >{{ item.title }}</RouterLink
            >
            <div class="hidden group-hover:block relative p-2">
              <Icon icon="bi:three-dots" class="text-xl peer" />
              <div
                class="hidden peer-hover:block hover:block absolute right-0 p-2 bg-dark text-gray-300 rounded-lg shadow-primary shadow-[0_0_2px]"
              >
                <div
                  @click="handleDelete(item.id)"
                  class="flex justify-between items-center gap-6 p-2 rounded-md hover:bg-red-500 hover:bg-opacity-5 hover:text-red-500"
                >
                  <span>Delete</span>
                  <Icon icon="fluent:delete-32-regular" class="text-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
