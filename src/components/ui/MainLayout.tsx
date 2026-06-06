import React from 'react'
import ResponsiveSidebar from './ResponsiveSidebar'

type Props = {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <ResponsiveSidebar />

      {/*
        Main content is padded to account for collapsed icon strip (w-14)
        and for the full sidebar on md+ (md:pl-64). When the sidebar
        expands on hover it overlays the content because the sidebar is fixed.
      */}
      <main className="min-h-screen pl-14 md:pl-64 transition-padding">
        {children}
      </main>
    </div>
  )
}
