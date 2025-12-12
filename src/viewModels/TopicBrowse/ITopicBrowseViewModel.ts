export interface ITopicBrowseViewModel {
  updateTagUseCase: (tag: string) => void
  updatePageUseCase: (page: number) => void
  updateFilterExpandedUseCase: () => void
}
