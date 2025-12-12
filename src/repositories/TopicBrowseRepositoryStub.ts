import type { ITopicBrowseModel } from "@/models/ITopicBrowseModel"
import TopicBrowseModelSettings from "@/models/TopicBrowseModelSettings"

class TopicBrowseRepositoryStub {
  private data = TopicBrowseModelSettings

  get(): ITopicBrowseModel {
    return this.data
  }

  set(data: ITopicBrowseModel) {
    this.data = data
  }
}

export default new TopicBrowseRepositoryStub()
