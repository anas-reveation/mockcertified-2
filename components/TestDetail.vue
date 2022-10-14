<template>
  <div>
    <div class="row justify-content-between">
      <h1 class="col fw-bolder text-capitalize pe-0 font_size_32">{{ title }}</h1>
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
      <h3 class="fw-bolder font_size_20">Created by:</h3>
      <div class="col-9 text-capitalize fw-bolder">
        <img
          src="@/assets/images/profile_icon.svg"
          alt="user"
          class="me-1 mb-1"
          height="30"
          width="30"
        />
        {{ fullName }}
        <span v-if="price" class="text-primary fw-bolder ms-2 d-none d-sm-inline">
          {{ formatedPrice }}
        </span>
        <span
          v-else-if="priceZero"
          class="text-primary fw-bolder text-end text-success d-none d-sm-inline"
        >
          Free
        </span>
      </div>

      <span v-if="price" class="col-3 text-primary fw-bolder text-end d-sm-none">
        {{ formatedPrice }}
      </span>
      <span
        v-else-if="priceZero"
        class="col-3 text-primary fw-bolder text-end text-success d-sm-none"
      >
        Free
      </span>
    </div>

    <div class="mt-3">
      <h3 class="fw-bolder font_size_20">Description</h3>
      <p class="font_size_16">
        {{ seeMore ? description : truncatePara(description) }}
        <span v-if="wordLength > wordCount">
          <span @click="seeMore = !seeMore" v-if="!seeMore" class="fw-bolder">See more</span>
          <span @click="seeMore = !seeMore" v-else-if="seeMore" class="fw-bolder">...See less</span>
        </span>
      </p>
    </div>

    <div v-if="credit" class="mt-3">
      <h3 class="fw-bolder font_size_20">Test Material Reference</h3>
      <p class="font_size_16">
        {{ credit }}
      </p>
    </div>

    <div v-if="rejectDescription" class="mt-3">
      <h3 class="fw-bolder font_size_20">Rejected</h3>
      <p class="font_size_16">
        {{ rejectDescription }}
      </p>
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
    credit: {
      type: String,
      default: '',
    },
    rejectDescription: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      formatedPrice: 0,
      seeMore: false,
      wordCount: 55,
      wordLength: 0,
      priceZero: false,
    };
  },

  computed: {},

  mounted() {
    if (this.price === 0) {
      // this.price = '$0.00';
      this.priceZero = true;
    }

    this.wordLength = this.description.trim().split(' ').length;

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

    truncatePara(str) {
      const array = str.trim().split(' ');
      const ellipsis = array.length > this.wordCount ? '...' : '';
      return array.slice(0, this.wordCount).join(' ') + ellipsis;
    },
  },
};
</script>
