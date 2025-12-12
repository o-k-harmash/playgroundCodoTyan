/**
 * Item structure returned by the API.
 *
 * This is a data contract (DTO), not a business model.
 * It contains no behavior, invariants, or validation logic.
 */
type Item = {
  id: string
  title: string
  description: string
  tags: string[]
}

type Tag = string

/**
 * API response structure for paginated items.
 *
 * Represents raw backend data and may be cached or mapped
 * into presentation or business models if needed.
 */
type ItemList = {
  limit: number
  offset: number
  total: number
  items: Item[]
}

type TagList = Tag[]

export type { Item, ItemList, Tag, TagList }
