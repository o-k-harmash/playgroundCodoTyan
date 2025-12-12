import { __prefix, httpClient } from "./client"
import type { ItemList } from "./types"

export async function fetchItems(params: string): Promise<ItemList> {
  return httpClient({
    url: `${__prefix}/topic/list?${params}`,
  })
}
