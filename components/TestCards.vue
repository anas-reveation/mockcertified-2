<template>
  <div
    class="shawdow_card position-relative bg-white px-3 py-1 test_card_border_radius card_height"
  >
    <div class="row mt-1">
      <h3
        :title="title"
        class="col-8 fw-bolder mb-0 mb-2 text-truncate font_size_22 test_card_title"
        v-if="title"
      >
        {{ title }}
      </h3>
      <div class="col-4 fw-bolder text-end">
        <span
          v-if="price === '$0.00'"
          class="text-success rounded-pill px-2 py-1 bg_price_green font_size_14"
        >
          Free
        </span>
        <span
          v-else-if="price"
          class="bg_price rounded-pill px-2 py-1 font_size_14 test_card_price"
        >
          {{ price }}
        </span>
      </div>

      <span v-if="category" :title="category" class="text-primary text-truncate mb-1 font_size_14">
        Category: {{ category }}
      </span>

      <p class="col-7 mb-0 fs-7 fw-light font_size_14 test_card_desc" v-if="authorName">
        By-{{ authorName }}
      </p>
      <p class="col-7 fs-7 fw-light text-muted font_size_14 test_card_desc" v-if="dateTime">
        {{ dateTime }}
      </p>

      <a
        class="col-7 fs-7 fw-light text-muted font_size_14 test_card_desc"
        v-if="status == 'PENDING_APPROVAL'"
      >
        Publish
      </a>
    </div>

    <span
      v-if="description"
      class="position-relative position-absolute bottom-0 start-0 text-primary ps-2 m-2 font_size_14 test_card_desc"
    >
      {{ description }}
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
    category: {
      type: String,
      default: null,
    },
    dateTime: {
      type: String,
      default: null,
    },
    authorName: {
      type: String,
      default: null,
    },
    status: {
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

.bg_price {
  background: rgba(255, 193, 7, 0.21);
}

.test_card_border_radius {
  border-radius: 10px;
}

.bg_price_green {
  background: rgba(76, 175, 80, 0.3);
}

.card_height {
  height: 180px;
}

@include media-breakpoint-up(sm) {
  .card_height {
    height: 200px;
  }
}

// @include media-breakpoint-up(md) {
//   .card_height {
//     height: 265px;
//   }
// }

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

@include media-breakpoint-down(lg) {
  .test_card_title {
    font-size: 18px;
  }

  .test_card_price {
    font-size: 12px;
  }

  .test_card_desc {
    font-size: 12px;
  }
}
</style>
