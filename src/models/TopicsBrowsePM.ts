type State = "IDLE" | "LOADING" | "FAILED" | "PENDING"

type Tag = {
  id: string
  selected: boolean
}

type Page = {
  id: number
  name: number
  disabled: boolean
}

type Item = {
  id: string
  title: string
  description: string
  tags: string[]
}

type TopicsBrowsePV = {
  tags: Tag[]
  items: Item[]
  pages: Page[]
  offset: number
  total: number
  limit: number
  error: string
  state: State
}

/**
 * Pure presentation state.
 * Everything here is directly consumed by the UI.
 */
interface ITopicsBrowsePM extends TopicsBrowsePV {
  setTags: (tags: string[], selected: string[]) => void
  setPaging: (
    items: Item[],
    total: number,
    limit: number,
    offset: number,
  ) => void
  setLoading: () => void
  setError: (message: string) => void
  setPending: () => void
}

interface ITopicsBrowsePMConstructor {
  new (): ITopicsBrowsePM
}

function TopicsBrowsePMConstructor(this: ITopicsBrowsePM) {
  this.tags = []
  this.items = []
  this.pages = []
  this.total = Number()
  this.limit = Number()
  this.total = Number()
  this.offset = Number()
  this.state = "IDLE"
  this.error = String()
}

TopicsBrowsePMConstructor.prototype.setError = function (message: string) {
  this.state = "FAILED"
  this.error = message
}

TopicsBrowsePMConstructor.prototype.setPending = function () {
  this.state = "PENDING"
  this.error = ""
}

TopicsBrowsePMConstructor.prototype.setLoading = function () {
  this.state = "LOADING"
  this.error = ""
}

TopicsBrowsePMConstructor.prototype.setTags = function (
  tags: string[],
  selected: string[],
) {
  this.tags = tags.map((tag) => ({
    id: tag,
    selected: selected.includes(tag),
  }))
}

TopicsBrowsePMConstructor.prototype.setPaging = function (
  items: Item[],
  total: number,
  limit: number,
  offset: number,
) {
  this.items = items
  this.total = total
  this.offset = offset + 1
  this.limit = limit
  this.pages = Array.from({ length: 5 }, (_, i) => {
    const name = i + 1
    return {
      id: i,
      name: name,
      disabled: name === this.offset,
    }
  })
}

const TopicsBrowsePM: ITopicsBrowsePMConstructor =
  TopicsBrowsePMConstructor as unknown as ITopicsBrowsePMConstructor

export default TopicsBrowsePM
export type { TopicsBrowsePV, ITopicsBrowsePM }
