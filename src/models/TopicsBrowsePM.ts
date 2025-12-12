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
  pages: {
    total: number
    current: number | null
    prevChank: number | null
    nextChanck: number | null
    chanck: (Page | null)[]
  }
  limit: number
  error: string
  state: State
  isFilterOpen: boolean
}

/**
 * Pure presentation state.
 * Everything here is directly consumed by the UI.
 */
interface ITopicsBrowsePM extends TopicsBrowsePV {
  setTags(tags: string[], selected: string[]): void
  setPaging(items: Item[], total: number, limit: number, offset: number): void
  setLoading(): void
  setError(message: string): void
  setPending(): void
  toogleFilterMenu(): void
}

class TopicsBrowsePM implements ITopicsBrowsePM {
  tags: Tag[]
  items: Item[]
  pages: {
    total: number
    current: number | null
    prevChank: number | null
    nextChanck: number | null
    chanck: (Page | null)[]
  }
  limit: number
  error: string
  state: State
  isFilterOpen: boolean

  constructor(params: TopicsBrowsePV) {
    this.tags = params.tags
    this.items = params.items
    this.pages = params.pages
    this.limit = params.limit
    this.error = params.error
    this.state = params.state
    this.isFilterOpen = params.isFilterOpen
  }

  setError(message: string): void {
    this.state = "FAILED"
    this.error = message
  }

  setPending(): void {
    this.state = "PENDING"
    this.error = ""
  }

  setLoading(): void {
    this.state = "LOADING"
    this.error = ""
  }

  setTags(tags: string[], selected: string[]): void {
    this.tags = tags.map((tag) => ({
      id: tag,
      selected: selected.includes(tag),
    }))
  }

  toogleFilterMenu() {
    this.isFilterOpen = !this.isFilterOpen
  }

  setPaging(items: Item[], total: number, limit: number, offset: number): void {
    this.items = items
    this.limit = limit
    this.pages = {
      total: total + 1,
      current: offset + 1,
      prevChank: null,
      nextChanck: null,
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
    }
  }
}

export default TopicsBrowsePM
export type { ITopicsBrowsePM, TopicsBrowsePV }
