<script>
import Layout from '../../layouts/main'

export default {
  components: {
    Layout,
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
      tags: [],
      groups: [],
    },
  }),
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const { systemId } = this.$route.params
      this.loading = true
      this.$store
        .dispatch('systems/getById', { id: systemId })
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
    getEditUrl() {
      return `${process.env.VUE_APP_ORACULO_ADMIN_URL}/catalog/system/${this.data.id}/change/`
    },
  },
}
</script>

<template>
  <Layout :pagetitle="data.name">
    <Loading v-if="loading" :full-width="true" />
    <div class="row">
      <!-- about -->
      <div class="col-xl-7">
        <div class="card">
          <div class="card-header bg-transparent border-bottom">
            <div class="row">
              <div class="col-sm-5">
                <h3 class="mb-0 float-start">About</h3>
                <ul class="list-inline m-0 text-end float-end">
                  <li class="list-inline-item mr-4">
                    <a :href="getEditUrl()" target="_blank" alt="edit meta data" title="edit meta data"><i
                        class="bx bx-edit-alt font-size-26"></i></a>
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
              <div class="col-lg-12">
                <h5 class="text-uppercase font-size-14">Related Teams</h5>
                <p v-if="data.groups && data.groups.length > 0">
                  <router-link v-for="group in data.groups" :key="group" :to="`/groups/${group.id}`"
                    class="badge badge-soft-dark font-size-12">{{ group.name }}</router-link>
                </p>
                <p v-else>No information</p>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-lg-6">
                <h5 class="text-uppercase font-size-14">Tags</h5>
                <p v-if="data.tags && data.tags.length > 0">
                  <span v-for="tag in data.tags" :key="tag" class="badge badge-soft-primary">{{ tag }}</span>
                </p>
                <p v-else>No information</p>
              </div>
              <div class="col-lg-6"></div>
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
                  <button class="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse"
                    :data-bs-target="'#accordion' + group_link.id" aria-expanded="false"
                    :aria-controls="'accordion' + group_link.id">
                    {{ group_link.name }}
                  </button>
                </h2>
                <div :id="'accordion' + group_link.id" class="accordion-collapse collapse" aria-labelledby="headingOne"
                  data-bs-parent="#accordionLinks">
                  <div class="accordion-body">
                    <div class="text-muted">
                      <ul v-if="group_link.links && group_link.links.length > 0" class="m-0">
                        <li v-for="index in group_link.links.length" :key="index">
                          <a :href="group_link.links[index - 1].url" target="_blank"
                            :alt="group_link.links[index - 1].text" :title="group_link.links[index - 1].text">
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
  </Layout>
</template>
