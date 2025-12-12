import type { TagList } from "@/models/topicBrowse/TagList"
import { toggleTag } from "@/viewModels/topicBrowse/TopicBrowseViewModel"
import { describe, it, expect } from "vitest"

describe("toggleTag utility", () => {
  it("adds a tag if not present", () => {
    const tags: TagList = ["JS", "TS"]
    const result = toggleTag("React", tags)
    expect(result).toEqual(["JS", "TS", "React"])
  })

  it("removes a tag if present", () => {
    const tags: TagList = ["JS", "TS", "React"]
    const result = toggleTag("React", tags)
    expect(result).toEqual(["JS", "TS"])
  })

  it("does not mutate original array", () => {
    const tags: TagList = ["JS", "TS"]
    const copy = [...tags]
    toggleTag("React", tags)
    expect(tags).toEqual(copy)
  })
})
