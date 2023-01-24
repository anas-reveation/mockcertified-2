<template>
  <div>
    <div class="shawdow_card position-relative p-2 px-3 test_card_border_radius">
      <div class="row mt-1">
        <div class="col-7">
          <h1 class="fw-bolder text-break font_size_24 test_detail_title">{{ title }}</h1>
          <span v-if="shortDescription" class="text-primary font_size_14 test_detail_desc">
            {{ shortDescription }}
          </span>
        </div>
        <div class="col-5 text-capitalize fw-bolder text-end">
          <span v-if="price" class="bg_price rounded-pill px-2 py-1 font_size_14 test_detail_desc">
            {{ formatedPrice }}
          </span>

          <span
            v-if="priceZero"
            class="text-success rounded-pill px-2 py-1 bg_price_green font_size_14 test_detail_desc"
          >
            Free
          </span>

          <div v-if="shareFunc" class="mt-2">
            <img
              src="@/assets/images/share_icon.svg"
              alt="share"
              height="30"
              width="30"
              class="cursor_pointer"
              @click="shareFunc"
            />
          </div>
        </div>
      </div>

      <div class="mt-2">
        <h3 class="fw-bolder font_size_18 test_detail_title">Description</h3>
        <div class="my-0 text-break font_size_14 test_detail_desc">
          {{ seeMore ? description : truncatePara(description) }}
          <span v-if="wordLength > wordCount">
            <span @click="seeMore = !seeMore" v-if="!seeMore" class="fw-bolder font_size_14"
              >See more</span
            >
            <span @click="seeMore = !seeMore" v-else-if="seeMore" class="fw-bolder font_size_14">
              ...See less
            </span>
          </span>
        </div>
      </div>

      <div class="mt-3">
        <h3 class="fw-bolder mt-2 font_size_18 test_detail_title">Created By</h3>
        <div
          class="text-primary fw-bolder text-break font_size_16 test_detail_desc"
          v-if="fullName"
        >
          {{ fullName }}
        </div>
      </div>

      <div v-if="credit" class="mt-3">
        <h3 class="fw-bolder font_size_20 test_detail_title">Test Material Reference</h3>
        <p class="text-break font_size_16 test_detail_desc">{{ credit }}</p>
      </div>

      <div v-if="rejectDescription" class="mt-3">
        <h3 class="fw-bolder font_size_20 test_detail_title">Rejected</h3>
        <p class="text-break font_size_16 test_detail_desc">
          {{ rejectDescription }}
        </p>
      </div>
    </div>

    <slot />
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

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.test_card_border_radius {
  border-radius: 10px;
}

.bg_price {
  background: rgba(255, 193, 7, 0.21);
}

.bg_price_green {
  background: rgba(76, 175, 80, 0.3);
}

.card_width {
  min-width: 350px;
}

@include media-breakpoint-down(lg) {
  .test_detail_title {
    font-size: 18px;
  }

  .test_detail_desc {
    font-size: 14px;
  }
}
</style>
