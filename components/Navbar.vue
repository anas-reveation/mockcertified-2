<template>
  <div>
    <NavbarDesktop class="sticky-top d-none d-lg-block" />
    <div class="d-lg-none px-3 my-3 container">
      <div class="row align-items-center justify-content-between">
        <ClientOnly>
          <div class="col text-capitalize text-truncate font_size_16">
            Welcome{{ user && ',' }}
            <span v-if="user" class="text-primary fw-bolder">{{ user.first_name }}</span>
          </div>
        </ClientOnly>
        <div class="col-2 text-end">
          <img
            @click="openNav()"
            src="@/assets/images/profile_icon.svg"
            alt="profile icon"
            class="opacity-75 profile_icon"
          />
        </div>
      </div>
    </div>
    <ClientOnly>
      <div id="mySidenav" class="border border-primary sidenav">
        <div class="position-relative">
          <div class="position-absolute top-0 end-0">
            <img src="@/assets/images/mobile_navbar_top_curve.svg" alt="vector" />
          </div>
        </div>
        <a href="#" class="closebtn" @click="closeNav()">&times;</a>

        <div class="row px-3 mt-5" :class="user && 'align-items-center'">
          <div
            class="col-2"
            @click="
              redirect('/dashboard');
              closeNav();
            "
          >
            <img src="@/assets/images/logo.svg" alt="logo" class="me-2" />
          </div>
          <div class="col" :class="!user && 'd-flex align-items-center'">
            <div class="text-black fw-bolder text-truncate font_size_16">
              {{ user ? `${user.first_name} ${user.last_name}` : 'Mockcertified' }}
            </div>
            <div v-if="user" class="text-primary text-truncate font_size_14">
              {{ user.email }}
            </div>
          </div>
        </div>

        <div v-if="isAuthenticated" class="px-3">
          <hr />
        </div>

        <div class="px-3 mt-2">
          <ul class="navbar-nav">
            <li
              v-if="isAuthenticated"
              class="rounded-3 py-1"
              :class="$route.path.match(/\/create-test\/*/g) && 'bg_color fill_black'"
              @click="
                redirect('/protected/create-test');
                closeNav();
              "
            >
              <a class="text-black ms-2">
                <span class="font_size_14">
                  <img src="@/assets/images/add.svg" alt="add" class="me-1 nav_icon icon_color" />
                  Create a New Test
                </span>
              </a>
            </li>

            <li
              v-if="isAuthenticated"
              class="rounded-3 py-1"
              :class="$route.path.match(/\/created-test\/*/g) && 'bg_color fill_black'"
              @click="
                redirect('/protected/created-test');
                closeNav();
              "
            >
              <a class="text-black ms-2">
                <span class="font_size_14">
                  <img
                    src="@/assets/images/created_tests.svg"
                    alt="created_tests"
                    class="me-1 nav_icon"
                  />
                  Created Tests
                </span>
              </a>
            </li>

            <li
              v-if="userGroup === 'admins'"
              class="rounded-3 py-1"
              :class="adminRoute && 'bg_color fill_black'"
              @click="
                redirect('/protected/admin');
                closeNav();
              "
            >
              <a class="text-black ms-2">
                <span class="font_size_14">
                  <img
                    src="@/assets/images/admin_pannel.svg"
                    alt="admin_pannel"
                    class="me-1 nav_icon"
                  />
                  Admin Panel
                </span>
              </a>
            </li>

            <li
              v-if="userGroup === 'admins'"
              class="rounded-3 py-1"
              :class="feebackRoute && 'bg_color fill_black'"
              @click="
                redirect('/protected/admin/feedback');
                closeNav();
              "
            >
              <a class="text-black ms-2">
                <span class="font_size_14">
                  <img
                    src="@/assets/images/feedback_icon.svg"
                    alt="feedback"
                    class="me-1 nav_icon"
                  />
                  Feedback
                </span>
              </a>
            </li>

            <div v-if="isAuthenticated" class="px-3">
              <hr />
            </div>

            <li
              class="rounded-3 py-1"
              :class="$route.path.match(/\/contact-us\/*/g) && 'bg_color fill_black'"
              @click="
                redirect('/contact-us');
                closeNav();
              "
            >
              <span class="text-black ms-2 font_size_14">
                <img
                  src="@/assets/images/contact-us-icon.svg"
                  alt="contact-us"
                  class="me-1 nav_icon"
                />
                Contact Us
              </span>
            </li>

            <li
              class="rounded-3 py-1"
              :class="$route.path.match(/\/blog\/*/g) && 'bg_color fill_black'"
              @click="
                redirect('/blog');
                closeNav();
              "
            >
              <span class="text-black ms-2 font_size_14">
                <img src="@/assets/images/created_tests.svg" alt="blog" class="me-1 nav_icon" />
                Blogs
              </span>
            </li>

            <li
              class="rounded-3 py-1"
              :class="$route.path.match(/\/faq\/*/g) && 'bg_color fill_black'"
              @click="
                redirect('/faq');
                closeNav();
              "
            >
              <span class="text-black ms-2 font_size_14">
                <img src="@/assets/images/FAQ.svg" alt="faq" class="me-1 nav_icon" />
                FAQ
              </span>
            </li>

            <li
              class="rounded-3 py-1"
              :class="$route.path.match(/\/terms-conditions\/*/g) && 'bg_color fill_black'"
              @click="
                redirect('/terms-conditions');
                closeNav();
              "
            >
              <span class="text-black ms-2 font_size_14">
                <img
                  src="@/assets/images/terms_conditions.svg"
                  alt="terms_conditions"
                  class="me-1 nav_icon"
                />
                Terms and Conditions
              </span>
            </li>

            <li
              class="rounded-3 py-1"
              :class="$route.path.match(/\/privacy-policy\/*/g) && 'bg_color fill_black'"
              @click="
                redirect('/privacy-policy');
                closeNav();
              "
            >
              <span class="text-black ms-2 font_size_14">
                <img
                  src="@/assets/images/privacy_icon.svg"
                  alt="privacy_icon"
                  class="me-1 nav_icon"
                />
                Privacy policy
              </span>
            </li>

            <li
              v-if="!isAuthenticated"
              class="rounded-3 py-1"
              @click="
                redirect('/auth/login');
                closeNav();
              "
            >
              <span class="text-black ms-2 font_size_14">
                <img src="@/assets/images/logout.svg" alt="logout" class="me-1 nav_icon" />
                Login
              </span>
            </li>

            <li
              v-if="isAuthenticated"
              class="rounded-3 py-1"
              @click="
                userLogOut();
                closeNav();
              "
            >
              <span class="text-black ms-2 font_size_14">
                <img src="@/assets/images/logout.svg" alt="logout" class="me-1 nav_icon" />
                Logout
              </span>
            </li>
          </ul>
        </div>

        <div>
          <div class="position-absolute bottom-0 start-0 z_index_curve">
            <img src="@/assets/images/mobile_navbar_bottom_curve.svg" alt="vector" />
          </div>
        </div>
      </div>
    </ClientOnly>
    <!-- <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-white mb-2 d-md-none">
      <div class="container-fluid px-0">
        <NuxtLink class="navbar-brand ms-2" to="/dashboard">
          <img src="@/assets/images/logo_with_name.svg" alt="logo" class="logo" />
        </NuxtLink>

        <ClientOnly>
          <div
            v-if="user"
            class="bg-primary text-white circle me-1"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <p class="mt-2 text-uppercase text-center">
              {{ user.first_name[0] }}{{ user.last_name[0] }}
            </p>
          </div>
          <img
            v-else
            src="@/assets/images/profile_icon.svg"
            height="40"
            class="opacity-75 me-2 mt-1"
            width="40"
            alt="user"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          />
        </ClientOnly>
        <div
          class="collapse navbar-collapse position-relative"
          :class="isNavbarVisible && 'show'"
          ref="navbarDiv"
          id="navbarSupportedContent"
        >
          <span
            class="position-absolute bottom-0 end-0"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
          >
            <img src="@/assets/images/dropdown_menu_icon.svg" alt="dropdown" />
          </span>
          <ul class="navbar-nav me-auto mb-lg-0">
            <ClientOnly>
              <li
                v-if="isAuthenticated"
                class="nav-item border-top border-primary py-1 mt-2 font_size_16"
                @click="redirect('/protected/create-test')"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <div class="d-flex ms-2">
                  <div class="">
                    <img
                      src="@/assets/images/profile_icon.svg"
                      height="40"
                      class="opacity-75 me-2 mt-1"
                      width="40"
                      alt="user"
                    />
                  </div>
                  <div v-if="user" class="text-start font_size_16">
                    <div class="text-capitalize">{{ user.first_name }} {{ user.last_name }}</div>
                    <div>{{ user.email }}</div>
                  </div>
                </div>
              </li>

              <li
                v-if="isAuthenticated"
                class="nav-item border-top border-bottom border-primary py-1 font_size_16"
                :class="$route.path.match(/\/create-test\/*/g) && 'bg-secondary fill_black'"
                @click="redirect('/protected/create-test')"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <a class="nav-link text-black" aria-current="page">
                  <span class="p-1 ms-3">
                    <img src="@/assets/images/add.svg" alt="add" class="me-1 mb-1" />
                    Create a New Test
                  </span>
                </a>
              </li>

              <li
                v-if="isAuthenticated"
                class="nav-item border-bottom border-primary text-capitalize py-1 font_size_16"
                :class="$route.path.match(/\/created-test\/*/g) && 'bg-secondary fill_black'"
                @click="redirect('/protected/created-test')"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <a class="nav-link text-black" aria-current="page">
                  <span class="p-1 ms-3">
                    <img
                      src="@/assets/images/created_tests.svg"
                      alt="created_tests"
                      class="me-1 mb-1"
                    />
                    Created Tests
                  </span>
                </a>
              </li>

              <li
                class="nav-item border-bottom border-primary text-capitalize py-1 font_size_16"
                :class="[
                  $route.path.match(/\/terms-conditions\/*/g) && 'bg-secondary fill_black',
                  !isAuthenticated && 'border-top  mt-2',
                ]"
                @click="redirect('/terms-conditions')"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <a class="nav-link text-black" aria-current="page">
                  <span class="p-1 ms-3">
                    <img
                      src="@/assets/images/terms_conditions.svg"
                      alt="terms_conditions"
                      class="me-1 mb-1"
                    />
                    Terms and Conditions
                  </span>
                </a>
              </li>
            </ClientOnly>

            <li
              class="nav-item border-bottom border-primary text-capitalize py-1 font_size_16"
              :class="$route.path.match(/\/privacy-policy\/*/g) && 'bg-secondary fill_black'"
              @click="redirect('/privacy-policy')"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <a class="nav-link text-black" aria-current="page">
                <span class="p-1 ms-3">
                  <img
                    src="@/assets/images/privacy_icon.svg"
                    alt="privacy_icon"
                    class="me-1 mb-1"
                  />
                  Privacy policy
                </span>
              </a>
            </li>

            <ClientOnly>
              <li
                class="nav-item border-bottom border-primary text-capitalize py-1 font_size_16"
                :class="$route.path.match(/\/contact-us\/*/g) && 'bg-secondary fill_black'"
                @click="redirect('/contact-us')"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <a class="nav-link text-black" aria-current="page">
                  <span class="p-1 ms-3">
                    <img
                      src="@/assets/images/contact-us-icon.svg"
                      alt="contact-us"
                      class="me-1 mb-1"
                    />
                    Contact Us
                  </span>
                </a>
              </li>

              <li
                v-if="userGroup === 'admins'"
                class="nav-item border-bottom border-primary text-capitalize py-1 font_size_16"
                :class="$route.path.match(/\/admin\/*/g) && 'bg-secondary fill_black'"
                @click="redirect('/protected/admin')"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <a class="nav-link text-black" aria-current="page">
                  <span class="p-1 ms-3">
                    <img
                      src="@/assets/images/admin_pannel.svg"
                      alt="admin_pannel"
                      class="me-1 mb-1"
                    />
                    Admin Panel
                  </span>
                </a>
              </li>

              <li
                v-if="!isAuthenticated"
                class="nav-item text-capitalize py-1 font_size_16"
                @click="redirect('/auth/login')"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <a class="nav-link text-black" aria-current="page">
                  <span class="p-1 ms-3">
                    <img src="@/assets/images/logout.svg" alt="logout" class="me-1 mb-1" />
                    Login
                  </span>
                </a>
              </li>

              <li
                v-if="isAuthenticated"
                class="nav-item text-capitalize py-1 font_size_16"
                @click="userLogOut()"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <a class="nav-link text-black" aria-current="page">
                  <span class="p-1 ms-3">
                    <img src="@/assets/images/logout.svg" alt="logout" class="me-1 mb-1" />
                    Logout
                  </span>
                </a>
              </li>
            </ClientOnly>
          </ul>
        </div>
      </div>
      <div class="bg-primary w-100 hr_line mt-1" />
    </nav> -->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      adminRoute: false,
      feebackRoute: false,
    };
  },

  computed: {
    ...mapState('auth', ['user', 'userGroup', 'isAuthenticated']),
    ...mapState(['isNavbarVisible']),
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
    ...mapMutations(['setIsNavbarVisible']),

    async userLogOut() {
      const res = await this.logout();
      if (res) {
        this.$router.push('/auth/login');
      }
    },

    redirect(url) {
      this.$router.push(url);
    },

    openNav() {
      document.getElementById('mySidenav').style.width = '90%';
    },

    closeNav() {
      document.getElementById('mySidenav').style.width = '0';
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.icon_color {
  filter: invert(61%) sepia(98%) saturate(2965%) hue-rotate(203deg) brightness(91%) contrast(92%);
}

.nav_icon {
  height: 15px;
  width: 15px;
}

.hr_line {
  height: 2px;
}

/* .fill_black > a > span > img {
  filter: saturate(100%) brightness(0);
} */

.circle {
  border-radius: 50%;
  height: 50px;
  width: 50px;
}

/* NAVBAR*/
ul {
  list-style-type: none;
}

.bg_color {
  background-color: #e8ecfb;
}

.z_index_curve {
  z-index: -1;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: #ffffff;
  overflow-x: hidden;
  transition: 0.5s;
  /* padding-top: 60px; */
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  z-index: 9991;
}

.sidenav a {
  /* padding: 8px 8px 8px 32px; */
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}

@include media-breakpoint-down(sm) {
  .profile_icon {
    width: 28px;
    height: 28px;
  }
}
</style>
