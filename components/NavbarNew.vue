<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container justify-content-around px-0">
        <div class="row align-items-center justify-content-between w-100 nav_btn">
          <div class="col-3 d-flex d-lg-none justify-content-start">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleNavbar"
            >
              <span class="navbar-toggler-icon"> </span>
            </button>
          </div>
          <div class="col-6 col-lg-5 col-xl-7">
            <div class="row align-items-center justify-content-center">
              <div class="col-9 col-lg-5 col-xl-3">
                <NuxtLink to="/" class="navbar-brand">
                  <img src="@/assets/images/mc_icon.svg" alt="logo" class="w-100" />
                </NuxtLink>
              </div>
              <div class="col-lg-7 col-xl-9 d-none d-lg-block">
                <SearchInput
                  v-model="searchQuery"
                  :searchQueryFunc="searchQueryFunc"
                  class="mt-3"
                />
              </div>
            </div>
          </div>
          <div class="col-3 d-flex d-lg-none justify-content-end">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent1"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleNavbar"
            >
              <span class="">
                <img
                  src="~assets/images/magnifine_glass.svg"
                  alt="magnifine_glass"
                  class="icon_h_w"
                />
              </span>
            </button>
          </div>
          <div class="col-lg-7 col-xl-5 d-flex d-lg-none">
            <div
              class="collapse navbar-collapse justify-content-start z_index_0 h-100"
              id="navbarSupportedContent"
              :class="{ show: isNavbarOpen }"
            >
              <div class="navbar_collapse_div_1">
                <ul class="navbar-nav mb-2 mb-lg-0 active_link ms-3">
                  <li class="nav-item my-2" @click="closeNavbar">
                    <NuxtLink to="/categories">
                      <a
                        class="nav-link font-size-16"
                        :class="{ active: $route.path === '/categories' }"
                        aria-current="page"
                        >Categories</a
                      >
                    </NuxtLink>
                  </li>
                  <li class="nav-item" @click="closeNavbar">
                    <NuxtLink to="/mocktest">
                      <a
                        class="nav-link font-size-16 me-3"
                        :class="{ active: $route.path === '/mocktest' }"
                        >Mock Tests</a
                      >
                    </NuxtLink>
                  </li>
                  <li class="nav-item" @click="closeNavbar">
                    <NuxtLink to="/blogs">
                      <a
                        class="nav-link font-size-16 me-3"
                        :class="{ active: $route.path === '/blogs' }"
                        >Blogs</a
                      >
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <div
                v-if="isNavbarOpen"
                class="d-block d-lg-none bottom-0 left-0 position-fixed navbar_collapse_div z_index_3"
              >
                <div class="d-flex flex-column">
                  <button
                    class="login_btn coustum_btn py-3 mb-3"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal_0"
                  >
                    Login
                  </button>
                  <button
                    class="login_btn coustum_btn py-3"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal_1"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>

            <div
              class="collapse navbar-collapse navbar_collapse_cus_1 justify-content-start"
              id="navbarSupportedContent1"
            >
              <ul class="navbar-nav mb-2 mb-lg-0 active_link navbar_nav_cus">
                <li class="d-block d-lg-none">
                  <SearchInput
                    v-model="searchQuery"
                    :searchQueryFunc="searchQueryFunc"
                    class="mt-3"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-7 col-xl-5 d-none d-lg-block">
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
                  <button
                    class="login_btn me-3"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal_0"
                  >
                    Login
                  </button>
                  <button class="login_btn" data-bs-toggle="modal" data-bs-target="#exampleModal_1">
                    Sign up
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <LoginCover />
    <SignUpCover />
    <ForgetPasswordCover />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      isNavbarOpen: false, // Add a state to track the navbar state
    };
  },
  methods: {
    async searchQueryFunc() {
      this.$router.push(`/search?search_query=${this.searchQuery}`);
    },
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;

      // Toggle body overflow based on the navbar state
      document.body.style.overflow = this.isNavbarOpen ? 'hidden' : 'auto';
    },
    closeNavbar() {
      this.isNavbarOpen = false;
      document.body.style.overflow = 'auto'; // Set overflow to 'auto' when closing
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
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  width: 100px;
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
  color: var(--primary);
}

