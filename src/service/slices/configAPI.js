import axios from 'axios'

export const instance = axios.create({
  baseURL: `${window.URL_SERVER}/api`,
})

instance.interceptors.request.use(
  (config) => {
    // const accessToken = localStorage.getItem('accessToken')
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJ2ZWJiMDlLbjExdWVNa0FONFBWMEhFS0xZYmJkbEtGRGt3Z1E0MWxOIiwiZXhwIjoxNzA2MTk1NTI2LCJpc3MiOiJodHRwczovL29udGhlZGVzay5jb20iLCJhdWQiOiJodHRwczovL29udGhlZGVzay5jb20ifQ.PJIMgG6TgqntiEPWdeJieMWlB8m4TZpdAvXHBfVD5Vw`
    return config
  },
  (error) => Promise.reject(error)
)
