<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container">
      <div class="row align-items-center justify-content-center justify-content-md-between w-100">
        <div class="col-7 col-lg-5 col-xl-7">
          <div class="row align-items-center">
            <div class="col-9 col-lg-5 col-xl-3">
              <NuxtLink to="/" class="navbar-brand">
                <img src="@/assets/images/mc_icon.svg" alt="logo" class="w-100" />
              </NuxtLink>
            </div>
            <div class="col-lg-7 col-xl-9 d-none d-lg-block">
              <SearchInput v-model="searchQuery" :searchQueryFunc="searchQueryFunc" class="mt-3" />
            </div>
          </div>
        </div>
        <div class="col-4 d-flex d-lg-none justify-content-end">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="col-lg-7 col-xl-5">
          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav mb-2 mb-lg-0 active_link">
              <li class="d-block d-lg-none">
                <SearchInput
                  v-model="searchQuery"
                  :searchQueryFunc="searchQueryFunc"
                  class="mt-3"
                />
              </li>
              <li class="nav-item">
                <NuxtLink to="/categories">
                  <a
                    class="nav-link font-size-16"
                    :class="{ active: $route.path === '/categories' }"
                    aria-current="page"
                    >Categories</a
                  >
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/mocktest">
                  <a
                    class="nav-link font-size-16 me-3"
                    :class="{ active: $route.path === '/mocktest' }"
                    >Mock Tests</a
                  >
                </NuxtLink>
              </li>
              <div class="d-flex">
                <button class="login_btn me-3">Login</button>
                <button class="login_btn">Sign up</button>
              </div>
            </ul>
            <form class="d-flex"></form>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    async searchQueryFunc() {
      this.$router.push(`/search?search_query=${this.searchQuery}`);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.login_btn {
  background-color: transparent;
  color: var(--primary);
  border: 3px solid var(--primary);
  border-radius: 8px; /* Adjust the border radius as needed */
  padding: 5px 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
}

/* Optionally, you can add hover styles to make the button interactive */
.login_btn:hover {
  background-color: var(--primary);
  color: white;
}

.active_link .nav-item .nav-link {
  color: black;
}
.active_link .nav-item .nav-link.active {
  font-weight: 600;
}

.active_link .nav-item .nav-link:hover {
  color: grey;
}

@include media-breakpoint-up(xl) {
  .login_btn {
    padding: 5px 25px;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
