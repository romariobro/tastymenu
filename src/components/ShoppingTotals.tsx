import { useAppStore, getTotalPortions } from '../store/useAppStore'
import { PRICES, PER_PIECE_ITEMS, PER_LITER_ITEMS } from '../data/prices'

function estimatePrice(name: string, qty: number, unit: string): number {
  const key = name.toLowerCase()
  const price = PRICES[key]
  if (!price) return 0

  if (PER_PIECE_ITEMS.has(key)) {
    return Math.ceil(qty) * price
  }
  if (PER_LITER_ITEMS.has(key) && unit === 'мл') {
    return (qty / 1000) * price
  }
  if (unit === 'г') {
    return (qty / 1000) * price
  }
  if (unit === 'кг') {
    return qty * price
  }
  if (unit === 'л') {
    return qty * price
  }
  return price
}

export default function ShoppingTotals() {
  const { selectedDishes, dishes, adults, kids, haveAtHome, pantryDefaults } = useAppStore()
  const totalPortions = getTotalPortions(adults, kids)

  if (selectedDishes.length === 0) return null

  let total = 0
  const breakdown: { name: string; price: number }[] = []

  const excluded = new Set([
    ...pantryDefaults.map(s => s.toLowerCase()),
    ...haveAtHome.map(s => s.toLowerCase()),
  ])

  for (const dishId of selectedDishes) {
    const dish = dishes.find(d => d.id === dishId)
    if (!dish) continue
    for (const ing of dish.ingredients) {
      const key = ing.name.toLowerCase()
      if (excluded.has(key)) continue
      const qty = ing.qty * totalPortions
      const price = estimatePrice(ing.name, qty, ing.unit)
      if (price > 0) {
        total += price
        const existing = breakdown.find(b => b.name.toLowerCase() === key)
        if (existing) {
          existing.price += price
        } else {
          breakdown.push({ name: ing.name, price })
        }
      }
    }
  }

  const handleExport = () => {
    const lines = breakdown.map(b => `${b.name}: ~${Math.round(b.price)} ₽`)
    lines.push(`\nИТОГО: ~${Math.round(total)} ₽`)
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'shopping-list.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-4">💰 Примерная стоимость</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
        {breakdown.map(item => (
          <div key={item.name} className="flex justify-between text-sm text-gray-600">
            <span>{item.name}</span>
            <span>~{Math.round(item.price)} ₽</span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
        <span className="font-bold text-gray-800">Итого:</span>
        <span className="text-xl font-bold text-orange-600">~{Math.round(total)} ₽</span>
      </div>
      <button
        onClick={handleExport}
        className="mt-4 w-full py-2 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors text-sm"
      >
        📥 Экспортировать список
      </button>
    </div>
  )
}
