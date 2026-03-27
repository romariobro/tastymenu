import { useAppStore } from '../store/useAppStore'
import { getTotalPortions } from '../store/useAppStore'
import { calculateShoppingList } from '../utils/shoppingUtils'

export default function ShoppingList() {
  const { selectedDishes, dishes, adults, kids, haveAtHome, pantryDefaults, toggleHaveAtHome } = useAppStore()
  const totalPortions = getTotalPortions(adults, kids)
  const items = calculateShoppingList(selectedDishes, dishes, totalPortions, haveAtHome, pantryDefaults)

  if (items.size === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-3">🛒</p>
        <p>Выберите блюда в разделе «Меню»</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {Array.from(items.values()).map(item => (
        <div
          key={item.name}
          className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100"
        >
          <div>
            <span className="font-medium text-gray-800">{item.name}</span>
            <span className="text-sm text-gray-500 ml-2">{item.qty} {item.unit}</span>
          </div>
          <button
            onClick={() => toggleHaveAtHome(item.name)}
            className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
          >
            Есть дома
          </button>
        </div>
      ))}
    </div>
  )
}
