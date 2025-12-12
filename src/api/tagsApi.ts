import { __prefix, httpClient } from "./client"
import type { Tag } from "./types"

export async function fetchTags(): Promise<Tag[]> {
  return httpClient({
    url: `${__prefix}/tags/list`,
  })
}
