import { create } from 'zustand'

interface PaginationProps {
  page: number
  pageSize: number
}

interface FilterState {
  filter: string
  categories: string[]
  prices: number[]
  brands: string[]
  views: number[]
  pagination: PaginationProps
  setFilter: (filter: string) => void
  setCategories: (categories: string[]) => void
  setPrices: (prices: number[]) => void
  setBrands: (brands: string[]) => void
  setViews: (views: number[]) => void
  setPagination: (pagination: PaginationProps) => void
}

const useFilterStore = create<FilterState>()((set) => ({
  filter: '',
  categories: [],
  prices: [0, 0],
  brands: [],
  views: [],
  pagination: {
    page: 1,
    pageSize: 12,
  },
  setFilter: (filter: string) => set((state) => ({ filter: filter })),
  setCategories: (categories: string[]) =>
    set((state) => ({ categories: categories })),
  setPrices: (prices: number[]) => set((state) => ({ prices: prices })),
  setBrands: (brands: string[]) => set((state) => ({ brands: brands })),
  setViews: (views: number[]) => set((state) => ({ views: views })),
  setPagination: (pagination: PaginationProps) =>
    set((state) => ({ pagination: pagination })),
}))

export default useFilterStore
