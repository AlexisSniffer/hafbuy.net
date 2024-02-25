import qs from 'qs'

export const qsBrands = qs.stringify(
  {
    fields: ['name', 'slug'],
    populate: {
      thumbnail: '*',
    },
    sort: ['name:asc'],
  },
  {
    encodeValuesOnly: true,
  },
)
