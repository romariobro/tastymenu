import ShoppingList from '../components/ShoppingList'
import ShoppingTotals from '../components/ShoppingTotals'

export default function Shopping() {
  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">🛒 Список покупок</h1>
      <div className="space-y-6">
        <ShoppingList />
        <ShoppingTotals />
      </div>
    </div>
  )
}
