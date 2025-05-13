 // Importa Vue, el framework de JavaScript
import Vue from "vue";

// Importa Router, el plugin de Vue para manejar rutas
import Router from "vue-router";

// Importa los componentes que se usarán como vistas en las rutas
import Home from "@/views/Home";
import Error from "@/views/Error";
import About from "@/views/About";
import Welcomes from "@/views/Welcomes";
import CoinDetail from "@/views/CoinDetail";

// Usa el plugin de Router en la instancia de Vue
Vue.use(Router);

// Exporta una nueva instancia de Router con la configuración de rutas
export default new Router({
  // Usa el modo de historial del navegador para las rutas (sin hash en la URL)
  mode: "history",

  // Define las rutas de la aplicación
  routes: [
    //rutas dinamicas fijate en el id (es un id parametro donde es dinamico)
    {
      path : "/coin/:id",
      name : "coin-detail",
      component  : CoinDetail

    },
    {
      // Ruta para la página de inicio
      path: "/",
      name: "home",
      component: Home,
    },

    {
      // Ruta para la página "About"
      path: "/about",
      name: "about",
      component: About,
    },
    {
      // Ruta para la página "About"
      path: "/welcomes",
      name: "welcomes",
      component: Welcomes,
    },

    {
      // Ruta para manejar cualquier otra URL no definida (página de error)
      path: "*",
      name: "error",
      component: Error,
    },
  ],
});
