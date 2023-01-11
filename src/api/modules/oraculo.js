import axios from 'axios'

const TEST_AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGd1ZGFib28uY29tLmJyIiwidHlwZSI6ImFkbWluIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNTc5NjI2ODgyfQ.oV8BFp_XF3I7Yu5XMGuUCOzFcGfKaqQbUAJqDZNBdHg'

const api = axios.create({
  timeout: 30000,
  baseURL: process.env.VUE_APP_ORACULO_API_URL,
})

api.defaults.headers.common['Authorization'] = TEST_AUTH_TOKEN

export default api
