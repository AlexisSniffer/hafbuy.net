export interface Service {
  id: number
  attributes: {
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    name: string
    description: string
    icon: string
    order?: number
    locale: string
    localizations?: { data: Service[] }
  }
}
