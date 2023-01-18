<template>
  <nav
    class="navbar navbar-expand-sm navbar-light bg-light mb-1 navbar_shadow"
    @mouseleave="(userDropDown = false), (settingsDropDown = false)"
  >
    <div class="container px-4">
      <NuxtLink to="/dashboard" class="navbar-brand">
        <img src="@/assets/images/logo_with_name.svg" alt="logo" class="logo_with_name" />
      </NuxtLink>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <ClientOnly>
            <NuxtLink
              v-if="platform === 'web'"
              to="/dashboard"
              class="d-flex flex-column align-items-center justify-content-center ms-5"
            >
              <img
                class="m-1 navbar_icon"
                :class="$route.path.match(/\/dashboard\/*/g) && 'active_color'"
                src="@/assets/images/home.svg"
                alt="home"
              />
              <span
                class="fw-bolder pb-2 navbar_font_color font_size_12"
                :class="$route.path.match(/\/dashboard\/*/g) && 'text-primary'"
              >
                Home
              </span>

              <!-- <div
                class="active_line"
                :class="$route.path.match(/\/dashboard\/*/g) && 'bg-primary'"
              /> -->
            </NuxtLink>

            <NuxtLink
              :to="isAuthenticated ? '/protected/attempted-test' : '/auth/login'"
              class="d-flex flex-column align-items-center justify-content-center ms-5"
            >
              <img
                class="m-1 navbar_icon"
                :class="$route.path.match(/\/attempted-test\/*/g) && 'active_color'"
                src="@/assets/images/reattempt_icon.svg"
                alt="reload"
              />
              <span
                class="fw-bolder pb-2 navbar_font_color font_size_12"
                :class="$route.path.match(/\/attempted-test\/*/g) && 'text-primary'"
              >
                Re-attempt
              </span>

              <!-- <div
                class="active_line"
                :class="$route.path.match(/\/attempted-test\/*/g) && 'bg-primary'"
              /> -->
            </NuxtLink>

            <NuxtLink
              :to="isAuthenticated ? '/protected/purchased-test' : '/auth/login'"
              class="d-flex flex-column align-items-center justify-content-center ms-5"
            >
              <img
                class="m-1 navbar_icon"
                :class="$route.path.match(/\/purchased-test\/*/g) && 'active_color'"
                src="@/assets/images/purchase_icon.svg"
                alt="purchase_icon"
              />
              <span
                class="fw-bolder pb-2 navbar_font_color font_size_12"
                :class="$route.path.match(/\/purchased-test\/*/g) && 'text-primary'"
              >
                Purchased
              </span>

              <!-- <div
                class="active_line"
                :class="$route.path.match(/\/purchased-test\/*/g) && 'bg-primary'"
              /> -->
            </NuxtLink>

            <NuxtLink
              :to="isAuthenticated ? '/protected/account' : '/auth/login'"
              class="d-flex flex-column align-items-center justify-content-center ms-5"
            >
              <img
                class="m-1 navbar_icon"
                :class="$route.path.match(/\/account\/*/g) && 'active_color'"
                src="@/assets/images/wallet.svg"
                alt="stripe_logo"
              />
              <span
                class="fw-bolder pb-2 navbar_font_color font_size_12"
                :class="$route.path.match(/\/account\/*/g) && 'text-primary'"
              >
                Balance
              </span>

              <!-- <div
                class="active_line"
                :class="$route.path.match(/\/account\/*/g) && 'bg-primary'"
              /> -->
            </NuxtLink>
          </ClientOnly>

          <div
            class="d-flex flex-column align-items-center justify-content-center ms-5 cursor_pointer"
            @mouseover="(settingsDropDown = true), (userDropDown = false)"
          >
            <img class="m-1 navbar_icon" src="@/assets/images/settings.svg" alt="settings" />
            <span class="fw-bolder pb-2 navbar_font_color font_size_12"> Settings </span>
          </div>

          <ClientOnly>
            <div
              v-if="user"
              class="d-flex flex-column align-items-center justify-content-center ms-5 mt-1 bg-primary text-white cursor_pointer circle"
              @mouseover="(userDropDown = true), (settingsDropDown = false)"
            >
              <span class="text-uppercase"> {{ user.first_name[0] }}{{ user.last_name[0] }} </span>
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>
    <!-- <div class="bg-primary w-100 hr_line mt-2" /> -->

    <!-- Start Hover Navbar -->
    <div class="container d-flex justify-content-end" v-if="settingsDropDown">
      <ul
        class="list-unstyled bg-white position-fixed mt-2 me-2 p-2 settings_user_dropdown_border arrow_box"
        :class="isAuthenticated ? 'settings_dropdown' : 'user_dropdown'"
      >
        <ClientOnly>
          <li
            v-if="isAuthenticated"
            class="py-2 font_size_16 hover_clr mx-2"
            :class="$route.path.match(/\/create-test\/*/g) && 'bg_blue_color fill_black'"
          >
            <NuxtLink to="/protected/create-test">
              <span class="p-1 ms-3">
                <img src="@/assets/images/add.svg" alt="add" class="me-1 mb-1 nav_icon" />
                Create a New Test
              </span>
            </NuxtLink>
          </li>

          <li
            v-if="isAuthenticated"
            class="text-capitalize py-2 font_size_16 hover_clr mx-2"
            :class="$route.path.match(/\/created-test\/*/g) && 'bg_blue_color fill_black'"
          >
            <NuxtLink to="/protected/created-test">
              <span class="p-1 ms-3">
                <img
                  src="@/assets/images/created_tests.svg"
                  alt="created_tests"
                  class="me-1 mb-1 nav_icon"
                />
                Created Tests
              </span>
            </NuxtLink>
          </li>

          <li
            class="text-capitalize py-2 font_size_16 hover_clr mx-2"
            :class="$route.path.match(/\/contact-us\/*/g) && 'bg_blue_color fill_black'"
          >
            <NuxtLink to="/contact-us">
              <span class="p-1 ms-3">
                <img
                  src="@/assets/images/contact-us-icon.svg"
                  alt="contact-us"
                  class="me-1 mb-1 nav_icon"
                />
                Contact Us
              </span>
            </NuxtLink>
          </li>

          <li
            v-if="userGroup === 'admins'"
            class="text-capitalize py-2 font_size_16 hover_clr mx-2"
            :class="adminRoute && 'bg_blue_color fill_black'"
          >
            <NuxtLink to="/protected/admin">
              <span class="p-1 ms-3">
                <img
                  src="@/assets/images/admin_pannel.svg"
                  alt="admin_pannel"
                  class="me-1 mb-1 nav_icon"
                />
                Admin
              </span>
            </NuxtLink>
          </li>

          <li
            v-if="userGroup === 'admins'"
            class="text-capitalize py-2 font_size_16 hover_clr mx-2"
            :class="feebackRoute && 'bg_blue_color fill_black'"
          >
            <NuxtLink to="/protected/admin/feedback">
              <span class="p-1 ms-3">
                <img src="@/assets/images/feedback_icon.svg" alt="feedback" class="me-1 nav_icon" />
                Feedback
              </span>
            </NuxtLink>
          </li>

          <li v-if="!isAuthenticated" class="text-capitalize py-2 font_size_16 hover_clr mx-2">
            <NuxtLink to="/auth/login">
              <span class="p-1 ms-3">
                <img src="@/assets/images/logout.svg" alt="logout" class="me-1 mb-1 nav_icon" />
                Login
              </span>
            </NuxtLink>
          </li>
        </ClientOnly>
      </ul>
    </div>
    <!-- End Hover Navbar -->

    <!-- Start Hover Navbar -->
    <div class="container d-flex justify-content-end" v-if="userDropDown">
      <ul
        class="list-unstyled bg-white position-fixed mt-2 me-2 p-2 settings_user_dropdown_border arrow_box user_dropdown"
      >
        <ClientOnly>
          <li class="ms-3 py-2" v-if="user">
            <div class="row">
              <div class="col-2 bg-primary text-white circle">
                <p class="mt-2 text-uppercase d-flex justify-content-center">
                  {{ user.first_name[0] }}{{ user.last_name[0] }}
                </p>
              </div>
              <div class="col-10 font_size_16">
                <div class="text-capitalize text-truncate">
                  {{ user.first_name }} {{ user.last_name }}
                </div>
                <div class="text-truncate">{{ user.email }}</div>
              </div>
            </div>
          </li>

          <div class="d-flex justify-content-center mb-2">
            <hr class="m-0 w-75" />
          </div>

          <li
            class="text-capitalize py-2 font_size_16 hover_clr mx-2"
            :class="$route.path.match(/\/terms-conditions\/*/g) && 'bg_blue_color fill_black'"
          >
            <NuxtLink to="/terms-conditions">
              <span class="p-1 ms-3">
                <img
                  src="@/assets/images/terms_conditions.svg"
                  alt="terms_conditions"
                  class="me-1 mb-1 nav_icon"
                />
                Terms and Conditions
              </span>
            </NuxtLink>
          </li>

          <li
            class="text-capitalize py-2 font_size_16 hover_clr mx-2"
            :class="$route.path.match(/\/privacy-policy\/*/g) && 'bg_blue_color fill_black'"
          >
            <NuxtLink to="/privacy-policy">
              <span class="p-1 ms-3">
                <img
                  src="@/assets/images/privacy_icon.svg"
                  alt="privacy_icon"
                  class="me-1 mb-1 nav_icon"
                />
                Privacy policy
              </span>
            </NuxtLink>
          </li>

          <li
            class="text-capitalize py-2 font_size_16 hover_clr mx-2"
            :class="$route.path.match(/\/faq\/*/g) && 'bg_blue_color fill_black'"
          >
            <NuxtLink to="/faq">
              <span class="p-1 ms-3">
                <img src="@/assets/images/FAQ.svg" alt="faq" class="me-1 mb-1 nav_icon" />
                FAQ
              </span>
            </NuxtLink>
          </li>

          <li v-if="isAuthenticated" class="text-capitalize py-2 font_size_16 hover_clr mx-2">
            <a href="#" @click="userLogOut()">
              <span class="p-1 ms-3">
                <img src="@/assets/images/logout.svg" alt="logout" class="me-1 mb-1 nav_icon" />
                Logout
              </span>
            </a>
          </li>
        </ClientOnly>
      </ul>
    </div>
    <!-- End Hover Navbar -->
  </nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  data() {
    return {
      isSideNavbarShow: false,
      userDropDown: false,
      settingsDropDown: false,
      adminRoute: false,
      feebackRoute: false,
    };
  },

  computed: {
    ...mapState(['isSideNavbarVisible', 'platform']),
    ...mapState('auth', ['user', 'isAuthenticated', 'userGroup']),
  },

  watch: {
    $route: {
      handler: function (newValue) {
        const adminRoute = 'protected-admin' === newValue.name.substring(0, 15);
        this.adminRoute = adminRoute && newValue.name.search('feedback') === -1;
        this.feebackRoute = adminRoute && newValue.name.search('feedback') === 16;
      },
      deep: true,
      immediate: true,
    },
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

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.nav_icon {
  height: 18px;
  width: 18px;
}

.navbar_shadow {
  box-shadow: 0px 8px 15px rgba(165, 165, 165, 0.1);
}

.hover_clr:hover {
  background: #e8ecfb;
  border-radius: 6px;
}

.bg_blue_color {
  background-color: #e8ecfb;
  border-radius: 6px;
}

.hr_line {
  height: 2px;
}

.active_color {
  filter: invert(61%) sepia(98%) saturate(2965%) hue-rotate(203deg) brightness(91%) contrast(92%);
}

.navbar_font_color {
  color: hsla(0, 0%, 6%, 0.5);
}

.active_line {
  width: 40px;
  height: 4px;
}

// .fill_black > a > span > img {
//   filter: saturate(100%) brightness(0);
// }

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

.arrow_box {
  width: 340px;
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

.settings_user_dropdown_border {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.12);
}

.settings_dropdown:after {
  // border-bottom-color: #ffffff;
  border-width: 19px;
  left: 90px;
}

.settings_dropdown:before {
  // border-bottom-color: #6782e1;
  border-width: 20px;
  left: 89px;
}

.user_dropdown:after {
  // border-bottom-color: #ffffff;
  border-width: 19px;
  right: 60px;
}

.user_dropdown:before {
  // border-bottom-color: #6782e1;
  border-width: 20px;
  right: 59px;
}

.user_dropdown,
.settings_dropdown {
  top: 80px;
}

.circle {
  border-radius: 50%;
  height: 50px;
  width: 50px;
}

.circle_inner {
  height: 15px;
}

.bg-light {
  --bs-bg-opacity: 0;
  background-color: rgba(255, 255, 255, var(--bs-bg-opacity)) !important;
  background-color: rgba(var(--bs-light-rgb), var(--bs-bg-opacity)) !important;
}

.logo_with_name {
  width: 190px;
}

@include media-breakpoint-between(md, lg) {
  .logo_with_name {
    width: 140px;
  }
}
</style>
