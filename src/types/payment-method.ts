export interface PaymentMethod {
  id: number
  attributes: {
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    name: string
    voucher: boolean
    description?: string
    locale: string
    localizations?: { data: PaymentMethod[] }
  }
}
