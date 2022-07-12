<template>
  <div v-show="!isDisable" class="container text-center background vh-100">
    <div class="">
      <img src="~/assets/images/fav.png" height="250" width="250" alt="" class="mx-auto mt-12" />
    </div>
    <div class="d-grid gap-2 padding-top">
      <button
        class="btn py-2 shadow mb-1 bg-body rounded"
        type="button"
        @click="$router.push('auth/login')"
      >
        Log In
      </button>
      <button class="btn mt-2 py-2 btn-color" type="button" @click="$router.push('auth/signup')">
        Register
      </button>
    </div>
  </div>
</template>

<script>
import { App as CapacitorApp } from '@capacitor/app'; // Deep links
import { mapState, mapActions } from 'vuex';

export default {
  layout: 'introLayout',

  middleware: ['authenticated'],

  data() {
    return {
      isDisable: true,
    };
  },

  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },

  async mounted() {
    if (this.isAuthenticated) {
      this.$router.push('/dashboard');

      CapacitorApp.addListener('appUrlOpen', function (event) {
        const slug = event.url.split('.com').pop();
        if (slug) {
          this.$router.push(slug);
        }
      });

      return;
    }
    this.isDisable = false;

    const aa = await this.getAllCategories();
    console.log('aa', aa);
  },

  methods: {
    ...mapActions('testManagement', ['getAllCategories']),
  },
};
</script>

<style scoped>
.padding-top {
  padding-top: 50%;
}
.btn-color {
  background-color: #11a49b !important;
  color: white;
}
.background {
  background: rgb(226, 226, 226);
}
</style>
