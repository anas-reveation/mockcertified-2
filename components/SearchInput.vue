<template>
  <div class="d-lg-flex">
    <form class="row position-relative mb-3 w-100" @submit.prevent="searchQueryFunc">
      <div v-if="!value" class="position-absolute search_icon_position">
        <img src="@/assets/images/search_icon_gray.svg" alt="search-icon" width="18" height="18" />
      </div>

      <input
        class="col form-control border border-1 border-secondary me-2 search_placeholder search_input_rounded input_height py-3"
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
        @keyup.enter="searchQueryFunc"
      />
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

.input_height {
  height: 16px;
}

@include media-breakpoint-down(lg) {
  .input_height {
    height: 18px;
  }

  .search_icon_position {
    top: 3px;
  }

  .search_placeholder {
    font-size: 12px;
  }
}

@include media-breakpoint-up(lg) {
  .search_input_rounded {
    border-radius: 20px;
  }

  .authenticated_search_input_size {
    width: 100% !important;
  }
  .unauthenticated_search_input_size {
    width: 100% !important;
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
