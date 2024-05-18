import qs from 'qs'

const productPopulate = {
  categories: {
    fields: ['name', 'slug'],
    populate: {
      category: {
        fields: ['name', 'slug'],
        populate: {
          category: {
            fields: ['name', 'slug'],
          },
        },
      },
    },
  },
  brand: {
    fields: ['name', 'slug'],
  },
  images: '*',
  deliveryTime: '*',
  variants: {
    populate: {
      variant: {
        populate: {
          type: '*',
        },
      },
    },
  },
}

export const qsProducts = (filters: {
  filter?: string
  categories?: string[]
  prices?: number[]
  brands?: string[]
  views?: number[]
  pagination?: { page: number; pageSize: number }
}) =>
  qs.stringify(
    {
      populate: {
        categories: {
          fields: ['name', 'slug'],
          populate: {
            category: {
              fields: ['name', 'slug'],
              populate: {
                category: {
                  fields: ['name', 'slug'],
                },
              },
            },
          },
        },
        brand: {
          fields: ['name', 'slug'],
        },
        images: '*',
        variants: '*',
      },
      filters: {
        id: {
          $in: filters.views,
        },
        name: {
          $containsi: filters.filter,
        },
        price: {
          $between: filters.prices,
        },
        brand: {
          slug: {
            $in: filters.brands,
          },
        },
        categories: {
          $or: [
            {
              slug: {
                $in: filters.categories,
              },
            },
            {
              category: {
                $or: [
                  {
                    slug: {
                      $in: filters.categories,
                    },
                  },
                  {
                    category: {
                      slug: {
                        $in: filters.categories,
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      sort: ['name:asc'],
      pagination: filters.pagination,
      //locale: localStorage.getItem('locale'),
    },
    {
      encodeValuesOnly: true,
    },
  )

export const qsProductsBySlug = (slug: string) => {
  return qs.stringify(
    {
      populate: {
        ...productPopulate,
      },
      filters: {
        slug: {
          $eq: slug,
        },
      },
      //locale: localStorage.getItem('locale') ?? 'es',
    },
    {
      encodeValuesOnly: true,
    },
  )
}

export const qsProductUntil = qs.stringify(
  {
    populate: {
      ...productPopulate,
    },
    pagination: {
      page: 1,
      pageSize: 9,
    },
    sort: [{ publishedAt: 'desc' }],
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
                $gte:  new Date(),
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
                  $gte: new Date(),
                },
              },
            ],
          },
        },
      ],
    },
    //locale: localStorage.getItem('locale'),
  },
  {
    encodeValuesOnly: true,
  },
)

export const qsProductsByCategory = (filter: any) => {
  return qs.stringify(
    {
      pagination: {
        page: 1,
        pageSize: 6,
      },
      sort: [{ publishedAt: 'desc' }],
      populate: {
        ...productPopulate,
      },
      filters: {
        categories: {
          $or: [
            {
              slug: {
                $in: filter.category,
              },
            },
            {
              category: {
                $or: [
                  {
                    slug: {
                      $in: filter.category,
                    },
                  },
                  {
                    category: {
                      slug: {
                        $in: filter.category,
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )
}