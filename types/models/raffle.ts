export default interface Raffle {
  id?: string
  channelId?: string
  code?: string
  liveUrl?: string
  status?: number
  winners?: number
  uid?: string
  user?: firebase.default.firestore.DocumentReference
  createdAt?: firebase.default.firestore.Timestamp
  updatedAt?: firebase.default.firestore.Timestamp
}