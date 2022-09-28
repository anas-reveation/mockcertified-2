<template>
  <form class="row position-relative mb-3" @submit.prevent="searchQueryFunc">
    <div v-if="!value" class="position-absolute search_icon_position">
      <img src="@/assets/images/search_icon.svg" alt="search-icon" width="30" height="30" />
    </div>
    <input
      class="col form-control border border-2 border-primary rounded-pill me-2"
      :class="!value && 'bg_input text_indent'"
      type="search"
      maxlength="80"
      placeholder="Search"
      aria-label="Search"
      :value="value"
      @input="updateValue($event.target.value)"
    />
    <button
      class="col-3 btn btn-primary text-white px-2 border_radius_16"
      :type="searchQueryFunc ? 'submit' : 'button'"
    >
      Search
    </button>
  </form>
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

<style scoped>
.bg_input {
  background-color: #e9edfb;
}

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
</style>
