import type { ItemList } from "./models/ItemList"
import type { Status } from "./models/Status"
import type { TagList } from "./models/TagList"
import type { Pagination, TopicBrowse } from "./models/TopicBrowse"

class TopicBrowseSettings implements TopicBrowse {
  constructor(
    public tags: TagList,
    public items: ItemList,
    public status: Status,
    public pagination: Pagination,
    public error: string,
    public isFilterExpanded: boolean,
  ) {}
}

export default new TopicBrowseSettings(
  [],
  [],
  "idle",
  { limit: 15, offset: 0, total: 0, chanck: [] },
  "",
  false,
)
