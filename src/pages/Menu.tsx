import { useState } from 'react'
import DishLibrary from '../components/DishLibrary'
import WeekCalendar from '../components/WeekCalendar'

export default function Menu() {
  const [activeTab, setActiveTab] = useState<'library' | 'calendar'>('library')

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📋 Меню</h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('library')}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeTab === 'library'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          📚 Библиотека блюд
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeTab === 'calendar'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          📅 Календарь
        </button>
      </div>

      {activeTab === 'library' ? <DishLibrary /> : <WeekCalendar />}
    </div>
  )
}
