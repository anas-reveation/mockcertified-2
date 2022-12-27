<template>
  <div>
    <div class="shawdow_card rounded-1 position-relative p-2">
      <div class="row mt-1">
        <h1 class="col-7 fw-bolder font_size_24">{{ title }}</h1>

        <p class="col-5 text-capitalize fw-bolder text-end" v-if="price">
          <span class="bg_price rounded-pill px-2 py-1">{{ formatedPrice }}</span>
        </p>
        <p class="col-5 fw-bolder text-end" v-else-if="priceZero">
          <span class="text-success rounded-pill px-2 py-1 bg_price_green">Free</span>
        </p>
      </div>

      <div>
        <div class="row">
          <div class="col">
            <span v-if="shortDescription" class="text-primary font_size_16">
              {{ shortDescription }}
            </span>
          </div>
          <div v-if="shareFunc" class="col-2 text-end">
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

        <div class="mt-2">
          <h3 class="fw-bolder font_size_20">Description</h3>
          <p class="font_size_16">
            {{ seeMore ? description : truncatePara(description) }}
            <span v-if="wordLength > wordCount">
              <span @click="seeMore = !seeMore" v-if="!seeMore" class="fw-bolder">See more</span>
              <span @click="seeMore = !seeMore" v-else-if="seeMore" class="fw-bolder"
                >...See less</span
              >
            </span>
          </p>
        </div>

        <div>
          <h3 class="fw-bolder font_size_20">Created By</h3>
          <div class="text-primary fw-bolder" v-if="fullName">{{ fullName }}</div>
        </div>
      </div>

      <div v-if="credit">
        <h3 class="fw-bolder font_size_20">Test Material Reference</h3>
        <p class="font_size_16">dsaddsda</p>
      </div>

      <div v-if="rejectDescription">
        <h3 class="fw-bolder font_size_20">Rejected</h3>
        <p class="font_size_16">
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

.shawdow_card {
  -webkit-box-shadow: 0px 0px 40px 8px rgba(103, 130, 225, 0.18);
  -moz-box-shadow: 0px 0px 40px 8px rgba(103, 130, 225, 0.18);
  box-shadow: 0px 0px 40px 8px rgba(103, 130, 225, 0.18);
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
</style>
