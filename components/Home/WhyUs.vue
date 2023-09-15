<template>
  <div class="background">
    <div class="container">
      <div class="pb-5 head">
        <h1 class="text-center pt-5 font_family_dmsans fw-bold">
          Why <span class="underline_text">Us</span>?
        </h1>
      </div>

      <div class="text-center mt-5 py-5 whyus_circle">
        <div class="position-relative">
          <div class="mx-auto circle_image">
            <img class="img1" src="~/assets/images/circle.svg" alt="circle" />
            <img class="img2" src="~/assets/images/pen.webp" alt="pen" />
          </div>

          <div class="title_container">
            <p class="my-3 font_family_Neuemachina title">Diverse Exams with Countless Sets!</p>
            <p class="font_family_dmsans sub_title">
              Exams as Unique as You: Embrace the Infinite Possibilities of Countless Sets!
            </p>
          </div>
        </div>
        <div class="position-relative">
          <div class="circle_image mx-auto">
            <img class="img1" src="~/assets/images/circle2.svg" alt="circle" />
            <img class="img2" src="~/assets/images/money.svg" alt="money" />
          </div>

          <div class="title_container">
            <p class="my-3 font_family_Neuemachina title">A Passive Path to Profit!</p>
            <p class="font_family_dmsans sub_title">Generate Income by Selling Your Exams</p>
          </div>
        </div>

        <div class="position-relative">
          <div class="circle_image mx-auto">
            <img class="img1" src="~/assets/images/circle3.svg" alt="circle" />
            <img class="img2" src="~/assets/images/globe.svg" alt="globe" />
          </div>

          <div class="title_container">
            <p class="my-3 font_family_Neuemachina title">Seamless Testing Anytime, Anywhere!</p>
            <p class="font_family_dmsans sub_title">
              Experience the Convenience of Our Alexa-Driven Tests - Take Your Exams Anywhere,
              Anytime!
            </p>
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
.background {
  background: linear-gradient(to top left, #d6cdea, #c9d3f1, #f4f2f7, #ddebdc);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: rgb(0, 0, 0) !important;
}

.head h1 {
  font-size: 45px !important;
}
.underline_text {
  text-decoration: underline;
  color: #5271ff !important;
}

.whyus_circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 50px !important;
}

.title {
  font-size: 25px;
  font-weight: bold !important;
}
.title_container {
  width: 220px;
}

.title_container .title {
  font-size: 20px;
}

.circle_image {
  position: relative;
  width: 200px;
  height: 200px;
}

.circle_image .img1 {
  height: 100%;
  width: 100%;
}

.img2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
}

@include media-breakpoint-up(md) {
  .head h1 {
    font-size: 55px;
  }
  .whyus_circle {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
  .title_container .title {
    font-size: 24px;
  }
  .title_container .sub_title {
    font-size: 18px;
  }
}

@include media-breakpoint-up(lg) {
  .whyus_circle {
    gap: 100px !important;
  }
}
</style>