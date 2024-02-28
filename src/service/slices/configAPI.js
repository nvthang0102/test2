import axios from 'axios'

export const instance = axios.create({
  baseURL: `${window.URL_SERVER}/api`,
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    // const accessToken = localStorage.getItem('accessToken')
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
