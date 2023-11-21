<template>
  <div class="container text-center my-5 py-lg-5 py-0">
    <p class="font-size-14 font-size-md-16 font-size-lg-20 fw-bolder">Frequently asked questions</p>
    <h4 class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder font_family_poppins_bold">
      <span class="text-primary">Everything</span>
      you need to know
    </h4>
    <div class="row align-items-center justify-content-center mt-5">
      <div class="col-12 col-lg-5">
        <img src="~/assets/images/you_know_img.svg" alt="you_know_img" class="w-100" />
      </div>
      <div class="col-12 col-lg-7">
        <div v-for="i in 5" class="btn-group w-100 my-3">
          <button
            type="button"
            class="btn btn-secondary dropdown-toggle d-flex align-items-center justify-content-between coustum_border"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            aria-expanded="false"
            style="text-align: left"
          >
            <span class="font-size-10 font-size-md-14 font-size-lg-20"
              >Right-aligned but left aligned when large screen</span
            >
            <span class="arrow"></span>
          </button>
          <ul
            class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start font-size-10 font-size-md-14 font-size-lg-20"
          >
            <li><button class="dropdown-item" type="button">Action</button></li>
            <li><button class="dropdown-item" type="button">Another action</button></li>
            <li><button class="dropdown-item" type="button">Something else here</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dropdown-toggle::after {
  border: none;
  content: none;
}
.dropdown-toggle .arrow {
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
</style>
