<template>
  <div>
    <div class="row justify-content-between">
      <h1 class="col fw-bolder text-capitalize font_size_32">{{ title }}</h1>
      <div v-if="shareFunc" class="col-2 text-end">
        <img
          src="@/assets/images/share_icon.svg"
          alt="share"
          height="30"
          width="30"
          @click="shareFunc"
        />
      </div>
    </div>
    <p class="my-2 font_family_roboto font_size_16">
      {{ shortDescription }}
    </p>

    <slot />

    <div class="row justify-content-between mt-3">
      <h3 class="fw-bolder">Created by:</h3>
      <div class="col-9 text-capitalize fw-bolder">
        <img
          src="@/assets/images/profile_icon.svg"
          alt="share"
          class="me-1"
          height="30"
          width="30"
        />
        {{ fullName }}
      </div>
      <span v-if="price" class="col-3 text-primary fw-bolder text-end">
        {{ formatedPrice }}
      </span>
    </div>

    <div class="mt-3">
      <h3 class="fw-bolder">Description</h3>
      <p class="font_size_16">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    shortDescription: String,
    description: String,
    price: Number | String,
    fullName: String,
    shareFunc: Function,
  },

  data() {
    return {
      formatedPrice: 0,
    };
  },

  computed: {},

  mounted() {
    if (this.price && typeof this.price === 'number') {
      this.formatedPrice = `$${this.formatPrice(this.price)}`;
    } else if (this.price) {
      this.formatedPrice = this.price;
    }
  },

  methods: {
    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },
  },
};
</script>
