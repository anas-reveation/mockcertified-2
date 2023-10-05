<template>
  <div class="bg_gradient py-4">
    <div class="container">
      <h1 class="my-3 font_family_aileron font_size_64 text-white">More Tests</h1>
      <h4 class="font_family_montserrat font_size_16 text-uppercase fw-bolder text-white">
        By
        <span class="text-primary">{{ $route.params.fullName }} </span>
      </h4>

      <VueSlickCarousel
        :arrows="false"
        :dots="false"
        v-bind="settings"
        v-if="allUserTest.length"
        class="mt-3"
      >
        <div
          v-for="(test, index) in allUserTest"
          :key="index"
          class="mb-3 px-2 py-2"
          data-aos="flip-right"
          v-if="showAllCards || index < displayedCards"
        >
          <NuxtLink :to="`/category/test/${test.slug}`">
            <TestCards
              :title="test.title"
              :price="`$${formatPrice(test.price)}`"
              :category="test.category.name"
              :description="`${test.time_limit} mins • ${
                test.questions.items.length
              } questions • ${totalMarks(test.questions.items)} marks`"
              :dateTime="getDate(test.createdAt)"
            />
          </NuxtLink>
        </div>
      </VueSlickCarousel>
      <div class="d-flex justify-content-end mt-5 pt-5">
        <button
          @click="toggleShowAllCards"
          class="bg-white text-primary border shadow py-2 px-3 my-5 view_button"
        >
          {{ showAllCards ? 'View Less' : 'View More' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  middleware: ['authenticated'],
  components: { VueSlickCarousel },

  data() {
    return {
      allUserTest: [],
      displayedCards: 3, // Initial number of displayed cards
      showAllCards: false, // Flag to determine whether to show all cards
      settings: {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 778,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },

  watch: {
    // searchQuery(newValue) {
    //   this.allCategoriesFilter = this.allCategories.filter((item) =>
    //     item.name.toLowerCase().match(newValue.toLowerCase().replace(/\s+/g, ' ').trim()),
    //   );
    // },
  },

  computed: {
    ...mapState('userTest', ['allTest']),
  },

  async mounted() {
    if (!this.allTest.length || this.allTest.user_id != this.$route.params.userId) {
      await this.getAllTest(`${this.$route.params.userId}`);
    }
    this.allUserTest = this.allTest;

    // Filter the data based on userId
  },

  methods: {
    ...mapActions('userTest', ['getAllTest']),

    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },
    totalMarks(questionsArr) {
      let totalMarks = 0;
      questionsArr?.map((ques) => {
        totalMarks += ques.marks;
      });
      return totalMarks;
    },

    getDate(getdatetime) {
      var dateStr = new Date(getdatetime);
      return dateStr.toLocaleDateString();
    },

    toggleShowAllCards() {
      this.showAllCards = !this.showAllCards; // Toggle the flag

      // If switching to "View Less," reset displayedCards to 3
      if (!this.showAllCards) {
        this.displayedCards = 3;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.bg_gradient {
  background: linear-gradient(
    to right top,
    rgba(236, 236, 236, 0.38),
    rgba(229, 229, 229, 0.39),
    #eee5ff,
    #c5a6ff,
    #682aff
  );
}
.search_container {
  border: 2px solid black;
  border-radius: 25px;
}

.search_icon {
  position: absolute; /* Position the icon */
  right: 0;
  margin-right: 7px; /* Adjust as needed */
}

.search_input {
  border: none;
  outline: none;
  width: 200px;
}
.view_button {
  right: 0;
  border-radius: 12px;
}
</style>
