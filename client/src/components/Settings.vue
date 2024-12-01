<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { reactive, ref } from "vue";
import tokenUtil from "../utils/token";
import axios from "axios";
import { useRouter } from "vue-router";

const tab = ref("general");

const router = useRouter();

const logout = () => {
  tokenUtil.remove();
  router.push("/");
};

const data = reactive({ token: tokenUtil.get(), current: "", password: "", confirm: "" });
const errMsg = reactive({
  current: "",
  password: "",
  confirm: "",
});
const isSuccess = ref(false);
const loading = ref(false);

const changePassword = async () => {
  if (loading.value) return;
  for (let key in data) {
    if (!data[key as keyof typeof data]) {
      errMsg[key as keyof typeof errMsg] = "Please fill out this field";
      return;
    }
  }
  if (data.password != data.confirm) {
    errMsg.confirm = "Confirm password is not matched";
    return;
  }
  try {
    isSuccess.value = false;
    loading.value = true;
    await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/auth/change`, data);
    isSuccess.value = true;
  } catch (error: any) {
    console.error(error.response.data.message);
    errMsg.current = error.response.data.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-form">
    <div class="w-1/4 flex sm:flex-col gap-2 pb-4 sm:pb-0 sm:pr-6">
      <button
        @click="tab = 'general'"
        :class="tab == 'general' && 'text-primary bg-primary bg-opacity-5'"
        class="flex items-center gap-2 p-2 rounded hover:text-primary"
      >
        <Icon icon="hugeicons:setting-07" class="text-lg" />
        <span>General</span>
      </button>
      <button
        @click="tab = 'security'"
        :class="tab == 'security' && 'text-primary bg-primary bg-opacity-5'"
        class="flex items-center gap-2 p-2 rounded hover:text-primary"
      >
        <Icon icon="oui:ws-security-analytics" class="text-lg" />
        <span>Security</span>
      </button>
    </div>
    <div class="flex-grow pt-4 sm:pt-0 sm:pl-6">
      <div v-if="tab === 'general'">
        <div class="flex justify-between items-center">
          <p>Delete all chats</p>
          <button
            class="px-4 py-2 rounded-xl text-red-500 border border-red-500 hover:bg-red-500 hover:bg-opacity-5 transition"
          >
            Delete
          </button>
        </div>
      </div>
      <div v-else-if="tab === 'security'" class="flex flex-col divide-y divide-form -my-3 *:py-3">
        <div class="flex justify-between items-center">
          <p>Log out</p>
          <button @click="logout" class="px-4 py-2 rounded-xl border border-form hover:bg-form transition">
            Logout
          </button>
        </div>
        <div class="flex flex-col gap-4">
          <p>Change password</p>
          <div>
            <input
              v-model="data.current"
              type="password"
              placeholder="Current password"
              @focus="errMsg.current = ''"
              class="w-full p-2 bg-form rounded-md outline-none border-2 focus:border-primary transition"
              :class="errMsg.current ? 'border-red-400' : 'border-transparent'"
            />
            <p class="text-sm text-red-400 px-2">{{ errMsg.current }}</p>
          </div>
          <div>
            <input
              v-model="data.password"
              type="password"
              placeholder="New password"
              @focus="errMsg.password = ''"
              class="w-full p-2 bg-form rounded-md outline-none border-2 focus:border-primary transition"
              :class="errMsg.password ? 'border-red-400' : 'border-transparent'"
            />
            <p class="text-sm text-red-400 px-2">{{ errMsg.password }}</p>
          </div>
          <div>
            <input
              v-model="data.confirm"
              type="password"
              placeholder="Confirm password"
              @focus="errMsg.confirm = ''"
              class="w-full p-2 bg-form rounded-md outline-none border-2 focus:border-primary transition"
              :class="errMsg.confirm ? 'border-red-400' : 'border-transparent'"
            />
            <p class="text-sm text-red-400 px-2">{{ errMsg.confirm }}</p>
          </div>
          <button
            v-if="isSuccess"
            class="w-fit ml-auto px-4 py-2 rounded-xl border text-primary border-primary hover:bg-primary hover:bg-opacity-5 transition flex items-center gap-2"
          >
            <span>Change password successfully</span>
            <Icon icon="mynaui:check" class="text-xl" />
          </button>
          <button
            v-else
            @click="changePassword"
            class="w-fit ml-auto px-4 py-2 rounded-xl border border-form hover:bg-form transition flex items-center gap-4"
          >
            <span>Change password</span>
            <Icon v-if="loading" icon="eos-icons:bubble-loading" class="text-xl" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
