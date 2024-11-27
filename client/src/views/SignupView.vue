<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <main class="h-screen flex flex-col justify-center items-center relative overflow-hidden">
    <p
      class="text-3xl sm:text-4xl sm:leading-relaxed text-center bg-gradient-primary text-transparent bg-clip-text mb-16"
    >
      Sign up a new account
    </p>
    <form class="w-full px-4 md:px-0 md:w-1/2 xl:w-1/3 *:mb-4">
      <div>
        <input
          placeholder="Username"
          class="w-full p-4 bg-form rounded-md outline-none border-2 border-transparent focus:border-primary transition"
        />
        <span class="text-sm text-red-400 px-2"></span>
      </div>
      <div>
        <input
          placeholder="Password"
          class="w-full p-4 bg-form rounded-md outline-none border-2 border-transparent focus:border-primary transition"
        />
        <span class="text-sm text-red-400 px-2"></span>
      </div>
      <div>
        <input
          placeholder="Confirm password"
          class="w-full p-4 bg-form rounded-md outline-none border-2 border-transparent focus:border-primary transition"
        />
        <span class="text-sm text-red-400 px-2"></span>
      </div>
      <button
        class="w-full p-4 flex justify-between items-center font-bold bg-gradient-primary text-dark rounded-md transition"
      >
        <span>Sign up a new account</span>
        <Icon icon="fluent:arrow-right-12-filled" class="text-xl" />
      </button>
    </form>
    <div class="mt-8 text-center flex flex-wrap items-center">
      <RouterLink to="/" class="text-primary">Back to home</RouterLink>
      <Icon icon="bi:dot" />
      <p>
        <span>Already have an account?</span>
        <RouterLink to="/login" class="text-primary"> Log in </RouterLink>
        <span>to your account</span>
      </p>
    </div>
    <div
      class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 aspect-square bg-gradient-primary rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 aspect-square bg-gradient-primary rounded-full blur-3xl"
    ></div>
  </main>
</template>
