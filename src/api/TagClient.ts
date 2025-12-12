// import httpClient from "./HttpClient"
// import settings from "./TagClientSettings"
import type { Res } from "./models/Res"
import type { TagRes } from "./models/TagRes"

export default {
  get(): Promise<Res<TagRes>> {
    // return httpClient<TagRes>({
    //   url: `${settings.url}`,
    // })
    return Promise.resolve({
      status: "ok",
      data: ["React", "Web", "JS", "TS", "CSS", "Node", "Backend"],
    })
  },
}
