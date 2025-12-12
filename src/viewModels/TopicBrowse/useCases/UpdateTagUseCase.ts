import ItemClient from "@/api/ItemClient"
import TopicBrowsePresentationModel from "../TopicBrowsePresentationModel"
import TopicBrowseRepositoryStub from "@/repositories/TopicBrowseRepositoryStub"
import TagsRepositoryStub from "@/repositories/TagsRepositoryStub"

export default async function updateTagUseCase(tag: string) {
  const settingsModel = TopicBrowseRepositoryStub.get()
  settingsModel.updateSelected(tag)
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

  TopicBrowsePresentationModel.actions.setPage(items, total, limit, offset)
  TopicBrowsePresentationModel.actions.setTag(
    TagsRepositoryStub.get(),
    settingsModel.selected,
  )
  TopicBrowsePresentationModel.actions.setPending()
}
