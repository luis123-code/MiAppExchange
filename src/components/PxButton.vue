<template>
  <button @click="handleClick">
  <BeatLoader :loading="isLoading" :color="'#68d391'" :size="8"></BeatLoader>
    <slot></slot>
  </button>
</template>

<script>
import { BeatLoader } from '@saeris/vue-spinners';
export default {
  name: 'PXButton',
  props : {
    isLoading : {
      type : Boolean ,
      default : false
    }
  },
  components : {
    BeatLoader
  },
  methods: {
    handleClick() {
      this.$emit('custom-click');
    }
  }
}
</script>