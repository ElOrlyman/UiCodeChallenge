const { defineConfig } = require('@vue/cli-service')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          prependData: `@import "@/scss/variables.scss";`
        }
      },
    },
  },
};

module.exports = defineConfig({
  transpileDependencies: true
})