import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AppState, Dish, MealSlot } from '../types'
import { DISHES } from '../data/dishes'

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      adults: 2,
      kids: 1,
      pantryDefaults: ['соль', 'сахар', 'перец чёрный', 'масло растительное', 'лавровый лист'],
      dishes: DISHES,
      selectedDishes: [],
      mealPlan: {},
      haveAtHome: [],
      shoppingDays: [0, 3],
      shoppingOffset: 0 as 0 | 1 | 2,
      showCalories: true,
      onboardingDone: false,

      setFamily: (adults, kids) => set({ adults, kids }),

      toggleDish: (id) => {
        const { selectedDishes } = get()
        if (selectedDishes.includes(id)) {
          set({ selectedDishes: selectedDishes.filter(d => d !== id) })
        } else {
          set({ selectedDishes: [...selectedDishes, id] })
        }
      },

      addToMealPlan: (date, slot, dishId) => {
        const { mealPlan } = get()
        const dayPlan: MealSlot = mealPlan[date] || { breakfast: [], lunch: [], dinner: [], snack: [] }
        if (!dayPlan[slot].includes(dishId)) {
          set({
            mealPlan: {
              ...mealPlan,
              [date]: { ...dayPlan, [slot]: [...dayPlan[slot], dishId] }
            }
          })
        }
      },

      removeFromMealPlan: (date, slot, dishId) => {
        const { mealPlan } = get()
        const dayPlan = mealPlan[date]
        if (!dayPlan) return
        set({
          mealPlan: {
            ...mealPlan,
            [date]: { ...dayPlan, [slot]: dayPlan[slot].filter(id => id !== dishId) }
          }
        })
      },

      toggleHaveAtHome: (ingredient) => {
        const { haveAtHome } = get()
        if (haveAtHome.includes(ingredient)) {
          set({ haveAtHome: haveAtHome.filter(i => i !== ingredient) })
        } else {
          set({ haveAtHome: [...haveAtHome, ingredient] })
        }
      },

      addCustomDish: (dish: Dish) => {
        set({ dishes: [...get().dishes, dish] })
      },

      editDish: (id: string, updates: Partial<Dish>) => {
        set({
          dishes: get().dishes.map(d => d.id === id ? { ...d, ...updates } : d)
        })
      },

      setShoppingSchedule: (days, offset) => set({ shoppingDays: days, shoppingOffset: offset }),

      completeOnboarding: () => set({ onboardingDone: true }),

      setShowCalories: (val: boolean) => set({ showCalories: val }),
    }),
    {
      name: 'vkusnoe-menu-state',
    }
  )
)

export const getTotalPortions = (adults: number, kids: number) => adults * 1.0 + kids * 0.5
