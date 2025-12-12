export type ITopicBrowseModel = {
  selected: string[]
  offset: number
  limit: number
  updateSelected: (tag: string) => void
  updateOffset: (offset: number) => void
}
