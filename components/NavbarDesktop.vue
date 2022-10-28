<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light" @mouseleave="dropDownNavbar = false">
    <div class="container-fluid">
      <NuxtLink to="/dashboard" class="navbar-brand">
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
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <ClientOnly>
            <NuxtLink
              v-if="platform === 'web'"
              to="/dashboard"
              class="d-flex flex-column align-items-center justify-content-center me-5"
            >
              <img class="m-1 navbar_icon" src="@/assets/images/home.svg" alt="home" />
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
              <img class="m-1 navbar_icon" src="@/assets/images/reattempt_icon.svg" alt="reload" />
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
              <img
                class="m-1 navbar_icon"
                src="@/assets/images/purchase_icon.svg"
                alt="purchase_icon"
              />
              <span class="pb-2 font_size_10"> Purchased </span>

              <div
                class="active_line"
                :class="$route.path.match(/\/purchased-test\/*/g) && 'bg-primary'"
              />
            </NuxtLink>

            <NuxtLink
              v-if="user && user.stripe_seller_id"
              to="/protected/account"
              class="d-flex flex-column align-items-center justify-content-center me-5"
            >
              <img class="m-1 navbar_icon" src="@/assets/images/wallet.svg" alt="stripe_logo" />
              <span class="pb-2 font_size_10"> Balance </span>

              <div
                class="active_line"
                :class="$route.path.match(/\/account\/*/g) && 'bg-primary'"
              />
            </NuxtLink>
          </ClientOnly>

          <div
            class="d-flex flex-column align-items-center justify-content-center me-5 cursor_pointer"
            @mouseover="dropDownNavbar = true"
          >
            <img class="m-1 navbar_icon" src="@/assets/images/settings.svg" alt="settings" />
            <span class="pb-2 font_size_10"> settings </span>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-primary w-100 hr_line mt-2" />

    <!-- Start Hover Navbar -->
    <div class="d-flex justify-content-end" v-if="dropDownNavbar">
      <ul
        class="list-unstyled border border-primary bg-white position-fixed mt-2 me-2 width_navlist arrow_box"
      >
        <li
          v-if="isAuthenticated"
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
          v-if="isAuthenticated"
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
    <!-- End Hover Navbar -->

    <!-- Side Navbar -->
    <!-- <div v-if="isSideNavbarVisible" class="side_navbar">
      <ul class="list-unstyled mt-4">
        <li class="text-end me-2 mb-3">
          <img
            src="@/assets/images/cross.svg"
            alt="cross"
            class="cursor_pointer"
            @click="isSideNavbarShowFun"
          />
        </li>
        <li
          v-if="isAuthenticated"
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
          v-if="isAuthenticated"
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
    </div> -->
  </nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  data() {
    return {
      isSideNavbarShow: false,
      dropDownNavbar: false,
    };
  },

  computed: {
    ...mapState(['isSideNavbarVisible', 'platform']),
    ...mapState('auth', ['user', 'isAuthenticated', 'userGroup']),
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

    // isSideNavbarShowFun() {
    //   this.setIsSideNavbarVisible(!this.isSideNavbarVisible);
    // },
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
  right: 0;
  width: 250px;
  height: 100%;
  z-index: 1000;
  background: rgba(103, 130, 225, 0.2) !important;
}

.navbar_icon {
  width: 30px;
  height: 30px;
}

.width_navlist {
  width: 300px;
}

.arrow_box {
  width: 300px;
  border-radius: 3px;
}

.arrow_box:after,
.arrow_box:before {
  bottom: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.arrow_box:after {
  // border-color: rgba(255, 255, 255, 0);
  border-bottom-color: #ffffff;
  border-width: 19px;
  // left: 100%;
  right: 60px;
  // margin-left: -19px;
}

.arrow_box:before {
  // border-color: rgba(113, 158, 206, 0);
  border-bottom-color: #6782e1;
  border-width: 20px;
  // left: 100%;
  right: 59px;
  // margin-left: -19px;
}
</style>
