import { supabase } from '../lib/supabase'

export async function getRestaurants() {
  const { data, error } = await supabase.from('restaurants').select('*')
  if (error) console.error('Error fetching restaurants:', error)
  return data || []
}

export async function createRestaurant(restaurant) {
  const { data, error } = await supabase.from('restaurants').insert([restaurant])
  if (error) console.error('Error creating restaurant:', error)
  return data
}

export async function seedRestaurants() {
  const restaurants = [
    {
      name: 'Spice Fusion',
      cuisine: 'Indian',
      rating: 4,
      created_at: new Date()
    },
    {
      name: 'Pizza Paradise',
      cuisine: 'Italian',
      rating: 5,
      created_at: new Date()
    },
    {
      name: 'Sushi Sensation',
      cuisine: 'Japanese',
      rating: 4,
      created_at: new Date()
    }
  ]

  const { data, error } = await supabase.from('restaurants').insert(restaurants)
  if (error) console.error('Error seeding restaurants:', error)
  return data
}