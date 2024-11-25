<script>
export default {
  name: 'AppClimateScoreBadge',
  props: {
    scores: {
      type: Array,
      default() {
        return []
      },
    },
    scoreName: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <div v-for="score in scores" :key="score.id">
    <div v-if="score.app_climate_score.name === scoreName">
      <span v-if="score.score > 70" class="font-size-14 badge badge-soft-success">{{ score.score }}%</span>
      <span v-else-if="score.score >= 40 && score.score <= 70" class="font-size-14 badge badge-soft-warning">{{
        score.score }}%</span>
      <span v-else-if="score.score < 40 && score.score > 0" class="font-size-14 badge badge-soft-danger">{{ score.score
        }}%</span>
      <span v-else class="font-size-14 badge badge-soft-light text-muted">{{ score.score }}%</span>
    </div>
  </div>
</template>

<style module></style>
