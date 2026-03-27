import { Dish } from '../types'

export interface ShoppingItem {
  name: string
  qty: number
  unit: string
}

export function calculateShoppingList(
  selectedDishIds: string[],
  dishes: Dish[],
  totalPortions: number,
  haveAtHome: string[],
  pantryDefaults: string[]
): Map<string, ShoppingItem> {
  const map = new Map<string, ShoppingItem>()

  for (const dishId of selectedDishIds) {
    const dish = dishes.find(d => d.id === dishId)
    if (!dish) continue
    for (const ing of dish.ingredients) {
      const qty = ing.qty * totalPortions
      const rounded = qty >= 100 ? Math.round(qty / 10) * 10 : Math.ceil(qty * 10) / 10
      const key = ing.name.toLowerCase()
      const existing = map.get(key)
      if (existing) {
        existing.qty += rounded
      } else {
        map.set(key, { name: ing.name, qty: rounded, unit: ing.unit })
      }
    }
  }

  const excluded = new Set([
    ...pantryDefaults.map(s => s.toLowerCase()),
    ...haveAtHome.map(s => s.toLowerCase()),
  ])

  for (const key of Array.from(map.keys())) {
    if (excluded.has(key)) map.delete(key)
  }

  return map
}
