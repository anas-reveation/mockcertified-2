<template>
  <div class="container px-4">
    <div class="position-absolute top-0 end-0 p-2">
      <NuxtLink to="/">
        <img src="@/assets/images/logo.svg" alt="logo" />
      </NuxtLink>
    </div>

    <img class="position-absolute top-0 end-0 oval_img" src="@/assets/images/oval.jpg" alt="oval" />
    <h1 class="my-5 font_size_36">Payment Status</h1>
    <div class="text-center">
      <img src="@/assets/images/done_icon.svg" alt="done-icon" />

      <p class="mt-3 font_size_32">
        Your
        <br />
        payment
        <br />
        successful
      </p>

      <div class="mt-5d">
        <NuxtLink
          class="btn btn-white border-2 border-primary text-primary w-75"
          to="/purchased-test"
        >
          Go to purchased test
        </NuxtLink>
        <NuxtLink class="btn btn-secondary border-2 border-dark w-75 mt-3" to="/category">
          Buy more tests
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  layout: 'introLayout',

  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },

  async mounted() {
    if (this.isAuthenticated) {
      await this.getUserTests();
    }
  },

  methods: {
    ...mapActions('testManagement', ['getUserTests']),
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/auth.scss';
</style>
