<template>
  <div class="my-5">
    <div class="container d-flex flex-column justify-content-center align-items-center">
      <div class="text-center my-4 w_100">
        <h3 class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder font_family_poppins_bold">
          Featured blog posts
        </h3>
        <p class="font-size-10 font-size-md-12 font-size-lg-14">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6">
          <div
            v-for="(data, i) in perspectiveData.slice(0, 1)"
            :key="i"
            class="blog_card mb-4 mb-lg-0"
          >
            <!-- Card content goes here using the 'card' object -->

            <img
              :src="$urlFor(data?.images[0]?.image?.asset?._ref).url()"
              :alt="`${data?.images[0].alt}`"
              class="w-100 height_400"
            />

            <div class="">
              <div class="d-flex align-items-center font-size-14 font-size-md-16">
                <div class="my-3">
                  <p class="bg_green mb-0 p-2">AWS</p>
                </div>
                <p class="mb-0 ms-3">5 min read</p>
              </div>
              <h4 class="fw-bolder font_family_poppins_bold font-size-24 font-size-lg-32 mb-3">
                {{ data?.title }}
              </h4>
              <p class="font-size-14 font-size-lg-16 mb-2`">
                {{ data?.subtitle }}
              </p>
              <div class="d-flex align-items-center my-3">
                <a :href="data?.link" target="_blank">
                  <p class="font-size-16 mb-0">Read More</p>
                </a>
                <img src="~assets/images/blog_arrow.svg" alt="arrow" class="ms-2" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="row gy-4">
            <div
              v-for="(dataSe, j) in perspectiveData.slice(1, 3)"
              :key="j"
              class="col-12 col-md-6 col-lg-12"
            >
              <div class="blog_card_s">
                <div class="row">
                  <div class="col-12 col-lg-5">
                    <img
                      :src="$urlFor(dataSe?.images[0]?.image?.asset?._ref).url()"
                      :alt="`${data?.images[0].alt}`"
                      class="w-100 d-none d-lg-block height_250"
                    />
                    <img
                      :src="$urlFor(dataSe?.images[0]?.image?.asset?._ref).url()"
                      :alt="`${dataSe?.images[0].alt}`"
                      class="w-100 d-block d-lg-none height_200"
                    />
                  </div>
                  <div class="col-12 col-lg-7 p-3">
                    <div class="">
                      <div class="d-flex align-items-center font-size-14 my-3 mt-lg-0">
                        <div class="">
                          <p class="bg_green mb-0 p-2">AWS</p>
                        </div>
                        <p class="mb-0 ms-3">5 min read</p>
                      </div>
                      <h4 class="fw-bolder font_family_poppins_bold font-size-24 mb-3">
                        {{ dataSe?.title }}
                      </h4>
                      <NuxtLink :to="{ name: 'blogslug', params: { blogslug: 'Blog_1' } }">
                        <div class="d-flex align-items-center my-3">
                          <a :href="dataSe?.link" target="_blank">
                            <p class="font-size-16 mb-0">Read More</p>
                          </a>
                          <img src="~assets/images/blog_arrow.svg" alt="arrow" class="ms-2" />
                        </div>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg_green {
  background-color: rgba(244, 244, 244, 1);
}
.blog_card_s {
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.09);
}
.height_400 {
  height: 400px;
}
.height_250 {
  height: 250px;
}

.height_200 {
  height: 200px;
}
</style>

<script>
import { groq } from '@nuxtjs/sanity';

export default {
  data() {
    return {
      perspectiveData: [],
      isFetched: false,
    };
  },

  methods: {
    formatCreatedAt(createdAt) {
      if (!createdAt) {
        return ''; // Return an empty string or handle it as per your requirement
      }

      try {
        const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = new Date(createdAt).toLocaleDateString('en-US', dateOptions);
        return formattedDate;
      } catch (error) {
        console.error('Error formatting date:', error);
        return ''; // Return an empty string or handle it as per your requirement
      }
    },
  },

  async mounted() {
    try {
      const query = groq`*[_type == "perspective"] | order( _updatedAt asc) {_createdAt, images, title, subtitle, link }`;
      this.perspectiveData = await this.$sanity.fetch(query);
      this.isFetched = true;

      // Log the perspectiveData to the console
    } catch (error) {
      console.error('Error fetching perspective data:', error);
    }
  },
};
</script>
