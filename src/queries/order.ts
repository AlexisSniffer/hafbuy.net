import qs from 'qs'

export const qsOrders = (filters: {
  user: string | undefined
  pagination?: { page: number; pageSize: number }
}) =>
  qs.stringify(
    {
      pagination: filters.pagination,
      populate: {
        products: '*',
      },
      sort: ['date:desc'],
      filters: {
        user: {
          id: {
            $eq: filters.user,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  )
