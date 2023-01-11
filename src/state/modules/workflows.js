import { oraculoApi } from '@/api'

export const actions = {
  getAll(context, payload) {
    const { limit, offset, search } = payload
    return oraculoApi.get(`/workflows?limit=${limit}&offset=${offset}&search=${search}&ordering=name`)
  },
  getById(context, payload) {
    const { id } = payload
    return oraculoApi.get(`/workflows/${id}`)
  },
}
