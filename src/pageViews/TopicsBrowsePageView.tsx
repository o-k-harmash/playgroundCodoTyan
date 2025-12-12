import useTopicsBrowseViewModel from "@/viewModels/TopicsBrowseVM"
import Filter from "@/assets/filter.svg?react"
import GlyphRight from "@/assets/glyph__right.svg?react"
import GlyphLeft from "@/assets/glyph__left.svg?react"

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
function TopicsBrowsePageView() {
  const {
    tags,
    items,
    pages,
    state,
    error,
    isFilterOpen,
    changePageProcessManager,
    toggleTagProcessManager,
    toggleFilterButton,
  } = useTopicsBrowseViewModel()

  if (state === "IDLE") {
    return (
      <div data-visible="true" className="page-loader">
        <div className="page-loader__spinner"></div>
      </div>
    )
  }

  // Error state: display error message
  if (error) {
    //must to be catched by router dom
    return (
      <div className="text-red-500 text-center py-8">
        Something went wrong, please reload the page. {error}
      </div>
    )
  }

  return (
    <>
      <div data-visible={state === "LOADING"} className="page-loader">
        <div className="page-loader__spinner"></div>
      </div>

      {/* Tags filter section */}
      <div className="w-[412px] mx-auto px-4 mt-8">
        <div className="flex flex-col gap-4">
          <button
            type="button"
            className="btn btn--size-sm btn-ghost"
            aria-expanded={isFilterOpen}
            aria-controls="filter-panel"
            onClick={toggleFilterButton}
          >
            <Filter />
          </button>

          <div
            id="filter-panel"
            data-open={isFilterOpen}
            className="flex 
            flex-wrap 
            gap-2 
            overflow-hidden 
            max-h-0 
            opacity-0 
            -translate-y-1 
            transition-[max-height,opacity,transform] 
            duration-200 
            ease-[ease]
            data-[open=true]:max-h-[200px] 
            data-[open=true]:translate-y-0 
            data-[open=true]:opacity-100"
          >
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTagProcessManager(tag.id)}
                className={`tag ${tag.selected ? "tag-selected" : ""}`}
              >
                {tag.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Topics list section */}
      <div className="w-[412px] mx-auto px-4 mt-8">
        <ul className="flex flex-col gap-8 w-full max-w-2xl">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col p-4 rounded-md border border-(--color--border) gap-4"
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
      <div className="flex flex-col items-center justify-center gap-4 px-4 mt-8 w-[412px] mx-auto text-gray-600">
        <div className="flex gap-2">
          <button
            disabled={pages.prevChank === null}
            onClick={() => changePageProcessManager(pages.prevChank!)}
          >
            <GlyphLeft className="w-4 h-4"></GlyphLeft>
          </button>

          {pages.chanck.map((c) => (
            <>
              {c ? (
                <button
                  type="button"
                  key={c.id}
                  disabled={c.disabled}
                  onClick={() => changePageProcessManager(c.id)} // Toggle tag selection
                  className={`px-2 py-3 ${c.disabled ? "bg-gray-600 text-white" : "text-gray-800 border border-gray-300"}`}
                >
                  {c.name}
                </button>
              ) : (
                <span className="px-2 py-3">{"..."}</span>
              )}
            </>
          ))}
          <button
            disabled={pages.nextChanck === null}
            onClick={() => changePageProcessManager(pages.nextChanck!)}
          >
            <GlyphRight className="w-4 h-4"></GlyphRight>
          </button>
        </div>
      </div>
    </>
  )
}

export default TopicsBrowsePageView
