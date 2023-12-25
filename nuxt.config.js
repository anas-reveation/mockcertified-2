require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // If you don't want to display the progress bar between the routes
  loading: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Mockcertified App',
    titleTemplate: ' %s - Mockcertified App',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'viewport-fit=cover, width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        name: 'google-signin-client_id',
        content: process.env.GOOGLE_CLIENT_ID,
      },
      { name: 'google-signin-scope', content: 'profile email openid' },
    ],
    script: [
      {
        src: '/bootstrap.bundle.min.js',
      },
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
      },
    ],
  },

  env: {
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~/assets/css/mybootstrap.scss', lang: 'sass' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/amplify.js', mode: 'client' },
    { src: '~/plugins/auth.js', mode: 'client' },
    { src: '~/plugins/vue-carousel.js', mode: 'client' },
    { src: '~/plugins/getLocalData.js', mode: 'client' },
    { src: '~/plugins/vue-apexcharts.js', mode: 'client' },
    { src: '~/plugins/deepLink.js', mode: 'client' },
    { src: '~/plugins/aos.js', mode: 'client' },
    { src: '~/plugins/sanity-image-builder.js', mode: 'client' },
    // { src: '~/plugins/redirectBlog.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['@nuxtjs/sanity/module', '@nuxtjs/dotenv', { filename: `.env.${process.env.NODE_ENV}` }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'vue-sweetalert2/nuxt',
    ['@nuxtjs/dotenv', { filename: `.env.${process.env.NODE_ENV}` }],
    ['@nuxtjs/sitemap'],
    // ['@nuxtjs/sitemap', { exclude: ['/TermsOfServices'] }],
  ],

  sitemap: {
    hostname: `https://${process.env.DOMAIN}`,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // router: {
  //   middleware: 'redirectBlog',
  // },

  generate: {
    fallback: true,
  },

  // render: {
  //   static: {
  //     setHeaders: (resp, path) => {
  //       if (resp.req.originalUrl === '/.well-known/apple-app-site-association') {
  //         resp.setHeader('Content-Type', 'application/json');
  //       }
  //     },
  //   },
  // },
};
