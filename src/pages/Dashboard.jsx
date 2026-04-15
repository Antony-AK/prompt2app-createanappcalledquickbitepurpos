import React, { useState, useEffect } from 'react'
import { seedDemoData } from '../services/seed'
import { getRestaurants } from '../services/restaurants'
import { getOrders } from '../services/orders'

export default function Dashboard({ user }) {
  const [restaurants, setRestaurants] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const restaurantData = await getRestaurants()
    const orderData = await getOrders()
    setRestaurants(restaurantData)
    setOrders(orderData)
  }

  async function handleSeedData() {
    await seedDemoData()
    await loadData()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.email}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Restaurants</h2>
            {restaurants?.length > 0 ? (
              <ul className="space-y-2">
                {restaurants.map(restaurant => (
                  <li key={restaurant.id} className="bg-gray-100 p-3 rounded">
                    {restaurant.name} - {restaurant.cuisine}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No restaurants found</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            {orders?.length > 0 ? (
              <ul className="space-y-2">
                {orders.map(order => (
                  <li key={order.id} className="bg-gray-100 p-3 rounded">
                    Order #{order.id.slice(0, 8)} - ${order.total_price} ({order.status})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No orders found</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSeedData}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Load Demo Data
          </button>
        </div>
      </div>
    </div>
  )
}