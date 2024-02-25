import { Media } from './media'
import { PaymentMethod } from './payment-method'
import { Product } from './product'
import { User } from './user'

export interface Order {
  id: number
  attributes: {
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    order: string
    status: string
    date: Date
    user?: { data: User }
    billing: { data: OrderBilling[] }
    products: { data: OrderProduct[] }
    payments: { data: OrderPayment[] }
  }
}

export interface OrderBilling {
  id: number
  attributes: {
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    name: string
    lastname: string
    address: string
    phone: number
    email: string
    notes: string
    order?: { data: Order }
  }
}

export interface OrderProduct {
  id: number
  attributes: {
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    price: number
    qty: number
    variant?: string
    product?: { data: Product }
    order?: { data: Order }
  }
}

export interface OrderPayment {
  id: number
  attributes: {
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    voucher?: { data: Media }
    payment_method?: { data: PaymentMethod }
    order?: { data: Order }
  }
}
