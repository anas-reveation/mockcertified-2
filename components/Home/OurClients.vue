<template>
  <div class="overflow-hidden background">
    <div class="container font_family_dmsans">
      <div class="pb-4 pt-0 pt-lg-3 head">
        <h1 class="py-2 text-start text-light fw-bold">
          From Our <span class="span_blue_color">Clients</span>
        </h1>
      </div>

      <div class="row">
        <div class="col-0 col-md-4"></div>
        <div class="col-12 col-md-8">
          <!-- Client 1 start -->
          <div class="row gx-5 mb-5">
            <div class="col-12 col-md-3">
              <p class="my-3 my-md-0 text-start text-light font_family_Neuemachina name">
                Jhon Doe
              </p>
            </div>
            <div class="col-12 col-md-9">
              <p>
                <span class="span_blue_color text-right">
                  "Mockcertified Tests helped me identify my weak points and fully prepare for my
                  Project Management Exam."
                </span>
              </p>
            </div>
          </div>
          <!-- Client 1 End -->

          <!-- Client 2 Starts -->
          <div class="row gx-5 my-5">
            <div class="col-12 col-md-3">
              <p class="name my-3 my-md-0 text-start text-light font_family_Neuemachina">
                Jhon Doe Doe
              </p>
            </div>
            <div class="col-12 col-md-9">
              <p>
                <span class="span_blue_color text-right">
                  "Mockcertified Tests helped me identify my weak points and fully prepare for my
                  Project Management Exam."
                </span>
              </p>
            </div>
          </div>
          <!-- Client 2 End -->

          <!-- Client 3 Starts -->

          <div class="row gx-5 my-5">
            <div class="col-12 col-md-3">
              <p class="name my-3 my-md-0 text-start text-light font_family_Neuemachina">
                Sandrine Logistics
              </p>
            </div>
            <div class="col-12 col-md-9">
              <p>
                <span class="span_blue_color text-right">
                  "Mockcertified Tests helped me identify my weak points and fully prepare for my
                  Project Management Exam."
                </span>
              </p>
            </div>
          </div>
          <!-- Client 3 End -->
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
  background: rgb(1 30 17);
}
.head h1 {
  font-size: 40px;
}
.name {
  font-size: 20px;
  font-weight: bold !important;
}

@include media-breakpoint-up(md) {
  .head h1 {
    font-size: 55px;
  }
}
</style>