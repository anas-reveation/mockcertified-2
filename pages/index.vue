<template>
  <div>
    <NavbarNew />
    <HomePageBanner />
    <HomePageExamJitters />
    <HomePageLookingFor />
    <HomePageExprienceTest />
    <HomePageTopSelling />
    <HomePageYourWallet />
    <HomePageWhyUs />
    <HomePageOurBlogs />
    <HomePageHelpHand />
    <HomePageStudentReview />
    <FooterNew />
  </div>
</template>

<script>
export default {
  layout: 'homePageLayout',

  head() {
    return {
      title: 'Online Mock Test | Test Series',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'This application serves as a platform to link information seekers with subject matter experts. They can create mock exams and market them to potential customers.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Online Mock Test | Test Series - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'This application serves as a platform to link information seekers with subject matter experts. They can create mock exams and market them to potential customers.',
        },
        {
          name: 'keywords',
          content:
            'Mockcertified, Mock Test, mock exam, practice mock test, practice mock, Create Mock Test, Mockcertified App',
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
          content: 'Online Mock Test | Test Series - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'This application serves as a platform to link information seekers with subject matter experts. They can create mock exams and market them to potential customers.',
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
