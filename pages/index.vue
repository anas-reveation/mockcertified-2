<template>
  <div>
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
  </div>
</template>

<script>
export default {
  layout: 'homePageLayout',

  head() {
    return {
      title: 'MockCertified: Realistic Certification Mock Tests',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Confidently prep for IT and PMP certifications with MockCertifieds realistic mock tests. Ace your certification journey with us!',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'MockCertified: Realistic Certification Mock Tests',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Confidently prep for IT and PMP certifications with MockCertifieds realistic mock tests. Ace your certification journey with us!',
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
          content: 'MockCertified: Realistic Certification Mock Tests',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Confidently prep for IT and PMP certifications with MockCertifieds realistic mock tests. Ace your certification journey with us!',
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
