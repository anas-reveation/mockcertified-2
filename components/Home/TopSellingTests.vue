<template>
  <div class="background">
    <div class="container py-5">
      <div>
        <h1 class="text-left fw-bold font_family_aileron title">
          Our Top - <br />
          Selling Tests
        </h1>
        <p class="subtitle">
          <span class="span_blue_color">for the week</span>
        </p>
      </div>

      <div>
        <div class="row">
          <div class="col-12 col-md-4">
            <div class="count"><p>01</p></div>
            <div>
              <img class="w-100" src="~/assets/images/project-management.webp" alt="" />
            </div>
            <div class="caption my-3 font_family_montserrat"><p>PROJECT MANAGEMENT</p></div>
            <div class="sub_caption font_family_montserrat">
              <p>Score a 75 on this and you know you are project management ready!</p>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="count"><p>02</p></div>
            <div>
              <img class="w-100" src="~/assets/images/cloud.webp" alt="" />
            </div>
            <div class="caption my-3 font_family_montserrat"><p>MICROSOFT AZURE ARCHITECT</p></div>
            <div class="sub_caption font_family_montserrat">
              <p>With Updated 2023 exam format.</p>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="count"><p>03</p></div>
            <div>
              <img class="w-100" src="~/assets/images/project-management.webp" alt="" />
            </div>
            <div class="caption my-3 font_family_montserrat"><p>PROJECT MANAGEMENT</p></div>
            <div class="sub_caption font_family_montserrat">
              <p>Take this effective cloud architect exam to know if you're a fit or not!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.background {
  background: white !important;
}
* {
  color: black;
}

.title {
  font-size: 45px;
}
.subtitle {
  font-size: 25px;
}

img {
  height: 300px !important;
  object-fit: cover !important;
}
.count p {
  font-size: 45px;
  font-weight: bold;
  color: #555657 !important;
}
.caption,
.sub_caption {
  font-size: 16px;
  font-weight: 500;
}
.caption p {
  color: var(--dark-blue) !important;
  font-weight: bold;
}

@include media-breakpoint-up(lg) {
  .count p,
  .title {
    font-size: 55px;
  }

  .subtitle {
    font-size: 30px;
  }
  .caption,
  .sub_caption {
    font-size: 20px;
  }
}
</style>