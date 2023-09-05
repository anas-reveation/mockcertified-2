<template>
  <div class="container px-4">
    <NavbarLogo class="mt-4" />

    <div class="row">
      <div
        class="col-sm-6 d-flex flex-column align-items-center justify-content-center mt-3 position-relative"
      >
        <div>
          <img
            src="~/assets/images/Illustration.svg"
            class="auth_illustration"
            alt="Illustration"
          />
        </div>

        <!-- Start Tagline -->
        <div class="d-none d-lg-block position-absolute tagline"></div>
        <div
          class="d-none d-lg-block position-absolute text-primary fw-bolder text-center font_size_18 tagline_text"
        >
          Empowering you with the knowledge
          <br />
          & confidence to succeed
        </div>
        <!-- End Tagline -->
      </div>
      <div class="col-sm-6">
        <img
          class="position-absolute top-0 end-0 d-sm-none oval_img"
          src="@/assets/images/oval.jpg"
          alt="oval"
        />

        <form class="wrapper width_res" @submit.prevent="loginLocal">
          <h1 class="text-primary text-sm-center fw-bolder d-none d-sm-block my-3 font_size_36">
            Login
          </h1>

          <div class="my-3 input-data">
            <input
              type="text"
              class="border border-2 border-grey rounded py-3"
              :class="!errors.email.isValid && 'border-danger'"
              v-model="form.email"
              required
            />
            <label>Email</label>
          </div>

          <div class="mb-2 input-data">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              class="border border-2 border-grey rounded py-3"
              v-model="form.password"
              required
            />
            <label>Password</label>
            <div class="position-relative" @click="isPasswordVisible = !isPasswordVisible">
              <img
                v-if="isPasswordVisible"
                class="position-absolute bottom-50 end-0 p-2"
                src="@/assets/images/password_visible.svg"
                alt="eye"
              />
              <img
                v-else
                class="position-absolute bottom-50 end-0 p-2"
                src="@/assets/images/password_not_visible.svg"
                alt="eye"
              />
            </div>
          </div>

          <div class="text-end">
            <NuxtLink
              to="/auth/forgotpassword"
              class="text-decoration-none font_size_14 auth_font_size"
            >
              Forgot Password?
            </NuxtLink>
          </div>

          <div class="text-center mt-2">
            <button
              type="submit"
              class="btn btn-primary text-white rounded fw-bold px-3 auth_font_size login_btn_width"
              :disabled="!form.email || !form.password || !errors.email.isValid"
            >
              <!-- :class="!form.email || !form.password ? 'border-primary' : 'btn-primary text-white'" -->
              Login
            </button>
          </div>

          <!-- <div class="mt-4 underline_hr"><span>or continue with</span></div> -->
          <ClientOnly>
            <div class="mt-2">
              <!-- <button
          type="button"
          class="btn btn-secondary fw-bold border border-2 border-primary p-3 mt-2 w-100 text-start"
        >
          <span class="p-1 bg-white border border-2 rounded">
            <img src="@/assets/images/google.png" alt="google" width="20" />
          </span>
          Continue with Google
        </button>
        <br />
        <button
          type="button"
          class="btn btn-secondary fw-bold border border-2 border-primary p-3 mt-2 w-100 text-start"
        >
          <span class="p-1 bg-white border border-2 rounded">
            <img src="@/assets/images/facebook.png" alt="facebook" width="20" />
          </span>
          Continue with Facebook
        </button> -->

              <p v-if="platform === 'web'" class="mt-4 text-center auth_font_size">
                New to Mockcertified ?
                <NuxtLink to="/auth/signup" class="text-decoration-none text-primary fw-bolder">
                  Register
                </NuxtLink>
              </p>
            </div>
          </ClientOnly>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { Capacitor } from '@capacitor/core';
import { Auth } from 'aws-amplify';
import { Http } from '@capacitor-community/http';
import { mapState, mapActions } from 'vuex';

