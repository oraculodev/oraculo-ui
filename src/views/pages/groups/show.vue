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
      type: '',
      group_links: [],
    },
  }),
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const { groupId } = this.$route.params
      this.loading = true
      this.$store
        .dispatch('groups/getById', { id: groupId })
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
      return `${process.env.VUE_APP_ORACULO_ADMIN_URL}/catalog/group/${this.data.id}/change/`
    },
  },
}
</script>

<template>
  <Layout :pagetitle="data.name" class="show-details">
    <Loading v-if="loading" :full-width="true" />
    <div class="row">
      <!-- about -->
      <div class="col-xl-7">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-sm-5">
                <h3 class="mb-0">About</h3>
              </div>
              <div class="col-sm-7 text-end">
                <ul class="list-inline m-0">
                  <li v-show="data.design_url" class="list-inline-item">
                    <a :href="data.design_url" target="_blank" alt="design" title="design">
                      <i class="bx bxs-palette font-size-26"></i>
                    </a>
                  </li>
                  <li v-show="data.board_url" class="list-inline-item">
                    <a :href="data.board_url" target="_blank" alt="team board" title="team board"
                      ><i class="bx bxs-dashboard font-size-26"></i
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
                <h5>Description</h5>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div v-if="data.description" v-html="data.description"></div>
                <p v-else>No information</p>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-lg-6">
                <h5>Tags</h5>
                <p v-if="data.tags && data.tags.length > 0">
                  <span v-for="tag in data.tags" :key="tag" class="badge badge-soft-primary">{{ tag }}</span>
                </p>
                <p v-else>No information</p>
              </div>
              <div class="col-lg-6">
                <h5 class="">Type</h5>
                <p class="fw-semibold">{{ data.type }}</p>
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

    <div v-show="['organization', 'department', 'tribe'].includes(data.type)" class="row">
      <!-- hives -->
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header">
            <h3 class="mb-0">Related Teams</h3>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                v-if="data.related_groups && data.related_groups.length > 0"
                class="table align-middle table-borderless mb-0"
              >
                <thead class="table-light">
                  <tr>
                    <th class="align-middle">Name</th>
                    <th class="align-middle">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="group in data.related_groups" :key="group.id">
                    <td>
                      <a :href="`/groups/${group.id}`" class="text-body fw-semibold">{{ group.name }} </a>
                    </td>
                    <td>
                      {{ group.type }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p v-else class="mb-0">No information</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="data.type === 'team'" class="row">
      <!-- components -->
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header">
            <h3 class="mb-0">Team repositories</h3>
            <span class="text-muted">Repositories owned by the team</span>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                v-if="data.components && data.components.length > 0"
                class="table align-middle table-borderless mb-0"
              >
                <thead class="table-light">
                  <tr>
                    <th class="align-middle">Name</th>
                    <th class="align-middle">Repository url</th>
                    <th class="align-middle">Type</th>
                    <th class="align-middle">Lifecycle</th>
                    <th class="align-middle">Owner</th>
                    <th class="align-middle">System</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="component in data.components" :key="component.id">
                    <td>
                      <router-link :to="`/components/${component.id}`" class="text-body fw-semibold"
                        >{{ component.name }}
                      </router-link>
                    </td>
                    <td>{{ component.repo_url }}</td>
                    <td>{{ component.type }}</td>
                    <td>{{ component.lifecycle }}</td>
                    <td>
                      <span v-if="component.group_owner">{{ component.group_owner.name }}</span>
                    </td>
                    <td>
                      <span v-if="component.system">{{ component.system.name }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p v-else class="mb-0">No information</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="data.type === 'team'" class="row">
      <!-- maintenance components -->
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header">
            <h3 class="mb-0">Team related repositories</h3>
            <span class="text-muted"
              >Repositories where the team eventually interacts or contributes through innersource</span
            >
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                v-if="data.work_components && data.work_components.length > 0"
                class="table align-middle table-borderless mb-0"
              >
                <thead class="table-light">
                  <tr>
                    <th class="align-middle">Name</th>
                    <th class="align-middle">Repository url</th>
                    <th class="align-middle">Type</th>
                    <th class="align-middle">Lifecycle</th>
                    <th class="align-middle">Owner</th>
                    <th class="align-middle">System</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="component in data.work_components" :key="component.id">
                    <td>
                      <router-link :to="`/components/${component.id}`" class="text-body fw-semibold"
                        >{{ component.name }}
                      </router-link>
                    </td>
                    <td>{{ component.repo_url }}</td>
                    <td>{{ component.type }}</td>
                    <td>{{ component.lifecycle }}</td>
                    <td>
                      <span v-if="component.group_owner">{{ component.group_owner.name }}</span>
                    </td>
                    <td>
                      <span v-if="component.system">{{ component.system.name }}</span>
                    </td>
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
      <!-- members -->
      <div class="col-xl-5">
        <div class="card">
          <div class="card-header">
            <h3 class="mb-0">Members</h3>
          </div>

          <div class="card-body">
            <div class="table-responsive">
              <table class="table align-middle table-nowrap mb-0">
                <tbody v-if="data.members && data.members.length > 0">
                  <tr v-for="member in data.members" :key="member.id">
                    <td style="width: 50px">
                      <div class="avatar-sm">
                        <span class="avatar-title rounded-circle bg-primary text-white font-size-14">
                          {{ member.name.charAt(0) }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <h5 class="font-size-14 m-0">
                        <a href="javascript: void(0);" class="text-dark">{{ member.name }}</a>
                      </h5>
                    </td>
                    <td>
                      <div>
                        <span class="badge bg-soft-success text-success font-size-11">{{ member.role }} </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <p v-else class="mb-0">No information</p>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- workflows -->
      <div class="col-xl-7">
        <div class="card">
          <div class="card-header">
            <h3 class="mb-0">Workflows</h3>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                v-if="data.workflows && data.workflows.length > 0"
                class="table align-middle table-borderless mb-0"
              >
                <thead class="table-light">
                  <tr>
                    <th class="align-middle">Name</th>
                    <th class="align-middle">System</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="workflow in data.workflows" :key="workflow.id">
                    <td>
                      <router-link :to="`/workflows/${workflow.id}`" class="text-body fw-semibold"
                        >{{ workflow.name }}
                      </router-link>
                    </td>
                    <td>
                      <span v-if="workflow.system">{{ workflow.system.name }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p v-else class="mb-0">No information</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
