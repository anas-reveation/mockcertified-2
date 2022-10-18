<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <a href="#" class="navbar-brand" @click="isSideNavbarShowFun">
        <img src="@/assets/images/logo_with_name.svg" alt="logo" class="logo" />
      </a>
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

    <!-- Side Navbar -->
    <div v-if="isSideNavbarVisible" class="side_navbar">
      <ul class="list-unstyled mt-5">
        <li
          class="border-bottom border-primary text-capitalize py-2 font_size_16"
          :class="$route.path.match(/\/create-test\/*/g) && 'bg-secondary fill_black'"
        >
          <NuxtLink to="/protected/create-test">
            <span class="p-1 ms-3">
              <img src="@/assets/images/add.svg" alt="add" class="me-1 mb-1" />
              Create A New Test
            </span>
          </NuxtLink>
        </li>

        <li
          class="border-bottom border-primary text-capitalize py-2 font_size_16"
          :class="$route.path.match(/\/created-test\/*/g) && 'bg-secondary fill_black'"
        >
          <NuxtLink to="/protected/created-test">
            <span class="p-1 ms-3">
              <img src="@/assets/images/created_tests.svg" alt="created_tests" class="me-1 mb-1" />
              Created Tests
            </span>
          </NuxtLink>
        </li>

        <li
          class="border-bottom border-primary text-capitalize py-2 font_size_16"
          :class="$route.path.match(/\/terms-conditions\/*/g) && 'bg-secondary fill_black'"
        >
          <NuxtLink to="/terms-conditions">
            <span class="p-1 ms-3">
              <img
                src="@/assets/images/terms_conditions.svg"
                alt="terms_conditions"
                class="me-1 mb-1"
              />
              Terms and Conditions
            </span>
          </NuxtLink>
        </li>

        <li
          class="border-bottom border-primary text-capitalize py-2 font_size_16"
          :class="$route.path.match(/\/privacy-policy\/*/g) && 'bg-secondary fill_black'"
        >
          <NuxtLink to="/privacy-policy">
            <span class="p-1 ms-3">
              <img src="@/assets/images/privacy_icon.svg" alt="privacy_icon" class="me-1 mb-1" />
              Privacy policy
            </span>
          </NuxtLink>
        </li>

        <li
          class="border-bottom border-primary text-capitalize py-2 font_size_16"
          :class="$route.path.match(/\/contact-us\/*/g) && 'bg-secondary fill_black'"
        >
          <NuxtLink to="/contact-us">
            <span class="p-1 ms-3">
              <img src="@/assets/images/contact-us-icon.svg" alt="contact-us" class="me-1 mb-1" />
              Contact Us
            </span>
          </NuxtLink>
        </li>

        <ClientOnly>
          <li
            v-if="userGroup === 'admins'"
            class="border-bottom border-primary text-capitalize py-2 font_size_16"
            :class="$route.path.match(/\/admin\/*/g) && 'bg-secondary fill_black'"
          >
            <NuxtLink to="/protected/admin">
              <span class="p-1 ms-3">
                <img src="@/assets/images/admin_pannel.svg" alt="admin_pannel" class="me-1 mb-1" />
                Admin
              </span>
            </NuxtLink>
          </li>

          <li
            v-if="!isAuthenticated"
            class="border-bottom border-primary text-capitalize py-2 font_size_16"
          >
            <NuxtLink to="/auth/login">
              <span class="p-1 ms-3">
                <img src="@/assets/images/logout.svg" alt="logout" class="me-1 mb-1" />
                Login
              </span>
            </NuxtLink>
          </li>

          <li
            v-if="isAuthenticated"
            class="border-bottom border-primary text-capitalize py-2 font_size_16"
          >
            <a href="#" @click="userLogOut()">
              <span class="p-1 ms-3">
                <img src="@/assets/images/logout.svg" alt="logout" class="me-1 mb-1" />
                Logout
              </span>
            </a>
          </li>
        </ClientOnly>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  data() {
    return {
      isSideNavbarShow: false,
    };
  },

  computed: {
    ...mapState(['isSideNavbarVisible']),
    ...mapState('auth', ['user', 'isAuthenticated', 'userGroup']),
    ...mapState('buyer', ['cartItems']),
  },

  methods: {
    ...mapActions('auth', ['logout']),
    ...mapMutations(['setIsSideNavbarVisible']),

    async userLogOut() {
      const res = await this.logout();
      if (res) {
        this.$router.push('/auth/login');
      }
    },

    isSideNavbarShowFun() {
      console.log('first', this.isSideNavbarVisible);
      this.setIsSideNavbarVisible(!this.isSideNavbarVisible);
      // this.isSideNavbarShow = !this.isSideNavbarShow;
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

.fill_black > a > span > img {
  filter: saturate(100%) brightness(0);
}

.side_navbar {
  position: fixed;
  width: 250px;
  height: 100%;
  z-index: 1000;
  background: rgba(103, 130, 225, 0.2) !important;
}
</style>