export default {
  layout: 'introLayout',
  middleware: ['authenticated'],

  head() {
    return {
      title: 'Login',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Sign in to your Mockcertified account to use a wide categories of mock test.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Login - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Sign in to your Mockcertified account to use a wide categories of mock test.',
        },
        {
          name: 'keywords',
          content: 'Login, Mockcertified App',
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
          content: 'Login - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Sign in to your Mockcertified account to use a wide categories of mock test.',
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

  data: () => ({
    form: {
      email: '',
      password: '',
    },
    isPasswordVisible: false,

    errors: {
      email: {
        isValid: true,
        isVisiable: false,
        msg: 'Invalid email address',
      },
    },
  }),

  computed: {
    ...mapState(['isLoading', 'redirectUrl', 'platform']),
  },

  watch: {
    'form.email'(newValue, _oldValue) {
      // trimmed whitespace
      this.form.email = newValue.trim();

      this.errors.email.isValid =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          newValue,
        );

      if (this.errors.email.isValid) {
        this.errors.email.isVisiable = false;
      }
    },
  },

  async mounted() {
    if (Capacitor.getPlatform() === 'web') {
      //   GoogleAuth.initialize();
      await FacebookLogin.initialize({ appId: '743811610173678' });
    }
  },

  methods: {
    ...mapActions('auth', ['login', 'load']),

    async loginLocal() {
      const res = await this.login(this.form);
      if (res && this.redirectUrl) {
        console.log(this.redirectUrl)
        this.$router.push(this.redirectUrl);
      } else if (res) {
        this.$router.push('/homepage');
      }
    },

    async googleAuth() {
      // Auth.federatedSignIn({ provider: 'Google' });
      let googleUser = await GoogleAuth.signIn();
      console.log('googleUser', googleUser);
      const token = googleUser.authentication.idToken;
      let user = {
        email: googleUser.email,
        name: googleUser.name,
      };
      const expiresIn = 3600;
      const providerName = 'google';

      try {
        await Auth.federatedSignIn(
          providerName,
          {
            token,
            expires_at: expiresIn * 1000 + new Date().getTime(), // the expiration timestamp
          },
          user,
        );
      } catch (err) {
        console.log('ERROR', err);
      }
    },

    async facebookAuth() {
      // Auth.federatedSignIn({ provider: 'Facebook' });
      const FACEBOOK_PERMISSIONS = ['email', 'user_birthday', 'user_photos', 'user_gender'];
      const result = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
      console.log('result', result);
      const expiresIn = 3600;
      const providerName = 'facebook';
      if (result.accessToken && result.accessToken.userId) {
        const token = result.accessToken.token;
        const userId = result.accessToken.userId;

        const options = {
          url: `https://graph.facebook.com/${userId}?fields=id,name,picture.width(720),birthday,email&access_token=${token}`,
          headers: {},
          data: {},
        };

        const response = await Http.post(options);
        console.log('response', response);

        const prasedData = JSON.parse(response.data);
        let user = {
          email: prasedData.email,
          name: prasedData.name,
        };
        console.log('useruser', user);
        try {
          const aa = await Auth.federatedSignIn(
            providerName,
            {
              token,
              expires_at: expiresIn * 1000 + new Date().getTime(), // the expiration timestamp
            },
            user,
          );
          console.log('AAA', aa);
        } catch (err) {
          console.log('ERROR2', err);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/auth.scss';
@import '~/assets/css/bootstrapBreakpoint';

.tagline_text {
  top: 400px;
}

.tagline {
  width: 170px;
  height: 470px;
  top: 175px;
  // left: calc(50% - 170px / 2 + 31px);

  background: linear-gradient(270deg, #e7eafc -0.85%, rgba(255, 255, 255, 0) 34.86%);
  border-radius: 0px 100px 100px 0px;
  transform: rotate(90deg);
}

@include media-breakpoint-down(sm) {
  .auth_font_size {
    font-size: 12px;
  }
}

@include media-breakpoint-up(sm) {
  .width_res {
    width: 75%;
  }

  .login_btn_width {
    width: 100%;
  }
}

@include media-breakpoint-down(lg) {
  .auth_illustration {
    width: 200px;
  }
}
</style>
