<template>
  <div class="container px-4">
    <h1 class="mt-5 mb-4 font_size_36">Contact Us</h1>
    <p>
      If you have any questions reach out to us to this email address
      <span class="fw-bolder">contactus@mockcertified.com.</span>
    </p>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Contact Us',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'If you have any questions reach out to us to this email address contactus@mockcertified.com.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Contact Us - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'If you have any questions reach out to us to this email address contactus@mockcertified.com.',
        },
        {
          name: 'keywords',
          content: 'Contact Us, Mockcertified App',
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
          content: 'Contact Us - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'If you have any questions reach out to us to this email address contactus@mockcertified.com.',
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
