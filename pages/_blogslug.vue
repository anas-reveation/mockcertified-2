<template>
  <div>
    <div class="bg_div">
      <div class="container py-5">
        <h2 class="font-size-28 font-size-md-38 font_family_poppins_bold text-white my-4">
          {{ $route.params.blogslug }}
        </h2>
      </div>
    </div>
    <div class="container my-5">
      <h2 class="font-size-24 font-size-md-44 font-size-lg-50 font_family_poppins_bold">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do?
      </h2>
      <div class="row justify-content-between align-items-center my-4">
        <div class="col-10 col-md-5 col-lg-4 col-xl-3">
          <div class="row align-items-center mb-3">
            <div class="col-3">
              <img src="~assets/images/blog_icon.svg" alt="blog_icon" class="w-100" />
            </div>
            <div class="col-9 d-flex flex-column font-size-14">
              <p class="font-size-14 fw-bolder mb-0 mb-1">Jennifer Aniston</p>
              <div class="d-flex align-items-center">
                <p class="mb-0">11 Jan 2023</p>
                <img src="~assets/images/dot.svg" alt="dot" class="px-2" />
                <p class="mb-0">5 min read</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 col-lg-2">
          <div class="d-flex">
            <img src="~assets/images/attach.svg" alt="attach" class="w-100 me-1" />
            <img src="~assets/images/linkedin.svg" alt="attach" class="w-100 me-1" />
            <img src="~assets/images/twitter.svg" alt="attach" class="w-100 me-1" />
            <img src="~assets/images/fb.svg" alt="attach" class="w-100" />
          </div>
        </div>
      </div>
      <img src="~assets/images/blog_main.svg" alt="blog_main" class="w-100" />
      <div class="border_left">
        <p class="font-size-14 ps-2 mb-0 mt-3 mb-5">Image caption goes here</p>
      </div>
      <h6 class="font-size-16 lh-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem
        ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      </h6>
      <h5 class="font-size-16 font-size-md-24 font-size-lg-30 fw_600 my-4">
        Lorem ipsum dolor sit amet, consectetur
      </h5>
      <h6 class="font-size-16 lh-base">
        Collaboratively deploy intuitive partnerships whereas customized e-markets. Energistically
        maintain performance based strategic theme areas whereas just in time methodologies.
        Phosfluorescently drive functionalized intellectual capital and proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consds swqdectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor
      </h6>
      <div class="border_left my-4">
        <p class="ps-4 mb-0 py-1">
          "Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque
          congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci,
          tincidunt aenean tempus.sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id.
          Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam
          elit, orci "
        </p>
      </div>
      <h6 class="font-size-16 lh-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem
        ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      </h6>
      <h6 class="font-size-16 lh-base my-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem
        ipsum dolor sit amet,
      </h6>
      <div class="row border_bottom py-4 my-4">
        <div class="col-6 col-md-4 col-lg-2 d-flex flex-column">
          <h6 class="font-size-18 fw-bolder">Share this post</h6>
          <div class="d-flex">
            <img src="~assets/images/attach.svg" alt="attach" class="w-100 me-1" />
            <img src="~assets/images/linkedin.svg" alt="attach" class="w-100 me-1" />
            <img src="~assets/images/twitter.svg" alt="attach" class="w-100 me-1" />
            <img src="~assets/images/fb.svg" alt="attach" class="w-100" />
          </div>
        </div>
      </div>
    </div>
    <BlogsPagePopular />
  </div>
</template>

<script>
export default {
  layout: 'homePageLayout',
  name: 'blogslug',
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.bg_div {
  background-image: url('~@/assets/images/banner_cat.svg'); /* Path to your image */
  background-size: cover;
  width: 100%;
}
.border_left {
  border-left: 3px solid var(--primary);
}
.fw_600 {
  font-weight: 600;
}
.border_bottom {
  border-bottom: 3px solid rgba(215, 215, 215, 1);
}
</style>
