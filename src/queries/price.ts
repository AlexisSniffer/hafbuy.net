import qs from 'qs'

export const qsMaxPrice = qs.stringify(
  {
    fields: ['price'],
    sort: ['price:desc'],
    pagination: {
      page: 1,
      pageSize: 1,
    },
  },
  {
    encodeValuesOnly: true,
  },
)
