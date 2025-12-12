import type { TagList } from "@/api/models/TagList"

class TagsRepositoryStub {
  private data: TagList = []

  get() {
    return this.data
  }

  set(data: TagList) {
    this.data = data
  }
}

export default new TagsRepositoryStub()
