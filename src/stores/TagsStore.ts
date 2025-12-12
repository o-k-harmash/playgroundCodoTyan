import { fetchTags } from "@/api/tagsApi"
import type { TagList } from "@/api/types"

// repositories/topicsRepository.ts
export let tagsCache: TagList | null = null
tagsCache = [".NET", "React", "WEB"]

export async function loadTagsData() {
  if (tagsCache === null) {
    const tags = await fetchTags()
    tagsCache = tags
  }

  return tagsCache
}
