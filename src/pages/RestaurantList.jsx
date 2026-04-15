import React, { useState, useEffect } from 'react'
import { getRestaurants } from '../services/restaurants'

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    loadRestaurants()
  }, [])

  async function loadRestaurants() {
    const data = await getRestaurants()
    setRestaurants(data)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
      
      {restaurants?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restaurants.map(restaurant => (
            <div 
              key={restaurant.id} 
              className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform"
            >
              <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
              <p className="text-gray-600 mb-2">Cuisine: {restaurant.cuisine}</p>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-2">★</span>
                <span>{restaurant.rating}/5</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No restaurants found</p>
        </div>
      )}
    </div>
  )
}