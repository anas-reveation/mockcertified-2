<template>
  <div class="d-lg-flex justify-content-end">
    <form class="row position-relative mb-3" @submit.prevent="searchQueryFunc">
      <div v-if="!value" class="position-absolute search_icon_position">
        <img src="@/assets/images/search_icon_gray.svg" alt="search-icon" width="20" height="20" />
      </div>
      <input
        class="col form-control border border-1 border-secondary me-2 search_placeholder search_input_rounded input_height"
        :class="[
          !value && 'text_indent',
          isAuthenticated ? 'authenticated_search_input_size' : 'unauthenticated_search_input_size',
        ]"
        type="search"
        maxlength="80"
        placeholder="Search"
        aria-label="Search"
        :value="value"
        @input="updateValue($event.target.value)"
      />

      <!-- We did not use the btn-primary button, which is not aligned centre when the height is specified.  -->
      <button
        class="col-3 d-none d-lg-block text-white border border-primary bg-primary pt-1 font_size_14 input_height border_radius_500"
        :type="searchQueryFunc ? 'submit' : 'button'"
      >
        Search
      </button>

      <button
        class="col-3 d-lg-none btn btn-primary width_search_mobile"
        :type="searchQueryFunc ? 'submit' : 'button'"
      >
        <img src="@/assets/images/search_icon_white.svg" alt="search-icon" />
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    value: String,
    searchQueryFunc: {
      type: Function,
      default: () => {},
    },
  },

  computed: {
    ...mapState('auth', ['isAuthenticated']),
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

.search_icon_position {
  top: 5px;
  // left: -7px;
  width: 35px;
}

.text_indent {
  text-indent: 35px;
}

.border_radius_500 {
  border-radius: 500px;
  width: 100px;
}

.width_search_mobile {
  width: 55px;
}

@include media-breakpoint-up(lg) {
  .search_input_rounded {
    border-radius: 20px;
  }

  .input_height {
    height: 40px;
  }
}

@include media-breakpoint-up(lg) {
  .authenticated_search_input_size {
    width: 530px !important;
  }
  .unauthenticated_search_input_size {
    width: 430px !important;
  }
}

.search_placeholder::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #e8edff;
  opacity: 1; /* Firefox */
}

.search_placeholder:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #e8edff;
}

.search_placeholder::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #e8edff;
}
</style>
