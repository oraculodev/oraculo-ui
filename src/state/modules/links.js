import { oraculoApi } from '@/api'

export const actions = {
  getAll(context, payload) {
    const { limit, offset, search = '' } = payload
    return oraculoApi.get(`/links?limit=${limit}&offset=${offset}&search=${search}`)
  },
}
