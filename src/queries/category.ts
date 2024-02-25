import qs from 'qs'

export const qsCategory = qs.stringify(
  {
    fields: ['name', 'slug', 'isExpanded'],
    populate: {
      categories: {
        fields: ['name', 'slug', 'isExpanded'],
        populate: {
          categories: {
            fields: ['name', 'slug', 'isExpanded'],
            populate: {
              products: {
                fields: ['slug'],
              },
            },
          },
        },
      },
      thumbnail: '*',
    },
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
        categories: {
          id: {
            $notNull: true,
          },
        },
      },
    },
    //locale: localStorage.getItem('locale'),
  },
  {
    encodeValuesOnly: true,
  },
)

export const qsCategoryHeader = qs.stringify(
  {
    fields: ['name', 'slug', 'isExpanded'],
    populate: {
      categories: {
        fields: ['name', 'slug', 'isExpanded'],
        populate: {
          categories: {
            fields: ['name', 'slug', 'isExpanded'],
          },
        },
      },
    },
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
        categories: {
          id: {
            $notNull: true,
          },
        },
      },
    },
    //locale: localStorage.getItem('locale') ?? 'es',
  },
  {
    encodeValuesOnly: true,
  },
)
