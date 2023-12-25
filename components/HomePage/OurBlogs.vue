<template>
  <div class="my-5">
    <h2
      class="text-black font-size-24 font-size-md-28 font-size-lg-44 fw-bolder text-center font_family_poppins_bold my-5"
    >
      Our Blogs
    </h2>
    <div class="container">
      <div class="row g-4 d-none d-lg-flex">
        <div
          v-for="(data, i) in perspectiveData.slice(0, 3)"
          :key="i"
          class="col-12 col-md-6 col-lg-4"
        >
          <div class="blog_card h-100">
            <img
              :src="$urlFor(data?.images[0]?.image?.asset?._ref).url()"
              :alt="data?.images[0]?.alt"
              class="w-100 height_c"
            />
            <div class="d-flex flex-column justify-content-between p-3">
              <div class="">
                <p class="fw-bolder font-size-26 mb-0">{{ data?.title }}</p>
                <p class="font-size-14">{{ formatCreatedAt(data._createdAt) }}</p>
                <p class="font-size-14">
                  {{ data?.subtitle }}
                </p>
              </div>
              <div>
                <a :href="data.link" target="_blank">
                  <p class="fw-bolder font-size-16 text-primary text-decoration-underline pt-4">
                    Read More
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-4 d-flex d-lg-none">
        <div
          v-for="(data, i) in perspectiveData.slice(0, 2)"
          :key="i"
          class="col-12 col-md-6 col-lg-4"
        >
          <div class="blog_card h-100">
            <img
              :src="$urlFor(data?.images[0]?.image?.asset?._ref).url()"
              :alt="data?.images[0]?.alt"
              class="w-100 height_c"
            />
            <div class="d-flex flex-column justify-content-between p-3">
              <div class="">
                <p class="fw-bolder font-size-26 mb-0">{{ data?.title }}</p>
                <p class="font-size-14">{{ formatCreatedAt(data._createdAt) }}</p>
                <p class="font-size-14">
                  {{ data?.subtitle }}
                </p>
              </div>
              <div>
                <a :href="data.link" target="_blank">
                  <p class="fw-bolder font-size-16 text-primary text-decoration-underline pt-4">
                    Read More
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NuxtLink to="/blogs">
        <p class="fw-bolder font-size-16 text-primary text-decoration-underline text-end my-4">
          View More
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

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

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';
.blog_card {
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.09);
  border-radius: 10px;
  border: 0.5px solid rgba(0, 0, 0, 0.15);
}

.blog_card img {
  border-radius: 10px 10px 0 0;
}

.height_c {
  height: 230px;
}
</style>
