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
      populate: ['subcategories'],
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
