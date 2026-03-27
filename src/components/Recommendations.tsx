import { useAppStore } from '../store/useAppStore'

export default function Recommendations() {
  const { dishes, selectedDishes } = useAppStore()
  const selected = dishes.filter(d => selectedDishes.includes(d.id))

  if (selected.length === 0) return null

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-4">💡 Советы по приготовлению</h3>
      <div className="space-y-4">
        {selected.map(dish => (
          <div key={dish.id} className="border-l-4 border-orange-200 pl-4">
            <p className="text-sm font-medium text-gray-700 mb-1">{dish.emoji} {dish.name}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{dish.tip}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
