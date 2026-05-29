import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Company } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'velqora-auth' },
  ),
)

interface UiState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  activeCompany: Company | null
  language: string
  setSidebarOpen: (v: boolean) => void
  toggleSidebar: () => void
  toggleSidebarCollapse: () => void
  setActiveCompany: (c: Company | null) => void
  setLanguage: (l: string) => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      sidebarCollapsed: false,
      activeCompany: null,
      language: 'en',
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      toggleSidebarCollapse: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setActiveCompany: (activeCompany) => set({ activeCompany }),
      setLanguage: (language) => set({ language }),
    }),
    { name: 'velqora-ui', partialize: (s) => ({ sidebarCollapsed: s.sidebarCollapsed, language: s.language }) },
  ),
)
