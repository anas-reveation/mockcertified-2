<template>
  <div class="mt-5 mt-md-0">
    <div class="bg_div m-0 px-0">
      <div class="row justify-content-between align-items-center">
        <div class="col-12 col-md-4 m-0 py-5 order">
          <img src="@/assets/images/lady_laptop.svg" alt="lady_laptop" class="w-100" />
        </div>
        <div
          class="col-12 col-md-7 col-xl-6 me-auto px-4 me-md-3 me-lg-5 d-flex flex-column align-items-center align-items-md-start"
        >
          <h2
            class="text-black fw-bolder font-size-24 font-size-md-28 font-size-lg-44 text-center text-md-start font_family_poppins_bold"
          >
            Having Exams Jitters? <br /><span class="text-primary">Count on us</span>
          </h2>
          <p
            class="font-size-10 font-size-md-12 font-size-lg-14 fw-light text-center text-md-start font_family_poppins_light"
          >
            Mockcertifed allows individuals to become certified, improve their abilities, and make
            money while managing their time and paving the way to professional growth. Our
            dedication to delivering an easy-to-use interface, personalized test preparation, and
            unique adaptability sets us apart from other platforms. With Mockcertified, individuals
            can take the next step in their careers with confidence and ease.
          </p>
          <button class="login_btn mt-3 mt-md-5">Learn More</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.bg_div {
  background-image: url('~@/assets/images/clip_path.svg'); /* Path to your image */
  width: 100%;
  background-size: 100% 100%;
}
.login_btn {
  background-color: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 3px; /* Adjust the border radius as needed */
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  width: 100px;
  padding: 10px 0;
}

/* Optionally, you can add hover styles to make the button interactive */
.learn_more:hover {
  background-color: var(--primary);
  color: white;
}
.order {
  order: 2;
}

@include media-breakpoint-up(md) {
  .order {
    order: 0;
  }
  .login_btn {
    border-radius: 6px;
    padding: 7px 16px;
    font-size: 14px;
    width: 120px;
    border: 2px solid var(--primary);
  }
}

@include media-breakpoint-up(xl) {
  .login_btn {
    font-size: 16px;
    font-weight: 500;
    width: 130px;
  }
}
</style>
