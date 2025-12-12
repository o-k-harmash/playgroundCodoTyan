import useTopicsBrowseViewModel from "@/viewModels/TopicsBrowseVM"
import React from "react"

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
    limit,
    offset,
    total,
    state,
    error,
    changePageProcessManager,
    toggleTagProcessManager,
  } = useTopicsBrowseViewModel()

  // Loading state: show a simple loading message
  if (state === "IDLE" || state === "LOADING") {
    return <div className="text-center py-8">Loading data...</div>
  }

  // Error state: display error message
  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        Something went wrong, please reload the page. {error}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center p-4 gap-6">
      {/* Tags filter section */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => toggleTagProcessManager(tag.id)} // Toggle tag selection
            className={`px-3 py-1 rounded ${
              tag.selected ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {tag.id}
          </button>
        ))}
      </div>

      {/* Topics list section */}
      <ul className="flex flex-col gap-4 w-full max-w-2xl">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col p-4 bg-gray-100 rounded shadow-sm"
          >
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-700 mt-1">{item.description}</p>

            {/* Display tags for each topic */}
            <div className="flex flex-wrap gap-1 mt-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-sm bg-gray-300 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination / info section */}
      <div className="flex flex-col items-center gap-4 mt-4 text-gray-600">
        <p>Current page offset: {offset}</p>
        <p>Limit per page: {limit}</p>
        <p>Total topics: {total}</p>
        <div className="flex gap-2">
          {pages.map((p) => (
            <button
              key={p.id}
              disabled={p.disabled}
              onClick={() => changePageProcessManager(p.id)} // Toggle tag selection
              className={"px-3 py-1 rounded bg-blue-600 text-white"}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopicsBrowsePageView
