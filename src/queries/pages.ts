import qs from 'qs'

export const qsHomePage = qs.stringify(
  {
    populate: {
      carousel: {
        populate: {
          sliders: {
            populate: '*',
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
)
