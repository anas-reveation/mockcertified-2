<template>
  <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-white mb-2">
    <div class="container">
      <NuxtLink class="navbar-brand" to="/dashboard">
        <img src="@/assets/images/logo_with_name.svg" alt="logo" class="logo" />
      </NuxtLink>
      <img
        src="@/assets/images/profile_icon.svg"
        height="40"
        class="mt-1 opacity-75"
        width="40"
        alt=""
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div class="collapse navbar-collapse position-relative" id="navbarSupportedContent">
        <span
          class="position-absolute bottom-0 end-0"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
        >
          <img src="@/assets/images/dropdown_menu_icon.svg" alt="dropdown" />
        </span>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item text-capitalize">
            <NuxtLink class="nav-link text-black" aria-current="page" to="/create-test">
              <span
                class="p-1"
                :class="
                  $route.path.match(/\/create-test\/*/g) &&
                  'bg-secondary border border-dark rounded'
                "
              >
                Create A New Test
              </span>
            </NuxtLink>
          </li>

          <li class="nav-item text-capitalize">
            <NuxtLink class="nav-link text-black" aria-current="page" to="/created-test">
              <span
                class="p-1"
                :class="
                  $route.path.match(/\/created-test\/*/g) &&
                  'bg-secondary border border-dark rounded'
                "
              >
                Created Tests
              </span>
            </NuxtLink>
          </li>

          <li class="nav-item text-capitalize">
            <NuxtLink class="nav-link text-black" aria-current="page" to="/terms-conditions">
              <span
                class="p-1"
                :class="
                  $route.path.match(/\/terms-conditions\/*/g) &&
                  'bg-secondary border border-dark rounded'
                "
              >
                Terms and Conditions
              </span>
            </NuxtLink>
          </li>

          <li class="nav-item text-capitalize">
            <NuxtLink class="nav-link text-black" aria-current="page" to="/privacy-policy">
              <span
                class="p-1"
                :class="
                  $route.path.match(/\/privacy-policy\/*/g) &&
                  'bg-secondary border border-dark rounded'
                "
              >
                Privacy policy
              </span>
            </NuxtLink>
          </li>
          <li class="nav-item text-capitalize">
            <ClientOnly>
              <NuxtLink
                v-if="userGroup === 'admins'"
                class="nav-link text-black"
                aria-current="page"
                to="/admin"
              >
                <span
                  class="p-1"
                  :class="
                    $route.path.match(/\/admin\/*/g) && 'bg-secondary border border-dark rounded'
                  "
                >
                  Admin Panel
                </span>
              </NuxtLink>
            </ClientOnly>
          </li>
          <li class="nav-item text-capitalize">
            <div class="p-1" @click="userLogOut()">Logout</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-primary w-100 mt-2 hr_line" />
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('auth', ['userGroup']),
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

<style scoped>
.hr_line {
  height: 2px;
}
</style>
