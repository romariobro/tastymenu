import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import DishCard from './DishCard'

const CATEGORIES = ['Все', 'Супы', 'Завтраки', 'Горячее', 'Гарниры', 'Салаты'] as const

export default function DishLibrary() {
  const { dishes } = useAppStore()
  const [activeCategory, setActiveCategory] = useState<string>('Все')
  const [search, setSearch] = useState('')

  const filtered = dishes.filter(dish => {
    const matchCat = activeCategory === 'Все' || dish.category === activeCategory
    const matchSearch = dish.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Поиск блюда..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(dish => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-8">Блюда не найдены</p>
      )}
    </div>
  )
}
