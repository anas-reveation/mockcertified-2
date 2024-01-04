<template>
  <div class="my-5 my-5">
    <div class="container d-flex flex-column justify-content-center align-items-center">
      <div class="text-center my-4 w_100">
        <h3 class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder font_family_poppins_bold">
          Find the right category for your <sapn class="text-primary">Skills Assessment Test</sapn>
        </h3>
      </div>
    </div>
    <div class="container">
      <div v-if="isLoaderHidden" class="row mt-4">
        <div v-for="i in 6" :key="i" class="col-12 col-md-4 col-sm-6" data-aos="zoom-in">
          <AnimatedPlaceholder width="200px" borderRadius="50px" class="m-2" />
        </div>
      </div>
      <div v-if="allCategoriesFilter.length" class="row g-4">
        <div
          v-for="category in allCategoriesFilter"
          :key="category.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <NuxtLink :to="`categories/${category.slug}`" :key="category.id">
            <div class="card h-100 d-flex flex-row p-3 align-items-center">
              <img :src="category.image" alt="category_img" class="card_img" />
              <div class="ms-3">
                <p class="fw-bolder font-size-18 mb-0" :title="category.name">
                  {{ category.name }}
                </p>
                <!-- <p class="fw-light font-size-14">lorem ipsum dolor</p> -->
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      allCategories: [],
      searchQuery: '',
      allCategoriesFilter: [],
      isHovering: false,
    };
  },

  computed: {
    ...mapState(['isLoaderHidden']),
    ...mapState('testManagement', ['categories']),
  },

  async mounted() {
    this.setIsLoaderHidden(true);
    if (!this.categories.length) {
      await this.getAllCategories();
    }
    this.allCategories = this.categories;
    this.allCategoriesFilter = [...this.allCategories].sort((a, b) => {
      const nameA = a.name.toLowerCase(); // Convert names to lowercase for case-insensitive sorting
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1; // nameA comes before nameB
      }
      if (nameA > nameB) {
        return 1; // nameA comes after nameB
      }
      return 0; // names are equal
    });
    this.setIsLoaderHidden(false);
  },

  methods: {
    ...mapMutations(['setIsLoaderHidden']),
    ...mapActions('testManagement', ['getAllCategories']),
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.w_100 {
  width: 100%;
}
.card {
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.09);
  border-radius: 10px;
}
.card_img {
  width: 70px;
  height: 70px;
}

@include media-breakpoint-up(md) {
  .w_100 {
    width: 60%;
  }
}
</style>
