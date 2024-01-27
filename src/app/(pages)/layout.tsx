import { Sidebar } from '@/components/common/sidebar'

export default async function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="main-layout-pages">
      <Sidebar />
      <div className="w-full h-[100vh] max-w-[996px] mx-auto pt-[72px] ">
        {children}
      </div>
    </main>
  )
}
