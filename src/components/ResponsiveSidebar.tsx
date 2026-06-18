import React from 'react'

type NavItem = {
  key: string
  label: string
  href?: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '#',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3v18" />
      </svg>
    ),
  },
  {
    key: 'surveys',
    label: 'Surveys',
    href: '#',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h6M9 8h6" />
      </svg>
    ),
  },
  {
    key: 'responses',
    label: 'Responses',
    href: '#',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M7 21V7" />
      </svg>
    ),
  },
  {
    key: 'settings',
    label: 'Settings',
    href: '#',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
      </svg>
    ),
  },
]

export default function ResponsiveSidebar() {
  return (
    <aside
      aria-label="Sidebar"
      className={
        'group fixed left-0 top-0 h-full z-50 w-14 hover:w-56 md:relative md:w-64 md:top-0 md:left-0 bg-white border-r shadow md:shadow-none transition-all duration-300 ease-in-out overflow-hidden'
      }
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center h-14 px-3 md:px-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded flex items-center justify-center text-sm font-semibold">S</div>
            <span className="ml-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 md:opacity-100">Survey</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors md:px-4"
                >
                  <span className="flex-shrink-0 text-gray-600">{item.icon}</span>
                  <span className="truncate opacity-0 group-hover:opacity-100 transition-opacity duration-200 md:opacity-100">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-3 border-t">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors md:px-4">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 md:opacity-100">Sign out</span>
            <span className="sr-only">Sign out</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
