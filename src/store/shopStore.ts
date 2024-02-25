import { create } from 'zustand'

interface ShopState {
  viewProducts: number[]
  setViewProducts: (id: number) => void
}

const useShopStore = create<ShopState>()((set) => ({
  viewProducts: [],
  setViewProducts: (id: number) =>
    set((state) => {
      const storedData = parseDataArrayNumber('viewProducts')

      if (!storedData.includes(id)) {
        storedData.push(id)
      }

      if (storedData.length > 6) {
        storedData.shift()
      }

      localStorage.setItem('viewProducts', JSON.stringify(storedData))

      return { viewProducts: storedData }
    }),
}))

function parseDataArrayNumber(key: string) {
  const storedData = localStorage.getItem(key)
  let parsedData: number[] = []

  if (storedData) {
    try {
      parsedData = JSON.parse(storedData) as number[]
    } catch (error) {
      console.error('Error al analizar la cadena JSON:', error)
    }
  }

  return parsedData
}

export default useShopStore
