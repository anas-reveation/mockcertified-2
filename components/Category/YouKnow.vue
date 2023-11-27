<template>
  <div class="container text-center my-4 py-lg-5 py-0">
    <p class="font-size-14 font-size-md-16 font-size-lg-20 fw-bolder">Frequently asked questions</p>
    <h4 class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder font_family_poppins_bold">
      <span class="text-primary">Everything</span>
      you need to know
    </h4>
    <div class="row justify-content-center mt-5">
      <div class="col-12 col-lg-5">
        <img src="~/assets/images/you_know_img.svg" alt="you_know_img" class="w-100" />
      </div>
      <div class="col-12 col-lg-7 mt-4 mt-lg-0">
        <div v-for="i in 5" :key="i" class="btn-group w-100 mb-4 d-flex flex-column">
          <button
            type="button"
            class="btn btn-secondary d-flex align-items-center justify-content-between coustum_border py-3"
            data-bs-display="static"
            style="text-align: left"
            @click="toggleDropdown(i)"
          >
            <span class="font-size-10 font-size-md-14 font-size-lg-20"
              >Right-aligned but left-aligned when a large screen</span
            >
            <span class="arrow"></span>
          </button>
          <ul
            v-if="openDropdownIndex === i"
            class="font-size-10 font-size-md-14 font-size-lg-20 text-start dropdown_menu py-2 px-2"
          >
            <p class="font-size-12 font-size-lg-14">
              Lorum dolor sit amet, consectetur uadipelioeiusmpocididunt ut labo ostrud exercitation
              consequat.ipsum dolamet, secteturempor uq Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
            </p>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openDropdownIndex: null,
    };
  },
  methods: {
    toggleDropdown(index) {
      if (this.openDropdownIndex === index) {
        this.openDropdownIndex = null;
      } else {
        this.openDropdownIndex = index;
      }
    },
  },
};
</script>

<style>
.arrow {
  content: '';
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
}
.coustum_border {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
}
.dropdown_menu {
  list-style-type: none;
  border: 1px solid black;
}
</style>
