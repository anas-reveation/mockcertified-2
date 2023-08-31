<template>
  <div class="background">
    <div class="container mx-auto">
      <div class="row py-5 align-items-center justify-content-center justify-content-lg-between">
        <div
          data-aos="fade-right"
          class="col-8 col-lg-6 mb-5 mb-lg-0 text-center text-lg-center img_parent_container"
        >
          <div class="img_container">
            <svg class="w-100" viewBox="0 0 469 474.1" xmlns="http://www.w3.org/2000/svg">
              <mask id="imageMask">
                <path
                  d="M54.5,474.1000061035156 L0.0,0.0 L414.5,0.0 L469.0,474.1000061035156 L54.5,474.1000061035156"
                  fill="white"
                />
              </mask>
              <image
                class="img_width"
                xlink:href="~/assets/images/jitters-bg.jpg"
                mask="url(#imageMask)"
              />
            </svg>
          </div>
        </div>

        <div data-aos="fade-left" class="col-12 col-lg-5">
          <div class="text-dark">
            <h1 class="font_family_dmsans fw-bold">
              Having Exam Jitters? <i class="text-dark">Count on us.</i>
            </h1>
            <p class="text-dark my-3 font_family_dmsans">
              <span class="span_blue_color">Mockcertifed</span> allows individuals to become
              certified, improve their abilities, and make money while managing their time and being
              efficient. Our dedication to delivering an easy-to-use interface, personalized test
              preparation, and unique adaptability sets us apart from other platforms. With
              MockCertified, individuals can take the next step in their careers with confidence and
              ease.
            </p>
          </div>

          <div class="my-5">
            <button class="explore_btn">Explore Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';
.fw-bold {
  font-weight: bold !important;
}

.img_parent_container {
  clip-path: path(
    'M54.5,474.1000061035156 L0.0,0.0 L414.5,0.0 L469.0,474.1000061035156 L54.5,474.1000061035156'
  );
}
.background {
  background: white;
}
svg {
  width: 100%;
  height: auto;
  display: block;
}

.img_container {
  transform: scale(1, 1);
  transform-origin: 234.5px 237.5px;
}

.img_width {
  width: 150%;
}

a {
  text-decoration: none;
  color: #5271ff !important;
}
p {
  font-size: 18px;
  line-height: 1.2;
}
h1 {
  font-size: 40px;
  line-height: 1;
}
.explore_btn {
  background: black;
  color: white;
  font-size: 12px;
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  font-weight: bold;
  text-transform: uppercase;
  outline: none;
}

@include media-breakpoint-up(lg) {
  h1 {
    font-size: 60px;
    line-height: 1;
  }
  p {
    font-size: 25px;
  }
  .explore_btn {
    font-size: 16px;
    padding: 0.5rem 2rem;
  }
}
</style>