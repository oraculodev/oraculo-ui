<script>
import Layout from '../../layouts/main'
import { semiRadialbarChart } from './chart'
import Notes from '../shared/_notes'
import RepositoriesTable from '../shared/_repositoriesTable'

export default {
  components: {
    Layout,
    Notes,
    RepositoriesTable,
  },
  data: () => ({
    loading: false,
    data: {
      id: '',
      name: '',
      description: '',
      system: {
        name: '',
      },
      group_owner: {
        name: '',
      },
      lifecycle: '',
      type: '',
      tags: [],
      repo_url: '',
      cicd_url: '',
      group_links: [],
      infos_up_to_date: false,
    },
    dataClimate: null,
    dataClimateScore: null,
    semiRadialbarChart: semiRadialbarChart,
  }),
  mounted() {
    this.getData()
    this.getAppClimateData()
    this.getAppClimateScoreData()
  },
  methods: {
    getData() {
      const { componentId } = this.$route.params
      this.loading = true
      this.$store
        .dispatch('components/getById', { id: componentId })
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
    getCategory(data, category) {
      return data.find((data) => {
        return data.category == category
      })
    },
    createCategory(category, item, doc_url, is_check, not_apply) {
      const obj = {
        category: category,
        items: [
          {
            name: item,
            doc_url: doc_url,
            is_check: is_check,
            not_apply: not_apply,
          },
        ],
      }
      return obj
    },
    createItem(item, doc_url, is_check, not_apply) {
      const obj = {
        name: item,
        doc_url: doc_url,
        is_check: is_check,
        not_apply: not_apply,
      }
      return obj
    },
    getAppClimateData() {
      const { componentId } = this.$route.params
      this.loading = true
      this.$store
        .dispatch('components/getAppClimate', { offset: 0, limit: 150, componentId: componentId })
        .then(({ data }) => {
          this.loading = false
          console.log(data)

          data.results.forEach((element) => {
            const category = element.app_climate_item.category.name
            const item = element.app_climate_item.name
            const doc_url = element.app_climate_item.doc_url
            const is_check = element.is_check
            const not_apply = element.not_apply

            if (!this.dataClimate) {
              // first time
              this.dataClimate = []
              this.dataClimate.push(this.createCategory(category, item, doc_url, is_check, not_apply))
              return
            }

            let categoryObj = this.getCategory(this.dataClimate, category)
            if (categoryObj) {
              categoryObj.items.push(this.createItem(item, doc_url, is_check, not_apply))
            } else {
              this.dataClimate.push(this.createCategory(category, item, doc_url, is_check, not_apply))
            }
          })

          // console.log(this.dataClimate)
          if (this.dataClimate) {
            this.dataClimate.forEach((category) => {
              category.items.sort((a, b) => a.name.localeCompare(b.name))
              category.items.sort((a, b) => Number(a.is_check) - Number(b.is_check))
              category.items.sort((a, b) => Number(a.not_apply) - Number(b.not_apply))
            })
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    getAppClimateScoreData() {
      const { componentId } = this.$route.params
      this.loading = true
      this.$store
        .dispatch('components/getAppClimateScore', { offset: 0, limit: 150, componentId: componentId })
        .then(({ data }) => {
          this.loading = false
          console.log(data)
          this.dataClimateScore = data.results
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    getEditUrl() {
      return `${process.env.VUE_APP_ORACULO_ADMIN_URL}/catalog/component/${this.data.id}/change/`
    },
    getCICDUrl() {
      const cicd_url = this.data.cicd_url
        ? this.data.cicd_url
        : `${process.env.VUE_APP_JENKINS_URL}/${this.data.name}/activity/`
      return cicd_url
    },
  },
}
</script>

<template>
  <Layout :pagetitle="data.name">
    <Loading v-if="loading" :full-width="true" />
    <!-- Nav tabs -->
    <ul class="nav nav-tabs nav-tabs-custom" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" data-bs-toggle="tab" href="#overview" role="tab">
          <span>OVERVIEW</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="tab" href="#assessment" role="tab">
          <span>APP CLIMATE</span>
        </a>
      </li>
    </ul>

    <br />
    <!-- Tab panes -->
    <div class="tab-content text-muted">
      <div id="overview" class="tab-pane active" role="tabpanel">
        <div class="row">
          <!-- about -->
          <div class="col-xl-7">
            <div class="card">
              <div class="card-header bg-transparent border-bottom">
                <div class="row">
                  <div class="col-lg-12">
                    <h3 class="mb-0 float-start">About</h3>
                    <ul class="list-inline m-0 text-end float-end">
                      <li v-show="data.api_doc_url" class="list-inline-item">
                        <a :href="data.api_doc_url" target="_blank" alt="api doc swagger" title="api doc swagger"
                          ><i class="bx bxs-file-json font-size-26"></i
                        ></a>
                      </li>
                      <li v-show="data.public_api_doc_url" class="list-inline-item">
                        <a :href="data.public_api_doc_url" target="_blank" alt="public api doc" title="public api doc"
                          ><i class="bx bx-globe font-size-26"></i
                        ></a>
                      </li>
                      <li class="list-inline-item">
                        <a :href="getCICDUrl()" target="_blank" alt="ci/cd" title="ci/cd"
                          ><i class="bx bx-git-pull-request font-size-26"></i
                        ></a>
                      </li>
                      <li class="list-inline-item">
                        <a
                          :href="data.repo_url"
                          target="_blank"
                          alt="view source code"
                          title="view source code"
                          class=""
                          ><i class="bx bxl-github font-size-26"></i
                        ></a>
                      </li>
                      <li class="list-inline-item mr-4">
                        <a :href="getEditUrl()" target="_blank" alt="edit meta data" title="edit meta data"
                          ><i class="bx bx-edit-alt font-size-26"></i
                        ></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-12">
                    <h5 class="text-uppercase font-size-14">Description</h5>
                    <p v-if="data.description">{{ data.description }}</p>
                    <p v-else>No information</p>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-lg-6">
                    <h5 class="text-uppercase font-size-14">Owner</h5>
                    <p v-if="data.group_owner">
                      <router-link :to="`/groups/${data.group_owner.id}`" class="badge badge-soft-dark font-size-12">
                        {{ data.group_owner.name }}
                      </router-link>
                    </p>
                    <p v-else>No information</p>
                  </div>
                  <div class="col-lg-6">
                    <h5 class="text-uppercase font-size-14">System</h5>
                    <p v-if="data.system">{{ data.system.name }}</p>
                    <p v-else>No information</p>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-lg-6">
                    <h5 class="text-uppercase font-size-14">Type</h5>
                    <p v-if="data.type">{{ data.type }}</p>
                    <p v-else>No information</p>
                  </div>
                  <div class="col-lg-6">
                    <h5 class="text-uppercase font-size-14">Lifecycle</h5>
                    <p v-if="data.lifecycle">{{ data.lifecycle }}</p>
                    <p v-else>No information</p>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-lg-6">
                    <h5 class="text-uppercase font-size-14">Tags</h5>
                    <p v-if="data.tags && data.tags.length > 0">
                      <span v-for="tag in data.tags" :key="tag" class="badge badge-soft-info">{{ tag }}</span>
                    </p>
                    <p v-else>No information</p>
                  </div>
                  <div class="col-lg-6">
                    <h5 class="text-uppercase font-size-14">Critical</h5>
                    <i v-if="data.critical" class="bx bx-check-circle font-size-16 text-success"></i>
                    <i v-else class="bx bx-x-circle font-size-16 text-danger"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- group links -->
          <div class="col-xl-5">
            <div class="card">
              <div class="card-header">
                <h3 class="mb-0">Links</h3>
              </div>
              <div class="card-body">
                <div v-if="data.group_links && data.group_links.length > 0" id="accordionLinks" class="accordion">
                  <div v-for="group_link in data.group_links" :key="group_link.id" class="accordion-item">
                    <h2 :id="group_link.id" class="accordion-header">
                      <button
                        class="accordion-button fw-medium collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#accordion' + group_link.id"
                        aria-expanded="false"
                        :aria-controls="'accordion' + group_link.id"
                      >
                        {{ group_link.name }}
                      </button>
                    </h2>
                    <div
                      :id="'accordion' + group_link.id"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionLinks"
                    >
                      <div class="accordion-body">
                        <div class="text-muted">
                          <ul v-if="group_link.links && group_link.links.length > 0" class="m-0">
                            <li v-for="index in group_link.links.length" :key="index">
                              <a
                                :href="group_link.links[index - 1].url"
                                target="_blank"
                                :alt="group_link.links[index - 1].text"
                                :title="group_link.links[index - 1].text"
                              >
                                {{ group_link.links[index - 1].text }}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p v-else class="mb-0">No information</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- components -->
          <div class="col-xl-12">
            <div class="card">
              <div class="card-header bg-transparent border-bottom">
                <h3 class="mb-0">Related Components</h3>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <RepositoriesTable :components="data.components"></RepositoriesTable>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- resources -->
          <div class="col-xl-12">
            <div class="card">
              <div class="card-header bg-transparent border-bottom">
                <h3 class="mb-0">Resources</h3>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table
                    v-if="data.resources && data.resources.length > 0"
                    class="table align-middle table-borderless mb-0"
                  >
                    <thead class="table-light">
                      <tr>
                        <th class="align-middle">Name</th>
                        <th class="align-middle">Type</th>
                        <th class="align-middle">Lifecycle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="resource in data.resources" :key="resource.id">
                        <td>{{ resource.name }}</td>
                        <td>{{ resource.type.name }}</td>
                        <td>{{ resource.lifecycle }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p v-else class="mb-0">No information</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- component notes -->
          <div class="col-xl-12">
            <div class="card">
              <div class="card-header">
                <h3 class="mb-0">Notas</h3>
              </div>
              <div class="card-body">
                <Notes v-if="data.notes && data.notes.length > 0" :notes="data.notes"></Notes>
                <p v-else class="mb-0">No information</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="assessment" class="tab-pane" role="tabpanel">
        <div v-if="dataClimateScore && dataClimateScore.length > 0" class="row">
          <div v-for="score in dataClimateScore" :key="score.id" class="col-xl-4 col-sm-6">
            <h2 class="text-center">
              {{ score.app_climate_score.name }}
            </h2>
            <apexchart
              class="apex-charts"
              height="250"
              dir="ltr"
              :series="[score.score]"
              :options="semiRadialbarChart.chartOptions"
            >
            </apexchart>
          </div>
        </div>

        <div v-if="dataClimate && dataClimate.length > 0" class="row">
          <div v-for="category in dataClimate" :key="category.category" class="col-xl-4 col-sm-6">
            <div class="card" style="height: 95%">
              <div class="card-header bg-transparent border-bottom">
                <div class="row">
                  <div class="col-sm-10">
                    <h3>{{ category.category }}</h3>
                  </div>
                  <div class="col-sm-2 text-end">
                    <ul class="list-inline m-0">
                      <li class="list-inline-item mr-4">
                        <a :href="getEditUrl()" target="_blank" alt="edit meta data" title="edit meta data"
                          ><i class="bx bx-edit-alt font-size-26"></i
                        ></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table align-middle table-nowrap mb-0">
                    <tbody>
                      <tr v-for="item in category.items" :key="item.name">
                        <td style="min-width: 160px">
                          <h5 class="font-size-14 m-0">
                            <a :href="item.doc_url" target="_blank" title="ver como habilitar">
                              <spam v-if="item.not_apply" class="text-muted">{{ item.name }}</spam>
                              <spam v-else-if="item.is_check" class="text-success">{{ item.name }}</spam>
                              <spam v-else class="text-danger">{{ item.name }}</spam>
                            </a>
                          </h5>
                        </td>
                        <td>
                          <div class="text-end">
                            <i v-if="item.not_apply" class="bx bx-minus-circle font-size-16 text-muted"></i>
                            <i v-else-if="item.is_check" class="bx bx-check-circle font-size-16 text-success"></i>
                            <i v-else class="bx bx-x-circle font-size-16 text-danger"></i>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-else>No information</p>
      </div>
    </div>
  </Layout>
</template>
