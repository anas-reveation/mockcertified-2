<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">Mock app</span>
      <span v-if="isAuthenticated" @click="logout">Logout</span>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },

  methods: {
    ...mapActions('auth', ['logout']),
  },
};
</script>
