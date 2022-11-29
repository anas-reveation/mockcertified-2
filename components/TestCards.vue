<template>
  <div
    class="bg-secondary border border-2 border-primary rounded-1 position-relative px-2 py-1 card_height"
  >
    <div class="row">
      <p class="col-7 fw-bolder mb-0" v-if="title">{{ title }}</p>
      <p class="col-5 text-capitalize fw-bolder text-end text-success" v-if="price === '$0.00'">
        Free
      </p>
      <p class="col-5 text-capitalize fw-bolder text-end" v-else-if="price">{{ price }}</p>
      <p class="col-7 mb-0 fs-7 fw-light" v-if="authorName">By-{{ authorName }}</p>
      <p class="col-7 fs-7 fw-light" v-if="dateTime">{{ dateTime }}</p>
    </div>

    <span v-if="description" class="font_family_roboto font_size_16">
      {{ description }}
    </span>
    <span
      v-if="addToCart || removeItem"
      class="position-absolute top-100 start-100 translate-middle"
    >
      <img
        v-if="addToCart"
        src="@/assets/images/add_cart_icon.svg"
        alt="add-to-cart-icon"
        width="30"
        height="30"
      />
      <img
        v-if="removeItem"
        src="@/assets/images/remove_icon.svg"
        alt="add-to-cart-icon"
        width="30"
        height="30"
        @click="removeCartItemLocal(testId)"
      />
    </span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    title: String,
    description: String,
    price: Number | String,
    testId: String,
    addToCart: {
      type: Boolean,
      default: false,
    },
    dateTime: {
      type: String,
      default: null,
    },
    authorName: {
      type: String,
      default: null,
    },
    removeItem: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    ...mapMutations('buyer', ['removeCartItem']),

    removeCartItemLocal(id) {
      this.removeCartItem(id);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

@include media-breakpoint-up(sm) {
  .card_height {
    height: 265px;
  }
}

@include media-breakpoint-up(md) {
  .card_height {
    height: 265px;
  }
}

@include media-breakpoint-up(lg) {
  .card_height {
    height: 220px;
  }
}

@include media-breakpoint-up(xl) {
  .card_height {
    height: 180px;
  }
}
</style>
