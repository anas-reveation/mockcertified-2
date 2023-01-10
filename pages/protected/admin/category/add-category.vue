<template>
  <div class="container container_width">
    <h1 class="mt-5 mb-4 font_size_24 admin_category_title">Create a new category</h1>
    <form class="wrapper mt-3" @submit.prevent="createCategory">
      <div class="mb-4 input-data">
        <input
          type="text"
          class="border border-2 border-primary rounded form-control"
          v-model="formData.name"
          required
        />
        <label class="form-label">Name</label>
      </div>

      <div class="mb-4 input-data">
        <input
          type="text"
          class="border border-2 border-primary rounded form-control"
          v-model="formData.imageUrl"
          required
        />
        <label class="form-label">Image URL</label>
      </div>

      <!-- Subcategory -->
      <div>
        <p class="font_size_24 admin_category_title">Subcategories</p>

        <div v-for="(subcatt, index) in formData.subCat">
          <div class="mt-3">
            <div class="mb-4 input-data">
              <input
                type="text"
                class="border border-2 border-primary rounded form-control"
                v-model="subcatt.name"
                required
              />
              <label class="form-label">Subcateogary </label>
            </div>

            <div class="mb-4 input-data">
              <input
                type="text"
                class="border border-2 border-primary rounded form-control"
                v-model="subcatt.imageUrl"
                required
              />
              <label class="form-label">Image URL</label>
            </div>
            <button
              class="btn btn-outline-primary mb-2"
              type="button"
              @click="addMoreSubCategory(subcatt.name, subcatt.imageUrl)"
            >
              Add more
            </button>
            <button
              class="btn btn-outline-danger mb-2"
              @click="removeSubCategory(subcatt.name)"
              type="button"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div class="mt-2 text-start">
        <button
          type="submit"
          class="btn btn-primary text-white w-50 mb-2 width_res"
          :disabled="isDisableBtn"
        >
          <!-- :class="isDisableBtn ? 'btn-secondary' : ''" -->
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  middleware: ['authenticated'],

  //   head() {
  //     return {
  //       title: 'Create A New Test',
  //       meta: [
  //         {
  //           hid: 'description',
  //           name: 'description',
  //           content:
  //             'Create a new mock test by filling the details title, description, category, sub-category, price, time limits, reference, upload questions list in the form.',
  //         },
  //         {
  //           hid: 'og:title',
  //           property: 'og:title',
  //           content: 'Create A New Test - Mockcertified App',
  //         },
  //         {
  //           hid: 'og:description',
  //           property: 'og:description',
  //           content:
  //             'Create a new mock test by filling the details title, description, category, sub-category, price, time limits, reference, upload questions list in the form.',
  //         },
  //         {
  //           name: 'keywords',
  //           content: 'Create A New Test, Mockcertified App',
  //         },

  //         {
  //           hid: 'og:type',
  //           property: 'og:type',
  //           content: 'website',
  //         },
  //         {
  //           hid: 'og:image',
  //           property: 'og:image',
  //           content: `https://${process.env.DOMAIN}${require('~/assets/images/logo_with_name.svg')}`,
  //         },
  //         {
  //           hid: 'og:url',
  //           property: 'og:url',
  //           content: `https://${process.env.DOMAIN}/${this.$router.currentRoute.name}`,
  //         },

  //         // Twitter Meta Tags
  //         { name: 'twitter:card', content: 'summary_large_image' },
  //         {
  //           hid: 'twitter:title',
  //           name: 'twitter:title',
  //           content: 'Create A New Test - Mockcertified App',
  //         },
  //         {
  //           hid: 'twitter:description',
  //           name: 'twitter:description',
  //           content:
  //             'Create a new mock test by filling the details title, description, category, sub-category, price, time limits, reference, upload questions list in the form.',
  //         },

  //         {
  //           hid: 'twitter:domain',
  //           property: 'twitter:domain',
  //           content: process.env.DOMAIN,
  //         },
  //         {
  //           hid: 'twitter:url',
  //           property: 'twitter:url',
  //           content: `https://${process.env.DOMAIN}/${this.$router.currentRoute.name}`,
  //         },
  //         {
  //           hid: 'twitter:image',
  //           name: 'twitter:image',
  //           content: `https://${process.env.DOMAIN}${require('~/assets/images/logo_with_name.svg')}`,
  //         },
  //       ],
  //     };
  //   },

  data() {
    return {
      formData: {
        name: null,
        imageUrl: null,
        subCat: [
          {
            name: null,
            imageUrl: null,
          },
        ],
      },
      isDisableBtn: true,
      //   errors: {
      //     fileError: {
      //       isValid: true,
      //       isVisiable: false,
      //       msg: '',
      //     },
      //   },
    };
  },

  watch: {
    formData: {
      handler(newValue, _oldValue) {
        if (newValue.name && newValue.imageUrl) {
          this.isDisableBtn = false;
        } else {
          this.isDisableBtn = true;
        }
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
      },
      deep: true,
    },
  },

  computed: {
    ...mapState('auth', ['user']),
  },

  methods: {
    ...mapActions('admin', ['createNewCategory']),

    addMoreSubCategory(name, imageUrl) {
      if (!name || !imageUrl) return;
      const obj = {
        name: null,
        imageUrl: null,
      };
      this.formData.subCat.push(obj);
    },

    removeSubCategory(name) {
      if (this.formData.subCat.length <= 1) return;
      this.formData.subCat = this.formData.subCat.filter((subCat) => subCat.name !== name);

      // if array would be empty then added empty object
      if (this.formData.subCat.length <= 0) {
        const obj = {
          name: null,
          imageUrl: null,
        };
        this.formData.subCat.push(obj);
      }
    },

    async createCategory() {
      let isValid = true;
      let errorMsg = 'Please fill the form correctly';

      if (!this.formData.name || !this.formData.imageUrl) {
        isValid = false;
      }

      this.formData.name = this.formData.name.replace(/\s+/g, ' ').trim();
      this.formData.imageUrl = this.formData.imageUrl.replace(/\s+/g, ' ').trim();

      let uniqueSubName = [];
      this.formData.subCat.forEach((subCat, index) => {
        if (!subCat.name || !subCat.imageUrl) {
          isValid = false;
        }
        this.formData.subCat[index].name = this.formData.subCat[index].name
          .replace(/\s+/g, ' ')
          .trim();
        this.formData.subCat[index].imageUrl = this.formData.subCat[index].imageUrl
          .replace(/\s+/g, ' ')
          .trim();

        const res = uniqueSubName.find((name) => name === this.formData.subCat[index].name);
        if (!res) {
          uniqueSubName.push(this.formData.subCat[index].name);
        } else {
          isValid = false;
          errorMsg = `"${res}" is repeating in subcategory list`;
        }
      });

      if (isValid) {
        const res = await this.createNewCategory(this.formData);
        if (res) {
          this.$router.push('/protected/admin/category');
        }
      } else {
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: errorMsg,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/admin_categories';
</style>
