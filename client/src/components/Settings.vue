<script setup lang="ts">
import { ref } from "vue";

const tab = ref("general");
</script>

<template>
  <div class="flex flex-col sm:flex-row h-full divide-y sm:divide-y-0 sm:divide-x divide-form">
    <div class="w-1/4 flex sm:flex-col gap-2 pb-4 sm:pb-0 sm:pr-6">
      <button
        @click="tab = 'general'"
        :class="tab == 'general' && 'text-primary bg-primary bg-opacity-5'"
        class="flex items-center p-2 rounded hover:text-primary"
      >
        General
      </button>
      <button
        @click="tab = 'security'"
        :class="tab == 'security' && 'text-primary bg-primary bg-opacity-5'"
        class="flex items-center p-2 rounded hover:text-primary"
      >
        Security
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
          <button class="px-4 py-2 rounded-xl border border-form hover:bg-form transition">Logout</button>
        </div>
        <div class="flex flex-col gap-4">
          <p>Change password</p>
          <input
            type="password"
            placeholder="New password"
            class="w-full p-2 bg-form rounded-md outline-none border-2 border-transparent focus:border-primary transition"
          />
          <input
            type="password"
            placeholder="Confirm password"
            class="w-full p-2 bg-form rounded-md outline-none border-2 border-transparent focus:border-primary transition"
          />
          <span v-if="false" class="text-sm text-red-400 px-2"></span>
          <button class="w-fit ml-auto px-4 py-2 rounded-xl border border-form hover:bg-form transition">
            Change password
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
