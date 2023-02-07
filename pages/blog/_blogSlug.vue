<template>
  <div class="container">
    <h1 class="text-primary fw-bolder mt-5 font_size_24 blog_head">Blog</h1>
    <div class="hr_border" />

    <div v-if="!isFetched" class="mt-3">
      <AnimatedPlaceholder width="200px" height="20px" />
      <AnimatedPlaceholder width="100%" class="mt-3" />
    </div>

    <div v-else class="mt-3">
      <div class="row">
        <div class="col">
          <div class="fw-bolder font_size_30 blog_title">
            {{ blogDetail.title }}
          </div>
        </div>
        <div class="col-12 col-lg-3 mt-3 mt-lg-0">
          <div class="row justify-content-between align-items-center">
            <div class="col text-truncate">
              <img
                v-if="blogDetail.author.image"
                :src="$urlFor(blogDetail.author.image)"
                alt="user"
                class="author_image"
              />
              <img v-else src="@/assets/images/user.svg" alt="user" class="author_image" />
              <span class="fw-bolder font_size_14"> {{ blogDetail.author.name }} </span>
            </div>
            <div class="col text-end font_size_12">{{ getDate(blogDetail.publishedAt) }}</div>
          </div>
        </div>

        <div class="mt-3 blog_content">
          <SanityContent :blocks="blogDetail.body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity';
import { SanityContent } from '@nuxtjs/sanity/dist/components/sanity-content';

export default {
  components: {
    SanityContent,
  },

  data() {
    return {
      isFetched: false,
    };
  },

  async asyncData({ params }) {
    const blogSlug = params.blogSlug;
    return { blogSlug };
  },

  async mounted() {
    const query = groq`*[_type == "post" && slug.current == "${this.blogSlug}"][0] { title, slug, shortDescription, body, publishedAt, author->{name, image} }`;
    this.blogDetail = await this.$sanity.fetch(query);
    this.isFetched = true;
  },

  methods: {
    getDate(getdatetime) {
      var dateStr = new Date(getdatetime);
      return dateStr.toLocaleDateString();
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint';

.blog_content p {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
}

.hr_border {
  border: 1px solid #333333 !important;
}

.author_image {
  width: 35px;
  height: 35px;
  border-radius: 25px;
  object-fit: cover;
}

@include media-breakpoint-down(sm) {
  .blog_head {
    font-size: 20px;
  }

  .blog_title {
    font-size: 22px;
  }
}
</style>
