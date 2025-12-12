import { describe, it, expect, beforeEach } from "vitest"
import { TopicBrowsePresentation } from "@/viewModels/topicBrowse/TopicBrowsePresentationModel"
import type { TopicBrowseSourceOfTruth } from "@/models/topicBrowse/TopicBrowse"

describe("TopicBrowsePresentation", () => {
  let store: TopicBrowsePresentation

  beforeEach(() => {
    store = new TopicBrowsePresentation()
  })

  it("initial state should match initial snapshot", () => {
    const snapshot = store.snapshot
    expect(snapshot.status).toBe("idle")
    expect(snapshot.tags).toEqual([])
    expect(snapshot.selectedTags).toEqual([])
    expect(snapshot.items).toEqual([])
    expect(snapshot.total).toBe(0)
    expect(snapshot.limit).toBe(15) // если в initialState
    expect(snapshot.offset).toBe(0)
  })

  it("should update status", () => {
    store.status = TopicBrowsePresentation.LOADING
    expect(store.snapshot.status).toBe("loading")

    store.status = TopicBrowsePresentation.PENDING
    expect(store.snapshot.status).toBe("pending")
  })

  it("should update data", () => {
    const newData: TopicBrowseSourceOfTruth = {
      selectedTags: ["React", "TS"],
      tags: ["React", "TS", "JS"],
      items: [
        {
          id: "id1",
          title: "React course",
          description:
            "Learn the fundamentals of React including JSX, component lifecycle, hooks, and state management. Build dynamic single-page applications step by step.",
          tags: ["React"],
        },
      ],
      total: 1,
      limit: 5,
      offset: 0,
    }

    store.data = newData
    const snapshot = store.snapshot
    expect(snapshot.selectedTags).toEqual(["React", "TS"])
    expect(snapshot.tags).toEqual(["React", "TS", "JS"])
    expect(snapshot.items).toHaveLength(1)
    expect(snapshot.total).toBe(1)
    expect(snapshot.limit).toBe(5)
  })
})
