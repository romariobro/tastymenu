import { useAppStore } from '../store/useAppStore'

export default function FamilySetup() {
  const { adults, kids, setFamily } = useAppStore()

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">👨‍👩‍👧‍👦 Состав семьи</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-500 mb-2 block">Взрослых</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFamily(Math.max(1, adults - 1), kids)}
              className="w-9 h-9 rounded-full bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
            >−</button>
            <span className="text-2xl font-bold w-8 text-center">{adults}</span>
            <button
              onClick={() => setFamily(adults + 1, kids)}
              className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 font-bold hover:bg-orange-200 transition-colors"
            >+</button>
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-500 mb-2 block">Детей</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFamily(adults, Math.max(0, kids - 1))}
              className="w-9 h-9 rounded-full bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
            >−</button>
            <span className="text-2xl font-bold w-8 text-center">{kids}</span>
            <button
              onClick={() => setFamily(adults, kids + 1)}
              className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 font-bold hover:bg-orange-200 transition-colors"
            >+</button>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3">
        Итого порций: {(adults * 1.0 + kids * 0.5).toFixed(1)}
      </p>
    </div>
  )
}
