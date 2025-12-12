import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import "./style.css"
import TopicsBrowsePageView from "./pageViews/TopicsBrowsePageView"

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <TopicsBrowsePageView></TopicsBrowsePageView>,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
