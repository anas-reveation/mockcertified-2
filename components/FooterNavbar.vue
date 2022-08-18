<template>
  <div class="box_shadow">
    <div class="container text-center bg-white py-3">
      <div class="row">
        <div class="col">
          <NuxtLink
            to="/category"
            class="d-flex flex-column align-items-center justify-content-center"
          >
            <div
              class="active_line mb-1"
              :class="$route.path.match(/\/category\/*/g) && 'bg-primary'"
            />
            <img class="m-1" src="@/assets/images/home.svg" alt="home" />
            <span v-if="$route.path.match(/\/category\/*/g)" class="text-primary pb-2 font_size_10">
              Home
            </span>
          </NuxtLink>
        </div>
        <div class="col">
          <NuxtLink
            to="/attempted-test"
            class="d-flex flex-column align-items-center justify-content-center"
          >
            <div
              class="active_line mb-1"
              :class="$route.path.match(/\/attempted-test\/*/g) && 'bg-primary'"
            />
            <img class="m-1" src="@/assets/images/reattempt_icon.svg" alt="reload" />
            <span
              v-if="$route.path.match(/\/attempted-test\/*/g)"
              class="text-primary pb-2 font_size_10"
            >
              Reattempt
            </span>
          </NuxtLink>
        </div>
        <div class="col">
          <NuxtLink
            to="/purchased-test"
            class="d-flex flex-column align-items-center justify-content-center"
          >
            <div
              class="active_line mb-1"
              :class="$route.path.match(/\/purchased-test\/*/g) && 'bg-primary'"
            />
            <img class="m-1" src="@/assets/images/give_test.svg" alt="give_test" />
            <span
              v-if="$route.path.match(/\/purchased-test\/*/g)"
              class="text-primary pb-2 font_size_10"
            >
              Attempt
            </span>
          </NuxtLink>
        </div>
        <div class="col">
          <NuxtLink to="/cart" class="d-flex flex-column align-items-center justify-content-center">
            <div
              class="active_line mb-1"
              :class="$route.path.match(/\/cart\/*/g) && 'bg-primary'"
            />
            <div>
              <img class="m-1" src="@/assets/images/cart.svg" alt="cart" />
              <span class="bg-secondary rounded cart_item"> {{ cartItems.length }} </span>
            </div>

            <span v-if="$route.path.match(/\/cart\/*/g)" class="text-primary pb-2 font_size_10">
              Cart
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState('buyer', ['cartItems']),
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

.cart_item {
  position: absolute;
  width: 15px;
  height: 15px;
  font-size: 13px;
  line-height: 15px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
}

.active_line {
  width: 40px;
  height: 4px;
}

.font_size_10 {
  font-size: 10px;
}
</style>
