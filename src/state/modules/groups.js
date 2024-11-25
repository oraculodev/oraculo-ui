import { oraculoApi } from '@/api'

export const actions = {
  getAll(context, payload) {
    const { limit, offset, search } = payload
    return oraculoApi.get(`/groups?is_active=true&limit=${limit}&offset=${offset}&search=${search}&ordering=name`)
  },
  getById(context, payload) {
    const { id } = payload
    return oraculoApi.get(`/groups/${id}`)
  },
}
