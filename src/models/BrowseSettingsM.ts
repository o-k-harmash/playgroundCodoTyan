type BrowseSettings = {
  selected: string[]
  offset: number
  limit: number
}

interface IBrowseSettings extends BrowseSettings {
  toggleSelect: (toggleId: string) => void
}

interface IBrowseSettingsConstructor {
  new (selected: string[], offset: number, limit: number): IBrowseSettings
}

function BrowseSettingsConstructor(
  this: IBrowseSettings,
  selected: string[],
  offset: number,
  limit: number,
) {
  this.selected = selected
  this.offset = offset
  this.limit = limit
}

BrowseSettingsConstructor.prototype.toggleSelect = function (toggleId: string) {
  this.offset = 0
  this.selected = this.selected.includes(toggleId)
    ? this.selected.filter((x: string) => x !== toggleId)
    : [...this.selected, toggleId]
}

const BrowseSettingsM: IBrowseSettingsConstructor =
  BrowseSettingsConstructor as unknown as IBrowseSettingsConstructor

export default BrowseSettingsM
export type { IBrowseSettings, BrowseSettings }
