export type Filter = {
  isNew: boolean
  isLimited: boolean
  category: string[]
  search: string
}

export type FilterChange = {
  isNew?: boolean
  isLimited?: boolean
  category?: string[]
  search?: string
}

export type Product = {
  id: string
  name: string
  description: string
  categoryId: string
  categoryName: string
  categoryType: string
  isLimited: boolean
  isNew: boolean
  price: number
  discount: number | null
}

export type Category = {
  id: string
  name: string
  type: string
}
