import qs from 'qs'

export const qsSlider = () => {
  return qs.stringify(
    {
      populate: {
        slider: {
          populate: {
            responsive: {
              populate: {
                slider: {
                  populate: true,
                },
              },
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
