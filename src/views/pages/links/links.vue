<script>
import Layout from '../../layouts/main'

export default {
  components: {
    Layout,
  },
  data: () => ({
    loading: false,
    data: [],
  }),
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.$store
        .dispatch('links/getAll', { limit: 10, offset: 0, search: this.searchTerm })
        .then(({ data }) => {
          this.data = data
          this.loading = false
          console.log(data)
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    getNewUrl() {
      return `${process.env.VUE_APP_ORACULO_ADMIN_URL}/catalog/link/`
    },
  },
}
</script>

<template>
  <Layout :pagetitle="'Links'">
    <Loading v-if="loading" :full-width="true" />
    <div class="row">
      <div v-for="(link, index) in data.results" :key="link" class="col-lg-4">
        <a :href="link.url" :title="link.title" target="_blank">
          <div class="card overflow-hidden">
            <div class="card-body">
              <div class="faq-icon">
                <i :class="link.icon"></i>
              </div>
              <h5 class="text-primary">{{ index + 1 }}.</h5>
              <h5 class="faq-title mt-3">{{ link.title }}</h5>
              <p class="faq-ans text-muted mt-2 mb-0">{{ link.description }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </Layout>
</template>
