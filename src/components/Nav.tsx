import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Главная', emoji: '🏠' },
  { to: '/menu', label: 'Меню', emoji: '📋' },
  { to: '/shopping', label: 'Список', emoji: '🛒' },
  { to: '/settings', label: 'Настройки', emoji: '⚙️' },
]

export default function Nav() {
  return (
    <>
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 p-6">
        <div className="text-xl font-bold text-orange-600 mb-8">🍽️ Вкусное Меню</div>
        <nav className="flex flex-col gap-2">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <span className="text-lg">{link.emoji}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 flex z-50">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors ${
                isActive ? 'text-orange-600' : 'text-gray-500'
              }`
            }
          >
            <span className="text-xl mb-1">{link.emoji}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
