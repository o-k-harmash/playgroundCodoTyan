import GridDots from "@/assets/grid_dots.svg?react"
import Exit from "@/assets/exit.svg?react"
import Home from "@/assets/home.svg?react"
import Heart from "@/assets/heart.svg?react"
import Sunny from "@/assets/sunny.svg?react"
import Moon from "@/assets/moon.svg?react"
import Note from "@/assets/note.svg?react"
import Phone from "@/assets/phone.svg?react"
import Comment from "@/assets/comment.svg?react"
import Important from "@/assets/important.svg?react"
import { Outlet } from "react-router"
import Filter from "@/assets/filter.svg?react"
import useLayoutViewModel from "@/viewModels/layout/LayoutViewModel"

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

const vm = {
  navbar: {
    navigation: [
      { icon: Home, label: "Home", href: "" },
      {
        icon: Note,
        label: "All Articles",
        href: "",
      },
      { icon: Important, label: "About", href: "" },
      {
        icon: Heart,
        label: "Support us",
        href: "",
      },
      {
        icon: Comment,
        label: "Community",
        href: "",
      },
    ],
  },
  footer: {
    contacts: {
      description:
        "High quality coding education maintained by an open source community.",
      links: [
        { icon: Home, href: "#" },
        { icon: Heart, href: "#" },
        { icon: Important, href: "#" },
        { icon: Filter, href: "#" },
      ],
    },
    navigation: [
      {
        heading: "Heading",
        links: [
          { label: "About", href: "#" },
          { label: "Team", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Success Stories", href: "#" },
        ],
      },
      {
        heading: "Heading",
        links: [
          { label: "About", href: "#" },
          { label: "Team", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Success Stories", href: "#" },
        ],
      },
    ],
  },
}

function LayoutPageView() {
  const {
    isDarkTheme,
    user,
    isOverlayOpen,
    closeOverlay,
    openOverlay,
    toggleTheme,
  } = useLayoutViewModel()

  return (
    <>
      {/* Overlay */}
      <div data-visible={isOverlayOpen} className="group">
        {/* Blur */}
        <div
          className="pointer-events-none fixed inset-0 z-(--z-index) bg-black/0
            opacity-0 transition-[backdrop-filter,background-color,opacity]
            duration-200 ease-linear
            group-data-[visible=true]:pointer-events-auto
            group-data-[visible=true]:bg-black/30
            group-data-[visible=true]:opacity-100
            group-data-[visible=true]:backdrop-blur-md"
        ></div>
        {/* Side panel */}
        <div
          className="fixed z-[calc(var(--z-index)+1)] min-h-screen w-[320px]
            -translate-x-[125%] bg-(--bg-primary) px-4 py-2 transition-transform
            delay-50 duration-250 ease-[ease]
            group-data-[visible=true]:translate-x-0"
        >
          <button
            className="btn btn--size-sm btn-ghost absolute left-full"
            onClick={closeOverlay}
          >
            <Exit className="text-gray-500"></Exit>
          </button>

          <div className="flex items-center gap-2">
            <img src="/codo_tyan.png" alt="" />
            <span className="h4">CodoTyan</span>
          </div>

          <ul className="py-4">
            {vm.navbar.navigation.map((n, i) => (
              <li key={i}>
                <a className="nav__item" href={n.href}>
                  <n.icon></n.icon>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <hr className="text-(--color--border)"></hr>

          <div className="flex flex-col pt-4">
            <a className="nav__item">
              {user ? <Filter /> : <Phone />} {user ? "Settings" : "Sign in"}
            </a>

            <button className="nav__item" onClick={toggleTheme}>
              {isDarkTheme ? <Sunny /> : <Moon />}{" "}
              {isDarkTheme ? "Light mode" : "Dark mode"}
            </button>

            {user && (
              <button aria-label="Sign out" type="button" className="nav__item">
                <Phone /> {"Sign out"}
              </button>
            )}
          </div>
        </div>
      </div>

      <nav className="h-14 border-b border-(--color--border) py-2">
        <div className="container-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/codo_tyan.png" alt="" />
            <span className="h4">CodoTyan</span>
          </div>
          <button className="btn btn--size-sm btn-ghost" onClick={openOverlay}>
            <GridDots></GridDots>
          </button>
        </div>
      </nav>

      <main className="min-h-screen">
        <Outlet></Outlet>
      </main>

      <div className="mt-8 bg-(--bg-secondary) py-28">
        <div className="container-sm flex flex-col items-center">
          <h1>Join to Us!</h1>
          <p className="mt-4 text-center">
            The Project is funded by the community. Join us in empowering
            learners around the globe by supporting The Project!
          </p>
          <div className="mt-6 flex gap-4">
            <a
              className="btn btn--size-md btn--border btn--border-outlined
                btn-outlined"
            >
              Learn more
            </a>
            <a className="btn btn--size-md btn-filled">Join now</a>
          </div>
        </div>
      </div>

      <footer className="mt-8 py-8">
        <div className="container-sm flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img src="/codo_tyan.png" alt="" />
              <span className="h4">CodoTyan</span>
            </div>
            <p className="text-gray-600">{vm.footer.contacts.description}</p>
            <ul className="flex gap-8">
              {vm.footer.contacts.links.map((l, i) => {
                return (
                  <li key={i}>
                    <a href={l.href}>
                      <l.icon className="text-gray-600"></l.icon>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          {vm.footer.navigation.map((n, i) => (
            <div key={i}>
              <h5>{n.heading}</h5>
              <ul className="mt-4 flex flex-col gap-4">
                {n.links.map((l, i) => (
                  <li key={i}>
                    <a href={l.href} className="text-gray-500">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </>
  )
}

export default LayoutPageView
