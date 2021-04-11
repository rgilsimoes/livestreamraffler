// Theses are specific to our business logic
export default interface User {
  uid?: string
  email: string
  name: string
  channelUrl: string
  status?: number //0 - Active, 1 - Canceled
  createdAt?: firebase.default.firestore.Timestamp
  updatedAt?: firebase.default.firestore.Timestamp
}