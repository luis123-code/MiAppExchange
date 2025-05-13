<template>
  <main>
    <pxHeader :arraysLink="links" />
    <router-view class="container px-5 sm:px-20 py-20 flex justify-center" />

    <!--<router-view> es un componente especial en Vue.js que actúa como un contenedor 
    para las vistas de los componentes que se renderizan en función de la ruta actual. 
    Cuando utilizas Vue Router para manejar la navegación en tu aplicación, 
    es el lugar donde se mostrarán los componentes correspondientes a 
    las rutas definidas.-->
  </main>
</template>
<script>
import PxHeader from "./components/PxHeader.vue";

export default {
  name: "App",
  components: {
    pxHeader: PxHeader,
  },
  data(){
    return{
      links: [
        {
          title: 'BTC',
          to: { name: 'coin-detail', params: { id: 'bitcoin' } }
        },
        {
          title: 'ETH',
          to: { name: 'coin-detail', params: { id: 'ethereum' } }
        },
        {
          title: 'XRP',
          to: { name: 'coin-detail', params: { id: 'ripple' } }
        }
      ],
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
