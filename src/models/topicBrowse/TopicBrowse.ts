import type { ItemList } from "./ItemList"
import type { Status } from "./Status"
import type { TagList } from "./TagList"

export type TopicBrowseSourceOfTruth = {
  total: number
  limit: number
  offset: number
  selectedTags: TagList
  tags: TagList
  items: ItemList
}

export type TopicBrowse = TopicBrowseSourceOfTruth & {
  status: Status
}
