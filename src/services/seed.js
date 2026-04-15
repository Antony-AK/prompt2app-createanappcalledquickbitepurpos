import { seedRestaurants } from './restaurants'
import { seedOrders } from './orders'

export async function seedDemoData() {
  await seedRestaurants()
  await seedOrders()
  return true
}