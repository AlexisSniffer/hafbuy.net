import qs from 'qs'

const breakpoints = {
  xs: {
    populate: '*',
  },
  sm: {
    populate: '*',
  },
  md: {
    populate: '*',
  },
  lg: {
    populate: '*',
  },
}

export const qsHomePage = qs.stringify(
  {
    populate: {
      carousel: {
        populate: breakpoints,
      },
      advertising1: {
        populate: breakpoints,
      },
      advertising2: {
        populate: breakpoints,
      },
      advertising3: {
        populate: breakpoints,
      },
      advertising4: {
        populate: breakpoints,
      },
      advertising5: {
        populate: breakpoints,
      },
      advertising6: {
        populate: breakpoints,
      },
      advertising7: {
        populate: breakpoints,
      },
      advertising8: {
        populate: breakpoints,
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
)
