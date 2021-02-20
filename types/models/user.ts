export default interface User {
  uuid?: string
  email: string
  name: string
  channelUrl: string
  status?: number
  createdAt?: firebase.default.firestore.Timestamp
  updatedAt?: firebase.default.firestore.Timestamp
}