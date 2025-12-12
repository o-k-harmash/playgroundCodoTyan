import { createStore } from "@/helpers/createStore"
import type { ItemList } from "./models/ItemList"
import { useSyncExternalStore } from "react"
import initialState from "./TopicBrowseSettings"

const store = createStore(initialState)

export default {
  use() {
    return useSyncExternalStore(store.subscribe, store.get)
  },

  actions: {
    setError,
    setLoading,
    setPending,
    setTag,
    setPage,
    setFilterExpanded,
  },
}

function setError() {
  store.set((s) => ({ ...s, status: "failed" }))
}

function setLoading() {
  store.set((s) => ({ ...s, status: "loading" }))
}

function setPending() {
  store.set((s) => ({ ...s, status: "pending" }))
}

function setTag(tags: string[], selected: string[]) {
  store.set((s) => ({
    ...s,
    tags: tags.map((t) => ({
      id: t,
      selected: selected.includes(t),
    })),
  }))
}

function setPage(
  items: ItemList,
  total: number,
  limit: number,
  offset: number,
) {
  store.set((s) => ({
    ...s,
    items,
    pagination: {
      ...s.pagination,
      limit,
      total,
      chanck: Array.from({ length: 7 }, (_, i) => {
        const name = i + 1
        if (i === 5) {
          return null
        }
        if (i === 6) {
          return {
            id: 55,
            name: 56,
            disabled: 55 === offset,
          }
        }
        return {
          id: i,
          name: name,
          disabled: i === offset,
        }
      }),
    },
  }))
}

function setFilterExpanded() {
  store.set((s) => ({ ...s, isFilterExpanded: !s.isFilterExpanded }))
}
