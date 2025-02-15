<script>
export default {
  name: 'Notes',
  props: {
    notes: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<template>
  <div class="accordion">
    <div v-for="note in notes" :key="note.id" class="accordion-item">
      <h2 :id="note.id" class="accordion-header">
        <button
          class="accordion-button fw-medium collapsed"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#accordion' + note.id"
          aria-expanded="false"
          :aria-controls="'accordion' + note.id"
        >
          {{ note.title }}
        </button>
      </h2>
      <div
        :id="'accordion' + note.id"
        class="accordion-collapse collapse"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionLinks"
      >
        <div class="accordion-body">
          <!-- eslint-disable vue/no-v-html -->
          <div v-if="note.content" class="text-muted al-left" v-html="note.content"></div>
          <!--eslint-enable-->
        </div>
      </div>
    </div>
  </div>
</template>

<style module></style>
