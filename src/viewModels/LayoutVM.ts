import type { ILayoutPM } from "@/models/LayoutPM"
import LayoutPM from "@/models/LayoutPM"
import { useState } from "react"

function useLayoutViewModel(): ILayoutPM {
  const [lState, setLState] = useState<ILayoutPM>(
    structuredClone(
      new LayoutPM({ user: { url: "" }, dark: false, isOverlayOpen: false }),
    ),
  )

  function openOverlay() {
    const pm = new LayoutPM(structuredClone(lState))
    pm.openOverlay()
    setLState(structuredClone(pm))
  }

  function closeOverlay() {
    const pm = new LayoutPM(structuredClone(lState))
    pm.closeOverlay()
    setLState(structuredClone(pm))
  }

  function toggleTheme() {
    const pm = new LayoutPM(structuredClone(lState))
    pm.toggleTheme()
    setLState(structuredClone(pm))
  }

  return {
    ...lState,
    openOverlay,
    closeOverlay,
    toggleTheme,
  }
}

export default useLayoutViewModel
