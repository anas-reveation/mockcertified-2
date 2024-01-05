<template>
  <div class="bg_footer">
    <div class="container py-5">
      <div class="row justify-content-between my-4">
        <div
          class="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-center align-items-md-start mb-5 mb-md-0"
        >
          <div class="text-white font-size-16">
            <img src="~assets/images/icon_footer.svg" alt="icon_img" class="h_w_icon" />
            <div class="d-flex align-items-center my-3">
              <img src="~assets/images/mail_footer.svg" alt="icon_img" class="h_w_contact" />
              <p class="mb-0 ps-3">mockcertified@gmail.com</p>
            </div>
            <div class="d-flex align-items-center">
              <img src="~assets/images/phone_footer.svg" alt="icon_img" class="h_w_contact" />
              <p class="mb-0 ps-3">USA, +1 (408) 324-6275</p>
            </div>
          </div>
          <div
            class="text-decoration-underline text-white fw-bolder d-flex my-3 my-md-4 my-lg-5 py-4"
          >
            <NuxtLink to="/categories">
              <p class="text-white">Categories</p>
            </NuxtLink>
            <NuxtLink to="/mock-test">
              <p class="mx-3 text-white">Mock Tests</p>
            </NuxtLink>
            <NuxtLink to="/blogs">
              <p class="text-white">Blogs</p>
            </NuxtLink>
          </div>
          <div class="d-flex">
            <img src="~assets/images/fb_footer.svg" alt="icon_img" class="h_w_social" />
            <img src="~assets/images/x_footer.svg" alt="icon_img" class="mx-3 h_w_social" />
            <img src="~assets/images/insta_footer.svg" alt="icon_img" class="h_w_social" />
            <img src="~assets/images/yt_footer.svg" alt="icon_img" class="mx-3 h_w_social" />
            <img src="~assets/images/in_footer.svg" alt="icon_img" class="h_w_social" />
          </div>
        </div>
        <div class="col-12 col-md-6 px-5 px-md-0 px-lg-5">
          <img src="~assets/images/big_footer.svg" alt="big_img" class="w-100" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.bg_footer {
  background-color: rgba(5, 33, 66, 1);
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
.h_w_contact {
  height: 17px;
  width: 22px;
}
.h_w_icon {
  width: 250px;
}
.h_w_social {
  height: 50px;
  width: 50px;
}

@include media-breakpoint-up(lg) {
  .navbar_new ul li {
    font-size: 16px;
  }
}
</style>
