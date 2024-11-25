<script>
import { layoutComputed } from '@/state/helpers'
import MetisMenu from 'metismenujs/dist/metismenujs'

import { SimpleBar } from 'simplebar-vue3'

/**
 * Sidebar component
 */
export default {
  components: {
    SimpleBar,
  },
  props: {
    isCondensed: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      settings: {
        minScrollbarLength: 60,
      },
    }
  },
  computed: {
    ...layoutComputed,
  },
  watch: {
    $route: {
      handler: 'onRoutechange',
      immediate: true,
      deep: true,
    },
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case 'default':
              document.body.setAttribute('data-sidebar-size', 'lg')
              break
            case 'compact':
              document.body.setAttribute('data-sidebar-size', 'md')
              document.body.classList.remove('vertical-collpsed')
              break
            case 'icon':
              document.body.setAttribute('data-sidebar-size', 'sm')
              break
            default:
              document.body.setAttribute('data-sidebar-size', 'lg')
              break
          }
        }
      },
    },
    width: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case 'boxed':
              document.body.setAttribute('data-layout-size', 'boxed')
              break
            case 'fluid':
              document.body.setAttribute('data-layout-size', 'fluid')
              break
            default:
              document.body.setAttribute('data-layout-size', 'fluid')
              break
          }
        }
      },
    },
    color: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case 'light':
              document.body.setAttribute('data-sidebar', 'light')
              break
            case 'dark':
              document.body.setAttribute('data-sidebar', 'dark')
              break
            case 'brand':
              document.body.setAttribute('data-sidebar', 'brand')
              break
            default:
              document.body.setAttribute('data-sidebar', 'dark')
              break
          }
        }
      },
    },
  },
  mounted: function () {
    // eslint-disable-next-line no-unused-vars
    var menuRef = new MetisMenu('#side-menu')
    var links = document.getElementsByClassName('side-nav-link-ref')
    var matchingMenuItem = null
    const paths = []

    for (var i = 0; i < links.length; i++) {
      paths.push(links[i]['pathname'])
    }
    var itemIndex = paths.indexOf(window.location.pathname)
    if (itemIndex === -1) {
      const strIndex = window.location.pathname.lastIndexOf('/')
      const item = window.location.pathname.substr(0, strIndex).toString()
      matchingMenuItem = links[paths.indexOf(item)]
    } else {
      matchingMenuItem = links[itemIndex]
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add('active')
      var parent = matchingMenuItem.parentElement

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add('mm-active')
        const parent2 = parent.parentElement.closest('ul')
        if (parent2 && parent2.id !== 'side-menu') {
          parent2.classList.add('mm-show')

          const parent3 = parent2.parentElement
          if (parent3) {
            parent3.classList.add('mm-active')
            var childAnchor = parent3.querySelector('.has-arrow')
            var childDropdown = parent3.querySelector('.has-dropdown')
            if (childAnchor) childAnchor.classList.add('mm-active')
            if (childDropdown) childDropdown.classList.add('mm-active')

            const parent4 = parent3.parentElement
            if (parent4 && parent4.id !== 'side-menu') {
              parent4.classList.add('mm-show')
              const parent5 = parent4.parentElement
              if (parent5 && parent5.id !== 'side-menu') {
                parent5.classList.add('mm-active')
                const childanchor = parent5.querySelector('.is-parent')
                if (childanchor && parent5.id !== 'side-menu') {
                  childanchor.classList.add('mm-active')
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    onRoutechange() {
      setTimeout(() => {
        if (document.getElementsByClassName('mm-active').length > 0) {
          const currentPosition = document.getElementsByClassName('mm-active')[0].offsetTop
          if (currentPosition > 500)
            if (this.$refs.isSimplebar)
              this.$refs.isSimplebar.value.getScrollElement().scrollTop = currentPosition + 300
        }
      }, 300)
    },
    toggleMenu() {
      this.$parent.toggleMenu()
    },
  },
}
</script>

<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="vertical-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
      <router-link to="/" class="logo logo-dark">
        <span class="logo-sm">
          <img src="@/assets/images/logo-dark-sm.png" alt="" height="22" />
        </span>
        <span class="logo-lg">
          <img src="@/assets/images/logo-dark.png" alt="" height="22" />
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

    <button type="button" class="btn btn-sm px-3 header-item vertical-menu-btn topnav-hamburger" @click="toggleMenu">
      <span class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>

    <SimpleBar ref="isSimplebar" data-simplebar class="sidebar-menu-scroll">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul id="side-menu" class="metismenu list-unstyled">
          <li>
            <router-link class="side-nav-link-ref" to="/dash">
              <eva-icon class="icon nav-icon" name="bar-chart-2-outline"></eva-icon>
              <span class="menu-item" data-key="t-dash">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link class="side-nav-link-ref" to="/components">
              <eva-icon class="icon nav-icon" name="settings-outline"></eva-icon>
              <span class="menu-item" data-key="t-components">Components</span>
            </router-link>
          </li>
          <li>
            <router-link class="side-nav-link-ref" to="/groups">
              <eva-icon class="icon nav-icon" name="people-outline"></eva-icon>
              <span class="menu-item" data-key="t-groups">Teams</span>
            </router-link>
          </li>
          <li>
            <router-link class="side-nav-link-ref" to="/systems">
              <eva-icon class="icon nav-icon" name="grid-outline"></eva-icon>
              <span class="menu-item" data-key="t-systems">Systems</span>
            </router-link>
          </li>
          <li>
            <router-link class="side-nav-link-ref" to="/links">
              <eva-icon class="icon nav-icon" name="link-outline"></eva-icon>
              <span class="menu-item" data-key="t-link">Links</span>
            </router-link>
          </li>
          <li>
            <router-link class="side-nav-link-ref" to="/about">
              <eva-icon class="icon nav-icon" name="info-outline"></eva-icon>
              <span class="menu-item" data-key="t-about">About</span>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- Sidebar -->
    </SimpleBar>
  </div>
  <!-- Left Sidebar End -->
</template>
