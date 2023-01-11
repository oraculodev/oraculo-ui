<script>
import { layoutMethods, layoutComputed } from '@/state/helpers'

/**
 * Topbar component
 */
export default {
  components: {},
  props: {
    type: {
      type: String,
      required: true,
    },
    layoutscroll: {
      type: Boolean,
      required: true,
    },
    pagetitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      text: null,
      flag: null,
      value: null,
    }
  },
  computed: {
    ...layoutComputed,
    mode: {
      get() {
        return this.$store ? this.$store.state.layout.layoutMode : {} || {}
      },
    },
  },
  watch: {
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case 'dark':
              document.body.setAttribute('data-topbar', 'dark')
              break
            case 'light':
              document.body.setAttribute('data-topbar', 'light')
              document.body.removeAttribute('data-layout-size', 'boxed')
              break
            default:
              document.body.setAttribute('data-topbar', 'dark')
              break
          }
        }
      },
    },
    layoutscroll: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case false:
              document.body.setAttribute('data-layout-scrollable', 'false')
              break
            case true:
              document.body.setAttribute('data-layout-scrollable', 'true')
              break
            default:
              document.body.setAttribute('data-layout-scrollable', 'false')
              break
          }
        }
      },
    },
  },
  mounted() {
    const layoutMode = window.localStorage.getItem('layoutMode')
    if (layoutMode && layoutMode === 'dark') {
      this.toggleDarkMode()
    }
  },
  methods: {
    ...layoutMethods,
    toggleDarkMode() {
      document.body.setAttribute('data-layout-mode', 'dark')
      window.localStorage.setItem('layoutMode', 'dark')
      this.changeTopbar({
        topbar: 'dark',
      })
      this.changeSidebarColor({
        sidebarColor: 'dark',
      })
      this.changeLayoutMode({
        layoutMode: 'dark',
      })
    },
    toggleLightMode() {
      document.body.setAttribute('data-layout-mode', 'light')
      window.localStorage.setItem('layoutMode', 'light')
      this.changeTopbar({
        topbar: 'light',
      })
      this.changeSidebarColor({
        sidebarColor: 'light',
      })
      this.changeLayoutMode({
        layoutMode: 'light',
      })
    },
    logout() {},
    toggleMenu() {
      this.$parent.toggleMenu()
    },
  },
}
</script>

<template>
  <header id="page-topbar" class="isvertical-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/logo-dark-sm.png" alt="" height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-dark-sm.png" alt="" height="22" />
            </span>
          </router-link>

          <router-link to="/" class="logo logo-light">
            <span class="logo-lg">
              <img src="@/assets/images/logo-light.png" alt="" height="22" />
            </span>
            <span class="logo-sm">
              <img src="@/assets/images/logo-light-sm.png" alt="" height="22" />
            </span>
          </router-link>
        </div>

        <button
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn topnav-hamburger"
          @click="toggleMenu"
        >
          <span class="hamburger-icon open">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div class="d-none d-sm-block ms-3 align-self-center">
          <h4 class="page-title">{{ pagetitle }}</h4>
        </div>
      </div>
      <div class="d-flex">
        <div v-if="mode == 'light'" class="d-inline-block">
          <button
            id="right-bar-toggle-v"
            type="button"
            class="btn header-item noti-icon right-bar-toggle toggle-right"
            @click="toggleDarkMode"
          >
            <eva-icon class="icon-sm toggle-right" name="moon-outline"></eva-icon>
          </button>
        </div>

        <div v-else class="d-inline-block">
          <button
            id="right-bar-toggle-v2"
            type="button"
            class="btn header-item noti-icon right-bar-toggle toggle-right"
            @click="toggleLightMode"
          >
            <eva-icon class="icon-sm toggle-right" name="sun"></eva-icon>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
