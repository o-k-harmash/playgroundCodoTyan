import type { BrowseSettings } from "@/models/BrowseSettingsM"

let cache: BrowseSettings | null = null

function setBrowseSettings(bs: BrowseSettings) {
  cache = bs
}

function getBrowseSettings() {
  if (cache === null) {
    throw new Error("")
  }
  return cache
}

export { setBrowseSettings, getBrowseSettings }
