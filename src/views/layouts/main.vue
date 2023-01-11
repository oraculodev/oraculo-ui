<script>
import { layoutComputed } from '@/state/helpers'
import Vertical from './vertical'
import Horizontal from './horizontal'

export default {
  components: {
    Vertical,
    Horizontal,
  },
  props: {
    pagetitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...layoutComputed,
  },
  mounted() {},
  methods: {},
}
</script>

<template>
  <div>
    <Vertical v-if="layoutType === 'vertical'" :pagetitle="pagetitle" :layout="layoutType">
      <slot />
    </Vertical>

    <Horizontal v-if="layoutType === 'horizontal'" :pagetitle="pagetitle" :layout="layoutType">
      <slot />
    </Horizontal>
  </div>
</template>
