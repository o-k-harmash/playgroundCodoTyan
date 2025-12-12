import ItemClient from "@/api/ItemClient"
import TagClient from "@/api/TagClient"
import TopicBrowsePresentationModel from "../TopicBrowsePresentationModel"
import TopicBrowseModelSettings from "@/models/TopicBrowseModelSettings"
import TopicBrowseRepositoryStub from "@/repositories/TopicBrowseRepositoryStub"
import TagsRepositoryStub from "@/repositories/TagsRepositoryStub"

export default async function MountTopicBrowseUseCase() {
  const settingsModel = TopicBrowseModelSettings
  TopicBrowseRepositoryStub.set(settingsModel)
  TopicBrowsePresentationModel.actions.setLoading()

  const [tagRes, itemRes] = await Promise.all([
    TagClient.get(),
    ItemClient.get(
      settingsModel.limit,
      settingsModel.offset,
      settingsModel.selected,
    ),
  ])

  if (tagRes.status === "abort" || itemRes.status === "abort") {
    return
  }

  if (tagRes.status === "err") {
    throw tagRes.error
  }

  if (itemRes.status === "err") {
    throw itemRes.error
  }

  const tags = tagRes.data
  const { items, total, limit, offset } = itemRes.data

  TagsRepositoryStub.set(tags)
  TopicBrowsePresentationModel.actions.setTag(tags, settingsModel.selected)
  TopicBrowsePresentationModel.actions.setPage(items, total, limit, offset)
  TopicBrowsePresentationModel.actions.setPending()
}
