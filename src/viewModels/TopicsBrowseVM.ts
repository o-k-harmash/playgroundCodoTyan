import { useEffect, useLayoutEffect, useState } from "react"
import BrowseSettingsStore from "@/models/BrowseSettingsStore"
import TopicsBrowsePM, {
  type ITopicsBrowsePM,
  type TopicsBrowsePV,
} from "@/models/TopicsBrowsePM"

const settingsStore = new BrowseSettingsStore() //emulation store

type ViewModelApi = {
  toggleTagProcessManager: (tagId: string) => void
  changePageProcessManager: (pageId: number) => void
  toggleFilterButton: () => void
}

function useTopicsBrowseViewModel(): TopicsBrowsePV & ViewModelApi {
  const [pState, setPState] = useState<TopicsBrowsePV>(
    structuredClone(
      new TopicsBrowsePM({
        isFilterOpen: false,
        tags: [],
        items: [],
        pages: {
          total: Number(),
          current: Number(),
          chanck: [],
          nextChanck: null,
          prevChank: null,
        },
        limit: Number(),
        state: "IDLE",
        error: "",
      }),
    ),
  )

  /**
   * Shared error handling
   */
  function handleError(pm: ITopicsBrowsePM, e: unknown) {
    if (e instanceof DOMException && e.name === "AbortError") {
      return
    }
    if (e instanceof Error) {
      pm.setError(e.message)
      setPState(structuredClone(pm))
    }
  }

  /**
   * Shared loading pipeline
   */
  async function loadAndProject(pm: ITopicsBrowsePM, bs: BrowseSettingsStore) {
    const [tags, items] = await Promise.all([bs.tags, bs.items])
    pm.setTags(tags, bs.selected)
    pm.setPaging(
      items.items,
      items.total,
      items.limit,
      /*items.offset*/ bs.offset, //emulation
    )
    //emulation
    setTimeout(() => {
      pm.setPending()
      setPState(structuredClone(pm))
    }, 1000)
  }

  /**
   * INIT
   */
  useEffect(() => {
    ;(async () => {
      const pm = new TopicsBrowsePM({ ...pState })

      try {
        await loadAndProject(pm, settingsStore)
      } catch (e) {
        handleError(pm, e)
      }
    })()
  }, [])

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pState.pages.current])

  /**
   * Toggle tag
   */
  async function toggleTagProcessManager(tagId: string) {
    const pm = new TopicsBrowsePM({ ...pState })
    pm.setLoading()
    setPState(structuredClone(pm))

    try {
      settingsStore.toggleSelect(tagId)
      await loadAndProject(pm, settingsStore)
    } catch (e) {
      handleError(pm, e)
    }
  }

  /**
   * Change page
   */
  async function changePageProcessManager(pageId: number) {
    const pm = new TopicsBrowsePM({ ...pState })
    pm.setLoading()
    setPState(structuredClone(pm))

    try {
      settingsStore.offset = pageId
      await loadAndProject(pm, settingsStore)
    } catch (e) {
      handleError(pm, e)
    }
  }

  function toggleFilterButton() {
    const pm = new TopicsBrowsePM({ ...pState })
    pm.toogleFilterMenu()
    setPState(structuredClone(pm))
  }

  return {
    ...pState,
    toggleTagProcessManager,
    changePageProcessManager,
    toggleFilterButton,
  }
}

export default useTopicsBrowseViewModel
