<template>
  <div class="my-5">
    <div class="container d-flex flex-column justify-content-center align-items-center">
      <div class="text-center my-4 w_100">
        <h3 class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder font_family_poppins_bold">
          Featured blog posts
        </h3>
        <p class="font-size-10 font-size-md-12 font-size-lg-14">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="blog_card mb-4 mb-lg-0">
            <!-- Card content goes here using the 'card' object -->
            <img src="~assets/images/blog_card_1.svg" alt="card_blog" class="w-100" />
            <div class="">
              <div class="d-flex align-items-center font-size-14 font-size-md-16">
                <div class="my-3">
                  <p class="bg_green mb-0 p-2">AWS</p>
                </div>
                <p class="mb-0 ms-3">5 min read</p>
              </div>
              <h4 class="fw-bolder font_family_poppins_bold font-size-24 font-size-lg-32 mb-3">
                How to choose the right customer for your photo business?
              </h4>
              <p class="font-size-14 font-size-lg-16 mb-2`">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
                eros.
              </p>
              <div class="d-flex align-items-center my-3">
                <p class="font-size-16 mb-0">Read More</p>
                <img src="~assets/images/blog_arrow.svg" alt="arrow" class="ms-2" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="row gy-4">
            <div v-for="i in 2" class="col-12 col-md-6 col-lg-12 blog_card_s p-3">
              <div class="row">
                <div class="col-12 col-lg-5">
                  <img
                    src="~assets/images/blog_card.svg"
                    alt="card_blog"
                    class="w-100 d-none d-lg-block"
                  />
                  <img
                    src="~assets/images/blog_card_s.svg"
                    alt="card_blog"
                    class="w-100 d-block d-lg-none"
                  />
                </div>
                <div class="col-12 col-lg-7">
                  <div class="">
                    <div class="d-flex align-items-center font-size-14 my-3 mt-lg-0">
                      <div class="">
                        <p class="bg_green mb-0 p-2">AWS</p>
                      </div>
                      <p class="mb-0 ms-3">5 min read</p>
                    </div>
                    <h4 class="fw-bolder font_family_poppins_bold font-size-24 mb-3">
                      “Poly Amazing Race” sân chơi đầy thú vị mới dành cho sinh...
                    </h4>
                    <NuxtLink :to="{ name: 'blogslug', params: { blogslug: "AWS" } }">
                      <div class="d-flex align-items-center my-3">
                        <p class="font-size-16 mb-0">Read More</p>
                        <img src="~assets/images/blog_arrow.svg" alt="arrow" class="ms-2" />
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg_green {
  background-color: rgba(244, 244, 244, 1);
}
.blog_card_s {
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.09);
}
</style>
