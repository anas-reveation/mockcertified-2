<template>
  <div class="container text-center my-4 py-lg-5 py-0">
    <p class="font-size-14 font-size-md-16 font-size-lg-20 fw-bolder">Frequently asked questions</p>
    <h4 class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder font_family_poppins_bold">
      <span class="text-primary">Everything</span>
      you need to know
    </h4>
    <div class="row justify-content-center mt-5">
      <div class="col-12 col-lg-5">
        <img src="~/assets/images/you_know_img.svg" alt="you_know_img" class="w-100" />
      </div>
      <div class="col-12 col-lg-7 mt-4 mt-lg-0">
        <div
          v-for="(item, index) in faqData"
          :key="index"
          class="btn-group w-100 mb-4 d-flex flex-column"
        >
          <button
            type="button"
            class="btn btn-secondary d-flex align-items-center justify-content-between coustum_border py-3"
            data-bs-display="static"
            style="text-align: left"
            @click="toggleDropdown(index)"
          >
            <span class="font-size-10 font-size-md-14 font-size-lg-20">{{ item.question }}</span>
            <span class="arrow"></span>
          </button>
          <ul
            v-if="openDropdownIndex === index"
            class="font-size-10 font-size-md-14 font-size-lg-20 text-start dropdown_menu py-2 px-2"
          >
            <p class="font-size-12 font-size-lg-14">{{ item.answer }}</p>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openDropdownIndex: null,
      faqData: [
        {
          question: 'What types of IT professional mock tests do you offer?',
          answer:
            "We offer skill assessment tests covering a diverse range of IT certifications, encompassing AWS, Azure, ITIL, and a variety of others, including PMP. Our platform is designed to cater to diverse IT professionals' needs.",
        },
        {
          question: 'Are the questions on your platform updated regularly?',
          answer:
            'We regularly update our question banks to align with the latest exam syllabus and industry standards. This ensures that you are practicing with the most current and relevant content.',
        },
        {
          question: 'Can I access the mock tests from any device?',
          answer:
            'Absolutely! Our platform is responsive, enabling access to mock tests from any device. However, for phone usage, registration and account creation are required. Study conveniently anytime, anywhere.',
        },
        {
          question: 'Is there a time limit for completing the mock tests?',
          answer:
            'Yes, just like the actual certification exams, our mock tests have time limits. This feature helps you practice time management and enhances your ability to answer questions within the allotted exam duration.',
        },
        {
          question: 'Can I retake the mock tests?',
          answer:
            'Absolutely! You can retake the mock tests as many times as you need to reinforce your knowledge and improve your performance. This flexibility is crucial for effective exam preparation.',
        },
      ],
    };
  },
  methods: {
    toggleDropdown(index) {
      if (this.openDropdownIndex === index) {
        this.openDropdownIndex = null;
      } else {
        this.openDropdownIndex = index;
      }
    },
  },
};
</script>

<style>
.arrow {
  content: '';
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
}
.coustum_border {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
}
.dropdown_menu {
  list-style-type: none;
  border: 1px solid black;
}
</style>
