<template>
  <div class="box_shadow">
    <div class="container text-center bg-white py-2 footer_height">
      <div class="row">
        <ClientOnly>
          <div v-if="platform === 'web'" class="col">
            <NuxtLink
              to="/dashboard"
              class="d-flex flex-column align-items-center justify-content-center"
            >
              <!-- <div
                class="active_line mb-1"
                :class="$route.path.match(/\/dashboard\/*/g) && 'bg-primary'"
              /> -->
              <img
                class="m-1"
                :class="$route.path.match(/\/dashboard\/*/g) && 'active_color'"
                src="@/assets/images/home.svg"
                alt="home"
              />
              <span
                v-if="$route.path.match(/\/dashboard\/*/g)"
                class="text-primary fw-bolder pb-2 font_size_10"
              >
                Home
              </span>
            </NuxtLink>
          </div>
        </ClientOnly>
        <div class="col">
          <NuxtLink
            :to="isAuthenticated ? '/protected/attempted-test' : '/auth/login'"
            class="d-flex flex-column align-items-center justify-content-center"
          >
            <!-- <div
              class="active_line mb-1"
              :class="$route.path.match(/\/attempted-test\/*/g) && 'bg-primary'"
            /> -->
            <img
              class="m-1 reattempt_icon_size"
              :class="$route.path.match(/\/attempted-test\/*/g) && 'active_color'"
              src="@/assets/images/reattempt_icon.svg"
              alt="reload"
            />
            <span
              v-if="$route.path.match(/\/attempted-test\/*/g)"
              class="text-primary fw-bolder pb-2 font_size_10"
            >
              Re-attempt
            </span>
          </NuxtLink>
        </div>
        <div class="col">
          <NuxtLink
            :to="isAuthenticated ? '/protected/purchased-test' : '/auth/login'"
            class="d-flex flex-column align-items-center justify-content-center"
          >
            <!-- <div
              class="active_line mb-1"
              :class="$route.path.match(/\/purchased-test\/*/g) && 'bg-primary'"
            /> -->
            <img
              class="m-1"
              :class="$route.path.match(/\/purchased-test\/*/g) && 'active_color'"
              src="@/assets/images/purchase_icon.svg"
              alt="purchase_icon"
            />
            <span
              v-if="$route.path.match(/\/purchased-test\/*/g)"
              class="text-primary fw-bolder pb-2 font_size_10"
            >
              Purchased
            </span>
          </NuxtLink>
        </div>
        <ClientOnly>
          <div v-if="user && user.stripe_seller_id" class="col">
            <NuxtLink
              to="/protected/account"
              class="d-flex flex-column align-items-center justify-content-center"
            >
              <!-- <div
                class="active_line mb-1"
                :class="$route.path.match(/\/account\/*/g) && 'bg-primary'"
              /> -->
              <div class="position-relative">
                <img
                  class="m-1"
                  :class="$route.path.match(/\/account\/*/g) && 'active_color'"
                  src="@/assets/images/wallet.svg"
                  alt="stripe_logo"
                />
              </div>

              <span
                v-if="$route.path.match(/\/account\/*/g)"
                class="text-primary fw-bolder pb-2 font_size_10"
              >
                Balance
              </span>
            </NuxtLink>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState(['platform']),
    ...mapState('auth', ['user', 'isAuthenticated']),
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

<style>
a {
  text-decoration: none;
  color: black;
}

.box_shadow {
  box-shadow: 0px 0px 8px #becbfa;
}

.active_color {
  filter: invert(61%) sepia(98%) saturate(2965%) hue-rotate(203deg) brightness(91%) contrast(92%);
}

.active_line {
  width: 40px;
  height: 4px;
}

.reattempt_icon_size {
  height: 26px;
}
</style>
