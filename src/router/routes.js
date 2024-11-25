export default [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/pages/dash/dash.vue'),
  },
  {
    path: '/dash',
    name: 'dash',
    component: () => import('../views/pages/dash/dash.vue'),
  },
  {
    path: '/components',
    component: () => import('../views/pages/components/index.vue'),
    children: [
      {
        name: 'components-list',
        path: '',
        component: () => import('../views/pages/components/list.vue'),
      },
      {
        name: 'components-show',
        path: ':componentId',
        component: () => import('../views/pages/components/show.vue'),
      },
    ],
  },
  {
    path: '/groups',
    component: () => import('../views/pages/groups/index.vue'),
    children: [
      {
        name: 'groups-list',
        path: '',
        component: () => import('../views/pages/groups/list.vue'),
      },
      {
        name: 'groups-show',
        path: ':groupId',
        component: () => import('../views/pages/groups/show.vue'),
      },
    ],
  },
  {
    path: '/systems',
    component: () => import('../views/pages/systems/index.vue'),
    children: [
      {
        name: 'systems-list',
        path: '',
        component: () => import('../views/pages/systems/list.vue'),
      },
      {
        name: 'systems-show',
        path: ':systemId',
        component: () => import('../views/pages/systems/show.vue'),
      },
    ],
  },
  {
    path: '/links',
    name: 'links',
    component: () => import('../views/pages/links/links.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/pages/about/about.vue'),
  },
]
