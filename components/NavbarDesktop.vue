<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/dashboard">
        <img src="@/assets/images/logo_with_name.svg" alt="logo" class="logo" />
      </NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end pe-5 me-2" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <NuxtLink
            to="/dashboard"
            class="d-flex flex-column align-items-center justify-content-center me-5"
          >
            <img class="m-1" src="@/assets/images/home.svg" alt="home" />
            <span class="pb-2 font_size_10"> Home </span>

            <div
              class="active_line"
              :class="$route.path.match(/\/dashboard\/*/g) && 'bg-primary'"
            />
          </NuxtLink>

          <NuxtLink
            :to="isAuthenticated ? '/protected/attempted-test' : '/auth/login'"
            class="d-flex flex-column align-items-center justify-content-center me-5"
          >
            <img class="m-1" src="@/assets/images/reattempt_icon.svg" alt="reload" />
            <span class="pb-2 font_size_10"> Reattempt </span>
            <div
              class="active_line"
              :class="$route.path.match(/\/attempted-test\/*/g) && 'bg-primary'"
            />
          </NuxtLink>
          <NuxtLink
            :to="isAuthenticated ? '/protected/purchased-test' : '/auth/login'"
            class="d-flex flex-column align-items-center justify-content-center me-5"
          >
            <img class="m-1" src="@/assets/images/give_test.svg" alt="give_test" />
            <span class="pb-2 font_size_10"> Purchased </span>

            <div
              class="active_line"
              :class="$route.path.match(/\/purchased-test\/*/g) && 'bg-primary'"
            />
          </NuxtLink>

          <ClientOnly>
            <NuxtLink
              v-if="user && user.stripe_seller_id"
              to="/protected/account"
              class="d-flex flex-column align-items-center justify-content-center me-5"
            >
              <img class="m-1" src="@/assets/images/wallet.svg" alt="stripe_logo" />
              <span class="pb-2 font_size_10"> Balance </span>

              <div
                class="active_line"
                :class="$route.path.match(/\/account\/*/g) && 'bg-primary'"
              />
            </NuxtLink>
          </ClientOnly>
        </div>
      </div>
    </div>
    <div class="bg-primary w-100 hr_line mt-2" />
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState('auth', ['user', 'isAuthenticated']),
    ...mapState('buyer', ['cartItems']),
  },

  methods: {
    ...mapActions('auth', ['logout']),
    async userLogOut() {
      const res = await this.logout();
      if (res) {
        this.$router.push('/auth/login');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hr_line {
  height: 2px;
}
.active_line {
  width: 40px;
  height: 4px;
}
</style>