.active_link .nav-item .nav-link:hover {
  color: grey;
  color: var(--primary);
}
.nav_btn .navbar-toggler {
  border: none;
}

.navbar-toggler:focus {
  box-shadow: none;
}
.icon_h_w {
  height: 25px;
}
.navbar_content {
  position: absolute;
  top: 100%; /* Position it below the navbar */
  left: 0;
  width: 100%;
  z-index: 1000; /* Set a high z-index value to ensure it overlaps other elements */
}

// .navbar_collapse_cus {
//   position: fixed;
//   left: 0;
//   z-index: 1000; /* Set a higher z-index to make it appear above other elements */
//   width: 100%;
//   padding: 5% 0%;
//   background-color: white; /* Set the background color as needed */
//   border: 1px solid #ddd; /* Add borders or styling as needed */
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add box shadow for a better appearance */
//   overflow-y: auto;
//   padding-bottom: 30%;
//   height: 100%;
// }

.navbar_collapse_div_1 {
  position: fixed;
  left: 0;
  width: 100%;
  padding: 5% 0%;
  background-color: white; /* Set the background color as needed */
  border: 1px solid #ddd; /* Add borders or styling as needed */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add box shadow for a better appearance */
  overflow-y: auto;
  padding-bottom: 70%;
  height: 100%;
}

.navbar_collapse_cus_1 {
  position: fixed;
  left: 0;
  z-index: 1000; /* Set a higher z-index to make it appear above other elements */
  width: 100%;
  padding: 5% 2%;
  background-color: white; /* Set the background color as needed */
  border: 1px solid #ddd; /* Add borders or styling as needed */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add box shadow for a better appearance */
  height: 100%;
  max-height: 100vh;
  overflow-y: auto;
}

.navbar-toggler {
  z-index: 1001; /* Set a higher z-index to make it appear above the content */
}

/* Optionally, you can add transitions for a smoother effect */

/* Hide the collapsed content by default */
.navbar-collapse:not(.show) {
  display: none;
}

/* Show the collapsed content when the toggler is clicked */
.navbar-collapse.show {
  display: block;
  min-height: 70vh;
}
.navbar_collapse_div {
  height: 30vh;
  background-color: white;
  width: 100%;
  padding: 10%;
  left: 0;
  z-index: 1001;
}
.coustum_btn {
  width: 100%;
}
.navbar_nav_cus {
  padding-left: revert;
}
.right_0 {
  right: 0;
}

.z_index_3 {
  z-index: 3;
}

.z_index_0 {
  z-index: 0;
}

.h_100vh {
  min-height: 100vh;
}

// .navbar_content {
//   display: flex !important;
// }

@include media-breakpoint-up(xl) {
  .login_btn {
    font-size: 16px;
    font-weight: 500;
    width: 100px;
  }

  // .navbar_content {
  //   display: none !important;
  // }
}

@include media-breakpoint-up(lg) {
  .navbar_collapse_cus {
    position: unset;
    top: none; /* Position it below the navbar */
    left: none;
    z-index: none; /* Set a higher z-index to make it appear above other elements */
    width: none;
    padding: 0 0;
    background-color: none; /* Set the background color as needed */
    border: none; /* Add borders or styling as needed */
    box-shadow: none; /* Add box shadow for a better appearance */
    height: auto;
  }
  .navbar_collapse_cus_1 {
    position: unset;
    top: none; /* Position it below the navbar */
    left: none;
    z-index: none; /* Set a higher z-index to make it appear above other elements */
    width: none;
    padding: 0 0;
    background-color: none; /* Set the background color as needed */
    border: none; /* Add borders or styling as needed */
    box-shadow: none; /* Add box shadow for a better appearance */
    height: auto;
  }
}
</style>
