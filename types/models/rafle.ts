export default interface Rafle {
  id?: string
  channelId?: string
  code?: string
  liveUrl?: string
  status?: number
  createdAt?: firebase.default.firestore.Timestamp
  updatedAt?: firebase.default.firestore.Timestamp
}