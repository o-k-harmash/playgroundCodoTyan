import type { ITopicBrowseModel } from "./ITopicBrowseModel"

class TopicBrowseModelSettings implements ITopicBrowseModel {
  constructor(
    public selected: string[],
    public offset: number,
    public limit: number,
  ) {}

  updateSelected(tag: string) {
    this.updateOffset(0)
    this.selected = this.selected.includes(tag)
      ? this.selected.filter((x) => x !== tag)
      : [...this.selected, tag]
  }

  updateOffset(offset: number) {
    this.offset = offset
  }
}

export default new TopicBrowseModelSettings([], 0, 15)
