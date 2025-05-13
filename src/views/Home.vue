<template>
  <div>
    <BounceLoader :loading="isLoading" :color="'#68d391'" :size="100" />
    <px-aser-table v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
import PxAserTable from "@/components/PxAserTable";
import serviceApi from "@/serviceApi";
//de manera local un componente
import { BounceLoader } from '@saeris/vue-spinners';
export default {
  name: "Home",
  components: { PxAserTable ,  BounceLoader },
  async created() {
    this.isLoading = true
    await this.getCriptomoneda();
  },
  data() {
    return {
      assets: [],
      isLoading : false,
    };
  },
  methods: {
    async getCriptomoneda() {
      try {
        const response = await serviceApi({
          method: "GET",
          parametros : {
            limit : 20 ,
          }
        
        });
        this.assets = response.data.data;
        console.log("El api se llego", this.assets);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false
    }
    },
  },
};
</script>
