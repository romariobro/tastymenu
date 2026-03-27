import { useState } from 'react'
import { Dish, Ingredient } from '../types'
import { useAppStore } from '../store/useAppStore'

interface Props {
  dish: Dish
  onClose: () => void
}

export default function RecipeEditModal({ dish, onClose }: Props) {
  const { editDish } = useAppStore()
  const [ingredients, setIngredients] = useState<Ingredient[]>([...dish.ingredients])

  const handleQtyChange = (idx: number, value: string) => {
    const updated = [...ingredients]
    updated[idx] = { ...updated[idx], qty: parseFloat(value) || 0 }
    setIngredients(updated)
  }

  const handleSave = () => {
    editDish(dish.id, { ingredients })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{dish.emoji} {dish.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
          </div>
          <p className="text-sm text-gray-500 mb-4">Количество на 1 порцию:</p>
          <div className="space-y-3">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="flex-1 text-sm text-gray-700">{ing.name}</span>
                <input
                  type="number"
                  value={ing.qty}
                  onChange={e => handleQtyChange(idx, e.target.value)}
                  className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                <span className="text-sm text-gray-400 w-8">{ing.unit}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
