import type { ItemList } from "@/api/types"
import type { BrowseSettings } from "@/models/BrowseSettingsM"

const itemsCache: Map<string, ItemList> = new Map()

const mockedData = {
  limit: 15,
  offset: 0,
  total: 55,
  items: [
    {
      id: "id1",
      title: "React course",
      description: "Basics of React lifecycle",
      tags: ["React"],
    },
    {
      id: "id2",
      title: "HTML course",
      description: "Template building",
      tags: ["Web"],
    },
    {
      id: "id3",
      title: "Yah course",
      description: "Advanced",
      tags: ["Hentai"],
    },
  ],
}

export async function loadTopicsData(bs: BrowseSettings): Promise<ItemList> {
  const key = [
    `offset=${bs.offset}`,
    `limit=${bs.limit}`,
    ...bs.selected.map((s) => `tag=${s}`),
  ].join("&")

  if (!itemsCache.has(key)) {
    const items = mockedData //await fetchItems(key)
    itemsCache.set(key, items)
  }

  return itemsCache.get(key) as ItemList
}
