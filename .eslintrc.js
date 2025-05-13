module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",  // Ya tienes esta deshabilitada
    "no-constant-condition": "off",           // Deshabilitar la regla no-constant-condition
    "vue/no-useless-template-attributes": "off", // Deshabilitar la regla vue/no-useless-template-attributes
    "vue/valid-v-model": "off",              // Deshabilitar la regla vue/valid-v-model
    "vue/return-in-computed-property": "off", // Deshabilitar la regla vue/return-in-computed-property
  },
};
