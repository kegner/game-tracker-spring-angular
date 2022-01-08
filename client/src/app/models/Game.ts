export interface Game {
  id?: number,
  title?: string,
  platform?: string,
  startDate?: Date,
  endDate?: Date,
  status?: string,
  hoursToComplete?: number,
  rating?: number,
  price?: number,
  userId?: number
}