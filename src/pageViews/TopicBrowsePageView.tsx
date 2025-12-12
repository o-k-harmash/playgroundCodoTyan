import Filter from "@/assets/filter.svg?react"
import useTopicBrowseViewModel from "@/viewModels/topicBrowse/TopicBrowseViewModel"
import GlyphLeft from "@/assets/glyph__left.svg?react"
import GlyphRight from "@/assets/glyph__right.svg?react"
import { TopicBrowsePresentation as Presentation } from "@/viewModels/topicBrowse/TopicBrowsePresentationModel"

function Spiner({ visible }: { visible: boolean }) {
  return (
    <div data-visible={visible} className="page-loader">
      <div className="page-loader__spinner"></div>
    </div>
  )
}

/**
 * TopicsBrowsePageView
 * --------------------
 * A simple UI component to display a list of topics and tags.
 * Uses a view model (MVVM pattern) to manage state and actions.
 *
 * Features:
 * - Displays tags with clickable selection
 * - Shows a list of topic items with title, description, and associated tags
 * - Shows pagination info (offset, limit, total)
 */
export default function TopicBrowsePageView() {
  const { tags, items, status, offset, selectedTags, updateTag, updateOffset } =
    useTopicBrowseViewModel()

  if (status === "idle") {
    return <Spiner visible={true}></Spiner>
  }

  return (
    <>
      <Spiner visible={status === Presentation.LOADING}></Spiner>

      {/* Tags filter section */}
      <div className="container-sm mt-8">
        <details className="flex flex-col group">
          <summary className="btn btn--size-sm btn-ghost">
            <Filter />
          </summary>

          <div
            className="flex max-h-0 -translate-y-1 flex-wrap gap-2 mt-4
              overflow-hidden opacity-0
              transition-[max-height,opacity,transform] duration-200 ease-[ease]
              group-open:max-h-[200px] group-open:translate-y-0
              group-open:opacity-100"
          >
            {tags.map((id) => (
              <button
                key={id}
                data-selected={selectedTags.includes(id)}
                onClick={() => updateTag(id)}
                className="tag"
              >
                {id}
              </button>
            ))}
          </div>
        </details>
      </div>

      {/* Topics list section */}
      <div className="container-sm mt-8">
        <ul className="flex w-full max-w-2xl flex-col gap-8">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-4 rounded-md border
                border-(--color--border) p-4"
            >
              <h3>{item.title}</h3>

              {/* Display tags for each topic */}
              <div className="flex flex-wrap gap-1">
                {item.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-justify">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination / info section */}
      <div
        className="container-sm mt-8 flex items-center justify-center gap-4
          text-gray-600"
      >
        <GlyphLeft className="w-4 h-4 text-gray-500"></GlyphLeft>
        <div className="flex gap-2">
          {Array.from({ length: 5 }, (_, id) => (
            <a
              key={id}
              data-selected={offset === id}
              onClick={() => updateOffset(id)}
              className="px-2 py-3 border cursor-pointer border-gray-300
                text-gray-800 data-[selected=true]:bg-gray-800
                data-[selected=true]:text-white
                data-[selected=true]:border-gray-800
                data-[selected=true]:pointer-events-none
                data-[selected=true]:cursor-default"
            >
              {id + 1}
            </a>
          ))}
        </div>
        <GlyphRight className="w-4 h-4 text-gray-500"></GlyphRight>
      </div>
    </>
  )
}
