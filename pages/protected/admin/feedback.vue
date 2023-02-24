<template>
  <div class="container">
    <div v-if="isLoaderHidden" class="mt-5 mb-4">
      <AnimatedPlaceholder width="150px" height="16px" />

      <br />
      <div v-for="i in 3" :key="i" class="mt-3">
        <AnimatedPlaceholder width="150px" height="16px" />
        <br />
        <AnimatedPlaceholder width="100px" height="16px" />
        <br />
        <AnimatedPlaceholder width="100%" height="100px" class="mt-3" />
      </div>
    </div>

    <h1
      v-else-if="allFeedbacks.length"
      class="text-primary fw-bolder mt-5 mb-4 font_size_36 col-md-12 col-md-6"
    >
      Feedback
    </h1>

    <div v-if="!isLoaderHidden && !allFeedbacks.length" class="mt-4 px-3">
      <h2>No Feedback Available</h2>
    </div>

    <hr v-if="allFeedbacks.length" />

    <div v-for="(feedback, index) in allFeedbacks" :key="index" class="mb-4">
      <div class="fw-bolder font_size_20 feedback_username">{{ feedback.userFullName }}</div>
      <div class="text-muted mt-1 font_size_14">{{ feedback.updatedAt }}</div>

      <div class="mt-2">
        <div class="p-2 feedback_card">
          <div class="font_size_14">
            {{ feedback.description }}
          </div>
          <div class="">
            <div class="text-end">
              <NuxtLink
                :to="`/protected/admin/test/${feedback.testSlug}`"
                class="btn btn-primary text-white mt-1"
              >
                <span class="font_size_14">Go To Test</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  middleware: ['authenticated'],

  head() {
    return {
      title: 'Check Our Feedback',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Mockcertified is an online platform that helps students to ace their exams. This is our feedback section, users fill in their valuable feedback here.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Check Our Feedback - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Mockcertified is an online platform that helps students to ace their exams. This is our feedback section, users fill in their valuable feedback here.',
        },
        {
          name: 'keywords',
          content:
            'feedback, admin feedback, mock test feedback, mock exam feedback, Mock feedback',
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
          content: 'Check Our Feedback - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Mockcertified is an online platform that helps students to ace their exams. This is our feedback section, users fill in their valuable feedback here.',
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

  data() {
    return {
      allFeedbacks: [],
    };
  },

  computed: {
    ...mapState('admin', ['user']),
    ...mapState(['isLoaderHidden']),
  },

  async mounted() {
    this.setIsLoaderHidden(true);
    const allFeedback = await this.getAllFeedbacks();
    this.allFeedbacks = allFeedback.map((feedback) => {
      return {
        updatedAt: this.getDate(feedback.updatedAt),
        description: feedback.description,
        testSlug: feedback.test.slug,
        userFullName: `${feedback.purchased_test.purchased_by.first_name} ${feedback.purchased_test.purchased_by.last_name}`,
      };
    });
    this.setIsLoaderHidden(false);
  },

  methods: {
    ...mapMutations(['setIsLoaderHidden']),
    ...mapActions('admin', ['getAllFeedbacks']),

    getDate(getdatetime) {
      var dateStr = new Date(getdatetime);
      return dateStr.toLocaleDateString();
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint';
.feedback_card {
  background: #f5f5f5;
  word-wrap: break-word;
}

@include media-breakpoint-down(lg) {
  .feedback_username {
    font-size: 18px;
  }
}
</style>
