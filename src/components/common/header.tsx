import { Navigation } from './navigation'

export const Header = () => {
  return (
    <aside className=" lg:hidden w-full mb-5 h-auto bg-sidebar-bg bg-no-repeat bg-center bg-cover rounded-xl bg-gray-700  px-4 py-6">
      <div className="flex  items-start gap-7 w-full h-full">
        <img
          className="w-[80px] h-[40px] lg:w-[128px] lg:h-[64px]"
          src="/images/Logo.svg"
          alt="Book wise logo"
        />
        <Navigation />
      </div>
    </aside>
  )
}
