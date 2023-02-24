const qs = require('qs')

// categorias en barra de busqueda
export const searchByCategory = qs.stringify(
  {
    fields: ['name', 'slug'],
    filters: {
      category: {
        id: {
          $null: true,
        },
      },
    },
    populate: {
      categories: {
        fields: ['name'],
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
)

// categoria en menu principal
export const menuCategories = qs.stringify(
  {
    fields: ['name', 'slug'],
    filters: {
      category: {
        id: {
          $null: true,
        },
      },
      categories: {
        id: {
          $notNull: true,
        },
      },
    },
    populate: {
      categories: {
        fields: ['name', 'slug'],
        populate: {
          categories: {
            fields: ['name', 'slug'],
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
)

// seccion de categorias
export const categoriesSection = qs.stringify(
  {
    fields: ['name', 'slug'],
    filters: {
      category: {
        id: {
          $null: true,
        },
      },
    },
    populate: {
      thumbnail: {
        fields: '*',
      },
      products: {
        fields: ['name'],
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
)

// seccion de servicios
export const servicesSection = qs.stringify(
  {},
  {
    encodeValuesOnly: true,
  }
)

// productos en oferta
export const productsEspecialOffers = qs.stringify(
  {
    pagination: {
      page: 1,
      pageSize: 9,
    },
    populate: '*',
    filters: {
      $and: [
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
  {
    encodeValuesOnly: true,
  }
)

// categorias con productos añadidos
export const categoriesWithProducts = qs.stringify(
  {
    pagination: {
      page: 1,
      pageSize: 12,
    },
    populate: ['products'],
    filters: {
      category: {
        id: {
          $notNull: true,
        },
      },
      products: {
        name: {
          $notNull: true,
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
)

// filtro de productos
export function filterProducts(filter) {
  return qs.stringify(
    {
      pagination: filter.pagination,
      filters: {
        categories: {
          slug: filter.slug,
        },
      },
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  )
}

export function filterCategoriesAll(id) {
  return qs.stringify(
    {
      fields: ['name', 'slug'],
      filters: {
        id: {
          $eq: id,
        },
      },
      populate: {
        categories: {
          fields: ['name', 'slug'],
          populate: {
            categories: {
              fields: ['name', 'slug'],
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
