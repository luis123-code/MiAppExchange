<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ up: sortOrder === 1, down: sortOrder === -1 }">
          <span 
          class="underline cursor-pointer" @click.stop="changeSortOrder" >Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
      v-for="(asset, index) in filteredItems" :key="index.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
      <td style="width: 70px;">
        <img  class="w-6 h-6" :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`" :alt="asset.name" />
      </td>
      <td>{{ asset.rank }}</td>
      <td class="hover:underline text-green-600">
        <router-link  :to=" { name : 'coin-detail' , params : { id : asset.id , }}">   
        {{ asset.name }}
        </router-link>
        <small class="ml-1 text-gray-500">{{ asset.symbol}}</small>
      </td>
      <td>{{ asset.priceUsd |  dollar }}</td>
      <td>{{ asset.marketCapUsd | dollar }}</td>
      <td :class="asset.changePercent24Hr.includes('-') ? 'text-red-600' : 'text-green-600'">{{ asset.changePercent24Hr | percent }}</td>
      <td class="hidden sm:block">
        <PxButton @custom-click="goToCoin(asset.id)"  class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-2 border border-green-500 hover:border-transparent rounded">
          <span>Detalle</span>
        </PxButton>
      </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from '@/components/PxButton';

export default {
  name: "PxAssetsTable",
  components : {
    PxButton
  },
  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },
  computed:{
    filteredItems(){
      // sortOrder: 1 // 1 para ascendente, -1 para descendente
      const altOrder = this.sortOrder === 1 ? -1 : 1
      return true 
              ? this.assets
                  .filter(index => index.name.toLowerCase().startsWith(this.filter.toLowerCase().trim()))
                  .sort((a,b)=> parseInt(a.rank) > parseInt(b.rank) ? this.sortOrder : altOrder )  
              : this.assets 
    }
  },
  created() {
    console.log("created - assets:", this.assets); // 🚨 Esto podría estar vacío si el padre aún no pasó datos
  },
  //Si quieres que el código corra apenas el componente se monte y en cada actualización → usa immediate: true.
  //Si solo quieres reaccionar cuando assets cambie después del montaje → usa la función normal.
  watch: {
    assets: {
      immediate: true, // 🔹 Se ejecuta al inicio
      handler(nuevosDatos) {
        console.log("watch - assets actualizados:", nuevosDatos);
      },
    },
  },
  data(){
    return{
      filter : "" ,
      sortOrder : 1 ,
      }
  },
  methods : {
    changeSortOrder() {
      
      this.sortOrder = this.sortOrder === 1 ? -1 : 1
      this.filteredItems
      console.log("reutn" , this.sortOrder )
    },
    goToCoin(id){
      this.$router.push({
        name : "coin-detail" ,
        params : { id }
      })
    }
  }
};
</script>


<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
