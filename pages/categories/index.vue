<template>
  <div>
    <CategoryBanner />
    <CategoryPotentialYour />
    <CategoryAllCategory />
    <HomePageHelpHand />
    <CategoryYouKnow />
  </div>
</template>

<script>
export default {
  layout: 'homePageLayout',

  middleware: ['authenticated'],

  head() {
    return {
      title: 'Explore Realistic Tests for AWS, Azure, PMP, Google, and More!',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Excel in AWS, Azure, PMP, Google, UiPath, and more certifications with MockCertifieds expertly crafted mock tests. Your path to success starts here!',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Explore Realistic Tests for AWS, Azure, PMP, Google, and More!',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Excel in AWS, Azure, PMP, Google, UiPath, and more certifications with MockCertifieds expertly crafted mock tests. Your path to success starts here!',
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
          content: 'Explore Realistic Tests for AWS, Azure, PMP, Google, and More!',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Excel in AWS, Azure, PMP, Google, UiPath, and more certifications with MockCertifieds expertly crafted mock tests. Your path to success starts here!',
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
