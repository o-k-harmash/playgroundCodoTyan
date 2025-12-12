import ItemClient from "@/api/ItemClient"
import TopicBrowsePresentationModel from "../TopicBrowsePresentationModel"
import TopicBrowseRepositoryStub from "@/repositories/TopicBrowseRepositoryStub"

export default async function updatePageUseCase(page: number) {
  const settingsModel = TopicBrowseRepositoryStub.get()
  settingsModel.updateOffset(page)
  TopicBrowseRepositoryStub.set(settingsModel)

  TopicBrowsePresentationModel.actions.setLoading()

  const result = await ItemClient.get(
    settingsModel.limit,
    settingsModel.offset,
    settingsModel.selected,
  )

  if (result.status === "abort") {
    return
  }

  if (result.status === "err") {
    throw result.error
  }

  const { items, total, limit, offset } = result.data
  TopicBrowsePresentationModel.actions.setPage(
    items,
    total,
    limit,
    /**offset*/ settingsModel.offset,
  )
  TopicBrowsePresentationModel.actions.setPending()
}
