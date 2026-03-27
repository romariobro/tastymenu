import { useAppStore } from '../store/useAppStore'
import { MealSlot } from '../types'

const DAYS_RU = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MONTHS_RU = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']

const MEAL_SLOTS: { key: keyof MealSlot; label: string; emoji: string }[] = [
  { key: 'breakfast', label: 'Завтрак', emoji: '🌅' },
  { key: 'lunch', label: 'Обед', emoji: '☀️' },
  { key: 'dinner', label: 'Ужин', emoji: '🌙' },
  { key: 'snack', label: 'Перекус', emoji: '🍎' },
]

function getWeekDates(): Date[] {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function WeekCalendar() {
  const { mealPlan, dishes, addToMealPlan, removeFromMealPlan, selectedDishes } = useAppStore()
  const weekDates = getWeekDates()
  const todayStr = formatDate(new Date())

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-7 gap-2 min-w-[700px]">
        {weekDates.map((date, i) => {
          const dateStr = formatDate(date)
          const dayPlan: MealSlot = mealPlan[dateStr] || { breakfast: [], lunch: [], dinner: [], snack: [] }
          const isToday = todayStr === dateStr

          return (
            <div key={dateStr} className={`rounded-xl border p-2 ${isToday ? 'border-orange-300 bg-orange-50' : 'border-gray-200 bg-white'}`}>
              <div className="text-center mb-2">
                <p className={`text-xs font-bold ${isToday ? 'text-orange-600' : 'text-gray-500'}`}>{DAYS_RU[i]}</p>
                <p className="text-sm font-semibold text-gray-700">{date.getDate()} {MONTHS_RU[date.getMonth()]}</p>
              </div>
              {MEAL_SLOTS.map(slot => (
                <div key={slot.key} className="mb-2">
                  <p className="text-xs text-gray-400 mb-1">{slot.emoji}</p>
                  {dayPlan[slot.key].map(dishId => {
                    const dish = dishes.find(d => d.id === dishId)
                    return dish ? (
                      <div key={dishId} className="flex items-center gap-1 mb-1">
                        <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-lg flex-1 leading-tight">{dish.emoji} {dish.name}</span>
                        <button
                          onClick={() => removeFromMealPlan(dateStr, slot.key, dishId)}
                          className="text-red-400 text-xs hover:text-red-600"
                        >✕</button>
                      </div>
                    ) : null
                  })}
                  {selectedDishes.length > 0 && (
                    <select
                      value=""
                      onChange={e => {
                        if (e.target.value) addToMealPlan(dateStr, slot.key, e.target.value)
                      }}
                      className="w-full text-xs border border-dashed border-gray-300 rounded-lg px-1 py-0.5 text-gray-400 bg-transparent"
                    >
                      <option value="">+ добавить</option>
                      {selectedDishes.map(id => {
                        const d = dishes.find(dish => dish.id === id)
                        return d ? <option key={id} value={id}>{d.name}</option> : null
                      })}
                    </select>
                  )}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
