import qs from 'qs'

export const qsBrands = (filters: {
  pagination?: { page: number; pageSize: number }
}) =>
  qs.stringify(
    {
      fields: ['name', 'slug'],
      populate: {
        thumbnail: '*',
      },
      sort: ['name:asc'],
      pagination: filters.pagination,
    },
    {
      encodeValuesOnly: true,
    },
  )
