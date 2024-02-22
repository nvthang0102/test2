import axios from 'axios'

export const instance = axios.create({
  baseURL: `${window.URL_SERVER}/api`,
  // withCredentials: true
})

instance.interceptors.request.use(
  (config) => {
    // const accessToken = localStorage.getItem('accessToken')
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJ2ZWJiMDlLbjExdWVNa0FONFBWMEhFS0xZYmJkbEtGRGt3Z1E0MWxOIiwiZXhwIjoxNzA3MTA1MTQzLCJpc3MiOiJodHRwczovL29udGhlZGVzay5jb20iLCJhdWQiOiJodHRwczovL29udGhlZGVzay5jb20ifQ.sr1qToPaqfG9X2cwBbM8W-bbOQB_9k94xe44DXhOn64`
    return config
  },
  (error) => Promise.reject(error)
)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      (error.response && error.response.status === 401) ||
      error.response.status === 403
    ) {
      window.location.href = 'https://login.onthedesk.vn/'
    }
    return Promise.reject(error)
  }
)
