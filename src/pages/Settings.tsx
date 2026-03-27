import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Dish } from '../types'
import RecipeEditModal from '../components/RecipeEditModal'

export default function Settings() {
  const { dishes, showCalories, shoppingDays, shoppingOffset, setShoppingSchedule, setShowCalories } = useAppStore()
  const [editingDish, setEditingDish] = useState<Dish | null>(null)

  const toggleDay = (day: number) => {
    const newDays = shoppingDays.includes(day)
      ? shoppingDays.filter(d => d !== day)
      : [...shoppingDays, day].sort((a, b) => a - b)
    setShoppingSchedule(newDays, shoppingOffset)
  }

  const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">⚙️ Настройки</h1>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">🎨 Отображение</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setShowCalories(!showCalories)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${showCalories ? 'bg-orange-500' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${showCalories ? 'translate-x-7' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm text-gray-700">Показывать калории</span>
          </label>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">📅 Дни закупок</h2>
          <div className="flex gap-2 flex-wrap">
            {dayLabels.map((label, i) => (
              <button
                key={i}
                onClick={() => toggleDay(i)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  shoppingDays.includes(i)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">🍳 Рецепты</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {dishes.map(dish => (
              <div key={dish.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700">{dish.emoji} {dish.name}</span>
                <button
                  onClick={() => setEditingDish(dish)}
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                >
                  Изменить
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingDish && (
        <RecipeEditModal dish={editingDish} onClose={() => setEditingDish(null)} />
      )}
    </div>
  )
}
