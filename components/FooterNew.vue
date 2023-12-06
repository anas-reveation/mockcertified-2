<template>
  <div class="bg_footer">
    <div class="container py-5 px-4">
      <div class="row text-white">
        <div class="col-12 col-lg-4">
          <div class="row mb-5 mb-lg-0">
            <div class="col-12 col-md-6 col-lg-12">
              <div class="">
                <img src="~assets/images/icon_footer.svg" alt="icon_footer" />
                <h6 class="font-size-16 font-size-xl-18 pt-4 fw-bolder line_height">
                  T-8,9 Third Floor, Shubh Complex,<br />
                  Near Cityshine 2, Shahibaug,<br />
                  Ahmedabad - 380004, Gujarat, India.
                </h6>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-12">
              <div class="mt-5 mt-md-0 pt-0 mt-lg-5 pt-lg-5">
                <div
                  class="d-flex align-items-center justify-content-start justify-content-md-end justify-content-lg-start py-2"
                >
                  <img src="~assets/images/whatsapp.svg" alt="icon_footer" class="contact_icon" />
                  <p class="font-size-16 fw-light m-0 ps-2">India, +91 9898025261</p>
                </div>
                <div
                  class="d-flex align-items-center justify-content-start justify-content-md-end justify-content-lg-start py-2"
                >
                  <img src="~assets/images/whatsapp.svg" alt="icon_footer" class="contact_icon" />
                  <p class="font-size-16 fw-light m-0 ps-2">India, +91 9898025261</p>
                </div>
                <div
                  class="d-flex align-items-center justify-content-start justify-content-md-end justify-content-lg-start py-2"
                >
                  <img src="~assets/images/whatsapp.svg" alt="icon_footer" class="contact_icon" />
                  <p class="font-size-16 fw-light m-0 ps-2">India, +91 9898025261</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-8 py-3">
          <div class="row g-4 navbar_new font-size-16">
            <div class="col-6 col-md-3">
              <ul class="ps-0 ps-lg-auto">
                <p>About Us</p>
                <li>lorem</li>
                <li>lorem</li>
                <li>lorem</li>
              </ul>
            </div>
            <div class="col-6 col-md-3">
              <ul class="ps-0 ps-lg-auto">
                <p>Categories</p>

                <li>lorem</li>
                <li>lorem</li>
                <li>lorem</li>
              </ul>
            </div>
            <div class="col-6 col-md-3">
              <ul class="ps-0 ps-lg-auto">
                <p>Learnings</p>

                <li>lorem</li>
                <li>lorem</li>
                <li>lorem</li>
              </ul>
            </div>
            <div class="col-6 col-md-3">
              <ul class="ps-0 ps-lg-auto">
                <p>Option Four</p>

                <li>lorem</li>
                <li>lorem</li>
                <li>lorem</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.bg_footer {
  background-color: #052142;
}

.contact_icon {
  width: 20px;
}

.navbar_new ul p {
  font-weight: 600;
  padding-bottom: 3px;
}

.navbar_new ul li {
  padding-bottom: 8px;
  text-decoration: none;
  list-style-type: none;
  font-size: 14px;
}
.line_height {
  line-height: 1.5rem;
}

@include media-breakpoint-up(lg) {
  .navbar_new ul li {
    font-size: 16px;
  }
}
</style>
