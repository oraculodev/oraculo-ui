<script>
import Layout from '../../layouts/main'
import moment from 'moment'

export default {
  components: {
    Layout,
  },
  data: () => ({
    loading: false,
    data: [],
    searchTerm: '',
  }),
  watch: {
    searchTerm: {
      handler: function () {
        if (this.searchTerm.length >= 3 || this.searchTerm.length == 0) {
          this.getData()
        }
      },
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.$store
        .dispatch('components/getAll', { limit: 100, offset: 0, search: this.searchTerm, filters: 'type=api' })
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
    dateTime(value) {
      moment.locale('pt')
      return moment(value).fromNow()
    },
    getNewUrl() {
      return `${process.env.VUE_APP_ORACULO_ADMIN_URL}/catalog/apicatalog/`
    },
  },
}
</script>

<template>
  <Layout :pagetitle="'API Catalog'">
    <Loading v-if="loading" :full-width="true" />
    <div class="row">
      <div class="col-lg-6 mb-4">
        <input
          v-model="searchTerm"
          type="search"
          placeholder="Search..."
          aria-label="Search..."
          class="gridjs-input gridjs-search-input"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div v-for="api in data.results" :key="api" class="card p-2">
          <div class="d-flex align-items-center">
            <div class="col-lg-4">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-3">
                  <div class="avatar">
                    <div class="avatar-title rounded bg-soft-primary text-primary">
                      <eva-icon class="icon font-size-24" name="globe-outline"></eva-icon>
                    </div>
                  </div>
                </div>
                <div class="flex-grow-1">
                  <router-link v-if="api.id" :to="`/components/${api.id}`">
                    <h2 class="font-size-18 mb-1 text-truncate">{{ api.name }}</h2>
                  </router-link>
                  <p class="text-muted mb-0">{{ api.description }}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-2">
              <div class="flex-grow-1">
                <h5 class="font-size-14 mb-1">Internal Docs</h5>
                <p v-if="api.api_doc_url" class="text-muted mb-0">
                  <a
                    title="navegar para o link"
                    :href="api.api_doc_url"
                    target="_blank"
                    class="badge badge-soft-success"
                  >
                    <i class="bx bx bx-link-external" />
                    Swagger
                  </a>
                </p>
                <p v-else class="mb-0">-</p>
              </div>
            </div>
            <div class="col-lg-2">
              <div class="flex-grow-2">
                <h5 class="font-size-14 mb-1">Public Docs</h5>
                <p v-if="api.public_api_doc_url" class="text-muted mb-0">
                  <a
                    title="navegar para o link"
                    :href="api.public_api_doc_url"
                    target="_blank"
                    class="badge badge-soft-info"
                  >
                    <i class="bx bx bx-link-external" />
                    Readme
                  </a>
                </p>
                <p v-else class="mb-0">-</p>
              </div>
            </div>
            <div class="col-lg-2">
              <div class="flex-grow-1">
                <h5 class="font-size-14 mb-1">Lifecycle</h5>
                <p v-if="api.lifecycle" class="text-muted mb-0">
                  {{ api.lifecycle }}
                </p>
                <p v-else class="mb-0">-</p>
              </div>
            </div>
            <div class="col-lg-2">
              <div class="flex-grow-1">
                <h5 class="font-size-14 mb-1">Owner</h5>
                <router-link
                  v-if="api.group_owner"
                  :to="`/groups/${api.group_owner.id}`"
                  class="badge badge-soft-secondary font-size-12"
                  >{{ api.group_owner.name }}
                </router-link>
                <p v-else class="mb-0">-</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
