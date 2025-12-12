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
import useLayoutViewModel from "@/viewModels/LayoutVM"

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
  const { dark, user, isOverlayOpen, closeOverlay, openOverlay, toggleTheme } =
    useLayoutViewModel()

  return (
    <div>
      {/* Overlay */}
      <div>
        {/* Blur */}
        <div
          data-visible={isOverlayOpen}
          className="fixed 
            inset-0 
            z-(--z-index) 
            bg-black/0 
            opacity-0 
            pointer-events-none 
            transition-[backdrop-filter,background-color,opacity] 
            duration-200 
            ease-linear 
            data-[visible=true]:backdrop-blur-md
            data-[visible=true]:bg-black/30
            data-[visible=true]:opacity-100
            data-[visible=true]:pointer-events-auto"
        ></div>
        {/* Side panel */}
        <div
          data-visible={isOverlayOpen}
          className="fixed 
            h-screen 
            w-[320px] 
            z-[calc(var(--z-index)+1)] 
            px-4 py-2 
            bg-(--bg-primary) 
            -translate-x-[125%] 
            transition-transform 
            duration-250 
            ease-[ease] 
            delay-50
            data-[visible=true]:translate-x-0"
        >
          <button
            className="btn btn--size-sm btn-ghost absolute left-full"
            aria-label="Close menu"
            onClick={closeOverlay}
          >
            <Exit className="text-gray-500"></Exit>
          </button>

          <div className="flex items-center gap-2">
            <img src="/codo_tyan.png" alt="" />
            <span className="h4">CodoTyan</span>
          </div>

          <ul className="py-4 ">
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

            <button
              aria-label="Toogle theme"
              type="button"
              className="nav__item"
              onClick={toggleTheme}
            >
              {dark ? <Sunny /> : <Moon />} {dark ? "Light mode" : "Dark mode"}
            </button>

            {user && (
              <button aria-label="Sign out" type="button" className="nav__item">
                <Phone /> {"Sign out"}
              </button>
            )}
          </div>
        </div>
      </div>

      <nav className="py-2 h-14 border-b border-(--color--border)">
        <div className="container-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/codo_tyan.png" alt="" />
            <span className="h4">CodoTyan</span>
          </div>
          <button
            className="btn btn--size-sm btn-ghost"
            onClick={openOverlay}
            aria-label="Open menu"
            type="button"
          >
            <GridDots></GridDots>
          </button>
        </div>
      </nav>

      <main className="min-h-screen">
        <Outlet></Outlet>
      </main>

      <div className="bg-(--bg-secondary) py-28 mt-8">
        <div className="container-sm flex flex-col items-center">
          <h1>Join to Us!</h1>
          <p className="mt-4 text-center">
            The Project is funded by the community. Join us in empowering
            learners around the globe by supporting The Project!
          </p>
          <div className="flex gap-4 mt-6">
            <a className="btn btn--size-md btn--border btn--border-outlined btn-outlined">
              Learn more
            </a>
            <a className="btn btn--size-md btn-filled">Join now</a>
          </div>
        </div>
      </div>

      <footer className="py-8 mt-8">
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
              <ul className="flex flex-col gap-4 mt-4">
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
    </div>
  )
}

export default LayoutPageView
