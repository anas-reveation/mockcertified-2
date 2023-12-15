<template>
  <div class="mt-5 py-5 bg-lightGreen">
    <div class="container">
      <h2
        class="text-black font-size-24 font-size-md-28 font-size-lg-44 fw-bolder text-center font_family_poppins_bold mb-5"
      >
        We got what you're<span class="text-primary"> looking for</span>
      </h2>
      <div class="row g-3">
        <div v-for="(item, index) in data" :key="index" class="col-12 col-md-6 col-xl-3">
          <div class="looking_card d-flex flex-column h-100">
            <div>
              <img
                src="~assets/images/looking_card.svg"
                :alt="`card_${index + 1}`"
                class="w-100 card_height"
              />
            </div>
            <div class="p-3 flex-grow-1 d-flex flex-column justify-content-between">
              <div class="h-100 flex-grow-1 d-flex flex-column justify-content-between">
                <div>
                  <p class="fw-bolder font_family_poppins_bold font-size-18 mb-1">
                    {{ item.title }}
                  </p>
                  <p class="font-size-14 font_family_poppins_light mb-1">{{ item.description }}</p>
                </div>
                <div>
                  <img src="@/assets/images/card_star.svg" alt="card_star" class="card_star" />
                </div>
              </div>
              <div>
                <p class="fw-bolder font-size-16 text-primary text-decoration-underline pt-4 mb-0">
                  Explore
                </p>
              </div>
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
      data: [
        {
          title: 'AWS',
          description:
            'From AWS basics to advanced topics, our mock tests ensure you are confident in readiness for any AWS certification test.',
          image: '~assets/images/looking_card.svg', // Replace with your actual image path
        },
        {
          title: 'Google',
          description:
            'Prepare for certifications or enhance cloud skills with our realistic tests to ace those Google Cloud certification tests.',
          image: '~assets/images/looking_card.svg', // Replace with your actual image path
        },
        {
          title: 'Microsoft',
          description:
            'Master Microsoft Azure certifications with our realistic and comprehensive mock tests. Excel confidently!',
          image: '~assets/images/looking_card.svg', // Replace with your actual image path
        },
        {
          title: 'Project Management',
          description:
            'Get PMP-ready with our focused Mock Tests. Master the exam through realistic simulations and comprehensive assessments.',
          image: '~assets/images/looking_card.svg', // Replace with your actual image path
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.bg-lightGreen {
  background-color: rgba(240, 247, 255, 1);
}
.looking_card {
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.09);
  background-color: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}
.card_star {
  width: 100px;
  align-self: flex-end; /* Align to the end of the flex container */
}
.card_height {
  max-height: 100%; /* Ensure image does not exceed the card height */
}
</style>
