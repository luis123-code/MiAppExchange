/* eslint-disable */
<template>
  <header class="shadow w-screen">
    <nav>
      <nav class="flex items-center justify-between flex-wrap p-6" style="background-color: #1f2937;">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <img src="https://res.cloudinary.com/ddedghgb6/image/upload/v1747095396/s0sd71dtbgxqvkgmclaq.png" alt="Logo" style="width: 50px;height: 50px;" />
          <router-link :to="{ name : 'home' }"  class="font-semibold text-xl tracking-tight">MiAppExchange</router-link>
        </div>
        <div
          class="hidden sm:block w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        >
          <div class="text-sm lg:flex-grow">
          <router-link
            v-for="l in arraysLink"
            :key="l.title"
            :to="l.to"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              {{ l.title }}
            </router-link>
          </div>
        </div>
      </nav>
    </nav>
  </header>
</template>
<script>
import router from "@/router";
import PxIcon from "./PxIcon.vue";
export default {
  name: "PxHeader",
  components: {
    PxIcon,
  },
  props : {
    arraysLink : {
      type : Array,
      default: () => [],
    }
  },

};
</script>
