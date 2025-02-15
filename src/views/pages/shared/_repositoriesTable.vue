<script>
import AppClimateScoreBadge from './_appClimateScoreBadge'
import Notes from './_notes'

export default {
  name: 'RepositoriesTable',
  components: {
    AppClimateScoreBadge,
    Notes,
  },
  props: {
    components: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    getEditComponentUrl(componentId) {
      return `${process.env.VUE_APP_ORACULO_ADMIN_URL}/catalog/component/${componentId}/change/`
    },
  },
}
</script>

<template>
  <table v-if="components && components.length > 0" class="table align-middle table-borderless mb-0">
    <thead class="table-light">
      <tr>
        <th class="align-middle">Name</th>
        <th class="align-middle">Type</th>
        <th class="align-middle">Lifecycle</th>
        <th class="align-middle">System</th>
        <th class="align-middle">Macroarea</th>
        <th class="align-middle">Owner</th>
        <th class="align-middle">Tags</th>
        <th class="align-middle">Context Level</th>
        <th class="align-middle">Critical</th>
        <th class="align-middle">Score</th>
        <th class="align-middle">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="component in components" :key="component.id">
        <td>
          <router-link :to="`/components/${component.id}`" class="text-body fw-semibold"
            >{{ component.name }}
          </router-link>
        </td>
        <td>{{ component.type }}</td>
        <td>{{ component.lifecycle }}</td>
        <td>
          <span v-if="component.system">{{ component.system.name }}</span>
        </td>
        <td>
          <span v-if="component.macroarea">{{ component.macroarea.name }}</span>
        </td>
        <td>
          <span v-if="component.group_owner">{{ component.group_owner.name }}</span>
        </td>
        <td>
          <span v-for="tag in component.tags" :key="tag" class="badge badge-soft-info">{{ tag }}</span>
        </td>
        <td>
          <span
            v-if="component.context_level && component.context_level == 'low'"
            class="font-size-12 badge badge-soft-danger"
            >{{ component.context_level }}</span
          >
          <span
            v-if="component.context_level && component.context_level == 'medium'"
            class="font-size-12 badge badge-soft-warning"
            >{{ component.context_level }}</span
          >
          <span
            v-if="component.context_level && component.context_level == 'high'"
            class="font-size-12 badge badge-soft-success"
            >{{ component.context_level }}</span
          >
        </td>
        <td class="text-center">
          <i v-if="component.critical" class="bx bx-check-circle font-size-16 text-success"></i>
          <i v-else class="bx bx-x-circle font-size-16 text-danger"></i>
        </td>
        <td class="text-center">
          <AppClimateScoreBadge :scores="component.component_app_climate_scores" :score-name="'Total'" />
        </td>
        <td class="text-center">
          <div>
            <a
              v-if="component.notes && component.notes.length > 0"
              href="#"
              alt=""
              class="text-body"
              data-bs-toggle="modal"
              :data-bs-target="'.bs-notes-modal-xl-' + component.id"
            >
              <i class="bx bx-file font-size-16 text-primary"></i>
            </a>
            <a v-else :href="getEditComponentUrl(component.id)" alt="add new note" target="_blank" class="text-body">
              <i class="bx bx-pencil font-size-16 text-primary"></i>
            </a>
          </div>
          <div
            v-if="component.notes && component.notes.length > 0"
            :id="'modal' + component.id"
            :class="'modal fade bs-notes-modal-xl-' + component.id"
            tabindex="-1"
            role="dialog"
            :aria-labelledby="'modal' + component.id"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 :id="'modal' + component.id" class="modal-title">Notes: {{ component.name }}&nbsp;</h5>
                  <a :href="getEditComponentUrl(component.id)" target="_blank" alt="edit notes" title="edit notes"
                    ><i class="bx bx-edit-alt font-size-22"></i
                  ></a>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <Notes :notes="component.notes" />
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else class="mb-0">No information</p>

  <!--
  Modal de notes
  -->
</template>

<style>
.al-left {
  text-align: left !important;
}
</style>
