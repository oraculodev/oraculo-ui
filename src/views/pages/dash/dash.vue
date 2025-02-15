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
        .dispatch('dash/get')
        .then(({ data }) => {
          this.data = data[0]
          this.loading = false
          console.log(this.data)
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    getUrl() {
      return `${process.env.VUE_APP_ORACULO_ADMIN_URL}/catalog/`
    },
  },
}
</script>

<template>
  <Layout :pagetitle="'Dashboard'">
    <Loading v-if="loading" :full-width="true" />
    <div class="row">
      <div class="col-lg-6">
        <a :href="getUrl() + 'component/?lifecycle__exact=production'" title="link.title" target="_blank">
          <div class="card overflow-hidden">
            <div class="card-body d-flex align-items-center">
              <div class="flex-shrink-0 me-4">
                <div class="avatar">
                  <div class="avatar-title rounded bg-soft-primary text-primary">
                    <eva-icon class="icon font-size-24" name="settings-outline"></eva-icon>
                  </div>
                </div>
              </div>
              <div class="flex-grow-1">
                <h2 class="mt-0 mb-0">{{ data.production_services_count }}</h2>
                <p class="faq-ans text-muted mt-0 mb-0">Production services</p>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div class="col-lg-6">
        <a
          :href="getUrl() + 'component/?infos_up_to_date__exact=0&lifecycle__exact=production'"
          title="link.title"
          target="_blank"
        >
          <div class="card overflow-hidden">
            <div class="card-body d-flex align-items-center">
              <div class="flex-shrink-0 me-4">
                <div class="avatar">
                  <div
                    :class="
                      data.not_up_to_date_services_count == 0
                        ? 'avatar-title rounded bg-soft-primary text-primary'
                        : ' avatar-title rounded bg-soft-danger text-danger'
                    "
                  >
                    <eva-icon class="icon font-size-24" name="minus-circle-outline"></eva-icon>
                  </div>
                </div>
              </div>
              <div class="flex-grow-1">
                <h2 class="mt-0 mb-0">{{ data.not_up_to_date_services_count }}</h2>
                <p class="faq-ans text-muted mt-0 mb-0">Pending updates</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>

    <br />
    <br />

    <div class="row">
      <div class="col-xl-6">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-sm-8">
                <h4 class="card-title">Amount of services by team</h4>
              </div>
              <div class="col-sm-4 text-end">
                <a :href="getUrl() + 'group'" title="Oráculo Admin - Groups" target="_blank" class="text-end"
                  >see details</a
                >
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <div class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Team</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in data.services_by_group" :key="item.id">
                      <td>
                        <router-link :to="`/groups/${item.id}`">{{ item.name }}</router-link>
                      </td>
                      <td>
                        {{ item.count }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-6">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-sm-8">
                <h4 class="card-title">Amount of services by macroarea</h4>
              </div>
              <div class="col-sm-4 text-end">
                <a :href="getUrl() + 'component'" title="Oráculo Admin - Componentes" target="_blank" class="text-end"
                  >see details</a
                >
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <div class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Macroarea</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in data.services_count_by_macroarea" :key="item.macroarea__name">
                      <td>
                        {{ item.macroarea__name }}
                      </td>
                      <td>
                        {{ item.count }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br />

    <div class="row">
      <div class="col-xl-6">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-sm-8">
                <h4 class="card-title">Amount of services by type</h4>
              </div>
              <div class="col-sm-4 text-end">
                <a :href="getUrl() + 'component'" title="Oráculo Admin - Componentes" target="_blank" class="text-end"
                  >see details</a
                >
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <div class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in data.services_count_by_type" :key="item.id">
                      <td>
                        {{ item.type }}
                      </td>
                      <td>
                        {{ item.count }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-6"></div>
    </div>
  </Layout>
</template>
