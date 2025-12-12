import { useEffect } from "react"
import type { ITopicBrowseViewModel } from "./ITopicBrowseViewModel"
import type { TopicBrowse } from "./models/TopicBrowse"
import TopicBrowsePresentationModel from "./TopicBrowsePresentationModel"
import updateFilterExpandedUseCase from "./useCases/UpdateFilterExpandedUseCase"
import updatePageUseCase from "./useCases/UpdatePageUseCase"
import updateTagUseCase from "./useCases/UpdateTagUseCase"
import MountTopicBrowseUseCase from "./useCases/MountTopicBrowseUseCase"

export default function useTopicBrowseViewModel(): TopicBrowse &
  ITopicBrowseViewModel {
  const state = TopicBrowsePresentationModel.use()

  useEffect(() => {
    MountTopicBrowseUseCase()
  }, [])

  return {
    ...state,
    updateTagUseCase,
    updatePageUseCase,
    updateFilterExpandedUseCase,
  }
}
