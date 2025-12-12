import type { Res } from "@/models/api/Res"
import type { TagRes } from "@/models/api/TagRes"

export default {
  get(): Promise<Res<TagRes>> {
    return Promise.resolve({
      status: "ok",
      data: ["React", "Web", "JS", "TS", "CSS", "Node", "Backend"],
    })
  },
}
