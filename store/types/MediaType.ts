export type MediaType = {
  attributes: {
    name: string
    alternativeText: string
    caption: string
    ext: string
    url: string
    formats: {
      small: MediaFormatType
      medium: MediaFormatType
      large: MediaFormatType
      thumbnail: MediaFormatType
    }
  }
}

export type MediaFormatType = {
  ext: string
  url: string
}
