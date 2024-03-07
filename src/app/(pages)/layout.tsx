import { Header } from '@/components/common/header'
import { Sidebar } from '@/components/common/sidebar'

export default async function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="main-layout-pages no-scrollbar lg:overflow-hidden">
      <Header />
      <Sidebar />
      <div className="w-full h-[100vh] max-w-[996px] mx-auto lg:pt-[72px]">
        {children}
      </div>
    </main>
  )
}
