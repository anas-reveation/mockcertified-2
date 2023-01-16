<template>
  <div v-if="!isLoading && formData.name" class="container container_width">
    <h1 class="mt-5 mb-4 font_size_24 admin_category_title">Category- {{ formData.name }}</h1>
    <form class="wrapper mt-3" @submit.prevent="createCategory">
      <!-- Subcategory -->
      <div class="sub_width">
        <p class="font_size_24 admin_category_title">Add Subcategories</p>

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
              class="btn btn-outline-primary mt-1"
              type="button"
              @click="addMoreSubCategory(subcatt.name, subcatt.imageUrl)"
            >
              Add more
            </button>
            <button
              class="btn btn-outline-danger mt-1"
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
          <!-- :class="!isDisableBtn && 'btn-secondary'" -->
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

  head() {
    return {
      title: 'Create New Mock Test Subcategory',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Create a new mock tests for ${this.formData.name} sub-category by entering the sub-category name and image URL.`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Create New Mock Test Subcategory - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Create a new mock tests for ${this.formData.name} sub-category by entering the sub-category name and image URL.`,
        },
        {
          name: 'keywords',
          content: 'Add New Subcategories, Mockcertified App',
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
          content: `https://${process.env.DOMAIN}${this.$router.currentRoute.path}`,
        },

        // Twitter Meta Tags
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Create New Mock Test Subcategory - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Create a new mock tests for ${this.formData.name} sub-category by entering the sub-category name and image URL.`,
        },

        {
          hid: 'twitter:domain',
          property: 'twitter:domain',
          content: process.env.DOMAIN,
        },
        {
          hid: 'twitter:url',
          property: 'twitter:url',
          content: `https://${process.env.DOMAIN}${this.$router.currentRoute.path}`,
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
