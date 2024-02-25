import qs from 'qs'

export const qsServices = qs.stringify(
  {
    fields: ['name', 'description', 'icon', 'order'],
    sort: ['order:asc'],
    pagination: {
      page: 1,
      pageSize: 4,
    },
  },
  {
    encodeValuesOnly: true,
  },
)
