import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080'
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION ?? 'v1'

export const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': API_VERSION,
  },
})

const TOKEN_KEY = 'velqora_auth_token'
const COMPANY_KEY = 'velqora_active_company'

export const getToken = () =>
  typeof window === 'undefined' ? null : localStorage.getItem(TOKEN_KEY)

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, token)
}

export const clearToken = () => {
  if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY)
}

export const getActiveCompany = () =>
  typeof window === 'undefined' ? null : localStorage.getItem(COMPANY_KEY)

export const setActiveCompany = (companyId: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(COMPANY_KEY, companyId)
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken()
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  const company = getActiveCompany()
  if (company && config.headers) {
    config.headers['X-Company-Id'] = company
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      clearToken()
      if (!window.location.pathname.startsWith('/auth')) {
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  },
)
