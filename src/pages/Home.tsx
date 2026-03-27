import { useAppStore } from '../store/useAppStore'
import FamilySetup from '../components/FamilySetup'
import Recommendations from '../components/Recommendations'

export default function Home() {
  const { adults, kids, selectedDishes, dishes, onboardingDone, completeOnboarding } = useAppStore()
  const totalPortions = adults * 1.0 + kids * 0.5

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">🍽️ Вкусное Меню</h1>
        <p className="text-gray-500">Планировщик питания для семьи</p>
      </div>

      {!onboardingDone && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-orange-800 mb-2">👋 Добро пожаловать!</h2>
          <p className="text-sm text-orange-700 mb-4">
            Укажите состав семьи, выберите блюда в разделе «Меню» и получите готовый список покупок.
          </p>
          <button
            onClick={completeOnboarding}
            className="px-6 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600"
          >
            Начать
          </button>
        </div>
      )}

      <div className="space-y-4">
        <FamilySetup />

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">📊 Сводка</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-orange-600">{selectedDishes.length}</p>
              <p className="text-xs text-gray-500">Выбрано блюд</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{totalPortions.toFixed(1)}</p>
              <p className="text-xs text-gray-500">Порций</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{dishes.length}</p>
              <p className="text-xs text-gray-500">Блюд в базе</p>
            </div>
          </div>
        </div>

        <Recommendations />
      </div>
    </div>
  )
}
