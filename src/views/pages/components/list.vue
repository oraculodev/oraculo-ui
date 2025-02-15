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
      { key: 'macroarea', label: 'Macroarea', sortable: true, tdClass: 'align-middle' },
      { key: 'group_owner', label: 'Owner', sortable: true, tdClass: 'align-middle' },
      { key: 'type', label: 'Type', sortable: true, tdClass: 'align-middle' },
      { key: 'lifecycle', label: 'Lifecycle', sortable: true, tdClass: 'align-middle' },
      { key: 'tags', label: 'Tags', sortable: true, tdClass: 'align-middle' },
      { key: 'context_level', label: 'Context', sortable: true, tdClass: 'align-middle' },
      { key: 'critical', label: 'Critical', sortable: true, thClass: 'text-center', tdClass: 'text-center' },
      {
        key: 'component_app_climate_scores',
        label: 'Climate Score',
        sortable: true,
        thClass: 'text-center',
        tdClass: 'text-center',
      },
      { key: 'repo_pushed_at', label: 'Pushed at', sortable: true, tdClass: 'align-middle' },
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
      moment.locale('en')
      return moment(value).fromNow()
    },
  },
}
</script>

<template>
  <Layout :pagetitle="'Componentes'">
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
                <template #cell(macroarea)="data">
                  <span v-if="data.value">{{ data.value.name }}</span>
                </template>
                <template #cell(group_owner)="data">
                  <span v-if="data.item.group_owner">{{ data.item.group_owner.name }}</span>
                </template>
                <template #cell(tags)="data">
                  <span v-for="tag in data.value" :key="tag" class="badge badge-soft-info">{{ tag }}</span>
                </template>
                <template #cell(critical)="data">
                  <div class="text-center">
                    <i v-if="data.value" class="bx bx-check-circle font-size-16 text-success"></i>
                    <i v-else class="bx bx-x-circle font-size-16 text-danger"></i>
                  </div>
                </template>
                <template #cell(component_app_climate_scores)="data">
                  <div v-for="score in data.value" :key="score" class="text-center">
                    <div v-if="score.app_climate_score.name == 'Total'">
                      <span v-if="score.score > 70" class="font-size-14 badge badge-soft-success"
                        >{{ score.score }}%</span
                      >
                      <span
                        v-else-if="score.score >= 40 && score.score <= 70"
                        class="font-size-14 badge badge-soft-warning"
                        >{{ score.score }}%</span
                      >
                      <span v-else-if="score.score < 40 && score.score > 0" class="font-size-14 badge badge-soft-danger"
                        >{{ score.score }}%</span
                      >
                      <span v-else class="font-size-14 badge badge-soft-light text-muted">{{ score.score }}%</span>
                    </div>
                  </div>
                </template>
                <template #cell(repo_pushed_at)="data">
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
