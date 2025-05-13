import Vue from "vue"; // Importa la librería Vue, que es una dependencia de npm
import App from "./App.vue"; // Importa el componente principal de la aplicación
import "@/assets/css/tailwind.css"; // Importa el archivo CSS de Tailwind para estilos
import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js';

Vue.use(VueChartkick, { adapter: Chart });


import router from "./router"; // Importa el archivo de configuración de rutas

import { dollarFilter, percentFilter } from "./filters";

//manera global
//import { BounceLoader } from '@saeris/vue-spinners';

//Vue.component es un método que se utiliza para registrar un componente de forma global en Vue.
//Primer  parámetro: 'BounceLoader' es el nombre del componente. Este es el nombre con el que podrás usar el componente en cualquier parte de tu aplicación
//Segundo parámetro: BounceLoader es el componente que quieres registrar, en este caso, el componente importado desde @saeris/vue-spinners.
//Vue.component('BounceLoader', BounceLoader);

Vue.filter("dollar", dollarFilter);
Vue.filter("percent", percentFilter);
Vue.config.productionTip = true; // Desactiva el mensaje de producción en la consola

new Vue({
  router, // Asigna el router a la instancia de Vue
  render: (h) => h(App), // Renderiza el componente principal App
}).$mount("#app"); // Monta la aplicación en el elemento con id "app"
