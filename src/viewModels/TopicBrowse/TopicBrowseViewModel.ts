import { useEffect } from "react"
import type { ITopicBrowseViewModel } from "./ITopicBrowseViewModel"
import type { TopicBrowse } from "../../models/topicBrowse/TopicBrowse"
import store, {
  TopicBrowsePresentation as Store,
} from "./TopicBrowsePresentationModel"
import ItemClient from "@/api/ItemClient"
import TagClient from "@/api/TagClient"
import type { TagList } from "@/models/topicBrowse/TagList"
import type { TagRes } from "@/models/api/TagRes"
import type { ItemRes } from "@/models/api/ItemRes"
import type { Res } from "@/models/api/Res"
import type { Tag } from "@/models/topicBrowse/Tag"

export function toggleTag(tag: Tag, selectedTags: TagList) {
  return selectedTags.includes(tag)
    ? selectedTags.filter((t) => t !== tag)
    : [...selectedTags, tag]
}

export default function useTopicBrowseViewModel(): TopicBrowse &
  ITopicBrowseViewModel {
  const state = store.use()

  useEffect(() => {
    const { selectedTags, limit, offset } = state
    updateFormDataProcess(selectedTags, limit, offset)
  }, [])

  return {
    ...state,
    updateTag,
    updateOffset,
  }
}

export async function updateTag(tag: Tag) {
  const { selectedTags, limit } = store.snapshot
  updateFormDataProcess(toggleTag(tag, selectedTags), limit, 0)
}

export async function updateOffset(offset: number) {
  const { selectedTags, limit } = store.snapshot
  updateFormDataProcess(selectedTags, limit, offset)
}

export async function updateFormDataProcess(
  selectedTags: TagList,
  limit: number,
  offset: number,
) {
  store.status = Store.LOADING

  let res: Res<TagRes | ItemRes>
  let tags: TagList = store.snapshot.tags

  if (tags.length === 0) {
    res = await TagClient.get()

    if (res.status === "abort") {
      return
    }

    if (res.status === "err") {
      throw res.error
    }

    tags = res.data
  }

  res = await ItemClient.get(limit, offset, selectedTags)

  if (res.status === "abort") {
    return
  }

  if (res.status === "err") {
    throw res.error
  }

  store.data = {
    tags,
    selectedTags,
    limit,
    offset,
    total: res.data.total,
    items: res.data.items,
  }

  store.status = Store.PENDING
}
