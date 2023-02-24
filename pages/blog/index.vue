<template>
  <div class="container">
    <h1 class="text-primary fw-bolder mt-5 font_size_24 blog_head">Blogs</h1>
    <div class="hr_border" />

    <div v-if="!isFetched" class="row mt-3">
      <div v-for="i in 3" :key="i" class="col-sm-6 col-md-4 mb-3" data-aos="flip-right">
        <TestCardsSkeleton />
      </div>
    </div>

    <div v-else class="mt-3">
      <div class="row">
        <div v-for="(post, index) in allPosts" :key="index" class="col-sm-6 col-lg-4 mb-3">
          <div class="p-3 position-relative blog_card">
            <div class="fw-bolder text-break font_size_22 blog_title" :title="post.title">
              {{ post.title }}
            </div>
            <div class="text-break mt-2 font_size_16 short_description_clr">
              {{ post.shortDescription }}
            </div>

            <!-- bottom -->
            <div class="position-absolute bottom-0 start-0 end-0 p-3">
              <div class="text-end mt-3">
                <NuxtLink
                  :to="`/blog/${post.slug.current}`"
                  class="p-2 text-white read_more_btn font_size_10"
                >
                  Read more
                </NuxtLink>
              </div>
              <hr />

              <div class="d-flex justify-content-between align-items-center">
                <div class="text-truncate">
                  <img
                    v-if="post.author.image"
                    :src="$urlFor(post.author.image)"
                    alt="user"
                    class="author_image"
                  />
                  <img v-else src="@/assets/images/user.svg" alt="user" class="author_image" />
                  <span class="fw-bolder font_size_14"> {{ post.author.name }} </span>
                </div>
                <div class="text-end font_size_12">{{ getDate(post.publishedAt) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity';

export default {
  data() {
    return {
      allPosts: [],
      isFetched: false,
    };
  },

  async mounted() {
    const query = groq`*[_type == "post"] | order(publishedAt desc) { title, slug, shortDescription, publishedAt, author->{name, image} }`;
    this.allPosts = await this.$sanity.fetch(query);
    this.isFetched = true;
  },

  methods: {
    getDate(getdatetime) {
      var dateStr = new Date(getdatetime);
      return dateStr.toLocaleDateString();
    },
  },
  head() {
    return {
      title: 'Mock Exam Blogs - Mockcertified App',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Mockcertified is your one-stop solution for all exam-related queries. Get access to the latest exam updates, tips and tricks, and more through our blogs.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Mock Exam Blogs - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Mockcertified is your one-stop solution for all exam-related queries. Get access to the latest exam updates, tips and tricks, and more through our blogs.',
        },
        {
          name: 'keywords',
          content:
            'Blog, Mock exam blogs, Mock test blogs, Blogs, Blogs on mock test, Blogs on mock exam',
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://${process.env.DOMAIN}${require('~/assets/images/logo_with_name.svg')}`,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://${process.env.DOMAIN}/${this.$router.currentRoute.name}`,
        },

        // Twitter Meta Tags
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Mock Exam Blogs - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Mockcertified is your one-stop solution for all exam-related queries. Get access to the latest exam updates, tips and tricks, and more through our blogs.',
        },

        {
          hid: 'twitter:domain',
          property: 'twitter:domain',
          content: process.env.DOMAIN,
        },
        {
          hid: 'twitter:url',
          property: 'twitter:url',
          content: `https://${process.env.DOMAIN}/${this.$router.currentRoute.name}`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `https://${process.env.DOMAIN}${require('~/assets/images/logo_with_name.svg')}`,
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint';

.hr_border {
  border: 1px solid #333333 !important;
}

.blog_card {
  background: #f8faff;
  box-shadow: 2px 2px 25px #e6ebff;
  border-radius: 6px;
  height: 300px;
}

.read_more_btn {
  background: #2546eb;
  border-radius: 2px;
}

.author_image {
  width: 35px;
  height: 35px;
  border-radius: 25px;
  object-fit: cover;
}

.short_description_clr {
  color: rgba(0, 0, 0, 0.6);
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@include media-breakpoint-down(sm) {
  .blog_head {
    font-size: 20px;
  }

  .blog_title {
    font-size: 18px;
  }
}
</style>
