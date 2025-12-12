import type { ILayoutViewModel } from "./ILayoutViewModel"
import type { Layout } from "../../models/layout/Layout"
import initialState from "./LayoutSettings"
import { useState } from "react"

export default function useLayoutViewModel(): Layout & ILayoutViewModel {
  const [state, setState] = useState<Layout>(initialState)

  const openOverlay = () => {
    setState((prev) => ({
      ...prev,
      isOverlayOpen: true,
    }))
  }

  const closeOverlay = () => {
    setState((prev) => ({
      ...prev,
      isOverlayOpen: false,
    }))
  }

  const toggleTheme = () => {
    setState((prev) => ({
      ...prev,
      isDarkTheme: !prev.isDarkTheme,
    }))
  }

  return {
    ...state,
    openOverlay,
    closeOverlay,
    toggleTheme,
  }
}
