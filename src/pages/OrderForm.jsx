import React, { useState, useEffect } from 'react'
import { getRestaurants } from '../services/restaurants'
import { createOrder } from '../services/orders'

export default function OrderForm() {
  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    loadRestaurants()
  }, [])

  async function loadRestaurants() {
    const data = await getRestaurants()
    setRestaurants(data)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const orderData = {
      restaurant_id: selectedRestaurant,
      total_price: totalPrice,
      status: 'Pending',
      created_at: new Date()
    }

    await createOrder(orderData)
    alert('Order placed successfully!')
    
    // Reset form
    setSelectedRestaurant('')
    setTotalPrice(0)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Place New Order</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Select Restaurant</label>
            <select
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Choose a restaurant</option>
              {restaurants?.map(restaurant => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Total Price</label>
            <input
              type="number"
              value={totalPrice}
              onChange={(e) => setTotalPrice(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter total price"
              min="0"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  )
}