<template>
  <div v-if="!isLoading" class="container container_width">
    <h1 class="mt-5 mb-4 font_size_36 col-md-12">Category- {{ formData.name }}</h1>
    <form class="wrapper mt-3" @submit.prevent="createCategory">
      <!-- Subcategory -->
      <div class="sub_width">
        <p class="font_size_24">Add Subcategories</p>

        <div v-for="(subcatt, index) in formData.subCat">
          <div class="mt-3">
            <div class="mb-4 input-data">
              <input
                type="text"
                class="border border-2 border-primary rounded form-control"
                v-model="subcatt.name"
                required
              />
              <label class="form-label">Sub cateogary name</label>
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
              class="btn btn-primary"
              type="button"
              @click="addMoreSubCategory(subcatt.name, subcatt.imageUrl)"
            >
              Add more
            </button>
            <button class="btn btn-danger" @click="removeSubCategory(subcatt.name)" type="button">
              Remove
            </button>
          </div>
        </div>
      </div>

      <div class="mt-2 text-center">
        <button
          type="submit"
          class="btn border border-2 border-primary w-50 mb-2 width_res"
          :class="!isDisableBtn && 'btn-secondary'"
          :disabled="isDisableBtn"
        >
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
        categoryId: null,
        subCat: [
          {
            name: null,
            imageUrl: null,
          },
        ],
      },
      uniqueSubName: [],
      isDisableBtn: true,
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
    ...mapState(['isLoading']),
    ...mapState('auth', ['user']),
    ...mapState('admin', ['editCatSubCat']),
  },

  async mounted() {
    if (!this.editCatSubCat.id) {
      this.$router.push('/protected/admin/category');
      return;
    }
    const allSubCategory = await this.getAllSubCategories(this.editCatSubCat.id);
    this.uniqueSubName = allSubCategory.map((cat) => {
      if (cat && cat.name) {
        return cat.name;
      }
    });

    this.formData.name = this.editCatSubCat.name;
    this.formData.imageUrl = this.editCatSubCat.imageUrl;
    this.formData.categoryId = this.editCatSubCat.id;
  },

  methods: {
    ...mapActions('admin', ['addSubCategoriesInCategory']),
    ...mapActions('testManagement', ['getAllSubCategories']),

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
      let uniqueSubNameArr = [...this.uniqueSubName];
      let isValid = true;
      let errorMsg = 'Please fill the form correctly';

      if (!this.formData.name || !this.formData.imageUrl) {
        isValid = false;
      }

      this.formData.name = this.formData.name.replace(/\s+/g, ' ').trim();
      this.formData.imageUrl = this.formData.imageUrl.replace(/\s+/g, ' ').trim();

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

        const res = uniqueSubNameArr.find((name) => name === this.formData.subCat[index].name);
        if (!res) {
          uniqueSubNameArr.push(this.formData.subCat[index].name);
        } else {
          isValid = false;
          errorMsg = `"${res}" is already exist`;
        }
      });

      if (isValid) {
        const res = await this.addSubCategoriesInCategory(this.formData);
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
          timer: 3000,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint';

.wrapper .input-data {
  // height: 40px;
  width: 100%;
  position: relative;
}

.wrapper .input-data input {
  height: 100%;
  width: 100%;
  border: none;
  font-size: 17px;
  outline-color: #6782e1;
}

.input-data input:focus ~ label,
.input-data input:valid ~ label {
  transform: translateY(-20px);
  font-size: 15px;
  color: #000;
}

.wrapper .input-data label {
  position: absolute;
  top: 3px;
  left: 0.8rem;
  color: #000;
  pointer-events: none;
  transition: all 0.3s ease;
  background-color: white;
}

.input-data input:focus ~ .underline:before,
.input-data input:valid ~ .underline:before {
  transform: scaleX(1);
}

.wrapper .input-data label {
  img {
    pointer-events: auto;
  }
}

@include media-breakpoint-up(lg) {
  .container_width {
    width: 50%;
  }
}

.sub_width {
  width: 50%;
}
</style>
