<template>
  <div class="background overflow-hidden font_family_dmsans">
    <div class="row position-relative">
      <div class="col-12 col-sm-6 px-5 py-5">
        <div class="head position-relative">
          <h1 class="text-start">
            <span class="fw-bold span_blue_color">Need a helping hand?</span>
          </h1>
          <p>we are one click away!</p>
          <button class="text-dark my-4 blue_button">Contact us</button>
        </div>
        <div class="contacts">
          <div class="phone">
            <p class="contact_title">Phone</p>
            <p class="contact_number">+01 123456789</p>
          </div>
          <div class="email my-4">
            <p class="contact_title">Email</p>
            <a href="mockcertified@gmail.com">mockcertified@gmail.com</a>
          </div>
          <div class="social">
            <p class="contact_title mb-3">Social</p>
            <div class="social_icons mt-3">
              <div><i class="fa-brands fa-facebook-f"></i></div>
              <div><i class="fa-brands fa-twitter"></i></div>
              <div><i class="fa-brands fa-instagram"></i></div>
            </div>
          </div>
        </div>
      </div>

      <div class="position-absolute d-none d-sm-block arrow_image">
        <img class="w-100" src="~/assets/images/arrow.png" alt="" />
      </div>

      <div class="col-6 z_index_1 d-none d-sm-block">
        <img class="w-100 h-100" src="~/assets/images/contact-us-image.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';
p {
  margin: 0 !important;
}
a {
  text-decoration: none;
  font-size: 14px;
}
.fw-bold {
  font-weight: bold !important;
}
.background {
  background: linear-gradient(to top left, #ddebda, #c1ccef, #f3f1f6, #f3f1f6);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: black;
}
.head h1 {
  font-size: 26px;
}

.social_icons {
  display: flex;
  align-items: center;
  gap: 20px;
}

.contact_title {
  font-size: 18px;
  font-weight: bold;
}

.contact_number {
  font-size: 14px;
}
.social i {
  font-size: 25px;
  cursor: pointer;
}

img {
  object-fit: cover;
}

.arrow_image {
  width: 75px;
  height: 75px;
  top: 20%;
  left: 39%;
  transform: rotate(30deg);
  z-index: 1 !important;
}

.blue_button {
  font-size: 10px !important;
  padding: 0.5rem 1rem;
}

@include media-breakpoint-up(md) {
  .head h1 {
    font-size: 55px;
  }
  .head p {
    font-size: 30px;
  }
  .contact_title {
    font-size: 18px;
  }
  .blue_button {
    font-size: 16px !important;
    padding: 0.9rem 3rem;
  }
  a,
  .contact_number {
    font-size: 16px;
  }
  .arrow_image {
    width: 150px;
    height: 150px ;
    left: 40%;
  }
}
</style>
