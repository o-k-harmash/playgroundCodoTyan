import { useEffect, useState } from "react"
import TopicsBrowsePM, {
  type ITopicsBrowsePM,
  type TopicsBrowsePV,
} from "@/models/TopicsBrowsePM"
import {
  getBrowseSettings,
  setBrowseSettings,
} from "@/stores/BrowseSettingsStore"
import { loadTagsData } from "@/stores/TagsStore"
import { loadTopicsData } from "@/stores/ItemsStore"
import BrowseSettingsM, { type BrowseSettings } from "@/models/BrowseSettingsM"

type ViewModelApi = {
  toggleTagProcessManager: (tagId: string) => void
  changePageProcessManager: (pageId: number) => void
}

function useTopicsBrowseViewModel(): TopicsBrowsePV & ViewModelApi {
  const [pState, setPState] = useState<TopicsBrowsePV>(
    structuredClone(new TopicsBrowsePM()),
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
  async function loadAndProject(pm: ITopicsBrowsePM, bs: BrowseSettings) {
    const [tags, items] = await Promise.all([
      loadTagsData(),
      loadTopicsData(bs),
    ])

    pm.setTags(tags, bs.selected)
    pm.setPaging(
      items.items,
      items.total,
      items.limit,
      /*items.offset*/ bs.offset,
    )
    pm.setPending()
    setPState(structuredClone(pm))
  }

  /**
   * INIT
   */
  useEffect(() => {
    ;(async () => {
      const pm = new TopicsBrowsePM()
      pm.setLoading()
      setPState(structuredClone(pm))

      try {
        const bs = new BrowseSettingsM([], 0, 15)
        setBrowseSettings(bs)
        await loadAndProject(pm, bs)
      } catch (e) {
        handleError(pm, e)
      }
    })()
  }, [])

  /**
   * Toggle tag
   */
  async function toggleTagProcessManager(tagId: string) {
    const pm = new TopicsBrowsePM()
    pm.setLoading()
    setPState(structuredClone(pm))

    try {
      const { selected, limit, offset } = getBrowseSettings()
      const bs = new BrowseSettingsM(selected, offset, limit)
      bs.toggleSelect(tagId)
      setBrowseSettings(structuredClone(bs))
      await loadAndProject(pm, bs)
    } catch (e) {
      handleError(pm, e)
    }
  }

  /**
   * Change page
   */
  async function changePageProcessManager(pageId: number) {
    const pm = new TopicsBrowsePM()
    pm.setLoading()
    setPState(structuredClone(pm))

    try {
      const { selected, limit, offset } = getBrowseSettings()
      const bs = new BrowseSettingsM(selected, offset, limit)
      bs.offset = pageId
      setBrowseSettings(structuredClone(bs))
      await loadAndProject(pm, bs)
    } catch (e) {
      handleError(pm, e)
    }
  }

  return {
    ...pState,
    toggleTagProcessManager,
    changePageProcessManager,
  }
}

export default useTopicsBrowseViewModel
