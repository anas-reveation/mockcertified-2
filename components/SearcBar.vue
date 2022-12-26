<template>
  <div class="d-sm-flex justify-content-end">
    <form class="row position-relative mb-3 width_res" @submit.prevent="searchQueryFunc">
      <div v-if="!value" class="position-absolute search_icon_position mt-1">
        <img src="@/assets/images/search_icon_gray.svg" alt="search-icon" width="20" height="20" />
      </div>
      <input
        class="col form-control border border-1 border-secondary rounded-3 me-2"
        :class="!value && 'bg_input text_indent'"
        type="search"
        maxlength="80"
        placeholder="Search"
        aria-label="Search"
        :value="value"
        @input="updateValue($event.target.value)"
      />
      <button
        class="col-3 d-none d-md-block text-white btn btn-primary px-2 border_radius_16"
        :type="searchQueryFunc ? 'submit' : 'button'"
      >
        Search
      </button>

      <button
        class="col-3 d-md-none btn btn-primary width_search_mobile"
        :type="searchQueryFunc ? 'submit' : 'button'"
      >
        <img src="@/assets/images/search_icon_white.svg" alt="search-icon" />
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    searchQueryFunc: {
      type: Function,
      default: () => {},
    },
  },

  methods: {
    updateValue(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

// .bg_input {
//   background-color: #e9edfb;
// }

.search_icon_position {
  top: 5px;
  left: -7px;
  width: 35px;
}

.text_indent {
  text-indent: 35px;
}

.border_radius_16 {
  border-radius: 16px;
}

.width_search_mobile {
  width: 55px;
}

@include media-breakpoint-up(sm) {
  .width_res {
    width: 380px !important;
  }
}
</style>
