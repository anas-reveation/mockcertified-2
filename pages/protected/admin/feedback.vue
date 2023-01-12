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

    <hr v-if="allFeedbacks.length" />

    <div v-for="(feedback, index) in allFeedbacks" :key="index" class="mb-4">
      <div class="fw-bolder font_size_20 feedback_username">{{ feedback.userFullName }}</div>
      <div class="text-muted mt-1 font_size_14">{{ feedback.updatedAt }}</div>

      <div class="mt-2 container">
        <div class="row p-2 feedback_card">
          <div class="col font_size_14">
            {{ feedback.description }}
          </div>
          <div class="col-12 col-md-2 align-self-end text-end mt-2">
            <div>
              <NuxtLink
                :to="`/protected/admin/test/${feedback.testSlug}`"
                class="btn btn-primary text-white"
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
