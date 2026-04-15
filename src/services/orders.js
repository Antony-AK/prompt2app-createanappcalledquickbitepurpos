import { supabase } from '../lib/supabase'

export async function getOrders() {
  const { data, error } = await supabase.from('orders').select('*')
  if (error) console.error('Error fetching orders:', error)
  return data || []
}

export async function createOrder(order) {
  const { data, error } = await supabase.from('orders').insert([order])
  if (error) console.error('Error creating order:', error)
  return data
}

export async function seedOrders() {
  const orders = [
    {
      restaurant_id: null,  // Will be replaced with actual restaurant ID
      total_price: 35,
      status: 'Pending',
      created_at: new Date()
    },
    {
      restaurant_id: null,  // Will be replaced with actual restaurant ID
      total_price: 45,
      status: 'Completed',
      created_at: new Date()
    }
  ]

  const restaurants = await supabase.from('restaurants').select('id')
  if (restaurants.data && restaurants.data.length > 0) {
    orders[0].restaurant_id = restaurants.data[0].id
    orders[1].restaurant_id = restaurants.data[1].id
  }

  const { data, error } = await supabase.from('orders').insert(orders)
  if (error) console.error('Error seeding orders:', error)
  return data
}