import qs from 'qs'

/**
 * Query products with pagination
 */
export const qsSearchProducts = (
  page: number,
  pageSize: number,
  filter: string,
  categories: string[],
  prices: [number, number]
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
          $containsi: filter,
        },
        categories: {
          slug: {
            $in: categories,
          },
        },
        price: {
          $between: prices,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )
}
