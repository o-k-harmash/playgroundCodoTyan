// import { __prefix, httpClient } from "@/api/client"
import type { ItemList, TagList } from "@/api/types"

//emulation store
class BrowseSettingsStore {
  selected: string[]
  offset: number
  limit: number

  constructor(selected: string[] = [], offset: number = 0, limit: number = 10) {
    this.selected = selected
    this.offset = offset
    this.limit = limit
  }

  // Методы управления выбранными тегами
  toggleSelect(toggleId: string): void {
    this.offset = 0
    this.selected = this.selected.includes(toggleId)
      ? this.selected.filter((x) => x !== toggleId)
      : [...this.selected, toggleId]
  }

  get items(): Promise<ItemList> {
    // const params = [
    //   `offset=${this.offset}`,
    //   `limit=${this.limit}`,
    //   ...this.selected.map((s) => `tag=${s}`),
    // ].join("&")

    // return httpClient<ItemList>({
    //   url: `${__prefix}/topic/list?${params}`,
    // })

    return Promise.resolve({
      limit: 15,
      offset: 0,
      total: 55,
      items: [
        {
          id: "id1",
          title: "React course",
          description:
            "Learn the fundamentals of React including JSX, component lifecycle, hooks, and state management. Build dynamic single-page applications step by step.",
          tags: ["React"],
        },
        {
          id: "id2",
          title: "HTML course",
          description:
            "Master HTML5 by creating semantic layouts, responsive designs, and accessible web pages. Understand structure, forms, and multimedia embedding.",
          tags: ["Web"],
        },
        {
          id: "id3",
          title: "Advanced JavaScript course",
          description:
            "Deep dive into modern JavaScript concepts including closures, asynchronous programming, promises, async/await, and ES6+ features.",
          tags: ["JS"],
        },
        {
          id: "id4",
          title: "TypeScript course",
          description:
            "Learn TypeScript for scalable web applications. Explore types, interfaces, classes, generics, and integrating TypeScript with React or Node.js.",
          tags: ["TS", "Web"],
        },
        {
          id: "id5",
          title: "Tailwind CSS course",
          description:
            "Understand utility-first CSS with Tailwind. Build responsive, visually appealing interfaces quickly using prebuilt classes and custom configuration.",
          tags: ["CSS", "Web"],
        },
        {
          id: "id6",
          title: "Node.js Backend course",
          description:
            "Learn to build RESTful APIs with Node.js and Express. Manage databases, authentication, and deploy scalable backend services.",
          tags: ["Node", "Backend"],
        },
      ],
    })
  }

  get tags(): Promise<TagList> {
    // return httpClient<TagList>({
    //   url: `${__prefix}/tags/list`,
    // })
    return Promise.resolve([
      "React",
      "Web",
      "JS",
      "TS",
      "CSS",
      "Node",
      "Backend",
    ])
  }
}

export default BrowseSettingsStore
