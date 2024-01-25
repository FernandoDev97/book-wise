import { Aside } from '@/components/aside'

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Aside />
      {children}
    </>
  )
}
