const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './', // 👈 Esto es lo que necesitas para que funcione bien en Vercel
});