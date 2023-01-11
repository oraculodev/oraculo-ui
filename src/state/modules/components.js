import { oraculoApi } from '@/api'

export const actions = {
  getAll(context, payload) {
    const { limit, offset, search, filters } = payload
    return oraculoApi.get(`/components?limit=${limit}&offset=${offset}&search=${search}&ordering=name&${filters}`)
  },
  getById(context, payload) {
    const { id } = payload
    return oraculoApi.get(`/components/${id}`)
  },
  getAppClimate(context, payload) {
    const { limit, offset, componentId } = payload
    return oraculoApi.get(`/components/${componentId}/appclimate?limit=${limit}&offset=${offset}`)
  },
  getAppClimateScore(context, payload) {
    const { limit, offset, componentId } = payload
    return oraculoApi.get(`/components/${componentId}/appclimatescore?limit=${limit}&offset=${offset}`)
  },
}
