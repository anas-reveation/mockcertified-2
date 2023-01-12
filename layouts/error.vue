<template>
  <div class="container px-4 text-center">
    <div>
      <h1 v-if="error.statusCode === 404" class="mt-5 mb-4 font_size_36">404 Page Not Found</h1>
      <h1 v-else class="mt-5 mb-4 font_size_36">Error</h1>
      <NuxtLink to="/dashboard" class="btn btn-secondary border border-dark border-2">
        Home page
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['error'],
  layout: 'error', // you can set a custom layout for the error page

  mounted() {
    this.SET_LOADER(false);
  },

  methods: {
    ...mapMutations(['SET_LOADER']),
  },
};
</script>
