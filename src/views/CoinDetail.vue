<template>
  <div class="flex-col">
    <div v-if="isLoading" class="flex justify-center">
      <BounceLoader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>
    <template class="flex flex-col" v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
        <img
              :src="
                `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
              "
              :alt="asset.name"
              class="w-20 h-20 mr-5"
            />
          <h1 class="text-5xl">
          {{ asset.name }}
            <small class="text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>
        <div class="my-10 flex flex-col">
            <ul>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Ranking</b>
                <span>#{{ asset.rank }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
                <span>{{ asset.priceUsd | dollar }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
                <span>{{ min | dollar }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
                <span>{{ max | dollar }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
                <span>{{ avg | dollar }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
                <span>{{ asset.changePercent24Hr}}</span>
              </li>
            </ul>
          </div>
        <div class="my-10 sm:mt-0 text-center">
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"  @click.stop="cambiarValor()"  >{{ focus ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}</button>
          <div class="flex my-5">
            <input
              id="convertValue"
              type="text"
              class="text-center bg-white border border-gray-300 rounded-lg py-2 px-4 w-full" 
              :placeholder="focus ? 'Valor en USD' : `valor en ${asset.symbol}`"
            />
          </div>
          <span v-model="conversion" class="text-xl">{{  `${conversionCriptomomneda} ${focus ? 'USD': asset.symbol}`}}</span>
        </div>
      </div>
      <line-chart v-if="history.length" :min="min" :max="max" :data="history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])" />
      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table v-if="Array.isArray(marketplace)">
        <tr v-for="m in marketplace"  :key="m.exchangeId + '-' + m.c"  class="border-b">
          <td>
            <b>{{m.exchangeId}}</b>
          </td>
          <td>
            {{m.priceUsd | dollar}}
          </td>
          <td>
            {{m.baseSymbol}} / {{ m.quoteSymbol}}
          </td>
          <td>
            <px-button @custom-click="getWebSite(m)" :isLoading="m.isLoading"  v-if="!m.url" class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-2 border border-green-500 hover:border-transparent rounded">
              <slot>Obtener link</slot>
            </px-button>
            <a v-else class="hover:underline text-green-600" target="_blanck">
              {{m.url}}
            </a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>
<script>
import serviceApi from "@/serviceApi";
import { BounceLoader } from '@saeris/vue-spinners';
import { createChart } from 'lightweight-charts';
import PxButton from '@/components/PxButton';

export default {
  name : "CoinDetail" ,
  components : { BounceLoader , "px-button" : PxButton  },
  created(){
    this.getMoneda()
  },
  data(){
    return {
      asset : {} ,
      focus : false , 
      history : "" , 
      marketplace : "" ,
      isLoading : false ,
      conversion : "" ,
    }
  },
  watch:{
    $route(){
      this.getMoneda()
    },
  },
  computed: {
    conversionCriptomomneda(){
      if(!this.conversion) return 0 
    },
    min() {
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    max() {
      return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    avg() {
      return Math.abs(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    }
  },

  methods : {
    cambiarValor(){
      this.focus = !this.focus
    }, 

    getWebSite(exchange){
      this.$set(exchange , 'isLoading' , true)
      serviceApi({ method: "GET", url: `/${exchange.exchangeId}` , cmabioUrl : "exchanges"  })
      .then(response => {
        //problema de reactividiad cuando se agrego despues del objeto no esta trakeado por la vista , los problemas de reactividad en arrays y objetos cunado quieres agregar 
        //Para solucionarlo usamos $set(objeto, propiedad, valor) . En este caso this.$set(exchange, 'url', res.excangeUrl)
        this.$set(exchange , 'url'  ,response.data.data.exchangeUrl )
        // exchange.url = response.data.exchangeUrl;
        console.log(exchange , response.data.data.exchangeUrl)
      })
      .catch(error => {
        console.error("Error fetching exchange URL:", error);
      })
      .finally(() => {
        this.$set(exchange , 'isLoading' , false)
        console.log("Exchange URL fetch completed");
      });
     
    },
    getMoneda(){
      console.log("propiedades de rauter"  , this.$route)
      let criptomoneda =  this.$route.params.id
      this.isLoading = true 
      const now = new Date();
      const end = now.getTime();
      now.setDate(now.getDate() - 1);
      const start = now.getTime();
      Promise.all( [serviceApi({ method : "GET" , url : criptomoneda}) , serviceApi({ method : "GET" , url : `/${criptomoneda}/history?interval=h1&amp;start=${start}&amp;end=${end}`}) , serviceApi({ method : "GET" , url : `/${criptomoneda}/markets?limit=5`})     ] )
      .then( response => {
      let [ infoCriptom ,  balamceCriptom , brokerCripto  ]  = response
      let { data : { data  }  } = infoCriptom
      let { data : { data : valor } } = balamceCriptom
      let { data : { data : broker } } = brokerCripto 
      this.asset = data
      this.history = valor
      this.marketplace = broker 
      console.log(this.asset )
      })
      .catch(error => {
        console.error("error", error);
      })
      .finally(()=>{
        this.isLoading = false 
      })

    },
  }
}




</script>
