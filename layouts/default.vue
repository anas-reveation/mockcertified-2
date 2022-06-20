<template>
  <div>
    <Navbar />
    <Nuxt />
    <FooterNavbar v-if="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['user']),
  },
};
</script>
