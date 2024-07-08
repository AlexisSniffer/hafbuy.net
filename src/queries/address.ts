import qs from 'qs'

export const qsAddress = (filters: {
  user: string | undefined
  pagination?: { page: number; pageSize: number }
}) =>
  qs.stringify(
    {
      pagination: filters.pagination,
      filters: {
        user: {
          id: {
            $eq: filters.user?.toString,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  )
