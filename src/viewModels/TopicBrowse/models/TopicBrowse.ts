import type { ItemList } from "./ItemList"
import type { PageList } from "./PageList"
import type { Status } from "./Status"
import type { TagList } from "./TagList"

export type Pagination = {
  limit: number
  total: number
  offset: number
  prevChank?: number
  nextChanck?: number
  chanck: PageList
}

export type TopicBrowse = {
  tags: TagList
  items: ItemList
  status: Status
  pagination: Pagination
  error: string
  isFilterExpanded: boolean
}
