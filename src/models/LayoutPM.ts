interface LayoutUser {
  url: string
}

type LayoutPV = {
  user: LayoutUser
  dark: boolean
  isOverlayOpen: boolean
}

interface ILayoutPM extends LayoutPV {
  openOverlay(): void
  closeOverlay(): void
  toggleTheme(): void
}

class LayoutPM implements ILayoutPM {
  user: LayoutUser
  dark: boolean
  isOverlayOpen: boolean

  constructor(params: LayoutPV) {
    const { user, dark, isOverlayOpen } = params
    this.dark = dark
    this.isOverlayOpen = isOverlayOpen
    this.user = user
  }

  openOverlay() {
    this.isOverlayOpen = true
  }

  closeOverlay() {
    this.isOverlayOpen = false
  }

  toggleTheme() {
    this.dark = !this.dark
  }
}

export default LayoutPM
export type { LayoutPV, ILayoutPM }
