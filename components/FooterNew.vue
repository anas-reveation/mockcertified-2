<template>
  <div class="bg-black">
    <div class="container py-5">
      <div class="row text-white">
        <div class="col-12 col-lg-4">
          <div class="row mb-5 mb-lg-0">
            <div class="col-12 col-md-6 col-lg-12">
              <div class="">
                <img src="~assets/images/icon_footer.svg" alt="icon_footer" />
                <h6 class="font-size-18 pt-4 fw-bolder">
                  T-8,9 Third floor,shubh complex, Some address –380004
                </h6>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-12">
              <div class="mt-5 mt-md-0 pt-0 mt-lg-5 pt-lg-5">
                <div class="d-flex align-items-center py-2">
                  <img src="~assets/images/whatsapp.svg" alt="icon_footer" class="contact_icon" />
                  <p class="font-size-16 fw-light m-0 ps-2">India, +91 9898025261</p>
                </div>
                <div class="d-flex align-items-center py-2">
                  <img src="~assets/images/whatsapp.svg" alt="icon_footer" class="contact_icon" />
                  <p class="font-size-16 fw-light m-0 ps-2">India, +91 9898025261</p>
                </div>
                <div class="d-flex align-items-center py-2">
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
              <ul>
                <p>About Us</p>
                <li>lorem</li>
                <li>lorem</li>
                <li>lorem</li>
              </ul>
            </div>
            <div class="col-6 col-md-3">
              <ul>
                <p>Categories</p>

                <li>lorem</li>
                <li>lorem</li>
                <li>lorem</li>
              </ul>
            </div>
            <div class="col-6 col-md-3">
              <ul>
                <p>Learnings</p>

                <li>lorem</li>
                <li>lorem</li>
                <li>lorem</li>
              </ul>
            </div>
            <div class="col-6 col-md-3">
              <ul>
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

@include media-breakpoint-up(lg) {
  .navbar_new ul li {
    font-size: 16px;
  }
}
</style>
