<script>
import Layout from '../../layouts/main'
import moment from 'moment'

export default {
  components: {
    Layout,
  },
  data: () => ({
    loading: false,
    items: [],
    currentPage: 1,
    searchTerm: '',
    sortBy: 'name',
    sortDesc: false,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
    fields: [
      { key: 'id', label: 'Id', sortable: true, tdClass: 'align-middle' },
      { key: 'name', label: 'Name', sortable: true, tdClass: 'align-middle' },
      { key: 'description', label: 'Description', sortable: true, tdClass: 'align-middle' },
      { key: 'type', label: 'Type', sortable: true, tdClass: 'align-middle' },
      { key: 'created_at', label: 'Created at', sortable: true, tdClass: 'align-middle' },
    ],
  }),
  computed: {
    getOffset() {
      if (this.currentPage == 1 || this.searchTerm) {
        return 0
      } else return (this.currentPage - 1) * this.perPage
    },
  },
  watch: {
    currentPage: {
      handler: function () {
        this.getData()
      },
    },
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
        .dispatch('groups/getAll', { limit: this.perPage, offset: this.getOffset, search: this.searchTerm })
        .then(({ data }) => {
          this.data = data
          this.items = data.results
          this.totalItems = data.count
          this.totalPages = Math.ceil(data.count / this.perPage)
          this.loading = false
          console.log(data)
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    removeHtmlTags(str = '') {
      if (str === null || str === '') return ''
      else str = str.toString()

      // Regular expression to identify HTML tags in
      // the input string. Replacing the identified
      // HTML tag with a null string.
      return str.replace(/(<([^>]+)>)/gi, '')
    },
    dateTime(value) {
      moment.locale('en')
      return moment(value).fromNow()
    },
    getNewUrl() {
      return `${process.env.VUE_APP_ORACULO_ADMIN_URL}/catalog/group/`
    },
  },
}
</script>

<template>
  <Layout :pagetitle="'Teams'">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-12">
                <div class="gridjs-head">
                  <div class="gridjs-search float-start">
                    <input v-model="searchTerm" type="search" placeholder="Search..." aria-label="Search..."
                      class="gridjs-input gridjs-search-input" />
                  </div>
                  <div class="text-end float-end">
                    <a :href="getNewUrl()" class="btn btn-primary btn-rounded" target="_blank" alt="add new"
                      title="add new">
                      Add new
                    </a>
                  </div>
                </div>
              </div>

            </div>

            <Loading v-if="loading" :height="400"></Loading>

            <div v-else class="table-responsive">
              <b-table :items="items" :fields="fields" hover class="table-custom">
                <template #cell(name)="data">
                  <router-link :to="`/groups/${data.item.id}`">{{ data.value }}</router-link>
                </template>
                <template #cell(description)="data">
                  {{ removeHtmlTags(data.value) }}
                </template>
                <template #cell(created_at)="data">
                  {{ dateTime(data.value) }}
                </template>
              </b-table>
            </div>

            <div class="row">
              <div class="col-sm text-sm-left pt-3">
                <span v-if="totalItems" class="text-muted"> Page {{ currentPage }} of {{ totalPages }} </span>
              </div>
              <div class="col-sm pt-3">
                <b-pagination v-if="totalItems" v-model="currentPage"
                  class="justify-content-center justify-content-sm-end m-0" pills :total-rows="totalItems"
                  :per-page="perPage" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
