import qs from 'qs'

/**
 * Query categories root
 */
export const qsCategoriesRoot = () => {
  return qs.stringify(
    {
      fields: ['name', 'slug'],
    },
    {
      encodeValuesOnly: true,
    }
  )
}

/**
 * Query categories and subcategories
 */
export const qsCategories = () => {
  return qs.stringify(
    {
      fields: ['name', 'slug'],
      populate: ['subcategories', 'thumbnail'],
    },
    {
      encodeValuesOnly: true,
    }
  )
}

/**
 * Query subcategories
 */
export const qsSubcategories = () => {
  return qs.stringify(
    {
      fields: ['name', 'slug'],
    },
    {
      encodeValuesOnly: true,
    }
  )
}

/**
 * Query categories with products
 */
export const qsCategoriesWithProducts = () => {
  return qs.stringify(
    {
      pagination: {
        page: 1,
        pageSize: 12,
      },
      populate: ['products'],
      filters: {
        products: {
          id: {
            $notNull: true,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )
}
