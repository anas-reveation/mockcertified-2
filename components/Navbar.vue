<template>
  <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light mb-4 jj">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/dashboard">
        <img src="@/assets/images/logo_with_name.svg" alt="logo" class="logo" />
      </NuxtLink>
      <img
        src="@/assets/images/profile_icon.svg"
        height="40"
        class="opacity-75"
        width="40"
        alt=""
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
            <NuxtLink class="nav-link text-black" aria-current="page" to="/create-test">
              <span
                class="p-1"
                :class="
                  $route.path.match(/\/create-test\/*/g) &&
                  'bg-secondary border border-dark rounded'
                "
              >
                Create a new test
              </span>
            </NuxtLink>

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

            <div class="p-1" @click="userLogOut()">Logout</div>
          </li>
        </ul>
        <hr />
      </div>
    </div>
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
