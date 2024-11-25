import { oraculoApi } from '@/api'

export const actions = {
  get() {
    return oraculoApi.get(`/dash`)
  },
}
