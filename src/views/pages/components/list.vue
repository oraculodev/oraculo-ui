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
    perPage: 50,
    totalItems: 0,
    totalPages: 0,
    threadClass: 'bg-dark text-white',
    fields: [
      { key: 'id', label: 'Id', sortable: true, tdClass: 'align-middle' },
      { key: 'name', label: 'Name', sortable: true, tdClass: 'align-middle' },
      { key: 'repo_url', label: 'Repository', sortable: true, tdClass: 'align-middle' },
      { key: 'group_owner', label: 'Owner', sortable: true, tdClass: 'align-middle' },
      { key: 'type', label: 'Tipo', sortable: true, tdClass: 'align-middle' },
      { key: 'lifecycle', label: 'Lifecycle', sortable: true, tdClass: 'align-middle' },
      { key: 'tags', label: 'Tags', sortable: true, tdClass: 'align-middle' },
      { key: 'repo_updated_at', label: 'Last push', sortable: true, tdClass: 'align-middle' },
      { key: 'repo_created_at', label: 'Created at', sortable: true, tdClass: 'align-middle' },
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
        .dispatch('components/getAll', { limit: this.perPage, offset: this.getOffset, search: this.searchTerm })
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
    dateTime(value) {
      moment.locale('pt')
      return moment(value).fromNow()
    },
  },
}
</script>

<template>
  <Layout :pagetitle="'Components'">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-2">
                <div class="gridjs-head">
                  <div class="gridjs-search">
                    <input
                      v-model="searchTerm"
                      type="search"
                      placeholder="Search..."
                      aria-label="Search..."
                      class="gridjs-input gridjs-search-input"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Loading v-if="loading" :height="400"></Loading>
            <div v-else class="table-responsive">
              <b-table :items="items" :fields="fields" hover class="table-custom">
                <template #cell(name)="data">
                  <router-link :to="`/components/${data.item.id}`">{{ data.value }}</router-link>
                </template>
                <template #cell(group_owner)="data">
                  <span v-if="data.item.group_owner">{{ data.item.group_owner.name }}</span>
                </template>
                <template #cell(tags)="data">
                  <span v-for="tag in data.value" :key="tag" class="badge badge-soft-primary">{{ tag }}</span>
                </template>
                <template #cell(repo_updated_at)="data">
                  {{ dateTime(data.value) }}
                </template>
                <template #cell(repo_created_at)="data">
                  {{ dateTime(data.value) }}
                </template>
              </b-table>
            </div>

            <div class="row">
              <div class="col-sm text-sm-left pt-3">
                <span v-if="totalItems" class="text-muted"> Page {{ currentPage }} of {{ totalPages }} </span>
              </div>
              <div class="col-sm pt-3">
                <b-pagination
                  v-if="totalItems"
                  v-model="currentPage"
                  class="justify-content-center justify-content-sm-end m-0"
                  pills
                  :total-rows="totalItems"
                  :per-page="perPage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
