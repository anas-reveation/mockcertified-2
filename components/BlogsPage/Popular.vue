<template>
  <div class="my-5">
    <div class="container d-flex flex-column justify-content-center align-items-center">
      <div class="text-center my-4 w_100">
        <h3
          class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder font_family_poppins_bold py-3"
        >
          Popular
        </h3>
        <p class="font-size-10 font-size-md-12 font-size-lg-14">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
    <div class="container">
      <div class="row gy-4">
        <div v-for="i in 3" class="col-12 col-md-6 col-lg-4 blog_card_s">
          <div class="d-flex flex-column">
            <img src="~assets/images/popular_card.svg" alt="card_blog" class="w-100" />
            <div class="">
              <div class="d-flex align-items-center font-size-14 my-3">
                <div class="">
                  <p class="bg_green mb-0 p-2">AWS</p>
                </div>
                <p class="mb-0 ms-3">5 min read</p>
              </div>
              <h4 class="fw-bolder font_family_poppins_bold font-size-24 mb-3">
                Travelling as a way of self-discovery and progress
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
      </div>
    </div>
  </div>
</template>

<style>
.bg_green {
  background-color: rgba(244, 244, 244, 1);
}
</style>
