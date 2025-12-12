import type { Tag } from "@/models/topicBrowse/Tag"

export interface ITopicBrowseViewModel {
  updateTag: (tag: Tag) => void
  updateOffset: (offset: number) => void
}
