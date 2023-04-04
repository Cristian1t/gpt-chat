import { ChatList } from '@/components/chatList'
import { NewChatButton } from '@/components/newChatButton'
import { ThemeToggle } from '@/components/theme-toggle'

export const SideBar = () => {
  const numberOfChats = 0
  return (
    <div className="dark hidden bg-[#202123] md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col">
      <div className="flex h-full min-h-0 flex-col ">
        <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
          <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
            <NewChatButton />
            {numberOfChats === 0 && <ChatList />}
            <div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
              {/*<div*/}
              {/*    className="flex flex-col gap-2 text-gray-100 text-sm h-full justify-center items-center">*/}
              {/*    <div className="p-3 italic text-gray-500">Unable to load history*/}
              {/*        <button className="btn relative btn-dark btn-small m-auto mt-2">*/}
              {/*            <div className="flex w-full items-center justify-center gap-2">Retry</div>*/}
              {/*        </button>*/}
              {/*    </div>*/}
              {/*</div>*/}
            </div>
            <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
              <span className="flex w-full flex-row justify-between">
                <span className="gold-new-button flex items-center gap-3">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Upgrade to Plus
                </span>
                <span className="rounded-md bg-yellow-200 py-0.5 px-1.5 text-xs font-medium uppercase text-gray-800">
                  NEW
                </span>
              </span>
            </a>
            <ThemeToggle />
            <a
              href="https://help.openai.com/en/collections/3742473-chatgpt"
              target="_blank"
              className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Updates &amp; FAQ
            </a>
            <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Log out
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
