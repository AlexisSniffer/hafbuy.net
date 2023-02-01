import qs from 'qs'

/**
 * Query products with pagination
 */
export const qsProducts = (
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
      fields: [
        'name',
        'slug',
        'description',
        'price',
        'isDiscount',
        'discount',
      ],
      populate: {
        subcategories: true,
        images: true,
        variants: {
          populate: {
            variant: {
              populate: true,
            },
          },
        },
      },
      filters: {
        name: {
          $containsi: filter,
        },
        subcategories: {
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

/**
 * Query max price's products
 */
export const qsMaxPrice = () => {
  return qs.stringify(
    {
      pagination: {
        page: 1,
        pageSize: 1,
      },
      fields: ['price'],
      sort: ['price:desc'],
    },
    {
      encodeValuesOnly: true,
    }
  )
}

/**
 * Query filters
 */

// filter until
export const qsFilterUntil = () => {
  return qs.stringify(
    {
      pagination: {
        page: 1,
        pageSize: 9,
      },
      populate: '*',
      filters: {
        $or: [
          {
            $and: [
              {
                isDiscount: {
                  $eq: true,
                },
              },
              {
                until: {
                  $notNull: true,
                },
              },
              {
                until: {
                  $gte: '2023-01-31',
                },
              },
            ],
          },
          {
            variants: {
              $and: [
                {
                  isDiscount: {
                    $eq: true,
                  },
                },
                {
                  until: {
                    $notNull: true,
                  },
                },
                {
                  until: {
                    $gte: '2023-01-31',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    }
  )
}
