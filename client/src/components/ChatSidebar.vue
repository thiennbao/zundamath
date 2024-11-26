<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const isOpen = ref(true);

const history = ref({
  Today: [] as string[],
  "This week": [] as string[],
  "This month": [] as string[],
  "This year": [] as string[],
  Older: [] as string[],
});

// Fetch api simulate
history.value = {
  Today: [
    "Lorem ipsum odor amet",
    "Consectetuer adipiscing elit",
    "Libero maximus dapibus metus etiam finibus id quisque tincidunt",
  ],
  "This week": [
    "Pellentesque adipiscing maecenas ridiculus lacus neque justo",
    "Tempor nascetur himenaeos feugiat non",
    "Eget lobortis parturient",
  ],
  "This month": [
    "Sociosqu dapibus curae consequat fusce condimentum primis mauris",
    "Ad porttitor suspendisse mus; augue vehicula efficitur",
    "Elit amet sociosqu risus a montes suspendisse primis ac",
  ],
  "This year": [
    "Eu consectetur dapibus himenaeos orci aliquam nulla nibh lacus",
    "Pulvinar pretium rhoncus himenaeos luctus neque platea a ridiculus",
    "Iaculis senectus dignissim neque nam leo vestibulum",
  ],
  Older: [
    "Odio penatibus cursus nullam pretium litora lacus",
    "Aliquam erat pharetra mauris accumsan venenatis",
    "Sollicitudin porta sit purus senectus curabitur gravida sit",
  ],
};
</script>

<template>
  <div
    :class="{ 'w-72 px-4': isOpen, 'w-0 px-0': !isOpen }"
    class="h-screen py-4 bg-[#101010] transition-all overflow-y-scroll [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-thumb]:bg-primary"
  >
    <div class="flex justify-between mb-8">
      <div
        @click="isOpen = !isOpen"
        class="p-2 rounded-lg cursor-pointer transition hover:bg-primary hover:bg-opacity-5 hover:text-primary"
      >
        <Icon icon="hugeicons:sidebar-left" class="text-xl" />
      </div>
      <div class="p-2 rounded-lg cursor-pointer transition hover:bg-primary hover:bg-opacity-5 hover:text-primary">
        <Icon icon="solar:pen-new-square-broken" class="text-xl" />
      </div>
    </div>
    <div class="flex flex-col gap-4 mb-20">
      <div v-for="time in Object.keys(history)" :key="time" class="*:p-2 *:cursor-pointer">
        <p class="text-xs text-primary font-bold">{{ time }}</p>
        <div
          v-for="item in history[time as keyof typeof history]"
          :key="item"
          class="text-sm rounded-lg hover:bg-primary hover:bg-opacity-5 hover:text-primary transition flex justify-between items-center gap-4 group"
        >
          <span class="line-clamp-1 w-full">{{ item }}</span>
          <div class="hidden group-hover:block relative">
            <Icon icon="bi:three-dots" class="text-xl peer" />
            <div
              class="hidden peer-hover:block hover:block absolute right-0 p-2 bg-dark text-gray-300 rounded-lg shadow-primary shadow-[0_0_2px]"
            >
              <div
                class="flex justify-between items-center gap-6 p-2 rounded-md hover:bg-primary hover:bg-opacity-5 hover:text-primary"
              >
                <span>Share</span>
                <Icon icon="material-symbols:share-outline" class="text-lg" />
              </div>
              <div
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
</template>
