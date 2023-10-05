<template>
  <div>
    <div class="shawdow_card position-relative p-2 px-3 test_card_border_radius">
      <div class="row mt-1">
        <div class="col-8">
          <h1 class="fw-bolder text-break font_size_24 test_detail_title">{{ title }}</h1>
          <span v-if="shortDescription" class="text-primary font_size_14 test_detail_desc">
            {{ shortDescription }}
          </span>
        </div>
        <div class="col-4 text-capitalize fw-bolder text-end">
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
        <h3 class="fw-bolder font_size_18 test_detail_title">
          Description
          <img
            v-if="isDescEdit"
            src="@/assets/images/edit.svg"
            alt="edit"
            @click="isEditTestDesc = !isEditTestDesc"
            class="ms-2 mb-1 cursor_pointer edit_icon"
          />
        </h3>

        <form v-if="isEditTestDesc" @submit.prevent="editTestDesc">
          <client-only>
            <tiptap-editor
              :value="editTestDescContent"
              class="font_size_14"
              v-on:input="inputShow"
            />
          </client-only>

          <div class="text-end mt-2">
            <button
              type="submit"
              class="bg-primary border border-primary rounded p-2 text-white font_size_14"
            >
              submit
            </button>
          </div>
        </form>

        <div v-else class="my-0 text-break font_size_14 test_detail_desc">
          <div
            class="position-relative"
            :class="[
              !seeMore && 'test_desc_height overflow-hidden',
              seeMoreBtn && !seeMore && 'blur_bottom',
            ]"
            v-html="editTestDescContent"
            ref="container"
          ></div>
        </div>

        <div v-if="seeMoreBtn">
          <span
            v-if="seeMore"
            @click="seeMore = !seeMore"
            class="text-primary font_size_14 cursor_pointer"
          >
            see less..
          </span>
          <span v-else @click="seeMore = !seeMore" class="text-primary font_size_14 cursor_pointer">
            see more..
          </span>
        </div>
      </div>

      <div class="mt-3">
        <h3 class="fw-bolder mt-2 font_size_18 test_detail_title">Created By</h3>
        <NuxtLink :to="{ name: 'user-test', params: { userId: userId, fullName: fullName } }">
          <div
            class="text-primary fw-bolder text-break font_size_16 test_detail_desc"
            v-if="fullName"
          >
            {{ fullName }}
          </div>
        </NuxtLink>
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
    userId: String,
    credit: {
      type: String,
      default: '',
    },
    rejectDescription: {
      type: String,
      default: '',
    },
    isInColumn: {
      type: Boolean,
      default: false,
    },

    isDescEdit: {
      type: Boolean,
      default: false,
    },
    descEditFun: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      formatedPrice: 0,
      seeMore: false,
      seeMoreBtn: true,
      // wordCount: 55,
      // wordLength: 0,
      priceZero: false,
      isEditTestDesc: false,
      editTestDescContent: '',
      containerHeight: 0,
    };
  },

  watch: {
    containerRef: function () {
      this.containerHeight = this.$refs[this.containerRef].scrollHeight;
    },
  },

  mounted() {
    if (this.price === 0) {
      // this.price = '$0.00';
      this.priceZero = true;
    }
    this.editTestDescContent = this.description;
    // this.wordLength = this.description.trim().split(' ').length;

    if (this.price && typeof this.price === 'number') {
      this.formatedPrice = `$${this.formatPrice(this.price)}`;
    } else if (this.price) {
      this.formatedPrice = this.price;
    }

    this.$nextTick(() => {
      const container = this.$refs.container;
      this.containerHeight = container.scrollHeight;
      if (this.containerHeight < 100) {
        this.seeMoreBtn = false;
      }
    });
  },

  methods: {
    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },

    checkWordCount(str) {
      const array = str.trim().split(' ');
      return array.length > this.wordCount;
    },

    truncatePara(str) {
      const array = str.trim().split(' ');
      const ellipsis = array.length > this.wordCount ? '...' : '';
      return array.slice(0, this.wordCount).join(' ') + ellipsis;
    },

    async editTestDesc() {
      if (this.editTestDescContent && this.editTestDescContent !== '<p></p>') {
        await this.descEditFun(this.editTestDescContent);
        this.isEditTestDesc = false;
      }
      if (this.containerHeight < 100) {
        this.seeMoreBtn = false;
      } else {
        this.seeMoreBtn = true;
      }
      // this.wordLength = this.editTestDescContent.trim().split(' ').length;
    },

    async inputShow(ff) {
      this.editTestDescContent = ff;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.edit_icon {
  width: 15px;
  height: 15px;
}

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

.test_desc_height {
  max-height: 100px;
}

// Blur
.blur_bottom:after {
  content: '';
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 90%);
  width: 100%;
  height: 4em;
}

.textarea_box {
  border: 1.5px solid #878787;
  border-radius: 4px;
}

.submit_btn {
  height: 20px;
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
