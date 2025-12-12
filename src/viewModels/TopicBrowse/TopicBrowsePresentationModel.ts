import { createStore } from "@/helpers/createStore"
import { useSyncExternalStore } from "react"
import initialState from "./TopicBrowseSettings"
import type {
  TopicBrowse,
  TopicBrowseSourceOfTruth,
} from "@/models/topicBrowse/TopicBrowse"
import type { Status } from "@/models/topicBrowse/Status"

export class TopicBrowsePresentation {
  public static readonly PENDING: Status = "pending"
  public static readonly LOADING: Status = "loading"

  private store = createStore<TopicBrowse>(initialState)

  use(): TopicBrowse {
    return useSyncExternalStore(this.store.subscribe, this.store.get)
  }

  get snapshot(): TopicBrowse {
    return this.store.get()
  }

  set status(status: Status) {
    this.updateStatus(status)
  }

  set data(data: TopicBrowseSourceOfTruth) {
    this.store.set((state) => ({
      ...state,
      ...data,
    }))
  }

  private updateStatus(status: Status) {
    this.store.set((state) => ({
      ...state,
      status,
    }))
  }
}

export default new TopicBrowsePresentation()
