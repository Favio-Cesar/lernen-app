export interface StrapiResponse<T> {
  data: T[]
}
export interface FieldOfStudy {
  id: number
  documentId: string
  title: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  description: Description[]
  bookCover: BookCover
  iconCover: string
}

export interface Description {
  type: string
  children: Children[]
}

export interface Children {
  text: string
  type: string
}

export interface BookCover {
  id: number
  documentId: string
  name: string
  alternativeText?: string
  caption: unknown
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: unknown
  provider: string
  provider_metadata: unknown
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Formats {
  small: Small
  thumbnail: Thumbnail
}

export interface Small {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: unknown
  size: number
  width: number
  height: number
  sizeInBytes: number
}

export interface Thumbnail {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: unknown
  size: number
  width: number
  height: number
  sizeInBytes: number
}
