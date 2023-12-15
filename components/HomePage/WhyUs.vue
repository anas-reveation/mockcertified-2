<template>
  <div class="bg-lightGreen">
    <div class="container py-5">
      <h2
        class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder text-black text-center font_family_poppins_bold"
      >
        Why Us?
      </h2>
      <div class="row py-5 g-4">
        <div v-for="(item, index) in whyUsData" :key="index" class="col-12 col-md-6 col-lg-3 pt-5">
          <div
            class="d-flex flex-column justify-content-center align-items-center bg-white px-3 rounded_border"
          >
            <div class="d-flex flex-column justify-content-center align-items-center">
              <div class="upper_circle d-flex align-items-center justify-content-center">
                <img
                  class="element_h_w"
                  src="~assets/images/why_us_element.svg"
                  alt="why_us_element"
                />
              </div>
              <div class="bg_circle"></div>
            </div>
            <div class="text-center py-4">
              <p class="text-primary font-size-16 fw-bolder font_family_poppins_bold">
                {{ item.title }}
              </p>
              <p class="font-size-14">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      whyUsData: [
        {
          title: 'Test Diversity',
          description: 'Affordable tests for IT, AWS, PMP, and diverse certifications.',
        },
        {
          title: 'Quality Assurance',
          description: 'Tests are aligned with industry standards for accurate preparation.',
        },
        {
          title: 'Budget-Friendly Pricing',
          description: 'Budget-friendly prep, making certification accessible to all.',
        },
        {
          title: 'Earn Passively',
          description: 'Profit from your knowledge by selling your tests.',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.bg-lightGreen {
  background-color: rgba(240, 247, 255, 1);
}
.bg_circle {
  background-color: var(--primary);
  width: 120px;
  height: 60px;
  border-radius: 0 0 60px 60px;
}
.upper_circle {
  background-color: white;
  width: 100px;
  height: 100px;
  border-radius: 70px;
  position: absolute;
  margin: -60px 0 0 0;
  border: 2px solid var(--primary);
}
.element_h_w {
  width: 32px;
  height: 32px;
}
.rounded_border {
  border-radius: 1rem;
}
</style>
