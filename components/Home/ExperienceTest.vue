<template>
  <div class="overflow-hidden background_image">
    <div class="container">
      <div class="row">
        <div class="col-6"></div>
        <div class="col-12 col-lg-6 my-5">
          <div class="d-flex justify-content-end my-5">
            <div class="col-6 position-relative input_field">
              <input type="text" />
              <i class="fa-solid fa-magnifying-glass search_btn"></i>
            </div>
          </div>

          <div data-aos="fade-left" class="head">
            <h1 class="fw-bold my-5 font_family_aileron">
              Experience <span class="span_blue_color">Tests</span> Like Never Before!
            </h1>
            <p class="my-5 font_family_montserrat">
              MockCertified is an online platform that offers mock tests to individuals preparing
              for various exams. The platform has recently introduced a new feature, Alexa
              integration, to enhance the experience of test-taking for its users. This new feature
              has brought about a new level of convenience, flexibility, and accessibility for
              individuals preparing for exams.
            </p>
          </div>

          <div>
            <button class="blue_button">See More</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.fw-bold{
  font-weight: bold !important;
}
.background_image {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('~/assets/images/experience-test.png');
  background-size: cover;
  background-position: right;
  overflow: hidden;
  width: 100%;
  background-color: black;
  color: white;
}
.head h1 {
  font-size: 40px;
  line-height: 1;
}
.head p {
  font-size: 14px;
}
input:focus {
  outline: none;
}
.input_field {
  display: flex;
  justify-content: flex-end !important;
  align-items: flex-end;
}

.input_field input {
  background: transparent;
  padding: 5px 20px;
  border-radius: 25px;
  border: solid 3px white;
  width: 100%;
  position: relative;
  color: white;
}

.input_field .search_btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.blue_button {
  font-size: 14px;
}
@include media-breakpoint-up(md) {
  .head h1 {
    font-size: 55px;
    line-height: 1;
  }
  .head p {
    font-size: 22px;
  }
}
</style>