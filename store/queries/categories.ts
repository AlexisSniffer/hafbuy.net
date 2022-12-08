import qs from 'qs'

/**
 * Query categories root
 */
export const qsSearchCategoriesRoot = () => {
  return qs.stringify(
    {
      fields: ['name', 'slug'],
      filters: {
        category: {
          id: {
            $null: true,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )
}
