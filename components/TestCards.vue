<template>
  <div class="bg-secondary border border-2 border-dark rounded-1 position-relative px-2 py-1">
    <div class="row">
      <p class="col text-capitalize fw-bolder" v-if="title">{{ title }}</p>
      <p class="col-4 text-capitalize fw-bolder text-end" v-if="price">{{ price }}</p>
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
