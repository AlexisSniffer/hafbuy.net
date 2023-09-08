import qs from 'qs'

const populateProduct = {
  subcategories: true,
  images: true,
  variants: {
    populate: {
      variant: {
        populate: true,
      },
    },
  },
}

/**
 * Query products with pagination
 */
export const qsProducts = (
  page: number,
  pageSize: number,
  filter: string,
  categories: string[],
  subcategories: string[],
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
        'ratings',
      ],
      populate: {
        ...populateProduct,
      },
      filters: {
        name: {
          $containsi: filter,
        },
        $or: [
          {
            subcategories: {
              slug: {
                $in: subcategories,
              },
            },
          },
          {
            subcategories: {
              category: {
                slug: {
                  $in: categories,
                },
              },
            },
          },
        ],
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
      populate: {
        ...populateProduct,
      },
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

// filter by categories
export const qsfilterProductsByCategory = (filter: any) => {
  return qs.stringify(
    {
      pagination: {
        page: 1,
        pageSize: filter.pagination,
      },
      populate: {
        ...populateProduct,
      },
      filters: {
        subcategories: {
          slug: {
            $eq: filter.slug,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )
}

// filter by categories root
export const qsfilterProductsByCategoryRoot = (filter: any) => {
  return qs.stringify(
    {
      pagination: {
        page: 1,
        pageSize: filter.pagination,
      },
      populate: {
        ...populateProduct,
        subcategories: {
          category: true,
        },
      },
      filters: {
        subcategories: {
          category: {
            slug: {
              $eq: filter.slug,
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )
}

// filter product by slug
export const qsfilterProductsBySlug = (filter: any) => {
  return qs.stringify(
    {
      populate: {
        ...populateProduct,
        subcategories: {
          category: true,
        },
      },
      filters: {
        slug: {
          $eq: filter.slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )
}

// filter brands
export const qsFilterBrands = () => {
  return qs.stringify(
    {
      filters: {},
    },
    {
      encodeValuesOnly: true,
    }
  )
}

// filter reviews
export const qsfilterProductReviews = (filter: any, pagination: any) => {
  return qs.stringify(
    {
      pagination: pagination,
      filters: {
        product: {
          id: {
            $eq: filter.product,
          },
        },
      },
      sort: 'createdAt:desc',
    },
    {
      encodeValuesOnly: true,
    }
  )
}
