<template>
  <div :class="[$style.container, { [$style.fullWidth]: fullWidth }]" :style="containerStyle">
    <div :class="$style.ripple">
      <div></div>
      <div></div>
    </div>
    <p :class="$style.description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    description: {
      type: String,
      default: 'Carregando...',
    },
    height: {
      type: Number,
      default: 0,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    containerStyle() {
      if (this.fullWidth || !this.height) {
        return {}
      }

      return { height: `${this.height}px` }
    },
  },
}
</script>

<style module>
.container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.fullWidth {
  background: #ffffff96;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}

body[data-layout-mode='dark'] .fullWidth {
  background: #42474dce;
}

.description {
  color: #646464;
}

body[data-layout-mode='dark'] .description {
  color: #d9e3f3;
}

.ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.ripple div {
  position: absolute;
  border: 4px solid #42474d;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
