import qs from 'qs'

export const qsReviews = (filters: {
  id: number
  pagination?: { page: number; pageSize: number }
}) =>
  qs.stringify(
    {
      filters: {
        product: {
          id: {
            $eq: filters.id,
          },
        },
      },

      pagination: filters.pagination,
    },
    {
      encodeValuesOnly: true,
    },
  )
