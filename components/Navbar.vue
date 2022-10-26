<template>
  <div>
    <NavbarDesktop class="sticky-top d-none d-md-block" />
    <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-white mb-2 d-md-none">
      <div class="container-fluid px-0">
        <NuxtLink class="navbar-brand ms-2" to="/dashboard">
          <img src="@/assets/images/logo_with_name.svg" alt="logo" class="logo" />
        </NuxtLink>
        <img
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
            <li
              class="nav-item border-top border-bottom border-primary text-capitalize py-1 font_size_16"
              :class="$route.path.match(/\/create-test\/*/g) && 'bg-secondary fill_black'"
              @click="redirect('/protected/create-test')"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <a class="nav-link text-black" aria-current="page">
                <span class="p-1 ms-3">
                  <img src="@/assets/images/add.svg" alt="add" class="me-1 mb-1" />
                  Create A New Test
                </span>
              </a>
            </li>

            <li
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
              :class="$route.path.match(/\/terms-conditions\/*/g) && 'bg-secondary fill_black'"
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
      <div class="bg-primary w-100 hr_line" />
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('auth', ['userGroup', 'isAuthenticated']),
    ...mapState(['isNavbarVisible']),
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
  },
};
</script>

<style scoped>
.hr_line {
  height: 2px;
}

.fill_black > a > span > img {
  filter: saturate(100%) brightness(0);
}
</style>
