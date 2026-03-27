import { Dish } from '../types'
import { useAppStore } from '../store/useAppStore'

interface Props {
  dish: Dish
  showSelect?: boolean
}

export default function DishCard({ dish, showSelect = true }: Props) {
  const { selectedDishes, toggleDish, showCalories } = useAppStore()
  const selected = selectedDishes.includes(dish.id)

  return (
    <div
      className={`bg-white rounded-2xl p-4 shadow-sm border transition-all cursor-pointer ${
        selected ? 'border-orange-400 ring-2 ring-orange-200' : 'border-gray-100 hover:border-gray-200'
      }`}
      onClick={() => showSelect && toggleDish(dish.id)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{dish.emoji}</span>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm leading-tight">{dish.name}</h3>
            <p className="text-xs text-gray-400">{dish.category}</p>
          </div>
        </div>
        {showSelect && (
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
            selected ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300'
          }`}>
            {selected && <span className="text-xs">✓</span>}
          </div>
        )}
      </div>
      <div className="flex gap-3 mt-3 text-xs text-gray-500">
        <span>⏱️ {dish.time} мин</span>
        {showCalories && <span>🔥 {dish.calories} ккал</span>}
      </div>
    </div>
  )
}
