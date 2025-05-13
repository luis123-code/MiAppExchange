<template>
  <div class="flex-col items-center">
    <pxmain />
    <router-link to="/" class="mt-5 text-xl text-green-600 hover:underline">Volver a la pagina de Inicio</router-link
    >
  </div>
</template>
<script>
import Pxmain from "../components/Pxmain.vue";
export default {
  name: "Welcomes",
  components: {
    pxmain: Pxmain,
  },
};
</script>
