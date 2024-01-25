import { Navigation } from './navigation'

export const Sidebar = () => {
  return (
    <aside className="w-[234px] m-5 h-[calc(100% - 40px)] bg-sidebar-bg bg-no-repeat bg-center bg-cover rounded-xl bg-gray-700 flex flex-col justify-between items-center pt-10 pb-6">
      <div className="flex flex-col items-start gap-7 w-[65%] h-full">
        <img
          className="w-[128px] h-[64px]"
          src="/images/Logo.svg"
          alt="Book wise logo"
        />
        <Navigation />
      </div>
    </aside>
  )
}
