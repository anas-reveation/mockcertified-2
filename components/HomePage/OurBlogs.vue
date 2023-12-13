<template>
  <div class="my-5">
    <h2
      class="text-black font-size-24 font-size-md-28 font-size-lg-44 fw-bolder text-center font_family_poppins_bold my-5"
    >
      Our Blogs
    </h2>
    <div class="container">
      <div class="row g-4 d-none d-lg-flex">
        <div v-for="i in 3" :key="i" class="col-12 col-md-6 col-lg-4">
          <div class="blog_card h-100">
            <img src="@/assets/images/blogs_card.svg" alt="card_1" class="w-100" />
            <div class="d-flex flex-column justify-content-between p-3">
              <div class="">
                <p class="fw-bolder font-size-26 mb-0">Nunc sed eldqt lectus Lorem</p>
                <p class="font-size-14">1st Aug, 2022</p>
                <p class="font-size-14">
                  Lorem ipsum dolor sit amet, consectetur uadipelioeiusmod tempor incididunt ut labo
                  ipsum dolor sit amet, consecteturempor uq
                </p>
              </div>
              <div>
                <p class="fw-bolder font-size-16 text-primary text-decoration-underline pt-5">
                  Read More
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-4 d-flex d-lg-none">
        <div v-for="i in 2" :key="i" class="col-12 col-md-6 col-lg-4">
          <div class="blog_card h-100">
            <img src="@/assets/images/blogs_card.svg" alt="card_1" class="w-100" />
            <div class="d-flex flex-column justify-content-between p-3">
              <div class="">
                <p class="fw-bolder font-size-26 mb-0">Nunc sed eldqt lectus Lorem</p>
                <p class="font-size-14">1st Aug, 2022</p>
                <p class="font-size-14">
                  Lorem ipsum dolor sit amet, consectetur uadipelioeiusmod tempor incididunt ut labo
                  ipsum dolor sit amet, consecteturempor uq
                </p>
              </div>
              <div>
                <p class="fw-bolder font-size-16 text-primary text-decoration-underline pt-5">
                  Read More
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="fw-bolder font-size-16 text-primary text-decoration-underline text-end my-4">
        View More
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';
.blog_card {
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.09);
  border-radius: 10px;
  border: 0.5px solid rgba(0, 0, 0, 0.15);
}

.blog_card img {
  border-radius: 10px 10px 0 0;
}
</style>
