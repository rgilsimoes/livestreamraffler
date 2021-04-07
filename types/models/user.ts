// Theses are specific to our business logic
export default interface User {
  uid?: string
  email: string
  name: string
  channelUrl: string
  status?: number /* 1- Active, 2- Inactive */
  createdAt?: firebase.default.firestore.Timestamp
  updatedAt?: firebase.default.firestore.Timestamp
}