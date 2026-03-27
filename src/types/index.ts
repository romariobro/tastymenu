export interface Ingredient {
  name: string
  qty: number
  unit: 'г' | 'мл' | 'шт' | 'л' | 'кг' | 'шт.'
}

export interface Dish {
  id: string
  name: string
  emoji: string
  category: 'Супы' | 'Завтраки' | 'Горячее' | 'Гарниры' | 'Салаты'
  time: number
  calories: number
  ingredients: Ingredient[]
  tip: string
  isCustom?: boolean
}

export interface MealSlot {
  breakfast: string[]
  lunch: string[]
  dinner: string[]
  snack: string[]
}

export interface AppState {
  adults: number
  kids: number
  pantryDefaults: string[]
  dishes: Dish[]
  selectedDishes: string[]
  mealPlan: Record<string, MealSlot>
  haveAtHome: string[]
  shoppingDays: number[]
  shoppingOffset: 0 | 1 | 2
  showCalories: boolean
  onboardingDone: boolean
  setFamily: (adults: number, kids: number) => void
  toggleDish: (id: string) => void
  addToMealPlan: (date: string, slot: keyof MealSlot, dishId: string) => void
  removeFromMealPlan: (date: string, slot: keyof MealSlot, dishId: string) => void
  toggleHaveAtHome: (ingredient: string) => void
  addCustomDish: (dish: Dish) => void
  editDish: (id: string, updates: Partial<Dish>) => void
  setShoppingSchedule: (days: number[], offset: 0 | 1 | 2) => void
  completeOnboarding: () => void
  setShowCalories: (val: boolean) => void
}
