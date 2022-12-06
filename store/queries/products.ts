import qs from 'qs'

/**
 * Query products with pagination
 *
 * @param page - page number
 * @param pageSize - record limit
 * @returns Search string
 *
 * @beta
 */
export const qsSearchProducts = (
  page: number,
  pageSize: number,
  filter: string
) => {
  return qs.stringify(
    {
      pagination: {
        page: page,
        pageSize: pageSize,
      },
      fields: ['name', 'slug', 'description', 'price'],
      populate: '*',
      filters: {
        name: {
          $contains: filter,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )
}
